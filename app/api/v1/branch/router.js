const express = require("express");

const router = express.Router();
const { createBranchController, getAllBranchController } = require("./controller");
const { authenticateUser, authorizeRoles } = require("../../../middlewares/auth")

router.post("/branch", authenticateUser, authorizeRoles("admin"), createBranchController);
router.get("/branch", getAllBranchController);

module.exports = router;
