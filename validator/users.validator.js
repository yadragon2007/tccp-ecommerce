import { body, validationResult } from "express-validator";
import userService from "../services/users.service.js";
const updateUser = [
  // full name
  body("fullName")
    .optional()
    .notEmpty({ ignore_whitespace: true })
    .withMessage("name required"),
  // email
  body("email")
    .optional()
    .notEmpty({ ignore_whitespace: true })
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("email is invalid")
    .normalizeEmail()
    .custom(async (email) => {
      const user = await userService.getUser({ email });
      if (user) {
        return Promise.reject(new Error("email is in use"));
      }
    })
    .withMessage("email is in use"),
];
export default {
  updateUser,
};
