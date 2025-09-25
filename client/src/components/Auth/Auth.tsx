import React from "react";
import RegisterForm from "./RegisterForm";
import "./Auth.css";
import { useAuth } from "../../context/authContext";
import LoginForm from "./LoginForm";
const Auth: React.FC = () => {
  const { openAuthFormType } = useAuth();

  return (
    <div
      className="auth-container"
      onClick={(e) => {
        e.stopPropagation();
        // setOpenAuthFormType("");
      }}
    >
      {openAuthFormType === "LOGIN" ? <LoginForm /> : <RegisterForm />}
      {/* <RegisterForm /> */}
    </div>
  );
};

export default Auth;
