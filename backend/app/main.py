from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from .database import engine, Base
from .routers import jobs, candidates, applications
import pathlib
from fastapi.staticfiles import StaticFiles

# create DB
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Job Posting & Application Portal")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(jobs.router)
app.include_router(candidates.router)
app.include_router(applications.router)

# Static route to serve uploaded resumes (simple)

upload_dir = pathlib.Path(__file__).resolve().parents[0] / "uploads"
app.mount("/uploads", StaticFiles(directory=upload_dir), name="uploads")
