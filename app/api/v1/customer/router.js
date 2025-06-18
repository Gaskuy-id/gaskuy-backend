// router.js
const express = require("express");

const router = express.Router();
const { signinController, signupController, getProfileController, editProfileController, checkoutController, getAvailableVehiclesController, getAllRentalHistoryController } = require("./controller");
const upload = require("../../../middlewares/upload");
const { authenticateUser } = require("../../../middlewares/auth");
const uploadMiddleware = require("../../../middlewares/upload");

router.get("/vehicles", getAvailableVehiclesController);
router.get("/customer/profile", authenticateUser, getProfileController)
router.get("/customer/history", authenticateUser, getAllRentalHistoryController)
router.post(
  "/customer/edit",
  authenticateUser,
  uploadMiddleware([{ name: "image", maxCount: 1 }]),
  editProfileController
);

router.post("/vehicles/:id/checkout", authenticateUser, checkoutController);

module.exports = router;