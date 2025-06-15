const express = require("express");
const router = express.Router();
const upload = require("../../../middlewares/upload");
const { authorizeRoles, authenticateUser } = require("../../../middlewares/auth");
const { 
    createVehicleController, 
    getAllVehicleController, 
    getAllVehicleByCityController, 
    getOneVehicleController, 
    updateVehicleController, 
    deleteVehicleController 
} = require("./controller");

router.get("/vehicle/branch/:branch", getAllVehicleController);
router.get("/vehicle/city/:city", getAllVehicleByCityController);
router.post(
    "/vehicle",
    authenticateUser,
    authorizeRoles("admin"),
    upload([
        { name: 'mainImage', maxCount: 1 },
        { name: 'detailImages', maxCount: 10 }
    ]),
    createVehicleController
);
router.put(
    "/vehicle/:id",
    authenticateUser,
    authorizeRoles("admin"),
    upload([
        { name: 'mainImage', maxCount: 1 },
        { name: 'detailImages', maxCount: 10 }
    ]),
    updateVehicleController
);
router.get("/vehicle/:id", getOneVehicleController);
router.delete("/vehicle/:id", authenticateUser, authorizeRoles("admin"), deleteVehicleController);

module.exports = router;