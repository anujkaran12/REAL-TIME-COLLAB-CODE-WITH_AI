import React, { useState } from "react";
import ButtonLoader from "../Utility/ButtonLoader/ButtonLoader";

interface Iprop {
  loading: boolean;
  onVerifyCode: (formVerificationCode: string) => Promise<void>;
  setVerificationCode: React.Dispatch<React.SetStateAction<string | null>>;
}
const VerifyCode: React.FC<Iprop> = ({
  loading,
  onVerifyCode,
  setVerificationCode,
}) => {
  const [formDataVerificationCode, setFormDataVerificationCode] = useState("");

  return (
    <div className="auth-form-container" onClick={(e) => e.stopPropagation()}>
      <h2 className="auth-form-title">Verify Code</h2>

      <form
        className="auth-form"
        onSubmit={(e) => {
          e.preventDefault();
          onVerifyCode(formDataVerificationCode.trim());
        }}
      >
        <div className="auth-form-group">
          <input
            className="auth-form-input"
            type="text"
            name="password"
            placeholder="Enter verification code"
            value={formDataVerificationCode}
            onChange={(e) => setFormDataVerificationCode(e.target.value)}
            required
            disabled={loading}
            autoComplete={"current-password"}
            style={
              formDataVerificationCode?{
              letterSpacing:"5px"
            }:{}}
          />
           <p className="auth-form-helper ">
                  Code sended to you email, please check you gmail address.
                </p>
        </div>

        <button
          type="submit"
          className="auth-form-button form-btn"
          disabled={loading}
        >
          {loading ? <ButtonLoader /> : "Verify & Continue"}
        </button>
      </form>
      <p className="auth-form-signin-text">
        Edit email address!{" "}
        <span onClick={() => setVerificationCode(null)}> Go back.</span>
      </p>
    </div>
  );
};

export default VerifyCode;
