import cartItem from "../models/cartItem.js";

const createcartItem = async (data) => {
  try {
    const newcartItem = new cartItem(data);
    await newcartItem.save();
    return newcartItem;
  } catch (error) {
    throw error;
  }
};

const getcartItem = async (data) => {
  try {
    const cartItem = await cartItem.findOne(data);
    return cartItem;
  } catch (error) {
    throw error;
  }
};

const getcartItemById = async (id, select) => {
  try {
    const query = cartItem.findById(id)
    if (select) query.select(select);
    const cartItem = await query;
    return cartItem;
  } catch (error) {
    throw error;
  }
};

const getAllcartItems = async (filter = {}) => {
  try {
    const cartItems = await cartItem.find(filter)
    return cartItems;
  } catch (error) {
    throw error;
  }
};

const updatecartItem = async (id, data) => {
  try {
    await cartItem.findByIdAndUpdate(id, data);
    const updatedcartItem = await cartItem.findById(id);
    return updatedcartItem;
  } catch (error) {
    throw error;
  }
};

const deletecartItem = async (id) => {
  try {
    await cartItem.findByIdAndDelete(id);
    return;
  } catch (error) {
    throw error;
  }
};


export default {
  getcartItem,
  getcartItemById,
  getAllcartItems,
  updatecartItem,
  deletecartItem,
};