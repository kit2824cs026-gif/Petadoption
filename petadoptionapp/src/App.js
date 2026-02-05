import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SellPetForm from "./SellPetForm";
import LandingPage from "./LandingPage";
import AdoptionSuccess from "./AdoptionSuccess";
import CashOnDelivery from "./CashOnDelivery";
import Registerform from "./Registerform";
import Petgallery from "./Petgallery";
import Signup from "./Signup";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Registerform />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/gallery" element={<Petgallery />} />
        <Route path="/sell-pet" element={<SellPetForm />} />
        <Route path="/cash-on-delivery" element={<CashOnDelivery />} />
        <Route path="/adoption-success" element={<AdoptionSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
