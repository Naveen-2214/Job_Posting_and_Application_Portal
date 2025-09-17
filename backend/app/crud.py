from sqlalchemy.orm import Session
from . import models, schemas
from typing import List, Optional
from sqlalchemy.exc import IntegrityError

def create_job(db: Session, job: schemas.JobCreate):
    db_job = models.Job(**job.dict())
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job

def get_jobs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Job).offset(skip).limit(limit).all()

def get_job(db: Session, job_id: int):
    return db.query(models.Job).filter(models.Job.id == job_id).first()

def create_candidate(db: Session, cand: schemas.CandidateCreate):
    db_cand = models.Candidate(**cand.dict())
    db.add(db_cand)
    db.commit()
    db.refresh(db_cand)
    return db_cand

def get_candidates(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Candidate).offset(skip).limit(limit).all()

def get_candidate(db: Session, candidate_id: int):
    return db.query(models.Candidate).filter(models.Candidate.id == candidate_id).first()

def update_candidate_resume(db: Session, candidate_id: int, filename: str):
    cand = get_candidate(db, candidate_id)
    if not cand:
        return None
    cand.resume_filename = filename
    db.add(cand)
    db.commit()
    db.refresh(cand)
    return cand

def apply_to_job(db: Session, candidate_id: int, job_id: int):
    application = models.Application(candidate_id=candidate_id, job_id=job_id)
    db.add(application)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        return None
    db.refresh(application)
    return application

def get_applicants_for_job(db: Session, job_id: int):
    # JOIN to return Candidate rows for a job
    return db.query(models.Candidate, models.Application.applied_at).join(models.Application).filter(models.Application.job_id == job_id).all()

def update_candidate(db: Session, candidate_id: int, updates: schemas.CandidateCreate):
    cand = get_candidate(db, candidate_id)
    if not cand:
        return None
    cand.name = updates.name
    cand.email = updates.email
    cand.phone = updates.phone
    db.add(cand)
    db.commit()
    db.refresh(cand)
    return cand

def delete_candidate(db: Session, candidate_id: int):
    cand = get_candidate(db, candidate_id)
    if not cand:
        return None
    db.delete(cand)
    db.commit()
    return cand

def delete_job(db: Session, job_id: int):
    job = get_job(db, job_id)
    if not job:
        return None
    db.delete(job)
    db.commit()
    return job
