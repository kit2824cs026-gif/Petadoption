import "./App.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registerform() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      name === "deva" &&
      email === "kit28.24cs026@gmail.com" &&
      password === "deva@24"
    ) {
      navigate("/gallery");
    } else {
      setMessage("Invalid credentials! Please enter correct details.");
    }
  };

  // ONLY CHANGE
  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="body">
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1 style={{ fontFamily: "italic", color: "darkblue" }}>
          User Registration
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            className="glowing"
            style={{ borderRadius: "10px" }}
            type="text"
            placeholder="Enter your Name 😊"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br /><br />

          <input
            className="glowing"
            style={{ borderRadius: "10px" }}
            type="email"
            placeholder="Enter your Email 📧"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br /><br />

          <input
            className="glowing"
            style={{ borderRadius: "10px" }}
            type="password"
            placeholder="Enter your Password 👀"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br /><br />

          <button
            type="submit"
            className="button"
            style={{
              borderRadius: "10px",
              backgroundColor: "skyblue",
              color: "white",
            }}
          >
            Register
          </button>

          <br /><br />

          <button
            type="button"
            className="button"
            style={{
              borderRadius: "10px",
              backgroundColor: "skyblue",
              color: "white",
            }}
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </form>

        {message && (
          <p style={{ color: "darkblue", marginTop: "10px" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Registerform;
