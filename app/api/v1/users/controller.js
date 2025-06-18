const {
    createDriverService,
    getAllUserService,
    getOneUserService,
    updateDriverService,
    deleteUserService,
    getAllDriverByBranchService
} = require('../../../services/mongoose/users');

const { StatusCodes } = require('http-status-codes');


const getAllDriverByBranchController = async (req, res, next) => {
    try {
        const result = await getAllDriverByBranchService(req);
        
        res.status(StatusCodes.OK).json({
            data: result,
        })
    } catch (error) {
        next (error);
    }
}

// get all user by role
// /api/v1/cms/users/:role GET
const getAllUserController = async (req, res, next) => {
    try {
        const result = await getAllUserService(req);
        
        res.status(StatusCodes.OK).json({
            data: result,
        })
    } catch (error) {
        next (error);
    }
}

// create users (driver)
// /api/v1/cms/users POST
const createDriverController = async (req, res, next) => {
    try {
        const result = await createDriverService(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        })
    } catch (error) {
        next (error);
    }
}

// get one user by id
// /api/v1/cms/users/:id GET
const getOneUserController = async (req, res, next) => {
    try {
        const result = await getOneUserService(req);
        
        res.status(StatusCodes.OK).json({
            data: result,
        })
    } catch (error) {
        next (error);
    }
}

// update user (driver)
// /api/v1/cms/users/:id PUT
const updateDriverController = async (req, res, next) => {
    try {
        const result = await updateDriverService(req);
        
        res.status(StatusCodes.OK).json({
            data: result,
        })
    } catch (error) {
        next (error);
    }
}

// delete user (driver dan customer)
// /api/v1/cms/users/:id DELETE
const deleteUserController = async (req, res, next) => {
    try {
        const result = await deleteUserService(req);
        
        res.status(StatusCodes.OK).json({
            message: "User berhasil dihapus",
            deletedAt: result.deletedAt,
            data: result,
        })
    } catch (error) {
        next (error);
    }
}

module.exports = {
    createDriverController,
    getAllUserController,
    getOneUserController,
    updateDriverController,
    deleteUserController,
    getAllDriverByBranchController
}