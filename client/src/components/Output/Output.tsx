import React from "react";
import "./Output.css";

interface IOutputProp {
  outputLoading: boolean;
  output: {
    language: string;
    run: {
      code: number;
      output: string;
      signal?: any;
      stderr: string;
      stdout: string;
      time?: string;
      memory?: string;
    };
    version: string;
  };
}

const Output: React.FC<IOutputProp> = ({ outputLoading, output }) => {
  const data = output?.run?.output || "";
  const isError = output?.run?.code !== 0;
  const status = outputLoading
    ? "running"
    : isError
    ? "error"
    : "success";

  const handleCopy = () => {
    navigator.clipboard.writeText(data || "");
  };

  return (
    <div className="output-container">
      <div className="output-header">
        <h3>Output</h3>
        <div className={`status-badge ${status}`}>
          {status === "running" && (
            <>
              <i className="bi bi-lightning-charge-fill"></i> Running
            </>
          )}
          {status === "success" && (
            <>
              <i className="bi bi-check-circle-fill"></i> Success
            </>
          )}
          {status === "error" && (
            <>
              <i className="bi bi-x-circle-fill"></i> Error
            </>
          )}
        </div>
      </div>

      {/* Details Section */}
      <div className="output-details">
        <span><strong>Language:</strong> {output?.language}</span>
        <span><strong>Version:</strong> {output?.version}</span>
        {output?.run?.time && (
          <span><strong>Time:</strong> {output.run.time}s</span>
        )}
        {output?.run?.memory && (
          <span><strong>Memory:</strong> {output.run.memory} KB</span>
        )}
        <span><strong>Exit Code:</strong> {output?.run?.code}</span>
      </div>

      {/* Logs */}
      <div className="output-log">
        {outputLoading ? (
          <p className="output-loading">Compiling...</p>
        ) : (
          data
            .split("\n")
            .map((line, i) => (
              <p
                key={i}
                className={`output-line ${isError ? "output-error" : "output-success"}`}
              >
                {line}
              </p>
            ))
        )}
      </div>

      {/* Toolbar */}
      <div className="output-toolbar">
        <button onClick={handleCopy}>
          <i className="bi bi-clipboard"></i> Copy
        </button>
        {/* <button onClick={() => window.location.reload()}>
          <i className="bi bi-arrow-clockwise"></i> Clear
        </button> */}
      </div>
    </div>
  );
};

export default Output;
