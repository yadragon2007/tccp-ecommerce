import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../config/env.js";
import RoleServes from "../services/role.service.js";
import userService from "../services/users.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import cookies from "cookie-parser";
import cartService from "../services/cart.service.js";

const sanitizeAccount = (account) => ({
  _id: account._id,
  fullName: account.fullName,
  email: account.email,
  role: account.role,
  activation: account.activation,
});

const signIn_auth = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  const account = await userService.getUser({ email });
  const Token = jwt.sign(
    { id: account._id, email: account.email, role: account.role },
    env.jwt.secret,
    { expiresIn: env.jwt.expiresIn },
  );
  res.cookie("TOKEN", `Bearer ${Token}`, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // Expires in 24 hours (in milliseconds)
    httpOnly: true, // Prevents client-side JS access (mitigates XSS)
    secure: env.nodeEnv === "production", // Sent only over HTTPS in production
    sameSite: "lax", // Protects against CSRF attacks
  });

  res.status(201).send({ data: sanitizeAccount(account) });
});

const signUp_auth = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  const data = { fullName, email };
  //  hashing
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);
  data.password = hashedPassword;
  // get user role Id
  const { id } = await RoleServes.getRole({ roleName: "user" });
  data.role = id;
  // create a new user
  const newUser = await userService.createUser(data);
  // create JWT token
  const Token = jwt.sign(
    { id: newUser._id, email: data.email, role: newUser.role },
    env.jwt.secret,
    { expiresIn: env.jwt.expiresIn },
  );
  // save jwt token in cookies
  res.cookie("TOKEN", `Bearer ${Token}`, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // Expires in 24 hours (in milliseconds)
    httpOnly: true, // Prevents client-side JS access (mitigates XSS)
    secure: env.nodeEnv === "production", // Sent only over HTTPS in production
    sameSite: "lax", // Protects against CSRF attacks
  });

  res.status(201).send({ data: sanitizeAccount(newUser) });
});

const signOut_auth = asyncHandler(async (req, res) => {
  res.clearCookie("TOKEN");
  res.status(200).send({ msg: "signed Out successfully" });
});

export default {
  signIn_auth,
  signUp_auth,
  signOut_auth,
};
