// router.js
const express = require("express");

const router = express.Router();
const { getProfileController, checkoutController, editProfileController, checkPaymentConfirmationController, getAvailableVehiclesController, getAllRentalHistoryController } = require("./controller");
const { authenticateUser } = require("../../../middlewares/auth");
const uploadMiddleware = require("../../../middlewares/upload");

router.get("/vehicles", getAvailableVehiclesController);
router.get("/customer/profile", authenticateUser, getProfileController)
router.get("/customer/history", authenticateUser, getAllRentalHistoryController)
router.post("/customer/checkConfirmation", authenticateUser, checkPaymentConfirmationController)

router.post(
  "/customer/edit",
  authenticateUser,
  uploadMiddleware([{ name: "image", maxCount: 1 }]),
  editProfileController
);

router.post("/vehicles/:id/checkout", authenticateUser, checkoutController);

module.exports = router;