"""
LangChain RAG service powered by Llama 3 via Groq (free-tier inference API).

Architecture:
  1. Knowledge base: plain-text / markdown documents in data/knowledge_base/
  2. Vector store: in-memory TF-IDF similarity (no external vector DB needed for hackathon)
  3. LLM: llama3-8b-8192 via Groq Inference API (free tier, no GPU required)
     Get a free API key at https://console.groq.com/keys
"""
from __future__ import annotations

import os
import logging
import textwrap
from typing import Optional

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document

from app.core.config import settings

logger = logging.getLogger(__name__)

# ──────────────────────────────────────────────────────────────────────────────
# 1. KNOWLEDGE BASE  (built-in lifestyle wellness docs)
# ──────────────────────────────────────────────────────────────────────────────

BUILT_IN_DOCS: list[str] = [
    """
    # LifeFlow Nutrition Guide
    ## Protein Sources
    - Eggs: 6g protein each, budget-friendly (~₹8 per egg).
    - Paneer: 18g per 100g, good for vegetarians.
    - Dal (lentils): 9g per 100g cooked, high fiber.
    - Curd/Yogurt: 10g per cup, probiotic benefits.
    - Chickpeas / Sundal: 15g per cup, excellent fiber.
    
    ## Healthy Indian Breakfasts
    - Idli + Sambar: 380 kcal, 14g protein, probiotic.
    - Poha with peanuts: 350 kcal, 10g protein.
    - Oats with banana: 300 kcal, 9g protein.
    - Sprout salad: 220 kcal, 11g protein, high fiber.
    
    ## Budget Eating Tips
    - Seasonal vegetables are cheaper and more nutritious.
    - Buy lentils in bulk — 1 kg dal = 10 meals.
    - Curd rice is ultra-cheap, probiotic, easy to digest.
    """,
    """
    # LifeFlow Fitness Guide
    ## Beginner Home Workouts (no equipment)
    - **10-min morning reset**: 20 squats, 10 push-ups, 30-sec plank × 3 sets.
    - **Desk break**: Neck rolls, shoulder shrugs, wrist circles.
    - **Post-meal walk**: 10 minutes after lunch lowers blood sugar 20%.
    
    ## Energy-Adaptive Rules
    - On tired/low days: Replace workouts with 5-min stretching.
    - On good days: Add 2 extra sets or a 15-min brisk walk.
    - Sleep < 6h: Skip intense cardio; walk only.
    
    ## Progress Milestones
    - Week 1-2: Consistency over intensity.
    - Week 3-4: Increase reps by 10%.
    - Month 2: Add one new exercise.
    """,
    """
    # LifeFlow Sleep & Mind Guide
    ## Sleep Hygiene
    - Consistent bed/wake times even on weekends.
    - Blue-light blocking: no screens 30 min before sleep.
    - Ideal room: 18-20°C, dark, quiet.
    - Avoid caffeine after 2 PM.
    
    ## Wind-Down Routine (15 min)
    1. Dim lights at 9:30 PM.
    2. 5-4-3-2-1 breathing: inhale 5s, hold 4s, exhale 6s.
    3. Write tomorrow's top 3 tasks.
    4. Gratitude: name 3 things that went well today.
    
    ## Mood & Mental Health
    - 10-min morning sunlight improves serotonin.
    - Journaling reduces anxiety significantly.
    - Social connection: call one person per week.
    """,
    """
    # LifeFlow Habit Tracking Guide
    ## Building Habits
    - Start tiny: 2-minute rule — if it takes under 2 min, do it now.
    - Habit stacking: attach new habit to existing routine.
    - Environment design: put your water bottle on your desk.
    
    ## Common Daily Habits
    - Morning: Hydrate (500ml water), sunlight 10 min.
    - Midday: Vegetable at lunch, 10-min walk.
    - Evening: Screen-free wind-down, gratitude journal.
    
    ## Tracking Strategy
    - Don't break the chain (Jerry Seinfeld method).
    - Weekly review every Sunday: what worked, what to adjust.
    """,
]


# ──────────────────────────────────────────────────────────────────────────────
# 2. SIMPLE TF-IDF RETRIEVER (no ChromaDB / FAISS needed)
# ──────────────────────────────────────────────────────────────────────────────

class SimpleTFIDFRetriever:
    """
    Lightweight in-memory retriever using scikit-learn TF-IDF.
    Suitable for small knowledge bases (< 1000 chunks).
    """
    def __init__(self, docs: list[str], top_k: int = 3):
        from sklearn.feature_extraction.text import TfidfVectorizer
        import numpy as np

        self.top_k = top_k
        self.docs = docs
        self.vectorizer = TfidfVectorizer(
            ngram_range=(1, 2),
            max_features=10000,
            stop_words="english",
        )
        self.tfidf_matrix = self.vectorizer.fit_transform(docs)
        self.np = np

    def get_relevant_documents(self, query: str) -> list[Document]:
        from sklearn.metrics.pairwise import cosine_similarity

        query_vec = self.vectorizer.transform([query])
        scores = cosine_similarity(query_vec, self.tfidf_matrix).flatten()
        top_indices = self.np.argsort(scores)[::-1][: self.top_k]
        return [
            Document(page_content=self.docs[i], metadata={"score": float(scores[i]), "source": f"doc_{i}"})
            for i in top_indices
            if scores[i] > 0.01
        ]

    def invoke(self, query: str) -> list[Document]:
        return self.get_relevant_documents(query)


# ──────────────────────────────────────────────────────────────────────────────
# 3. LLM WRAPPER  (HF Inference API or local transformers)
# ──────────────────────────────────────────────────────────────────────────────

class GroqLLMWrapper:
    """
    Wraps Llama 3 (or any Groq-hosted model) via the Groq Inference API.
    Free tier at https://console.groq.com — no credit card required.
    Supported free models: llama3-8b-8192, llama3-70b-8192, mixtral-8x7b-32768
    """

    def __init__(self):
        self.model_name = settings.LLM_MODEL_NAME
        self.groq_api_key = settings.GROQ_API_KEY
        self._client = None
        logger.info(f"GroqLLM init: model={self.model_name}")

    def _get_client(self):
        """Lazy-init Groq client."""
        if not self.groq_api_key.strip():
            raise RuntimeError(
                "GROQ_API_KEY is not configured. Get a free key at "
                "https://console.groq.com/keys and add it to backend/.env, "
                "then restart the backend."
            )
        if self._client is None:
            from groq import Groq
            self._client = Groq(api_key=self.groq_api_key)
        return self._client

    def generate(self, messages: list[dict], max_new_tokens: int | None = None) -> str:
        """
        Generate text from a list of chat messages.
        messages: [{"role": "system"|"user"|"assistant", "content": "..."}]
        """
        tokens = max_new_tokens or settings.MAX_NEW_TOKENS
        client = self._get_client()
        try:
            response = client.chat.completions.create(
                model=self.model_name,
                messages=messages,
                max_tokens=tokens,
                temperature=settings.TEMPERATURE,
            )
        except Exception as exc:
            raise RuntimeError(
                f"Groq could not generate a response for {self.model_name}: {exc}"
            ) from exc

        content = response.choices[0].message.content
        if not content:
            raise RuntimeError("Groq returned an empty response.")
        return content.strip()


# ──────────────────────────────────────────────────────────────────────────────
# 4. RAG SERVICE  (combines retriever + LLM)
# ──────────────────────────────────────────────────────────────────────────────

SYSTEM_PROMPT = """You are LifeFlow Coach, a friendly and knowledgeable AI wellness assistant.
You specialise in Indian lifestyle, nutrition, fitness, sleep, and habit coaching.
Always give practical, budget-friendly, actionable advice suitable for busy urban Indians.
Keep responses concise (2-4 paragraphs), empathetic, and non-preachy.
Use the provided context to answer accurately. If context is not relevant, rely on your general knowledge.
Always end with one motivational micro-tip.

CONTEXT:
{context}
"""


class RAGService:
    _instance: Optional["RAGService"] = None

    def __init__(self):
        self.llm = GroqLLMWrapper()
        # Build document chunks
        splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=80)
        chunks: list[str] = []

        # Built-in docs
        for raw in BUILT_IN_DOCS:
            for chunk in splitter.split_text(raw):
                chunks.append(chunk)

        # Optional: load from files in knowledge_base dir
        kb_dir = settings.KNOWLEDGE_BASE_DIR
        if os.path.isdir(kb_dir):
            for fname in os.listdir(kb_dir):
                if fname.endswith((".txt", ".md")):
                    fpath = os.path.join(kb_dir, fname)
                    with open(fpath, "r", encoding="utf-8") as f:
                        content = f.read()
                    for chunk in splitter.split_text(content):
                        chunks.append(chunk)

        logger.info(f"RAG knowledge base: {len(chunks)} chunks indexed.")
        self.retriever = SimpleTFIDFRetriever(chunks, top_k=settings.RAG_TOP_K)

    @classmethod
    def get_instance(cls) -> "RAGService":
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def query(
        self,
        user_message: str,
        history: Optional[list[dict]] = None,
    ) -> dict:
        """
        Run RAG: retrieve → format prompt → call LLM → return answer + sources.
        """
        # 1. Retrieve relevant context chunks
        relevant_docs = self.retriever.invoke(user_message)
        context = "\n\n---\n\n".join(doc.page_content for doc in relevant_docs) or "No specific context found."
        sources = [doc.metadata.get("source", "knowledge_base") for doc in relevant_docs]

        # 2. Build chat messages
        system_msg = {"role": "system", "content": SYSTEM_PROMPT.format(context=context)}
        messages: list[dict] = [system_msg]

        # Include conversation history (last 4 turns to keep prompt short)
        if history:
            messages.extend(history[-8:])

        messages.append({"role": "user", "content": user_message})

        # 3. Call LLM
        answer = self.llm.generate(messages)

        return {
            "answer": answer,
            "sources": list(set(sources)),
            "model": settings.LLM_MODEL_NAME,
        }

    def create_health_plan(self, document_text: str, score: int, metrics: list[dict]) -> str:
        """Generate a conservative lifestyle plan from extracted document values."""
        metric_text = "\n".join(
            f"- {item['name']}: {item['value']} ({item['status']})"
            for item in metrics
        ) or "- No standard numeric metrics were detected."
        messages = [
            {
                "role": "system",
                "content": (
                    "You are a cautious wellness coach, not a doctor. Create a practical "
                    "7-day lifestyle improvement plan from the supplied health-report summary. "
                    "Never diagnose, prescribe medication, or invent missing values. Tell the "
                    "user to discuss abnormal or concerning results with a qualified clinician. "
                    "Mention urgent care for severe symptoms. Use headings: What I noticed, "
                    "7-day plan, and When to seek care. Keep it under 450 words."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"Educational wellness score: {score}/100\n"
                    f"Extracted metrics:\n{metric_text}\n"
                    f"Report text for context:\n{document_text[:12000]}"
                ),
            },
        ]
        return self.llm.generate(messages, max_new_tokens=700)


def get_rag_service() -> RAGService:
    """FastAPI dependency: returns the singleton RAGService."""
    return RAGService.get_instance()
