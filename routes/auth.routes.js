import { Router } from "express";
const router = Router();

import authController from "../controllers/auth.controller.js";
import authValidator from "../validator/auth.validator.js";
// import authorization from "../middlewares/authorization.js";
import localValidationFunction from "../validator/localValidationFunction.js";
import authenticate from "../middlewares/authenticate.js";
import rateLimiter from "../middlewares/rateLimiter.js";

// @route   PSOT api/auth/signup
// @desc    signUp
// @access  Public
router.post(
  "/signup",
  rateLimiter.accountCreateLimiter,
  authValidator.validateSignup,
  localValidationFunction.errorHandler,
  authController.signUp_auth
);

// @route   PSOT api/auth/signin
// @desc    signIn
// @access  Public
router.post(
  "/signin",
  rateLimiter.authLimiter,
  authValidator.validateLogin,
  localValidationFunction.errorHandler,
  authenticate.Authentication,
  authController.signIn_auth
);

// @route   PSOT api/auth/signout
// @desc    signOut
// @access  Public
router.post(
  "/signout",
  authController.signOut_auth
);

export default router;
