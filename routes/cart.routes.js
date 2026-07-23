import { Router } from "express";
const router = Router();

import cartValidator from "../validator/cart.validator.js";
import authorize from "../middlewares/authorize.js";
import localValidationFunction from "../validator/localValidationFunction.js";
import authenticate from "../middlewares/authenticate.js";
import cartController from "../controllers/cart.controller.js";

// @route   POST api/cart/
// @desc    create new products
// @access  Public

router.post(
  "/",
  authorize.PublicUserAuthorization,
  cartController.cart_create_post,
);

router.delete(
  "/",
  authorize.PublicUserAuthorization,
  cartController.cart_deleteCart_delete,
);

export default router;
