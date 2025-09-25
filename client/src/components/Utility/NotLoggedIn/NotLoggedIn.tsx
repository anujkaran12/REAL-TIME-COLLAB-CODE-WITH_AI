// NotLoggedIn.tsx
import React from "react";
import "./NotLoggedIn.css";
import { useAuth } from "../../../context/authContext";

const NotLoggedIn: React.FC = () => {
  const { setOpenAuthFormType } = useAuth();

  return (
    <div className="not-loggedin-wrapper">
      <div className="not-loggedin-card shadow">
        <div className="icon-circle">
          <i className="bi bi-shield-lock"></i>
        </div>

        <h2 className="title">Authentication Required</h2>
        <p className="subtitle">
          You must be logged in to access <span>Code Sync</span> features.  
          Login securely to continue collaborating in real-time.
        </p>

        <div className="btn-group">
          <button
            className="btn btn-primary"
            onClick={() => setOpenAuthFormType("LOGIN")}
          >
            <i className="bi bi-box-arrow-in-right me-2"></i> Login
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setOpenAuthFormType("REGISTER")}
          >
            <i className="bi bi-person-plus me-2"></i> Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotLoggedIn;
