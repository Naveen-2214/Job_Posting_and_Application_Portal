from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class CandidateBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None

class CandidateCreate(CandidateBase):
    pass

class Candidate(CandidateBase):
    id: int
    resume_filename: Optional[str] = None

    class Config:
        orm_mode = True

class JobBase(BaseModel):
    title: str
    description: Optional[str] = None
    required_skills: Optional[str] = None
    recruiter_id: Optional[int] = None

class JobCreate(JobBase):
    pass

class Job(JobBase):
    id: int
    class Config:
        from_attributes = True

class ApplicationBase(BaseModel):
    candidate_id: int
    job_id: int

class Application(ApplicationBase):
    id: int
    applied_at: datetime
    class Config:
        from_attributes = True

class CandidateWithApplication(Candidate):
    applied_at: Optional[datetime] = None
