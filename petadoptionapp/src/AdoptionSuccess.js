import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function AdoptionSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { petName, petBreed, amount = 500, petId, userDetails } = location.state || {};

  useEffect(() => {
    if (petId && userDetails) {
      // Backend update logic - Inga thaan namma sariyaana keys anuppanum
      fetch(`http://localhost:5000/api/pets/adopt/${petId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          buyerEmail: userDetails.email,
          buyerName: userDetails.fullName,   // Check if backend uses 'buyerName'
          buyerAddress: userDetails.address, // Check if backend uses 'buyerAddress'
          buyerPhone: userDetails.phone      // Check if backend uses 'buyerPhone'
        }),
      })
      .then(res => res.json())
      .then(data => console.log("Database updated!", data))
      .catch(err => console.error("Update error:", err));
    }
  }, [petId, userDetails]);

  return (
    <div className='body' style={{ textAlign: 'center', padding: '50px 20px' }}>
      <h1 style={{fontFamily:"italic", color:"darkgreen", fontSize: '2.5em'}}>🎉 Adoption Successful!</h1>
      
      <div style={{ 
        backgroundColor: 'skyblue', 
        color: 'darkblue', 
        padding: '40px', 
        borderRadius: '20px', 
        maxWidth: '500px', 
        margin: '30px auto',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h2 style={{ fontSize: '2em', marginBottom: '10px' }}>{petName}</h2>
        <p style={{ fontSize: '1.4em' }}><b>Breed:</b> {petBreed}</p>
        <p style={{ fontSize: '1.4em' }}><b>Amount Paid:</b> ₹{amount.toLocaleString()}</p>
        
        <div style={{ padding: '15px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '10px', marginTop: '10px', width: '90%' }}>
          <p style={{ fontSize: '1em', margin: '5px 0' }}><b>Buyer:</b> {userDetails?.fullName}</p>
          <p style={{ fontSize: '1em', margin: '5px 0' }}><b>Shipping to:</b> {userDetails?.address}</p>
        </div>

        <div style={{ fontSize: '1.5em', margin: '20px 0', color: 'blue', fontWeight: 'bold' }}>
          "You adopted me successfully! 🐾❤️"
        </div>

        <button 
          className='button' 
          style={{ backgroundColor: '#5da9e9', color: 'white', borderRadius: '10px', padding: '10px 25px', fontSize: '1.1em', cursor: 'pointer', marginTop: '10px', border: 'none' }}
          onClick={() => navigate(-1)} 
        >
          ← Back to Gallery
        </button>
      </div>
    </div>
  );
}

export default AdoptionSuccess;