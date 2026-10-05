import logging
from fastapi import APIRouter, Depends, HTTPException, UploadFile, status

from app.core.deps import get_optional_user
from app.core.config import settings
from app.models.user import User
from app.schemas.schemas import ChatRequest, ChatResponse, HealthAnalysisResponse, HealthMetric
from app.services.health_document_service import extract_text, score_document
from app.services.rag_service import RAGService, get_rag_service

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/chat", tags=["AI Coach"])


@router.post(
    "/",
    response_model=ChatResponse,
    summary="Chat with LifeFlow AI Coach (RAG + Qwen3-8B)",
)
def chat(
    request: ChatRequest,
    current_user: User | None = Depends(get_optional_user),
    rag: RAGService = Depends(get_rag_service),
):
    """
    Send a message to the LifeFlow AI Coach.
    
    - **message**: The user's query.
    - **history**: Optional list of previous `{role, content}` messages for context.
    
    The response includes:
    - **answer**: The model's reply.
    - **sources**: Which knowledge-base chunks were retrieved.
    - **model**: Name of the LLM used.
    
    Requires Bearer token authentication.
    """
    if not request.message.strip():
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Message cannot be empty.",
        )

    # Append user context to system for personalization
    history = [{"role": msg.role, "content": msg.content} for msg in (request.history or [])]

    logger.info("Chat request from user_id=%s: '%s...'", current_user.id if current_user else "anonymous", request.message[:80])

    try:
        result = rag.query(
            user_message=request.message,
            history=history,
        )
        return ChatResponse(**result)
    except Exception as exc:
        logger.exception(
            "RAG query error for user %s",
            current_user.id if current_user else "anonymous",
        )
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI service temporarily unavailable.",
        ) from exc


@router.post(
    "/analyze-document",
    response_model=HealthAnalysisResponse,
    summary="Score a health document and create a wellness plan",
)
async def analyze_document(
    document: UploadFile,
    current_user: User | None = Depends(get_optional_user),
    rag: RAGService = Depends(get_rag_service),
):
    """Analyze a PDF, DOCX, TXT, or Markdown report in memory."""
    if not document.filename:
        raise HTTPException(status_code=400, detail="A document filename is required.")

    content = await document.read()
    try:
        text = extract_text(document.filename, content)
        score, score_label, summary, extracted = score_document(text)
        metric_dicts = [
            {"name": item.name, "value": item.value, "status": item.status, "note": item.note}
            for item in extracted
        ]
        plan = rag.create_health_plan(text, score, metric_dicts)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
    except Exception as exc:
        logger.exception("Health document analysis failed for user %s", current_user.id if current_user else "anonymous")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="The AI health analysis service is temporarily unavailable.",
        ) from exc

    return HealthAnalysisResponse(
        filename=document.filename,
        score=score,
        score_label=score_label,
        summary=summary,
        metrics=[HealthMetric(**metric) for metric in metric_dicts],
        plan=plan,
        model=rag.llm.model_name,
        disclaimer="This is an educational wellness summary, not a diagnosis or substitute for professional medical care.",
    )


@router.get(
    "/health",
    summary="Check AI service health (no auth required)",
)
def chat_health():
    """Quick health check to verify the RAG service is initialized."""
    return {
        "status": "ok",
        "service": "LifeFlow AI Coach",
        "model": "Qwen/Qwen3-8B",
        "rag": "TF-IDF + LangChain",
        "qwen_configured": settings.qwen_configured,
    }
