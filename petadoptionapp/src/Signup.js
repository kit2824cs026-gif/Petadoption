import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // ✅ SAVE LOGIN USER IN FORMAT EXPECTED BY PETGALLERY
      const loggedUser = {
        name: user.displayName,
        email: user.email,
      };

      localStorage.setItem("user", JSON.stringify(loggedUser));

      navigate("/gallery"); // login success
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "80px",
        height: "100vh",
        backgroundImage:
          "url('https://tse4.mm.bing.net/th/id/OIP.RhyKKuv5_otnFXp-5AVihAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "white" }}>Sign Up</h1>

      <button
        onClick={handleGoogleLogin}
        style={{
          width: "260px",
          padding: "12px",
          margin: "15px",
          borderRadius: "10px",
          backgroundColor: "darkblue",
          color: "skyblue",
          border: "none",
          fontSize: "16px",
          fontFamily: "serif",
          cursor: "pointer",
        }}
      >
        Continue with Google
      </button>
    </div>
  );
}

export default Signup;
