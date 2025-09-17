import React, { useEffect, useState } from "react";
import { fetchCandidates, updateCandidate, uploadResume, deleteCandidate } from "../api";

export default function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    fetchCandidates().then(setCandidates);
  }, []);

  function startEdit(cand) {
    setEditingId(cand.id);
    setFormData({ name: cand.name, email: cand.email, phone: cand.phone || "" });
    setResumeFile(null);
  }

  async function saveEdit(id) {
    // update basic info
    await updateCandidate(id, formData);

    // if resume chosen, upload it
    if (resumeFile) {
      await uploadResume(id, resumeFile);
    }

    // refresh candidate list
    const refreshed = await fetchCandidates();
    setCandidates(refreshed);

    setEditingId(null);
    setResumeFile(null);
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      await deleteCandidate(id);
      const refreshed = await fetchCandidates();
      setCandidates(refreshed);
    }
  }

  return (
    <div className="container">
      <h1>Candidate List</h1>
      <ul className="applicants-list">
        {candidates.map(c => (
          <li key={c.id}>
            {editingId === c.id ? (
              <div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
                <input
                  type="file"
                  onChange={e => setResumeFile(e.target.files[0])}
                />
                <button onClick={() => saveEdit(c.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <strong>{c.name}</strong> ({c.email}) {c.phone && `- ${c.phone}`}
                {c.resume_filename && (
                  <a
                    href={`http://127.0.0.1:8000/uploads/${c.resume_filename}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ marginLeft: "10px" }}
                  >
                    Resume
                  </a>
                )}
                <button onClick={() => startEdit(c)}>Edit</button>
                <button
                  onClick={() => handleDelete(c.id)}
                  style={{ marginLeft: "10px", backgroundColor: "crimson" }}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
