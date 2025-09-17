const API_BASE = "http://localhost:8000/api";

export async function fetchCandidates() {
  const res = await fetch("http://127.0.0.1:8000/api/candidates/");
  return res.json();
}

export async function updateCandidate(id, data) {
  const res = await fetch(`http://127.0.0.1:8000/api/candidates/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchJobs() {
  const res = await fetch(`${API_BASE}/jobs/`);
  return res.json();
}

export async function fetchJob(id) {
  const res = await fetch(`${API_BASE}/jobs/${id}`);
  return res.json();
}

export async function fetchApplicants(jobId) {
  const res = await fetch(`${API_BASE}/jobs/${jobId}/applicants`);
  return res.json();
}

export async function createCandidate(data) {
  const res = await fetch(`${API_BASE}/candidates/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function uploadResume(candidateId, file) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`http://localhost:8000/api/candidates/${candidateId}/upload_resume`, {
    method: "POST",
    body: form,
  });
  return res.json();
}

export async function applyToJob(candidateId, jobId) {
  const res = await fetch(`${API_BASE}/jobs/${jobId}/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ candidate_id: candidateId, job_id: jobId }),
  });
  return res.json();
}

export async function deleteCandidate(id) {
  const res = await fetch(`http://127.0.0.1:8000/api/candidates/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function deleteJob(id) {
  const res = await fetch(`http://127.0.0.1:8000/api/jobs/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function createJob(data) {
  const res = await fetch("http://127.0.0.1:8000/api/jobs/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to create job");
  }
  return res.json();
}

