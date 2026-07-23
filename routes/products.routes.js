import { Router } from "express";
const router = Router();

import productsValidator from "../validator/products.validator.js";
import authorize from "../middlewares/authorize.js";
import localValidationFunction from "../validator/localValidationFunction.js";
import authenticate from "../middlewares/authenticate.js";
import productsController from "../controllers/products.controller.js";

// @route   POST api/products/
// @desc    create new products
// @access  admin Authorized

router.post(
  "/",
  authorize.AdminAuthorization,
  productsValidator.createProduct,
  localValidationFunction.errorHandler,
  productsController.product_create_post,
);

// @route   GET api/products/
// @desc    get all categories
// @access  Public

router.get("/", productsController.product_getAllProducts_get);

// @route   GET api/products/:id
// @desc    get a category
// @access  Public

router.get(
  "/:id",
  productsValidator.getProduct,
  localValidationFunction.errorHandler,
  productsController.product_getProduct_get,
);

// @route   Patch api/products/:id
// @desc    update category
// @access  Admin Authorized

router.patch(
  "/:id",
  authorize.AdminAuthorization,
  productsValidator.updateProduct,
  localValidationFunction.errorHandler,
  productsController.product_updateProduct_patch,
);

// @route   DELETE api/products/:id
// @desc    delete a category
// @access  Admin Authorized

router.delete(
  "/:id",
  authorize.AdminAuthorization,
  productsValidator.deleteProduct,
  localValidationFunction.errorHandler,
  productsController.product_deleteProduct_delete,
);

export default router;
