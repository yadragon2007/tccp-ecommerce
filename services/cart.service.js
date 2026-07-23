import Cart from "../models/Cart.js";
import CartItems from "../services/cartItems.service.js";

const createCart = async (data) => {
  try {
    const newCart = new Cart(data);
    await newCart.save();
    return newCart;
  } catch (error) {
    throw error;
  }
};

const syncCartWithUser = async (cartId, userId) => {
  try {
    if (cartId) {
      let cartItems = await CartItems.getAllcartItems({ cartId });
      const userCart = await Cart.findOne({ userId });
      if (userCart) {
        for (let i = 0; i < cartItems.length; i++) {
          const checkSameProduct = await CartItems.getcartItem({
            productId: cartItems[i].productId,
            cartId: userCart.id,
          });

          if (checkSameProduct) {
            const newQuantity = cartItems[i].quantity + checkSameProduct.quantity;
            await CartItems.updatecartItem(cartItems[i].id, {
              cartId: userCart.id,
              quantity: newQuantity,
            });
          } else {
            await CartItems.updatecartItem(cartItems[i].id, {
              cartId: userCart.id,
            });
          }
        }

        await Cart.findByIdAndDelete(cartId);
        return userCart;
      } else {
        await Cart.findByIdAndUpdate(cartId, {
          userId: userId,
          signIn: true,
        });
        const newCart = await Cart.findById(cartId);
        return newCart;
      }
    } else {
      const userCart = await Cart.findOne({ userId });
      if (userCart) return userCart;
      else {
        const newCart = await createCart({ userId, signIn: true });
        return newCart;
      }
    }
    return;
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
    const query = Cart.findById(id);
    if (select) query.select(select);
    const cart = await query;
    return cart;
  } catch (error) {
    throw error;
  }
};

const getAllCarts = async (filter = {}) => {
  try {
    const carts = await Cart.find(filter);
    return carts;
  } catch (error) {
    throw error;
  }
};

const updateCart = async (id, data) => {
  try {
    await Cart.findByIdAndUpdate(id, data);
    const updatedCart = await Cart.findById(id);
    return updatedCart;
  } catch (error) {
    throw error;
  }
};

const deleteCart = async (id) => {
  try {
    await Cart.findByIdAndDelete(id);
    return;
  } catch (error) {
    throw error;
  }
};

export default {
  createCart,
  syncCartWithUser,
  getCart,
  getCartById,
  getAllCarts,
  updateCart,
  deleteCart,
};
