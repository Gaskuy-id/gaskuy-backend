const express = require("express");

const router = express.Router();
const { getRentalController, confirmationsController, getRentalByDriverController } = require("./controller");
const { authenticateUser, authorizeRoles } = require("../../../middlewares/auth")

router.get("/rentals", authenticateUser, authorizeRoles("admin"), getRentalController);
router.get("/driver/rentals", authenticateUser, authorizeRoles("driver"), getRentalByDriverController);
router.put("/rentals/:id", authenticateUser, authorizeRoles("admin"), confirmationsController);

module.exports = router;
