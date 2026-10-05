from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from app.db.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)

    # Profile fields
    age_range = Column(String(50), default="25-34")
    language = Column(String(10), default="en")
    daily_schedule = Column(String(50), default="moderate")
    dietary_preference = Column(String(50), default="vegetarian")
    health_focus = Column(String(50), default="energy")
    budget = Column(String(20), default="medium")
    wake_time = Column(String(10), default="07:00")
    average_sleep_hours = Column(Integer, default=7)
    onboarding_completed = Column(Boolean, default=False)

    # Auth status
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)

    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self) -> str:
        return f"<User id={self.id} email={self.email}>"
