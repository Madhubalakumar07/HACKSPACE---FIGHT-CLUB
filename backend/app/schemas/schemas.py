from typing import Optional
from pydantic import BaseModel, EmailStr, field_validator


# ─────────────── Auth Schemas ───────────────

class UserRegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    age_range: Optional[str] = "25-34"
    language: Optional[str] = "en"
    daily_schedule: Optional[str] = "moderate"
    dietary_preference: Optional[str] = "vegetarian"
    health_focus: Optional[str] = "energy"
    budget: Optional[str] = "medium"
    wake_time: Optional[str] = "07:00"
    average_sleep_hours: Optional[int] = 7

    @field_validator("password")
    @classmethod
    def password_strength(cls, v: str) -> str:
        if len(v) < 6:
            raise ValueError("Password must be at least 6 characters long.")
        return v


class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserPublic"


class RefreshTokenRequest(BaseModel):
    refresh_token: str


# ─────────────── User Schemas ───────────────

class UserPublic(BaseModel):
    id: int
    name: str
    email: str
    age_range: Optional[str] = None
    language: Optional[str] = None
    daily_schedule: Optional[str] = None
    dietary_preference: Optional[str] = None
    health_focus: Optional[str] = None
    budget: Optional[str] = None
    wake_time: Optional[str] = None
    average_sleep_hours: Optional[int] = None
    onboarding_completed: bool = False
    is_active: bool = True

    model_config = {"from_attributes": True}


class UserUpdateRequest(BaseModel):
    name: Optional[str] = None
    age_range: Optional[str] = None
    language: Optional[str] = None
    daily_schedule: Optional[str] = None
    dietary_preference: Optional[str] = None
    health_focus: Optional[str] = None
    budget: Optional[str] = None
    wake_time: Optional[str] = None
    average_sleep_hours: Optional[int] = None
    onboarding_completed: Optional[bool] = None


# ─────────────── AI / Chat Schemas ───────────────

class ChatMessage(BaseModel):
    role: str  # "user" | "assistant"
    content: str


class ChatRequest(BaseModel):
    message: str
    history: Optional[list[ChatMessage]] = []
    stream: Optional[bool] = False


class ChatResponse(BaseModel):
    answer: str
    sources: Optional[list[str]] = []
    model: Optional[str] = None


class HealthMetric(BaseModel):
    name: str
    value: str
    status: str
    note: str


class HealthAnalysisResponse(BaseModel):
    filename: str
    score: int
    score_label: str
    summary: str
    metrics: list[HealthMetric]
    plan: str
    model: Optional[str] = None
    disclaimer: str


# Update forward reference
TokenResponse.model_rebuild()
