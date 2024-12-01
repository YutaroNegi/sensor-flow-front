"use client";

import { useAuth } from "./context/AuthContext";
import LoginPage from "./login/page";
import Dashboard from "./dashboard/page";

export default function Home() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">Carregando...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isAuthenticated ? <Dashboard /> : <LoginPage />}
    </div>
  );
}
