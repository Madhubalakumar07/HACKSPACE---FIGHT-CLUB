import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import settings
from app.api.router import api_router
from app.db.init_db import init_db

# ──────────────────────────────────────────────────────────────────────────────
# Logging configuration
# ──────────────────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)


# ──────────────────────────────────────────────────────────────────────────────
# App lifespan: runs startup/shutdown tasks
# ──────────────────────────────────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup and shutdown logic."""
    # ── Startup ──
    logger.info(f"🚀 Starting {settings.PROJECT_NAME} ...")
    init_db()
    logger.info("✅ Database tables created / verified.")
    yield
    # ── Shutdown ──
    logger.info("🛑 Shutting down LifeFlow backend.")


# ──────────────────────────────────────────────────────────────────────────────
# FastAPI application instance
# ──────────────────────────────────────────────────────────────────────────────
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="""
## LifeFlow AI Backend

A FastAPI backend powering the LifeFlow AI Lifestyle Planner.

### Features
- 🔐 **JWT Authentication** — Register, login, token refresh
- 🤖 **AI Coach** — Qwen3-8B via HuggingFace Inference API + LangChain RAG
- 📚 **Knowledge Base** — Built-in wellness, nutrition, and fitness documents
- 🧑 **User Profiles** — Personalized lifestyle data stored per account

### Authentication
Most endpoints require a Bearer token.  
Register at `POST /api/v1/auth/register`, then use the returned `access_token`.
    """,
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)


# ──────────────────────────────────────────────────────────────────────────────
# CORS Middleware
# ──────────────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ──────────────────────────────────────────────────────────────────────────────
# Global exception handler
# ──────────────────────────────────────────────────────────────────────────────
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.exception(f"Unhandled exception on {request.method} {request.url}: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal server error occurred. Please try again later."},
    )


# ──────────────────────────────────────────────────────────────────────────────
# Routers
# ──────────────────────────────────────────────────────────────────────────────
app.include_router(api_router, prefix=settings.API_V1_STR)


# ──────────────────────────────────────────────────────────────────────────────
# Root health check
# ──────────────────────────────────────────────────────────────────────────────
@app.get("/", tags=["Health"], summary="Root health check")
def root():
    return {
        "service": settings.PROJECT_NAME,
        "status": "running",
        "version": "1.0.0",
        "docs": "/docs",
        "api": settings.API_V1_STR,
    }


@app.get("/health", tags=["Health"], summary="Detailed health check")
def health_check():
    return {
        "status": "healthy",
        "database": "sqlite",
        "llm_model": settings.LLM_MODEL_NAME,
        "rag": "TF-IDF + LangChain",
    }
