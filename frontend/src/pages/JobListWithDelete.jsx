import React, { useEffect, useState } from "react";
import { fetchJobs, deleteJob, createJob } from "../api";
import { Link } from "react-router-dom";

export default function JobListWithDelete() {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    required_skills: "",
    recruiter_id: "",
  });

  useEffect(() => {
    fetchJobs().then(setJobs);
  }, []);

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this job?")) {
      await deleteJob(id);
      const refreshed = await fetchJobs();
      setJobs(refreshed);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    const newJob = await createJob({
      title: formData.title,
      description: formData.description,
      required_skills: formData.required_skills,
      recruiter_id: formData.recruiter_id,
    });
    setJobs([...jobs, newJob]);
    setFormData({ title: "", description: "", required_skills: "", recruiter_id: "" });
  }

  return (
    <div className="container">
      <h1>Manage Jobs</h1>

      <form onSubmit={handleCreate} className="form" style={{ marginBottom: "20px" }}>
        <label>
          Title
          <input
            type="text"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </label>
        <label>
          Description
          <textarea
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
        </label>
        <label>
          Required Skills
          <input
            type="text"
            value={formData.required_skills}
            onChange={e => setFormData({ ...formData, required_skills: e.target.value })}
          />
        </label>
        <label>
          Recruiter ID
          <input
            type="text"
            value={formData.recruiter_id}
            onChange={e => setFormData({ ...formData, recruiter_id: e.target.value })}
          />
        </label>
        <button type="submit">Create Job</button>
      </form>

      <div className="job-grid">
        {jobs.map(j => (
          <div className="card" key={j.id}>
            <h3>{j.title}</h3>
            <p>{j.required_skills}</p>
            <Link to={`/jobs/${j.id}`}>View</Link>
            <button
              onClick={() => handleDelete(j.id)}
              style={{ marginLeft: "10px", backgroundColor: "crimson" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
