// router.js
const express = require("express");

const router = express.Router();
const { 
    getProfileController, 
    checkoutController, 
    cancelRentalController, 
    editProfileController, 
    checkPaymentConfirmationController, 
    getAvailableVehiclesController, 
    getAllRentalHistoryController,
    createRentalReviewController,
    getReviewByVehicleIdController
} = require("./controller");

const { authenticateUser } = require("../../../middlewares/auth");
const uploadMiddleware = require("../../../middlewares/upload");

router.get("/vehicles", getAvailableVehiclesController);
router.get("/customer/profile", authenticateUser, getProfileController)
router.get("/customer/history", authenticateUser, getAllRentalHistoryController)
router.post("/rental/checkConfirmation", authenticateUser, checkPaymentConfirmationController)
router.post("/rental/:id/cancel", authenticateUser, cancelRentalController);
router.post("/rental/:id/review", authenticateUser, createRentalReviewController)
router.get("/vehicle/:id/review", authenticateUser, getReviewByVehicleIdController)

router.post(
  "/customer/edit",
  authenticateUser,
  uploadMiddleware([{ name: "image", maxCount: 1 }]),
  editProfileController
);

router.post("/vehicles/:id/checkout", authenticateUser, checkoutController);

module.exports = router;