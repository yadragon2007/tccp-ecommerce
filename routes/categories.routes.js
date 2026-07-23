import { Router } from "express";
const router = Router();

import categoriesValidator from "../validator/categories.validator.js";
import authorize from "../middlewares/authorize.js";
import localValidationFunction from "../validator/localValidationFunction.js";
import authenticate from "../middlewares/authenticate.js";
import rateLimiter from "../middlewares/rateLimiter.js";
import categoriesController from "../controllers/categories.controller.js";

// @route   POST api/categories/
// @desc    create new category
// @access  admin Authorized
router.post(
  "/",
  authorize.AdminAuthorization,
  categoriesValidator.createCategory,
  localValidationFunction.errorHandler,
  categoriesController.category_create_post,
);

// @route   GET api/categories/
// @desc    get all categories
// @access  Public
router.get("/", categoriesController.category_getAllCategory_get);

// @route   GET api/categories/:id
// @desc    get a category
// @access  Public
router.get(
  "/:id",
  categoriesValidator.getCategory,
  localValidationFunction.errorHandler,
  categoriesController.category_getCategory_get,
);

// @route   Patch api/categories/:id
// @desc    update category
// @access  Admin Authorized
router.patch(
  "/:id",
  authorize.AdminAuthorization,
  categoriesValidator.updateCategory,
  localValidationFunction.errorHandler,
  categoriesController.category_updateCategory_patch,
);

// @route   DELETE api/categories/:id
// @desc    delete a category
// @access  Admin Authorized
router.delete(
  "/:id",
  authorize.AdminAuthorization,
  categoriesValidator.deleteCategory,
  localValidationFunction.errorHandler,
  categoriesController.category_deleteCategory_delete,
);

export default router;
