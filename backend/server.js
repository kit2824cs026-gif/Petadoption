const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Pet = require("./models/Pet");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/petdb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Pet Adoption Backend Running");
});

// --- USER ROUTES ---
app.post("/api/users/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.send("User Registered Successfully 🎉");
  } catch (error) {
    res.status(500).send("Error registering user");
  }
});

app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid password");

    res.send("Login successful 🎉");
  } catch (err) {
    res.status(500).send("Login error");
  }
});

// --- PET ROUTES ---

// 1. ADD PET
app.post("/api/pets/add", async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.send("Pet added successfully 🐶");
  } catch (err) {
    res.status(500).send("Error adding pet");
  }
});

// 2. FETCH ALL PETS
app.get("/api/pets", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).send("Error fetching pets");
  }
});

// 3. ADOPT PET (Intha edathula thaan unga details add aaguthu)
app.put("/api/pets/adopt/:id", async (req, res) => {
  try {
    // Inga dhaan neenga keta Name, Address, Phone-a receive pannuroam
    const { buyerEmail, buyerName, buyerAddress, buyerPhone } = req.body;
    
    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      { 
        adopted: true, 
        buyerEmail: buyerEmail,
        buyerName: buyerName,       // Save Name
        buyerAddress: buyerAddress, // Save Address
        buyerPhone: buyerPhone      // Save Phone
      },
      { new: true }
    );
    res.json(updatedPet);
  } catch (err) {
    res.status(500).send("Error updating adoption status");
  }
});

// 4. DELETE PET 🗑️
app.delete("/api/pets/:id", async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.id);
    if (!deletedPet) {
      return res.status(404).send("Pet not found");
    }
    res.send("Pet deleted successfully 🗑️");
  } catch (err) {
    res.status(500).send("Error deleting pet");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});