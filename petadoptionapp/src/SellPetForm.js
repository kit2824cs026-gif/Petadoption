import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SellPetForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    breed: "",
    image: "",
    price: ""
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userEmail = storedUser ? storedUser.email : "unknown";

    const petWithSeller = { 
      ...formData, 
      sellerEmail: userEmail 
    };

    try {
      const response = await fetch("http://localhost:5000/api/pets/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(petWithSeller),
      });

      if (response.ok) {
        // Alert box remove panniyaachu
        // Direct-ah gallery-ku pogum, anga useEffect pudhu data-vai fetch pannikkum
        navigate("/gallery"); 
      } else {
        console.error("Submission failed");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f0f4f8", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <div style={{ background: "white", padding: "30px", borderRadius: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px" }}>
        <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Sell Your Pet 🐾</h2>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input type="text" placeholder="Pet Name" required onChange={(e) => setFormData({...formData, name: e.target.value})} style={inputBoxStyle} />
          <input type="number" placeholder="Age (in years)" required onChange={(e) => setFormData({...formData, age: e.target.value})} style={inputBoxStyle} />
          <input type="text" placeholder="Breed" required onChange={(e) => setFormData({...formData, breed: e.target.value})} style={inputBoxStyle} />
          <input type="text" placeholder="Image URL (Direct link)" required onChange={(e) => setFormData({...formData, image: e.target.value})} style={inputBoxStyle} />
          <input type="number" placeholder="Price (₹)" required onChange={(e) => setFormData({...formData, price: e.target.value})} style={inputBoxStyle} />
          
          <button type="submit" style={submitButtonStyle}>List My Pet</button>
          <button type="button" onClick={() => navigate(-1)} style={{ background: "none", color: "#888", border: "none", cursor: "pointer" }}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

const inputBoxStyle = { padding: "12px", borderRadius: "10px", border: "1px solid #ddd", fontSize: "16px", outline: "none" };
const submitButtonStyle = { padding: "12px", backgroundColor: "#4facfe", color: "white", border: "none", borderRadius: "10px", fontWeight: "bold", fontSize: "16px", cursor: "pointer", transition: "0.3s" };

export default SellPetForm;