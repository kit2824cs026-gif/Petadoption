import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CashOnDelivery() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleDone = () => {
    if (!address || !phone) {
      alert("Please fill all details");
      return;
    }

    alert("You have successfully adopted me!!! ✅😁");
    navigate("/gallery");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Cash on Delivery 💵</h1>

      <p><b>Pet Name:</b> {state?.petName}</p>
      <p><b>Breed:</b> {state?.petBreed}</p>
      <p><b>Amount:</b> ₹{state?.amount}</p>

      <br />

      <input
        className="glowing"
        placeholder="Enter Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <br /><br />

      <input
        className="glowing"
        placeholder="Enter Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br /><br />

      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        <button className="button" onClick={handleDone}>
          Done ✅
        </button>

        <button 
          className="button" 
          style={{ backgroundColor: 'grey' }} 
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

export default CashOnDelivery;