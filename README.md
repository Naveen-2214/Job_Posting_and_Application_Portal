**Description**

The Job Portal Application is a full-stack web platform designed to streamline the interaction between recruiters and candidates. It provides a simple yet powerful interface for recruiters to create and manage job postings, and for candidates to build profiles, upload resumes, and apply for jobs. The application also enables recruiters to review applicants for each job and download resumes for offline evaluation.
This project is developed as a complete backend–frontend solution:
The backend is built with FastAPI (Python), using SQLite as the database with SQLAlchemy ORM for handling relationships between candidates, jobs, and applications. FastAPI ensures high performance, clean API design, and automatic generation of interactive API documentation via Swagger UI.
The frontend is developed with React, offering a modern, responsive interface for both recruiters and candidates. It uses React Router for navigation and Fetch API for backend communication.
Uploaded resumes are handled securely on the backend, stored in a dedicated uploads folder, and made available via static routes so recruiters can easily download them.

A full-stack **Job Posting & Application Portal** built with:

- **Backend** → FastAPI + SQLite (via SQLAlchemy ORM)  
- **Frontend** → React (with React Router)  
- **Features** → Job CRUD, Candidate CRUD (with resume upload), Job Applications, Resume download  

---

## Backend Setup (FastAPI)

1. Install dependencies:
cd backend
pip install -r requirements.txt

2. Run backend server:
uvicorn app.main:app --reload --port 8000

3. API Docs:
Swagger UI → http://127.0.0.1:8000/docs
Redoc → http://127.0.0.1:8000/redoc

4. Resumes:
Uploaded resumes are stored in
backend/app/uploads/
5. They are served at:
http://127.0.0.1:8000/uploads/{filename}

Frontend Setup (React):
1. Install dependencies:
cd frontend
npm install

2. Run frontend:
npm start
Frontend runs at:
http://127.0.0.1:3000

Features:
1. Candidates:
 -> Create candidate (with resume upload)
 -> List all candidates
 -> Edit candidate (name, email, phone, resume)
 -> Delete candidate
 -> View/download resume

2. Jobs:
 -> Create new jobs
 -> List jobs
 -> View job details
 -> Delete jobs

3. Applications:
 -> Apply a candidate to a job
 -> View list of applicants for a job
 -> Download resumes of applicants

Example API Endpoints:
1. Candidates:
   -> POST /api/candidates/ → create candidate
   -> GET /api/candidates/ → list candidates
   -> PUT /api/candidates/{id} → edit candidate
   -> DELETE /api/candidates/{id} → delete candidate
   -> POST /api/candidates/{id}/upload_resume → upload resume

2. Jobs:
   -> POST /api/jobs/ → create job
   -> GET /api/jobs/ → list jobs
   -> GET /api/jobs/{id} → job details
   -> DELETE /api/jobs/{id} → delete job

3. Applications:
   -> POST /api/jobs/{job_id}/apply → apply to a job
     Example:
        {
          "candidate_id": 1,
          "job_id": 2
        }
   -> GET /api/jobs/{job_id}/applicants → list applicants for a job

Frontend Pages:
    / → Job list
    /jobs/:id → Job details + applicants
    /create-candidate → Create candidate (with resume upload)
    /candidates → Candidate list (edit/delete/resume)
    /manage-jobs → Create, view, delete jobs

Future Improvements:
  -> Add recruiter & candidate authentication
  -> Job editing (inline form like candidates)
  -> Search + filter candidates/jobs
  -> File type/size validation for resumes
  -> Dockerize & deploy to cloud

