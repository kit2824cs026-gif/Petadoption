import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/profile/${userId}`)
        .then(res => setUser(res.data))
        .catch(err => console.log(err));
    }
  }, [userId]);

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-sm sticky top-0 z-50 px-10">
      <h1 className="text-2xl font-bold text-blue-900">Available Pets for Adoption 🐾</h1>

      <div className="relative">
        {userId ? (
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center justify-center w-10 h-10 bg-blue-700 text-white rounded-full font-bold uppercase border-2 border-blue-100 shadow-sm"
            >
              {user?.name ? user.name[0] : "U"}
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-12 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl py-3 z-50">
                <div className="px-4 py-2 border-b border-gray-50">
                  <p className="font-bold text-blue-900">{user?.name || "User"}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
                <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-blue-50" onClick={() => setShowDropdown(false)}>My Profile</Link>
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  onClick={() => { localStorage.clear(); window.location.href = "/login"; }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="bg-blue-700 text-white px-5 py-2 rounded-full font-bold">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;