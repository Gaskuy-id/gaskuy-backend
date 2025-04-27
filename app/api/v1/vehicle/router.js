const express = require("express");

const router = express.Router();
const upload = require("../../../middlewares/upload");

const { authorizeRoles, authenticateUser } = require("../../../middlewares/auth")
const { createVehicleController, getAllVehicleController, getOneVehicleController, updateVehicleController, deleteVehicleController } = require("./controller");

router.get("/vehicle/branch/:branch", getAllVehicleController);
router.post(
    "/vehicle",
    authenticateUser,
    authorizeRoles("admin"),
    upload.fields([
        { name: 'mainImage', maxCount: 1 },
        { name: 'detailImages', maxCount: 10 } // maksimal 10 gambar detail
    ]),
    createVehicleController
);
router.get("/vehicle/:id", getOneVehicleController);
router.put("/vehicle/:id", authenticateUser, authorizeRoles("admin"), updateVehicleController);
router.delete("/vehicle/:id", authenticateUser, authorizeRoles("admin"), deleteVehicleController)

module.exports = router;
