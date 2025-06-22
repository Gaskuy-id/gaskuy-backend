const express = require("express");

const router = express.Router();
const { signinController, signupController } = require("./controller");

router.post("/auth/signup", signupController);
router.post("/auth/signin", signinController);

module.exports = router;