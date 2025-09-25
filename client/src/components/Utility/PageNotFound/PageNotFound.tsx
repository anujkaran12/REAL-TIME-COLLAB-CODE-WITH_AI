import React from "react";
import { useNavigate } from "react-router-dom";

import "./PageNotFound.css";

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pnf-container">
      <div className="pnf-content">
        <i className="bi bi-exclamation-triangle-fill pnf-icon"></i>
        <h1 className="pnf-code">404</h1>
        <h2 className="pnf-title">Page Not Found</h2>
        <p className="pnf-text">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <button className="pnf-button" onClick={() => navigate("/")}>
          <i className="bi bi-house-door-fill me-2"></i>
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
