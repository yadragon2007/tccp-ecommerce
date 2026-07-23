import CartItem from "../models/cartItem.js";

const createcartItem = async (data) => {
  try {
    const newcartItem = new CartItem(data);
    await newcartItem.save();
    return newcartItem;
  } catch (error) {
    throw error;
  }
};

const getcartItem = async (data) => {
  try {
    const cartItem = await CartItem.findOne(data);
    return cartItem;
  } catch (error) {
    throw error;
  }
};

const getcartItemById = async (id, select) => {
  try {
    const query = CartItem.findById(id)
    if (select) query.select(select);
    const cartItem = await query;
    return cartItem;
  } catch (error) {
    throw error;
  }
};

const getAllcartItems = async (filter = {}) => {
  try {
    const cartItems = await CartItem.find(filter)
    return cartItems;
  } catch (error) {
    throw error;
  }
};

const updatecartItem = async (id, data) => {
  try {
    await CartItem.findByIdAndUpdate(id, data);
    const updatedcartItem = await CartItem.findById(id);
    return updatedcartItem;
  } catch (error) {
    throw error;
  }
};

const deletecartItem = async (id) => {
  try {
    await CartItem.findByIdAndDelete(id);
    return;
  } catch (error) {
    throw error;
  }
};


export default {
  createcartItem,
  getcartItem,
  getcartItemById,
  getAllcartItems,
  updatecartItem,
  deletecartItem,
};