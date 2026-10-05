from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.deps import get_current_user
from app.db.database import get_db
from app.services.auth_service import AuthService
from app.schemas.schemas import UserPublic, UserUpdateRequest
from app.models.user import User

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=UserPublic, summary="Get my profile")
def get_my_profile(current_user: User = Depends(get_current_user)):
    """Returns the full profile of the logged-in user."""
    return UserPublic.model_validate(current_user)


@router.patch("/me", response_model=UserPublic, summary="Update my profile")
def update_my_profile(
    data: UserUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Update profile fields (partial update). All fields are optional."""
    updated = AuthService.update_user(db, current_user, data)
    return UserPublic.model_validate(updated)
