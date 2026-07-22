import Role from "../models/Role.js";

const createRole = async (data) => {
  try {
    const newRole = new Role(data);
    await newRole.save();
    return newRole;
  } catch (error) {
    throw error;
  }
};

const getRole = async (data) => {
  try {
    const role = await Role.findOne(data);
    return role;
  } catch (error) {
    throw error;
  }
};

const getRoleById = async (id, select) => {
  try {
    const query = Role.findById(id)
    if (select) query.select(select);
    const role = await query;
    return role;
  } catch (error) {
    throw error;
  }
};

const getAllRoles = async (filter = {}) => {
  try {
    const roles = await Role.find(filter)
    return roles;
  } catch (error) {
    throw error;
  }
};

const updateRole = async (id, data) => {
  try {
    await Role.findByIdAndUpdate(id, data);
    const updatedRole = await Role.findById(id);
    return updatedRole;
  } catch (error) {
    throw error;
  }
};

const deleteRole = async (id) => {
  try {
    await Role.findByIdAndDelete(id);
    return;
  } catch (error) {
    throw error;
  }
};


export default {
  createRole,
  getRole,
  getRoleById,
  getAllRoles,
  updateRole,
  deleteRole,
};