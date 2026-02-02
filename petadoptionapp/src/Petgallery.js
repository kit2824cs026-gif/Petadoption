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
  const [showProfileMenu, setShowProfileMenu] = useState(false); // profile dropdown
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    reason: "",
  });

  useEffect(() => {
    // Fetch pets
    fetch("http://localhost:5000/api/pets")
      .then((res) => res.json())
      .then((data) => setPets(data))
      .catch((err) => console.log("Error fetching pets:", err));

    // Load user from localStorage or set default
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Default user
      const defaultUser = {
        name: "Darshu",
        email: "kit28.24cs026@gmail.com",
        adoptedPets: [], // 🟢 added
      };
      setUser(defaultUser);
      localStorage.setItem("user", JSON.stringify(defaultUser));
    }
  }, []);

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

  // 🟢 New function to add adopted pet to user profile
  const updateUserAdoptedPets = (pet) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      adoptedPets: [...(user.adoptedPets || []), { name: pet.name, breed: pet.breed }],
    };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const handleAdoptOption = (paymentMethod) => {
    if (paymentMethod === "online") {
      setShowQR(true);
      setShowForm(false);
    } else {
      updateUserAdoptedPets(selectedPet); // 🟢 added

      navigate("/cash-on-delivery", {
        state: {
          petName: selectedPet.name,
          petBreed: selectedPet.breed,
          amount: 500,
          userDetails: formData,
        },
      });
      setSelectedPet(null);
    }
  };

  const handleQRSuccess = () => {
    updateUserAdoptedPets(selectedPet); // 🟢 added

    navigate("/adoption-success", {
      state: {
        petName: selectedPet.name,
        petBreed: selectedPet.breed,
        amount: 500,
        paymentMethod: "online",
        userDetails: formData,
      },
    });
    setSelectedPet(null);
    setShowQR(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="gallery-container">
      {/* Top-right profile name */}
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

          {/* Profile dropdown */}
          {showProfileMenu && (
            <div
              style={{
                marginTop: "5px",
                backgroundColor: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                borderRadius: "10px",
                padding: "10px",
                minWidth: "220px",
                textAlign: "left",
              }}
            >
              <p>
                <b>Name:</b> {user.name}
              </p>
              <p>
                <b>Email:</b> {user.email}
              </p>
              {/* 🟢 Show adopted pets */}
              <p>
                <b>Adopted Pets:</b>
              </p>
              <ul>
                {user.adoptedPets && user.adoptedPets.length > 0 ? (
                  user.adoptedPets.map((pet, index) => (
                    <li key={index}>
                      {pet.name} ({pet.breed})
                    </li>
                  ))
                ) : (
                  <li>No pets adopted yet.</li>
                )}
              </ul>

              <button
                onClick={handleLogout}
                style={{
                  marginTop: "10px",
                  padding: "5px 10px",
                  backgroundColor: "#ff4d4f",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      <h1 className="gallery-title">Available Pets for Adoption 🐾</h1>

      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by name or breed..."
          className="glowing"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Pet Grid */}
      <div className="pet-grid">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <div key={pet._id} className="pet-card">
              <img src={pet.image} alt={pet.name} className="pet-image" />
              <h2 style={{ color: "skyblue", margin: "10px 0" }}>{pet.name}</h2>
              <p>
                <b>Breed:</b> {pet.breed}
              </p>
              <p>
                <b>Age:</b> {pet.age} Years
              </p>

              <button
                className="button"
                style={{
                  backgroundColor: pet.adopted ? "grey" : "#ff9f43",
                  color: "white",
                }}
                onClick={() => !pet.adopted && handleAdoptClick(pet)}
              >
                {pet.adopted ? "Adopted" : "Adopt Me ❤️"}
              </button>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: "1/-1", color: "gray" }}>
            No pets match your search.
          </p>
        )}
      </div>

      {/* Adoption Modal */}
      {selectedPet && (
        <div className="modal-overlay">
          <div
            className="modal-content"
            style={{ maxWidth: showForm ? "550px" : "450px" }}
          >
            {showForm ? (
              <>
                <h2 style={{ marginBottom: "15px", color: "#2c3e50" }}>
                  Adoption Form: {selectedPet.name} 📋
                </h2>
                <div
                  style={{
                    maxHeight: "65vh",
                    overflowY: "auto",
                    textAlign: "left",
                    padding: "15px",
                    backgroundColor: "#fdfdfd",
                    borderRadius: "10px",
                  }}
                >
                  <label>
                    <b>Full Name</b>
                  </label>
                  <input
                    name="fullName"
                    type="text"
                    className="glowing"
                    style={{ width: "95%", marginBottom: "15px" }}
                    placeholder="Your Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />

                  <label>
                    <b>Email Address</b>
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="glowing"
                    style={{ width: "95%", marginBottom: "15px" }}
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />

                  <label>
                    <b>Phone Number</b>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    className="glowing"
                    style={{ width: "95%", marginBottom: "15px" }}
                    placeholder="+91 XXXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />

                  <label>
                    <b>Home Address</b>
                  </label>
                  <textarea
                    name="address"
                    className="glowing"
                    style={{ width: "95%", marginBottom: "15px", height: "50px" }}
                    placeholder="Where will the pet live?"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  ></textarea>

                  <label>
                    <b>Why do you want to adopt?</b>
                  </label>
                  <textarea
                    name="reason"
                    className="glowing"
                    style={{ width: "95%", marginBottom: "15px", height: "50px" }}
                    placeholder="Tell us about your home environment..."
                    value={formData.reason}
                    onChange={handleInputChange}
                  ></textarea>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "5px",
                    }}
                  >
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms" style={{ fontSize: "12px" }}>
                      I promise to take good care of {selectedPet.name}.
                    </label>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    marginTop: "20px",
                  }}
                >
                  <button
                    className="button"
                    style={{ backgroundColor: "#28a745" }}
                    onClick={() => setShowForm(false)}
                  >
                    Next (Payment) ➡️
                  </button>
                  <button
                    className="button"
                    style={{ backgroundColor: "grey" }}
                    onClick={() => {
                      setSelectedPet(null);
                      setShowForm(false);
                    }}
                  >
                    Cancel ❌
                  </button>
                </div>
              </>
            ) : !showQR ? (
              <>
                <h2 style={{ marginBottom: "20px" }}>Choose Payment Method</h2>
                <div className="payment-options">
                  <div
                    className="payment-card"
                    onClick={() => handleAdoptOption("online")}
                  >
                    <h3>Online Payment 💳</h3>
                    <p>Pay securely via QR code.</p>
                  </div>
                  <div
                    className="payment-card"
                    onClick={() => handleAdoptOption("cash")}
                  >
                    <h3>Cash on Delivery 💵</h3>
                    <p>Pay when you collect {selectedPet.name}.</p>
                  </div>
                </div>
                <button
                  className="button"
                  style={{ marginTop: "20px", backgroundColor: "grey" }}
                  onClick={() => setSelectedPet(null)}
                >
                  Cancel ❌
                </button>
              </>
            ) : (
              <>
                <h2 style={{ marginBottom: "20px" }}>Scan QR to Pay 💳</h2>
                <img
                  src={window.location.origin + "/OR CODE.jpeg"}
                  alt="QR Code"
                  style={{
                    width: "200px",
                    height: "200px",
                    marginBottom: "20px",
                    border: "3px solid #ff9f43",
                    padding: "10px",
                    borderRadius: "15px",
                    backgroundColor: "white",
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/200?text=QR+Not+Found";
                  }}
                />
                <p>Click below after payment:</p>
                <button
                  className="button"
                  style={{ marginTop: "10px", backgroundColor: "#28a745" }}
                  onClick={handleQRSuccess}
                >
                  Payment Done ✅
                </button>
                <button
                  className="button"
                  style={{
                    marginTop: "10px",
                    marginLeft: "10px",
                    backgroundColor: "grey",
                  }}
                  onClick={() => setShowQR(false)}
                >
                  Back 🤍
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Petgallery;
