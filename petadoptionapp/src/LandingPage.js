import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container" style={{ 
      height: "100vh", 
      display: "flex", 
      flexDirection: "column",
      justifyContent: "center", 
      alignItems: "center" 
    }}>
      <h1 className="landing-title">Welcome to PET ADOPTION 🐾</h1>
      
      <button
        className="button"
        onClick={() => navigate("/login")} 
        style={{
          marginTop: "30px",
          
          width: "200px",
          height: "60px",
          
          
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          
          fontSize: "18px",
          fontWeight: "bold",
          backgroundColor: "skyblue",
          color: "white",
          borderRadius: "10px",
          cursor: "pointer",
          border: "none",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
        }}
      >
        Get Started
      </button>
    </div>
  );
}

export default LandingPage;
