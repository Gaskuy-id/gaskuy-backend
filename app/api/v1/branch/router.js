const express = require("express");

const router = express.Router();
const branchController = require("./controller");
const { authenticateUser, authorizeRoles } = require("../../../middlewares/auth")

router.put("/", authenticateUser, authorizeRoles("admin"), branchController.addBranch);
router.get("/", branchController.getBranch);

module.exports = router;
