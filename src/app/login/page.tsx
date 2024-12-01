"use client";

import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full">
      <div className="flex-1 bg-gradient-to-br from-amber-800 to-indigo-600 flex items-center justify-center p-8">
        <div className="text-center md:text-left max-w-md">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome Back!</h1>
          <p className="text-lg text-white mb-6">
            Access your sensor data quickly and efficiently.
          </p>
        </div>
      </div>

      <div className="flex-1 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Log In</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
