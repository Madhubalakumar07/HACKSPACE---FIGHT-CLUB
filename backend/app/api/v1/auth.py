from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.core.security import create_access_token, create_refresh_token, decode_token
from app.core.deps import get_current_user
from app.services.auth_service import AuthService
from app.schemas.schemas import (
    UserRegisterRequest,
    UserLoginRequest,
    TokenResponse,
    UserPublic,
    RefreshTokenRequest,
)
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post(
    "/register",
    response_model=TokenResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
)
def register(data: UserRegisterRequest, db: Session = Depends(get_db)):
    """
    Register a new account and immediately return a JWT access token.
    """
    existing = AuthService.get_user_by_email(db, data.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )

    user = AuthService.create_user(db, data)
    access_token = create_access_token(subject=user.id, extra_claims={"email": user.email})

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserPublic.model_validate(user),
    )


@router.post(
    "/login",
    response_model=TokenResponse,
    summary="Login with email + password",
)
def login(data: UserLoginRequest, db: Session = Depends(get_db)):
    """
    Authenticate with email and password. Returns a JWT access token.
    """
    user = AuthService.authenticate_user(db, data.email, data.password)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(subject=user.id, extra_claims={"email": user.email})

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserPublic.model_validate(user),
    )


@router.post(
    "/login/form",
    response_model=TokenResponse,
    summary="OAuth2 form-based login (Swagger UI compatible)",
)
def login_form(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    """
    OAuth2 password grant — compatible with Swagger UI's 'Authorize' button.
    username field = email.
    """
    user = AuthService.authenticate_user(db, form_data.username, form_data.password)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(subject=user.id, extra_claims={"email": user.email})

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserPublic.model_validate(user),
    )


@router.get(
    "/me",
    response_model=UserPublic,
    summary="Get current authenticated user",
)
def get_me(current_user: User = Depends(get_current_user)):
    """Returns the profile of the currently authenticated user."""
    return UserPublic.model_validate(current_user)


@router.post(
    "/refresh",
    response_model=TokenResponse,
    summary="Refresh access token",
)
def refresh_access_token(payload: RefreshTokenRequest, db: Session = Depends(get_db)):
    """
    Exchange a valid refresh token for a new access token.
    """
    token_data = decode_token(payload.refresh_token)
    if token_data is None or token_data.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token.",
        )

    user = AuthService.get_user_by_id(db, int(token_data["sub"]))
    if user is None or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive.",
        )

    new_access_token = create_access_token(subject=user.id, extra_claims={"email": user.email})
    return TokenResponse(
        access_token=new_access_token,
        token_type="bearer",
        user=UserPublic.model_validate(user),
    )
