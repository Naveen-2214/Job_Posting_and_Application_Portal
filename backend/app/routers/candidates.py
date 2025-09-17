from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, crud, database, models
import os
from pathlib import Path

router = APIRouter(prefix="/api/candidates", tags=["candidates"])

UPLOAD_DIR = Path(__file__).resolve().parents[1] / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Candidate)
def create_candidate(candidate: schemas.CandidateCreate, db: Session = Depends(get_db)):
    return crud.create_candidate(db, candidate)

@router.post("/{candidate_id}/upload_resume", response_model=schemas.Candidate)
def upload_resume(candidate_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    cand = crud.get_candidate(db, candidate_id)
    if not cand:
        raise HTTPException(status_code=404, detail="Candidate not found")
    # Save file
    filename = f"{candidate_id}_{file.filename}"
    file_path = UPLOAD_DIR / filename
    with open(file_path, "wb") as f:
        f.write(file.file.read())
    # update DB
    updated = crud.update_candidate_resume(db, candidate_id, filename)
    return updated

@router.get("/", response_model=list[schemas.Candidate])
def list_candidates(db: Session = Depends(get_db)):
    return crud.get_candidates(db)

# ... existing create/list/upload ...

@router.delete("/{candidate_id}", response_model=schemas.Candidate)
def delete_candidate(candidate_id: int, db: Session = Depends(get_db)):
    cand = crud.delete_candidate(db, candidate_id)
    if not cand:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return cand

# List candidates
@router.get("/", response_model=list[schemas.Candidate])
def list_candidates(db: Session = Depends(get_db)):
    return crud.get_candidates(db)

# Edit candidate
@router.put("/{candidate_id}", response_model=schemas.Candidate)
def edit_candidate(candidate_id: int, updates: schemas.CandidateCreate, db: Session = Depends(get_db)):
    cand = crud.update_candidate(db, candidate_id, updates)
    if not cand:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return cand

