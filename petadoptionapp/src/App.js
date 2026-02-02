import React from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import LandingPage from "./LandingPage";
 import AdoptionSuccess from './AdoptionSuccess'; 
 import CashOnDelivery from "./CashOnDelivery"; 
 import Registerform from "./Registerform"; 
 import Petgallery from "./Petgallery";
  import Signup from "./Signup";
   function App() {
     return ( <Router>
       <Routes> 
        <Route path="/" element={<LandingPage />} /> 
        
        <Route path="/login" element={<Registerform />} /> 
        <Route path="/gallery" element={<Petgallery />} />
         <Route path="/cash-on-delivery" element={<CashOnDelivery />} />
          <Route path="/adoption-success" element={<AdoptionSuccess />} /> 
          <Route path="/signup" element={<Signup />} /> </Routes> </Router> );
           }
           export default App; 