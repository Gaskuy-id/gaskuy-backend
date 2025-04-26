const express = require("express");

const router = express.Router();
const { signinController, signupController, getProfileController, editProfileController, checkoutController } = require("./controller");
const upload = require("../../../middlewares/upload");
const { authenticateUser } = require("../../../middlewares/auth");

router.post("/customer/auth/signup", signupController);
router.post("/customer/auth/signin", signinController);
router.get("/customer/profile", authenticateUser, getProfileController)
router.post("/customer/edit", authenticateUser, upload.single('image'), editProfileController)

router.post("/vehicles/:id/checkout", authenticateUser, checkoutController)

module.exports = router;
