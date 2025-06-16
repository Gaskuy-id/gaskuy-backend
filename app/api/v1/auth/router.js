const express = require("express");

const router = express.Router();
const { signinController, signupController } = require("./controller");
const upload = require("../../../middlewares/upload");
const { authenticateUser } = require("../../../middlewares/auth");

router.post("/customer/auth/signup", signupController);
router.post("/customer/auth/signin", signinController);

module.exports = router;