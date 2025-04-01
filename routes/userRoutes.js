const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middlewares/upload")
const authMiddleware = require("../middlewares/authMiddleware")

// Define routes
router.post("/register", upload.single('image'), userController.register);
router.post("/login", userController.login);
router.get("/profile", authMiddleware, userController.getProfile)
router.put("/edit", authMiddleware, userController.editProfile)

module.exports = router;
