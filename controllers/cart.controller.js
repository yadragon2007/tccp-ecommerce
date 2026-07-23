import env from "../config/env.js";
import Cart from "../services/cart.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import slug from "slug";

const cart_create_post = asyncHandler(async (req, res) => {
  const { userId } = req.auth;
  let signIn = false;
  if (userId) {
    signIn = true;
  }
  const cartData = {
    userId,
    signIn,
  };

  const newCart = await Cart.createCart(cartData);

  res.cookie("CartId", newCart.id, {
    maxAge: 3600000 * 24 * 30, // 30 day in ms
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: "lax",
  });

  res.status(200).send({ data: "Cart has been created successfully" });
});

const cart_deleteCart_delete = asyncHandler(async (req, res) => {
  const { CartId } = req.cookies;
  Cart.deleteCart(CartId);
  res.clearCookie("CartId");
  res.status(200).send({ data: "Cart has been deleted successfully" });
});

export default {
  cart_create_post,
  cart_deleteCart_delete,
};
