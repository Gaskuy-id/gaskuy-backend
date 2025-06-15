require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./app/api/v1/auth/router")
const customerRoutes = require("./app/api/v1/customer/router");
const branchRoutes = require("./app/api/v1/branch/router");
const vehicleRoutes = require("./app/api/v1/vehicle/router")
const userRouters = require("./app/api/v1/users/router")
const rentalRoutes = require("./app/api/v1/rental/router")

const app = express();
const v1 = "/api/v1";
const cms = v1+"/cms"

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

app.use(v1, authRoutes)
app.use(v1, customerRoutes);
app.use(cms, branchRoutes);
app.use(cms, vehicleRoutes);
app.use(cms, userRouters);
app.use(cms, rentalRoutes);
app.use(express.static(path.join(__dirname, "public")));

app.use(notFoundMiddleware);
app.use(handlerErrorMiddleware);

module.exports = app;
