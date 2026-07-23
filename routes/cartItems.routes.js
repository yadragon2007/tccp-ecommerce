import { Router } from "express";
const router = Router();

import authorize from "../middlewares/authorize.js";
import localValidationFunction from "../validator/localValidationFunction.js";
import authenticate from "../middlewares/authenticate.js";
import cartItemsController from "../controllers/cartItems.controller.js";
import cartItemsValidator from "../validator/cartItems.validator.js";

// @route   POST api/cartItem/
// @desc    create new cartItem for a cart
// @access  Cart authorization

router.post(
  "/:CartId",
  authorize.CartAuthorization,
  cartItemsValidator.createCartItem,
  cartItemsController.cartItem_create_post,
);

// @route   POST api/cartItem/
// @desc    get cart items form a cart
// @access  Cart authorization

router.get(
  "/:CartId",
  authorize.CartAuthorization,
  cartItemsValidator.getCartCartItems,
  cartItemsController.cartItem_getCartCartItems_get,
);

// @route   POST api/cartitems/{cartItemId}
// @desc    get cart items form a cart
// @access  CartItem authorization

router.get(
  "/item/:cartItemId",
  authorize.CartItemAuthorization,
  cartItemsValidator.getCartCartItems,
  cartItemsController.cartItem_getCartItems_get,
);

// @route   POST api/cartItem/
// @desc    get cart items form a cart
// @access  Cart authorization

router.patch(
  "/:cartItemId",
  authorize.CartItemAuthorization,
  cartItemsValidator.updateCartItem,
  cartItemsController.cartItem_updateCartItems_patch,
);

export default router;
