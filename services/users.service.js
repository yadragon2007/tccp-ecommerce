import User from "../models/User.js";

const createUser = async (data) => {
  try {
    const newUser = new User(data);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

const getUser = async (data) => {
  try {
    const user = await User.findOne(data);
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id, select) => {
  try {
    const query = User.findById(id)
    if (select) query.select(select);
    const user = await query;
    return user;
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async (filter = {}) => {
  try {
    const users = await User.find(filter)
    return users;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, data) => {
  try {
    await User.findByIdAndUpdate(id, data);
    const updatedUser = await User.findById(id);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const updateUserPassword = async (id, hashedPassword) => {
  try {
    await User.findByIdAndUpdate(id, {
      password: hashedPassword,
      whenPasswordChanged: Date.now(),
    });
    const updatedUser = await User.findById(id);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    await User.findByIdAndDelete(id);
    return;
  } catch (error) {
    throw error;
  }
};


export default {
  createUser,
  getUser,
  getUserById,
  getAllUsers,
  updateUser,
  updateUserPassword,
  deleteUser,
};