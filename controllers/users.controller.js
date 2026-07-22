import user from "../services/users.service.js";
import asyncHandler from "../utils/asyncHandler.js";

const sanitizeAccount = (account) => ({
  _id: account._id,
  fullName: account.fullName,
  email: account.email,
  role: account.role,
  activation: account.activation,
});

const user_getUserData_get = asyncHandler(async (req, res) => {
  const userId = req.auth.userId;
  const userData = await user.getUserById(userId);
  res.status(200).send({ data: sanitizeAccount(userData) });
});

const user_userUpdate_patch = asyncHandler(async (req, res) => {
  const userId = req.auth.userId;
  const { fullName, email } = req.body;
  const updatedData = { fullName, email };

  const userData = await user.updateUser(userId, {
    ...updatedData,
  });
  res.status(200).send({ data: sanitizeAccount(userData) });
});

const user_getAllUsers_get = asyncHandler(async (req, res) => {
  const users = await user.getAllUsers();
  res.status(200).send({ data: users });
});

const user_getUser_get = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userData = await user.getUserById(id);
  res.status(200).send({ data: userData });
});



export default {
  user_getUserData_get,
  user_userUpdate_patch,
  user_getAllUsers_get,
  user_getUser_get,
};
