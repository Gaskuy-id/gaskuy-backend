const express = require("express");

const router = express.Router();
const { getRentalController } = require("./controller");
const { authenticateUser, authorizeRoles } = require("../../../middlewares/auth")

router.get("/rentals", authenticateUser, authorizeRoles("admin"), getRentalController);

module.exports = router;
