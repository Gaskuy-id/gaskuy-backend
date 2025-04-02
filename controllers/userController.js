const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, address, role } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Save path

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ fullName, email, password: hashedPassword, phoneNumber, address, image: imagePath, role});
    await newUser.save();

    res.status(201).json({message: "User registered successfully!"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    // Check if the user exists
    const user = await User.findOne({ email:email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: "Invalid email" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editProfile = async (req, res) => {
  try {
    const _id = req.user.id
    const { fullName, email, phoneNumber, address } = req.body;

    const updatedUser = req.file ? await User.findByIdAndUpdate(
      _id, 
      { fullName, email, phoneNumber, address, image: `/uploads/${req.file.filename}` },
      { new: true, runValidators: true }
    ) : await User.findByIdAndUpdate(
      _id, 
      { fullName, email, phoneNumber, address },
      { new: true, runValidators: true }
    )  

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user: updatedUser})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

exports.getProfile = async (req, res) => {
  try {
    console.log(req.user.id)
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
