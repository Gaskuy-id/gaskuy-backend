const express = require("express");

const router = express.Router();
const { signinController, signupController, getProfileController, editProfileController } = require("./controller");
const upload = require("../../../middlewares/upload");
const { authenticateUser } = require("../../../middlewares/auth");

router.post("/customer/auth/signup", signupController);
router.post("/customer/auth/signin", signinController);
router.get("/customer/profile", authenticateUser, getProfileController)
router.post("/customer/edit", authenticateUser, upload.single('image'), editProfileController)

module.exports = router;
