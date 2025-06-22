const express = require("express");
const router = express.Router();
const { 
  signinController, 
  signupController,
  changePasswordController 
} = require("./controller");

router.post("/auth/signup", signupController);
router.post("/auth/signin", signinController);
router.post("/auth/change-password", changePasswordController);

module.exports = router;