import { body, validationResult } from "express-validator";

import User from "../models/User.js";

const validateSignup = [
  // name validation
  body("fullName")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("Name cannot be empty"),
  // email validation
  body("email")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("email is invalid")
    .normalizeEmail()
    .withMessage("email is invalid")
    .custom(async (email) => {
      const user = await User.findOne({ email: email });
      if (user) {
        return Promise.reject(new Error("email is in use"));
      }
    })
    .withMessage("email is in use"),
  // password validation
  body("password")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("password cannot be empty")
    .isStrongPassword()
    .withMessage("weak password"),
];

const validateLogin = [
  body("email")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("email is invalid")
    .normalizeEmail()
    .withMessage("email is invalid")
    .custom(async (email) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        return Promise.reject(new Error("email is in use"));
      }
    })
    .withMessage("email is wrong"),
  // password validation
  body("password")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("password cannot be empty"),
];

export default {
  validateSignup,
  validateLogin,
};
