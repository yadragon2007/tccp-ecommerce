import Product from "../models/Product.js";

const createProduct = async (data) => {
  try {
    const newProduct = new Product(data);
    await newProduct.save();
    return newProduct;
  } catch (error) {
    throw error;
  }
};

const getProduct = async (data) => {
  try {
    const product = await Product.findOne(data);
    return product;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id, select) => {
  try {
    const query = Product.findById(id)
    if (select) query.select(select);
    const product = await query;
    return product;
  } catch (error) {
    throw error;
  }
};

const getAllProducts = async (filter = {}) => {
  try {
    const products = await Product.find(filter)
    return products;
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (id, data) => {
  try {
    await Product.findByIdAndUpdate(id, data);
    const updatedProduct = await Product.findById(id);
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    await Product.findByIdAndDelete(id);
    return;
  } catch (error) {
    throw error;
  }
};


export default {
  getProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
};