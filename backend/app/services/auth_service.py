from typing import Optional
from sqlalchemy.orm import Session

from app.models.user import User
from app.core.security import get_password_hash, verify_password
from app.schemas.schemas import UserRegisterRequest, UserUpdateRequest


class AuthService:
    @staticmethod
    def get_user_by_email(db: Session, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email.lower().strip()).first()

    @staticmethod
    def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
        return db.query(User).filter(User.id == user_id).first()

    @staticmethod
    def create_user(db: Session, data: UserRegisterRequest) -> User:
        user = User(
            email=data.email.lower().strip(),
            name=data.name.strip(),
            hashed_password=get_password_hash(data.password),
            age_range=data.age_range,
            language=data.language,
            daily_schedule=data.daily_schedule,
            dietary_preference=data.dietary_preference,
            health_focus=data.health_focus,
            budget=data.budget,
            wake_time=data.wake_time,
            average_sleep_hours=data.average_sleep_hours,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
        user = AuthService.get_user_by_email(db, email)
        if user is None:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

    @staticmethod
    def update_user(db: Session, user: User, data: UserUpdateRequest) -> User:
        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(user, field, value)
        db.commit()
        db.refresh(user)
        return user
