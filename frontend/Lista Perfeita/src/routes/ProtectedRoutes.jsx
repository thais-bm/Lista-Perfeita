// src/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // se não tiver token, manda para login
    return <Navigate to="/login" replace />;
  }

  // se tiver token, renderiza a página normalmente
  return children;
}