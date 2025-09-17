import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobDetails from "./pages/JobDetails";
import CandidateForm from "./pages/CandidateForm";
import Navbar from "./components/Navbar";
import "./styles/styles.css";
import CandidateList from "./pages/CandidateList";
import JobListWithDelete from "./pages/JobListWithDelete";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<JobListWithDelete />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/create-candidate" element={<CandidateForm />} />
        <Route path="/candidates" element={<CandidateList />} />
      </Routes>
    </Router>
  );
}

export default App;
