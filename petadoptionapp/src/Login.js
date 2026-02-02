import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", { email, password });
      
      
      if (res.data.userId) {
        localStorage.setItem("userId", res.data.userId);
        navigate("/gallery"); // Redirect to the pet gallery
      }
    } catch (err) {
      alert(err.response?.data || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-[30px] shadow-xl w-full max-w-md border border-blue-100">
        <h2 className="text-3xl font-bold text-blue-900 text-center mb-6">Welcome Back! 🐾</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-5 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-blue-900 text-white font-bold py-3 rounded-full hover:bg-blue-800 transition shadow-lg">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <a href="/signup" className="text-blue-700 font-bold">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;