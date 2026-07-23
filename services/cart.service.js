import Cart from "../models/Cart.js";

const createCart = async (data) => {
  try {
    const newCart = new Cart(data);
    await newCart.save();
    return newCart;
  } catch (error) {
    throw error;
  }
};

const getCart = async (data) => {
  try {
    const cart = await Cart.findOne(data);
    return cart;
  } catch (error) {
    throw error;
  }
};

const getCartById = async (id, select) => {
  try {
    const query = Cart.findById(id)
    if (select) query.select(select);
    const cart = await query;
    return cart;
  } catch (error) {
    throw error;
  }
};

const getAllCarts = async (filter = {}) => {
  try {
    const carts = await Cart.find(filter)
    return carts;
  } catch (error) {
    throw error;
  }
};

const updateCart = async (id, data) => {
  try {
    await Cart.findByIdAndUpdate(id, data);
    const updatedCart = await Cart.findById(id)
    return updatedCart;
  } catch (error) {
    throw error;
  }
};

const deleteCart = async (id) => {
  try {
    await Cart.findByIdAndDelete(id)
    return;
  } catch (error) {
    throw error;
  }
};


export default {
  createCart,
  getCart,
  getCartById,
  getAllCarts,
  updateCart,
  deleteCart,
};