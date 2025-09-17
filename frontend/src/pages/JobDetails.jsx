import React, { useEffect, useState } from "react";
import { fetchJob, fetchApplicants, applyToJob } from "../api";
import { useParams } from "react-router-dom";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [candidateIdToApply, setCandidateIdToApply] = useState("");

  useEffect(() => {
    fetchJob(id).then(setJob);
    fetchApplicants(id).then(setApplicants);
  }, [id]);

  async function handleApply() {
    if (!candidateIdToApply) return alert("enter candidate id to apply");
    await applyToJob(Number(candidateIdToApply), Number(id));
    const updated = await fetchApplicants(id);
    setApplicants(updated);
    alert("Applied (or failed if already applied)");
  }

  if (!job) return <div>Loading...</div>;
  return (
    <div className="container">
      <h1>{job.title}</h1>
      <p>{job.description}</p>
      <p><strong>Skills:</strong> {job.required_skills}</p>

      <div className="apply-box">
        <input type="number" placeholder="Candidate ID" value={candidateIdToApply} onChange={e => setCandidateIdToApply(e.target.value)} />
        <button onClick={handleApply}>Apply</button>
      </div>

      <h2>Applicants</h2>
      <ul className="applicants-list">
        {applicants.map(a => (
          <li key={a.id}>
            <div><strong>{a.name}</strong> ({a.email})</div>
            <div>Applied at: {new Date(a.applied_at).toLocaleString()}</div>
            {a.resume_filename && <a href={`http://localhost:8000/uploads/${a.resume_filename}`} target="_blank" rel="noreferrer">Resume</a>}
          </li>
        ))}
      </ul>
    </div>
  );
}
