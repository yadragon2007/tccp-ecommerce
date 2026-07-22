import bcrypt from "bcrypt";
import User from "../models/User.js";
import env from "../config/env.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

const Authentication = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;
  const account = await User.findOne({ email }).select("+password");
  if (!account) throw new AppError("Invalid credentials", 401, 102);
  const check = await bcrypt.compare(password, account.password);
  if (!check) throw new AppError("Invalid credentials", 401, 102);
  next();
});

export default {
  Authentication,
};  
