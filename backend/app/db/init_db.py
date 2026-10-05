from app.db.database import engine, Base

def init_db():
    """Create all database tables."""
    # Import all models so SQLAlchemy registers them before creating tables
    from app.models import user, session  # noqa: F401
    Base.metadata.create_all(bind=engine)
