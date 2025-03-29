require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes")
const connectDB = require("./configs/db")

const app = express();


// Middleware to handle CORS
app.use(
    //cors({
    //    origin: process.env.CLIENT_URL || "+",
    //    methods: ["GET", "POST", "PUT", "DELETE"],
    //    allowedHeaders: ["Content-Type", "Authorization"],
    //})
  cors()
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB()

app.use("/api/users", userRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
