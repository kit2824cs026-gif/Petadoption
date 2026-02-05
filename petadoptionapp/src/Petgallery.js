import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App1.css";

function Petgallery() {
  const [pets, setPets] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPet, setSelectedPet] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [myListedPets, setMyListedPets] = useState([]);
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    reason: "",
  });

  const loadData = () => {
    fetch("http://localhost:5000/api/pets")
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
        
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setUser(storedUser);
          const myPets = data.filter(pet => 
            pet.sellerEmail && pet.sellerEmail.toLowerCase() === storedUser.email.toLowerCase()
          );
          setMyListedPets(myPets);
        }
      })
      .catch((err) => console.log("Error fetching pets:", err));
  };

  useEffect(() => {
    loadData();
    
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      const defaultUser = {
        name: "Deva Darshini",
        email: "kit28.24cs026@gmail.com",
        adoptedPets: [],
      };
      setUser(defaultUser);
      localStorage.setItem("user", JSON.stringify(defaultUser));
    }
  }, []);

  const handleDeletePet = (petId) => {
    if (window.confirm("Are you sure you want to delete this pet? 🗑️")) {
      fetch(`http://localhost:5000/api/pets/${petId}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            alert("Pet deleted successfully!");
            loadData();
          } else {
            alert("Failed to delete pet.");
          }
        })
        .catch((err) => console.log("Delete error:", err));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const filteredPets = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdoptClick = (pet) => {
    setSelectedPet(pet);
    setShowForm(true);
  };

  const updateUserAdoptedPets = (pet) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      adoptedPets: [...(user.adoptedPets || []), { name: pet.name, breed: pet.breed }],
    };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // --- ITHU THAAN NEENGA KETTA ANTHA "DETAILS SAVE" FEATURE ---
  const handleAdoptOption = (paymentMethod) => {
    if (paymentMethod === "online") {
      setShowQR(true);
      setShowForm(false);
    } else {
      // Backend update added here to save Name, Address, Phone
      fetch(`http://localhost:5000/api/pets/adopt/${selectedPet._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          buyerEmail: formData.email,
          buyerName: formData.fullName,
          buyerAddress: formData.address,
          buyerPhone: formData.phone
        }),
      })
      .then(() => {
        updateUserAdoptedPets(selectedPet);
        navigate("/adoption-success", {
          state: {
            petId: selectedPet._id,
            petName: selectedPet.name,
            petBreed: selectedPet.breed,
            amount: 500,
            paymentMethod: "Cash on Delivery",
            userDetails: formData,
          },
        });
        setSelectedPet(null);
      })
      .catch(err => console.log("COD Error:", err));
    }
  };

  const handleQRSuccess = () => {
    // Backend update added for Online Payment also
    fetch(`http://localhost:5000/api/pets/adopt/${selectedPet._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        buyerEmail: formData.email,
        buyerName: formData.fullName,
        buyerAddress: formData.address,
        buyerPhone: formData.phone
      }),
    })
    .then(() => {
      updateUserAdoptedPets(selectedPet);
      navigate("/adoption-success", {
        state: {
          petId: selectedPet._id,
          petName: selectedPet.name,
          petBreed: selectedPet.breed,
          amount: 500,
          paymentMethod: "online",
          userDetails: formData,
        },
      });
      setSelectedPet(null);
      setShowQR(false);
    })
    .catch(err => console.log("Online Error:", err));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="gallery-container">
      {user && (
        <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 9999 }}>
          <div
            style={{
              backgroundColor: "white",
              padding: "8px 15px",
              borderRadius: "50px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              cursor: "pointer",
              fontWeight: "500",
              color: "#333",
              fontSize: "14px",
            }}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            {user.name}
          </div>

          {showProfileMenu && (
            <div
              style={{
                marginTop: "5px",
                backgroundColor: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                borderRadius: "10px",
                padding: "15px",
                minWidth: "280px",
                textAlign: "left",
                maxHeight: "80vh",
                overflowY: "auto"
              }}
            >
              <p style={{ margin: "5px 0" }}><b>Name:</b> {user.name}</p>
              <p style={{ margin: "5px 0" }}><b>Email:</b> {user.email}</p>

              <p style={{ marginTop: "10px", marginBottom: "5px", color: "#28a745" }}><b>Adopted Pets:</b></p>
              <ul style={{ paddingLeft: "20px", fontSize: "13px", color: "#555" }}>
                {user.adoptedPets && user.adoptedPets.length > 0 ? (
                  user.adoptedPets.map((pet, index) => (
                    <li key={index}>{pet.name} ({pet.breed})</li>
                  ))
                ) : (
                  <li>No pets adopted yet.</li>
                )}
              </ul>

              <hr style={{ border: "0.1px solid #eee", margin: "10px 0" }} />

              <p style={{ marginBottom: "5px", color: "#4facfe" }}><b>My Listed Pets:</b></p>
              <ul style={{ paddingLeft: "20px", fontSize: "13px", color: "#555" }}>
                {myListedPets.length > 0 ? (
                  myListedPets.map((pet, index) => (
                    <li key={index} style={{ marginBottom: "15px", borderBottom: "1px solid #f0f0f0", paddingBottom: "10px", position: "relative" }}>
                      <b>{pet.name}</b> ({pet.breed})
                      <span onClick={() => handleDeletePet(pet._id)} style={{ float: "right", cursor: "pointer", color: "red", fontSize: "16px" }}>🗑️</span>

                      {pet.adopted ? (
                        <div style={{ marginTop: "8px", backgroundColor: "#f9f9f9", padding: "8px", borderRadius: "5px", borderLeft: "3px solid #28a745" }}>
                          <span style={{ color: "#28a745", fontWeight: "bold", fontSize: "11px" }}>✅ ADOPTED BY:</span>
                          <div style={{ fontSize: "11px", color: "#333", marginTop: "4px" }}>
                            <p style={{ margin: "2px 0" }}>👤 <b>Name:</b> {pet.buyerName || "N/A"}</p>
                            <p style={{ margin: "2px 0" }}>📧 <b>Email:</b> {pet.buyerEmail}</p>
                            <p style={{ margin: "2px 0" }}>📍 <b>Address:</b> {pet.buyerAddress || "N/A"}</p>
                            <p style={{ margin: "2px 0" }}>📞 <b>Phone:</b> {pet.buyerPhone || "N/A"}</p>
                          </div>
                        </div>
                      ) : (
                        <span style={{ color: "gray", display: "block", fontSize: "11px", marginTop: "4px" }}>⏳ Still in Gallery</span>
                      )}
                    </li>
                  ))
                ) : (
                  <li>No pets listed for sale.</li>
                )}
              </ul>

              <button onClick={() => navigate("/sell-pet")} style={{ marginTop: "15px", width: "100%", padding: "10px", backgroundColor: "#4facfe", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "14px" }}>
                Sell My Pets 🐾
              </button>

              <button onClick={handleLogout} style={{ marginTop: "8px", width: "100%", padding: "10px", backgroundColor: "#ff4d4f", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "14px" }}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      <h1 className="gallery-title">Available Pets for Adoption 🐾</h1>

      <div className="search-box">
        <input type="text" placeholder="Search by name or breed..." className="glowing" onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="pet-grid">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <div key={pet._id} className="pet-card">
              <img src={pet.image} alt={pet.name} className="pet-image" />
              <h2 style={{ color: "skyblue", margin: "10px 0" }}>{pet.name}</h2>
              <p><b>Breed:</b> {pet.breed}</p>
              <p><b>Age:</b> {pet.age} Years</p>
              <button
                className="button"
                style={{ backgroundColor: pet.adopted ? "grey" : "#ff9f43", color: "white" }}
                onClick={() => !pet.adopted && handleAdoptClick(pet)}
              >
                {pet.adopted ? "Adopted" : "Adopt Me ❤️"}
              </button>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: "1/-1", color: "gray" }}>No pets match your search.</p>
        )}
      </div>

      {selectedPet && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: showForm ? "550px" : "450px" }}>
            {showForm ? (
              <>
                <h2 style={{ marginBottom: "15px" }}>Adoption Form: {selectedPet.name} 📋</h2>
                <div style={{ maxHeight: "65vh", overflowY: "auto", textAlign: "left", padding: "15px", backgroundColor: "#fdfdfd", borderRadius: "10px" }}>
                  <label><b>Full Name</b></label>
                  <input name="fullName" type="text" className="glowing" style={{ width: "95%", marginBottom: "15px" }} value={formData.fullName} onChange={handleInputChange} required />
                  <label><b>Email Address</b></label>
                  <input name="email" type="email" className="glowing" style={{ width: "95%", marginBottom: "15px" }} value={formData.email} onChange={handleInputChange} required />
                  <label><b>Phone Number</b></label>
                  <input name="phone" type="tel" className="glowing" style={{ width: "95%", marginBottom: "15px" }} value={formData.phone} onChange={handleInputChange} required />
                  <label><b>Home Address</b></label>
                  <textarea name="address" className="glowing" style={{ width: "95%", marginBottom: "15px", height: "50px" }} value={formData.address} onChange={handleInputChange} required />
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
                  <button className="button" style={{ backgroundColor: "#28a745" }} onClick={() => setShowForm(false)}>Next (Payment) ➡️</button>
                  <button className="button" style={{ backgroundColor: "grey" }} onClick={() => { setSelectedPet(null); setShowForm(false); }}>Cancel ❌</button>
                </div>
              </>
            ) : !showQR ? (
              <>
                <h2 style={{ marginBottom: "20px" }}>Choose Payment Method</h2>
                <div className="payment-options">
                  <div className="payment-card" onClick={() => handleAdoptOption("online")}>
                    <h3>Online Payment 💳</h3>
                    <p>Pay securely via QR code.</p>
                  </div>
                  <div className="payment-card" onClick={() => handleAdoptOption("cash")}>
                    <h3>Cash on Delivery 💵</h3>
                    <p>Pay when you collect {selectedPet.name}.</p>
                  </div>
                </div>
                <button className="button" style={{ marginTop: "20px", backgroundColor: "grey" }} onClick={() => setSelectedPet(null)}>Cancel ❌</button>
              </>
            ) : (
              <>
                <h2 style={{ marginBottom: "20px" }}>Scan QR to Pay 💳</h2>
                <img src={window.location.origin + "/OR CODE.jpeg"} alt="QR Code" style={{ width: "200px", height: "200px", marginBottom: "20px", border: "3px solid #ff9f43", padding: "10px", borderRadius: "15px", backgroundColor: "white" }} />
                <button className="button" style={{ marginTop: "10px", backgroundColor: "#28a745" }} onClick={handleQRSuccess}>Payment Done ✅</button>
                <button className="button" style={{ marginTop: "10px", marginLeft: "10px", backgroundColor: "grey" }} onClick={() => setShowQR(false)}>Back 🤍</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Petgallery;