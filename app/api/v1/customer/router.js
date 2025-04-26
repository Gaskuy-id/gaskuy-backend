const express = require("express");

const router = express.Router();
const { register, login, getProfile, editProfile } = require("./controller");
const upload = require("../../../middlewares/upload");
const { authenticateUser } = require("../../../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticateUser, getProfile)
router.post("/edit", authenticateUser, upload.single('image'), editProfile)

module.exports = router;
