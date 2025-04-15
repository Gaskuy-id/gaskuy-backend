const express = require("express");

const router = express.Router();
const upload = require("../../../middlewares/upload");

const { authorizeRoles, authenticateUser } = require("../../../middlewares/auth")
const { handleCreateVehicle, handleGetVehicle, handleGetVehicleByBranchName } = require("./controller");

router.get("/", handleGetVehicle)
router.put("/", authenticateUser, authorizeRoles("admin"), upload.array('images'), handleCreateVehicle)

module.exports = router;
