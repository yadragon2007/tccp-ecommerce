import env from "../config/env.js";
import Cart from "../services/cart.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import slug from "slug";
import jwt from "jsonwebtoken";
const cart_create_post = asyncHandler(async (req, res) => {
  const { userId } = req.auth;
  let signIn = false;
  let cartData = {
    signIn,
  };

  if (userId) cartData[userId] = userId;

  const newCart = await Cart.createCart(cartData);

  const Token = jwt.sign({ id: newCart._id }, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn,
  });
  res.cookie("CART", `Bearer ${Token}`, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // Expires in 24 hours (in milliseconds)
    httpOnly: true, // Prevents client-side JS access (mitigates XSS)
    secure: env.nodeEnv === "production", // Sent only over HTTPS in production
    sameSite: "lax", // Protects against CSRF attacks
  });

  res.status(200).send({ data: newCart });
});

const cart_deleteCart_delete = asyncHandler(async (req, res) => {
  const { CartId } = req.auth;
  Cart.deleteCart(CartId);
  res.clearCookie("CartId");
  res.status(200).send({ data: "Cart has been deleted successfully" });
});

export default {
  cart_create_post,
  cart_deleteCart_delete,
};
