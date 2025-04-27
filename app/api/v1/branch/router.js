const express = require("express");

const router = express.Router();
const { createBranchController, getBranchController } = require("./controller");
const { authenticateUser, authorizeRoles } = require("../../../middlewares/auth")

router.post("/branch", authenticateUser, authorizeRoles("admin"), createBranchController);
router.get("/branch", getBranchController);

module.exports = router;
