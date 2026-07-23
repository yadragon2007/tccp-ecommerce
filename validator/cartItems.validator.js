import { body, validationResult, header, param } from "express-validator";
import CartItem from "../services/cartItems.service.js";
import Cart from "../services/cart.service.js";
import Products from "../services/products.service.js";

const createCartItem = [
  // name
  param("CartId")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("cartId required")
    .custom(async (id, { req }) => {
      const cart = await Cart.getCartById(id);
      if (!cart) {
        return Promise.reject(new Error("this cart is not existed "));
      }
    }),
  body("productId")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("productsId required")
    .custom(async (id) => {
      const product = await Products.getProductById(id);
      if (!product) {
        return Promise.reject(new Error("this product is not existed "));
      }
    }),
  body("quantity")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("productsId required")
    .isNumeric({ gt: 0 })
    .withMessage("product quantaty must be > 0"),
];

const getCartCartItems = [
  param("CartId")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("id is required")
    .custom(async (id, { req }) => {
      const cart = await CartItem.getAllcartItems({ cartId: id });
      if (!cart) {
        return Promise.reject(new Error("there is no cart with this id "));
      }
    }),
];

const getCartItem = [
  param("cartitemId")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("cartitemId is required")
    .custom(async (id, { req }) => {
      const cartItem = await CartItem.getcartItemById(id);
      if (!cartItem) {
        return Promise.reject(new Error("there is no cart item with this id "));
      }
    }),
];

const updateCartItem = [
  param("cartitemId")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("cartitemId is required")
    .custom(async (id, { req }) => {
      const cartItem = await CartItem.getcartItemById(id);
      if (!cartItem) {
        return Promise.reject(new Error("there is no cart item with this id "));
      }
    }),
  body("quantity")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("productsId required")
    .isNumeric({ gt: 0 })
    .withMessage("product quantaty must be > 0"),
];

const deleteCartItem = [
  param("id")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("id is required")
    .custom(async (id) => {
      const cartItem = await CartItem.getcartItemById(id);
      if (!cartItem) {
        return Promise.reject(new Error("there is no cartItem with this id "));
      }
    }),
];

export default {
  createCartItem,
  getCartCartItems,
  getCartItem,
  updateCartItem,
  deleteCartItem,
};
