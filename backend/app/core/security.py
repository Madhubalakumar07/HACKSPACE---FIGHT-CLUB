from datetime import datetime, timedelta, timezone
from typing import Optional
import jwt
import bcrypt
from app.core.config import settings


# ─────────────── Password Utilities ───────────────

def get_password_hash(plain_password: str) -> str:
    """Hash a plain-text password using bcrypt."""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(plain_password.encode("utf-8"), salt).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain-text password against a bcrypt hash."""
    return bcrypt.checkpw(
        plain_password.encode("utf-8"),
        hashed_password.encode("utf-8"),
    )


# ─────────────── JWT Utilities ───────────────

def create_access_token(
    subject: str | int,
    expires_delta: Optional[timedelta] = None,
    extra_claims: Optional[dict] = None,
) -> str:
    """
    Create a signed JWT access token.
    
    Args:
        subject: typically the user's id or email
        expires_delta: optional override for expiry duration
        extra_claims: optional dict of additional claims to embed
    """
    now = datetime.now(timezone.utc)
    expire = now + (expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    payload = {
        "sub": str(subject),
        "iat": now,
        "exp": expire,
        "type": "access",
    }
    if extra_claims:
        payload.update(extra_claims)
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def create_refresh_token(
    subject: str | int,
    expires_delta: Optional[timedelta] = None,
) -> tuple[str, datetime]:
    """
    Create a refresh token (longer-lived).
    Returns (token_str, expiry_datetime).
    """
    now = datetime.now(timezone.utc)
    expire = now + (expires_delta or timedelta(days=30))
    payload = {
        "sub": str(subject),
        "iat": now,
        "exp": expire,
        "type": "refresh",
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return token, expire


def decode_token(token: str) -> Optional[dict]:
    """
    Decode and verify a JWT. Returns payload dict or None on failure.
    """
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
