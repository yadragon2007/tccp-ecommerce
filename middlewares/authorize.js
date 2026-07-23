import User from "../models/User.js";
import jwt from "jsonwebtoken";
import env from "../config/env.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

const APIusers = { User };

const AdminAuthorization = asyncHandler(async (req, res, next) => {
  const authorization = req.cookies.TOKEN;

  if (!authorization || !authorization.startsWith("Bearer"))
    throw new AppError("Missing authorization header", 403, 200);

  const token = authorization.split(" ")[1];
  const decoded = jwt.verify(token, env.jwt.secret);
  const title = decoded.role;
  const user = await User.findById(decoded.id).populate("role");
  if (!user) throw new AppError("user is not exists", 403, 202);

  if (user.whenPasswordChanged) {
    const currentTimeStamp = parseInt(
      user.whenPasswordChanged.getTime() / 1000,
    );
    if (currentTimeStamp > decoded.iat)
      throw new AppError(
        "password had been changed after the Token created.login again",
        403,
        203,
      );
  }

  const role = user.role;
  if (role.fullAccess) {
    req.auth = { adminId: user._id.toString(), title };
    return next();
  }

  const permissions = Array.isArray(role.permissions) ? role.permissions : [];
  const hasPermission = permissions.includes(req.baseUrl);
  if (!hasPermission)
    throw new AppError(
      "user does not have the permission to use this url",
      403,
      204,
    );

  req.auth = { adminId: user._id.toString(), title };
  next();
});

const UserAuthorization = asyncHandler(async (req, res, next) => {
  const authorization = req.cookies.TOKEN;

  if (!authorization || !authorization.startsWith("Bearer"))
    throw new AppError("User loggedout", 401, 210);

  const token = authorization.split(" ")[1];
  const decoded = jwt.verify(token, env.jwt.secret);

  const user = await User.findById(decoded.id);
  if (!user) throw new AppError("user is not exists", 401, 211);

  if (user.whenPasswordChanged) {
    const currentTimeStamp = parseInt(
      user.whenPasswordChanged.getTime() / 1000,
    );
    if (currentTimeStamp > decoded.iat)
      throw new AppError(
        "password had been changed after the Token created.login again",
        403,
        212,
      );
  }

  req.auth = { userId: user.id };
  next();
});

const PublicUserAuthorization = asyncHandler(async (req, res, next) => {
  const authorization = req.cookies.TOKEN;

  if (!authorization || !authorization.startsWith("Bearer")) {
    res.clearCookie("TOKEN");
    req.auth = { userId: "" };
    return next();
  }

  const token = authorization.split(" ")[1];
  const decoded = jwt.verify(token, env.jwt.secret);

  const user = await User.findById(decoded.id);
  if (!user) {
    res.clearCookie("TOKEN");
    req.auth = { userId: "" };
    return next();
  }

  if (user.whenPasswordChanged) {
    const currentTimeStamp = parseInt(
      user.whenPasswordChanged.getTime() / 1000,
    );
    if (currentTimeStamp > decoded.iat) {
      res.clearCookie("TOKEN");
      req.auth = { userId: "" };
      return next();
    }
  }

  req.auth = { userId: user.id };
  next();
});

export default {
  AdminAuthorization,
  UserAuthorization,
  PublicUserAuthorization,
};
