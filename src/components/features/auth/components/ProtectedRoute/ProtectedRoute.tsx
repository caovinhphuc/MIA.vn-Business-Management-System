// src/features/auth/components/ProtectedRoute/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../../../../../services/authService";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Check real authentication status
  const isAuthenticated = AuthService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};
