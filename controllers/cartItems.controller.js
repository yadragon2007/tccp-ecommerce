import env from "../config/env.js";
import CartItems from "../services/cartItems.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import slug from "slug";

const cartItem_create_post = asyncHandler(async (req, res) => {
  const { CartId: cartId } = req.params;
  const { productId, quantity } = req.body;

  const cartItemData = {
    cartId,
    productId,
    quantity,
  };
  const checkProduct = await CartItems.getcartItem({ productId, cartId });
  if (checkProduct) {
    const newQuantity = quantity + checkProduct.quantity;
    const newCartItem = await CartItems.updatecartItem(checkProduct.id, {
      quantity: newQuantity,
    });
    return res.status(200).send({ data: newCartItem , msg: "quantity was mirged" });
  }
  const newCartItem = await CartItems.createcartItem(cartItemData);
  res.status(200).send({ data: newCartItem });
});

const cartItem_getCartCartItems_get = asyncHandler(async (req, res) => {
  const { CartId: cartId } = req.params;

  const cartItems = await CartItems.getAllcartItems({ cartId });
  res.status(200).send({
    data: {
      cartId,
      cartItems,
    },
  });
});

const cartItem_getCartItems_get = asyncHandler(async (req, res) => {
  const { cartItemId } = req.params;

  const cartItem = await CartItems.getcartItemById(cartItemId);
  res.status(200).send({
    data: cartItem,
  });
});

const cartItem_updateCartItems_patch = asyncHandler(async (req, res) => {
  const { cartItemId } = req.params;
  const { quantity } = req.body;

  const cartItem = await CartItems.updatecartItem(cartItemId, { quantity });
  res.status(200).send({
    data: cartItem,
  });
});

const cartItem_deleteCartItems_delete = asyncHandler(async (req, res) => {
  const { cartItemId } = req.params;

  await CartItems.deletecartItem(cartItemId);
  res.status(200).send({
    msg: "the cart item has been deleted successfully ",
  });
});

export default {
  cartItem_create_post,
  cartItem_getCartCartItems_get,
  cartItem_getCartItems_get,
  cartItem_updateCartItems_patch,
  cartItem_deleteCartItems_delete,
};
