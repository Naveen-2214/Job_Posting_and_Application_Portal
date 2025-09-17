import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <NavLink 
        to="/" 
        end
        className={({ isActive }) => isActive ? "active-link" : undefined}
      >
        Jobs
      </NavLink>
      <NavLink 
        to="/create-candidate" 
        className={({ isActive }) => isActive ? "active-link" : undefined}
      >
        Create Candidate
      </NavLink>
      <NavLink 
        to="/candidates" 
        className={({ isActive }) => isActive ? "active-link" : undefined}
      >
        Candidates
      </NavLink>
    </nav>
  );
}
