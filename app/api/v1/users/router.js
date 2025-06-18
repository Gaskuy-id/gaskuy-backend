const express = require("express");
const router = express.Router();
const { authorizeRoles, authenticateUser } = require("../../../middlewares/auth")
const { createDriverController, getAllUserController, getOneUserController, updateDriverController, deleteUserController, getAllDriverByBranchController } = require("./controller");

router.get("/users/role/:role", authenticateUser, authorizeRoles("admin"), getAllUserController);
router.post("/users", authenticateUser, authorizeRoles("admin"), createDriverController);
router.get("/users/:id", authenticateUser, authorizeRoles("admin"), getOneUserController);
router.get("/users/branch/:branch", authenticateUser, authorizeRoles("admin"), getAllDriverByBranchController);
router.put("/users/:id", authenticateUser, authorizeRoles("admin"), updateDriverController);
router.delete("/users/:id", authenticateUser, authorizeRoles("admin"), deleteUserController);

module.exports = router;