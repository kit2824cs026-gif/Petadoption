import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function AdoptionSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { petName, petBreed, amount = 500 } = location.state || {};

  return (
    <div className='body' style={{ textAlign: 'center', padding: '50px 20px' }}>
      <h1 style={{fontFamily:"italic", color:"darkgreen", fontSize: '2.5em'}}>🎉 Adoption Successful!</h1>
      
      {/* Blue Box Start */}
      <div style={{ 
        backgroundColor: 'skyblue', 
        color: 'darkblue', 
        padding: '40px', 
        borderRadius: '20px', 
        maxWidth: '500px', 
        margin: '30px auto',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        // Intha 3 lines thaan content-ah mela-kila center pannum
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h2 style={{ fontSize: '2em', marginBottom: '10px' }}>{petName}</h2>
        <p style={{ fontSize: '1.4em' }}><b>Breed:</b> {petBreed}</p>
        <p style={{ fontSize: '1.4em' }}><b>Amount:</b> ₹{amount.toLocaleString()}</p>
        
        <div style={{ 
          fontSize: '1.5em', 
          margin: '20px 0', 
          color: 'blue',
          fontWeight: 'bold'
        }}>
          "You adopted me successfully! 🐾❤️"
        </div>

        {/* Back Button ippo box-kulla vandhruchu */}
        <button 
          className='button' 
          style={{ 
            backgroundColor: '#5da9e9', // Light blue to differentiate
            color: 'white', 
            borderRadius: '10px',
            padding: '10px 25px',
            fontSize: '1.1em',
            fontFamily: 'cursive',
            border: 'none',
            cursor: 'pointer',
            marginTop: '10px' // Ezhuthukkum button-kum gap
          }}
          onClick={() => navigate('/gallery')}
        >
          ← Back 
        </button>
      </div>
      {/* Blue Box End */}
      
    </div>
  );
}

export default AdoptionSuccess;