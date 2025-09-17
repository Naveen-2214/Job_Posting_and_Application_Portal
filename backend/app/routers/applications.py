from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, crud, database
from typing import List

router = APIRouter(prefix="/api", tags=["applications"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/jobs/{job_id}/apply", response_model=schemas.Application)
def apply(job_id: int, payload: schemas.ApplicationBase, db: Session = Depends(get_db)):
    # payload contains candidate_id and job_id (job_id in path should match)
    if job_id != payload.job_id:
        raise HTTPException(status_code=400, detail="Job ID mismatch")
    job = crud.get_job(db, job_id)
    cand = crud.get_candidate(db, payload.candidate_id)
    if not job or not cand:
        raise HTTPException(status_code=404, detail="Job or Candidate not found")
    application = crud.apply_to_job(db, payload.candidate_id, job_id)
    if not application:
        raise HTTPException(status_code=400, detail="Already applied or error")
    return application

@router.get("/jobs/{job_id}/applicants")
def get_applicants(job_id: int, db: Session = Depends(get_db)):
    rows = crud.get_applicants_for_job(db, job_id)
    # rows is list of tuples (Candidate, applied_at)
    result = []
    for cand, applied_at in rows:
        result.append({
            "id": cand.id,
            "name": cand.name,
            "email": cand.email,
            "phone": cand.phone,
            "resume_filename": cand.resume_filename,
            "applied_at": applied_at
        })
    return result
