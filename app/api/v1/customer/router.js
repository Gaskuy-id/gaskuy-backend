const express = require("express");

const router = express.Router();
const { getProfileController, checkoutController, checkPaymentConfirmationController, getAvailableVehiclesController, getAllRentalHistoryController } = require("./controller");
const upload = require("../../../middlewares/upload");
const { authenticateUser } = require("../../../middlewares/auth");

router.get("/vehicles", getAvailableVehiclesController);
router.get("/customer/profile", authenticateUser, getProfileController)
router.get("/customer/history", authenticateUser, getAllRentalHistoryController)
router.post("/customer/checkConfirmation", authenticateUser, checkPaymentConfirmationController)
//router.post("/customer/edit", authenticateUser, upload.single('image'), editProfileController)

router.post("/vehicles/:id/checkout", authenticateUser, checkoutController)

module.exports = router;
