import React from "react";
import "./Loading.css";

const Loading: React.FC = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default Loading;
