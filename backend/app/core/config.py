from typing import List, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "LifeFlow AI Backend"
    API_V1_STR: str = "/api/v1"
    
    # Security / JWT
    SECRET_KEY: str = "lifeflow-super-secure-jwt-secret-key-change-in-prod"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    
    # Database
    DATABASE_URL: str = "sqlite:///./lifeflow.db"
    
    # CORS
    CORS_ORIGINS: Union[str, List[str]] = "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,http://127.0.0.1:3000"
    
    @property
    def cors_origin_list(self) -> List[str]:
        if isinstance(self.CORS_ORIGINS, str):
            return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]
        return self.CORS_ORIGINS

    # LLM Settings
    LLM_MODEL_NAME: str = "Qwen/Qwen3-8B"
    HUGGINGFACE_API_KEY: str = ""
    USE_LOCAL_TRANSFORMERS: bool = False
    DEVICE: str = "auto"
    MAX_NEW_TOKENS: int = 512
    TEMPERATURE: float = 0.7

    @property
    def qwen_configured(self) -> bool:
        return bool(self.HUGGINGFACE_API_KEY.strip())
    
    # RAG Settings
    RAG_TOP_K: int = 3
    KNOWLEDGE_BASE_DIR: str = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "data", "knowledge_base")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

settings = Settings()
