import React, { useState } from "react";
import { createCandidate, uploadResume } from "../api";

export default function CandidateForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState(null);
  const [created, setCreated] = useState(null);

  async function handleCreate(e) {
    e.preventDefault();
    const cand = await createCandidate({ name, email, phone });
    setCreated(cand);
    if (file) {
      await uploadResume(cand.id, file);
      const updated = await fetch(`/api/candidates/${cand.id}`).then(r => r.json()).catch(()=>null);
      setCreated(updated || cand);
    }
    alert("Candidate created. ID: " + cand.id);
  }

  return (
    <div className="container">
      <h1>Create Candidate</h1>
      <form onSubmit={handleCreate} className="form">
        <label>Name<input value={name} onChange={e=>setName(e.target.value)} required/></label>
        <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label>
        <label>Phone<input value={phone} onChange={e=>setPhone(e.target.value)} /></label>

        <label>Resume (choose file)
          <input type="file" onChange={e=>setFile(e.target.files[0])} />
        </label>

        <button type="submit">Create Candidate</button>
      </form>

      {created && (
        <div className="created-box">
          <h3>Created Candidate</h3>
          <div>ID: {created.id}</div>
          <div>Name: {created.name}</div>
          <div>Email: {created.email}</div>
          {created.resume_filename && <a href={`http://localhost:8000/uploads/${created.resume_filename}`} target="_blank" rel="noreferrer">View resume</a>}
        </div>
      )}
    </div>
  );
}
