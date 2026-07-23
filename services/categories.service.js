import Category from "../models/Category.js";

const createCategory = async (data) => {
  try {
    const newCategory = new Category(data);
    await newCategory.save();
    return newCategory;
  } catch (error) {
    throw error;
  }
};

const getCategory = async (data) => {
  try {
    const category = await Category.findOne(data);
    return category;
  } catch (error) {
    throw error;
  }
};

const getCategoryById = async (id, select) => {
  try {
    const query = Category.findById(id)
    if (select) query.select(select);
    const category = await query;
    return category;
  } catch (error) {
    throw error;
  }
};

const getAllCategorys = async (filter = {}) => {
  try {
    const categorys = await Category.find(filter)
    return categorys;
  } catch (error) {
    throw error;
  }
};

const updateCategory = async (id, data) => {
  try {
    await Category.findByIdAndUpdate(id, data);
    const updatedCategory = await Category.findById(id);
    return updatedCategory;
  } catch (error) {
    throw error;
  }
};


const deleteCategory = async (id) => {
  try {
    await Category.findByIdAndDelete(id);
    return;
  } catch (error) {
    throw error;
  }
};


export default {
  createCategory,
  getCategory,
  getCategoryById,
  getAllCategorys,
  updateCategory,
  deleteCategory,
};