import { Router } from "express";
const router = Router();

import UserValidator from "../validator/users.validator.js";
import authorize from "../middlewares/authorize.js";
import localValidationFunction from "../validator/localValidationFunction.js";
import authenticate from "../middlewares/authenticate.js";
import rateLimiter from "../middlewares/rateLimiter.js";
import usersController from "../controllers/users.controller.js";

// @route   GET api/users/
// @desc    get user data
// @access  User Authorized
router.get(
  "/",
  authorize.UserAuthorization,
  usersController.user_getUserData_get,
);

// @route   Patch api/users/
// @desc    update user data
// @access  User Authorized
router.patch(
  "/",
  authorize.UserAuthorization,
  localValidationFunction.validateBodyProperties(["fullName","email"]),
  UserValidator.updateUser,
  localValidationFunction.errorHandler,
  usersController.user_userUpdate_patch,
);

// @route   GET api/users/all
// @desc    get all users data
// @access  Admin Authorized
router.get(
  "/all",
  authorize.AdminAuthorization,
  usersController.user_getAllUsers_get,
);

// @route   GET api/users/:id
// @desc    Get User data
// @access  Admin Authorized
router.get(
  "/:id",
  authorize.AdminAuthorization,
  usersController.user_getUser_get,
);

export default router;
