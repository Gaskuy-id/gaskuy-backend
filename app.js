require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./app/api/v1/users/router")

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
const notFoundMiddleware = require('./app/middlewares/not-found');
const handlerErrorMiddleware = require('./app/middlewares/handler-error');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes)
app.use(express.static(path.join(__dirname, "public")));

app.use(notFoundMiddleware);
app.use(handlerErrorMiddleware);

module.exports = app;
