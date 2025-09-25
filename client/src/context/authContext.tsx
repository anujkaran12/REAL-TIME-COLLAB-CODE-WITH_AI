import React, { createContext, useContext, useState, ReactNode } from "react";
import Auth from "../components/Auth/Auth";

// Context type define karo
interface AuthContextType {
  openAuthFormType: 'LOGIN' | 'REGISTER' | null;
  setOpenAuthFormType: React.Dispatch<React.SetStateAction<'LOGIN' | 'REGISTER' | null>>;
}

// Default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [openAuthFormType, setOpenAuthFormType] = useState<'LOGIN' | 'REGISTER' | null>(null);

  return (
    <AuthContext.Provider value={{ openAuthFormType,setOpenAuthFormType }}>
      {children}
      {openAuthFormType && <Auth/>}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
