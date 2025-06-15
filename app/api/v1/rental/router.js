const express = require("express");

const router = express.Router();
const { getRentalController, confirmationsController } = require("./controller");
const { authenticateUser, authorizeRoles } = require("../../../middlewares/auth")

router.get("/rentals", authenticateUser, authorizeRoles("admin"), getRentalController);
router.put("/rentals/:id", authenticateUser, authorizeRoles("admin"), confirmationsController)

module.exports = router;
