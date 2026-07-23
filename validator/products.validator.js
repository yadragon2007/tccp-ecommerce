import { body, validationResult, header, param } from "express-validator";
import Products from "../services/products.service.js";

const createProduct = [
  // name
  body("name")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("name required"),
  // imageUrl
  body("imagesUrl")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("image required"),
  // description
  body("description").optional(),
  body("price")
    .notEmpty()
    .withMessage("price required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),
];

const getProduct = [
  param("id")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("id is required")
    .custom(async (s, { req }) => {
      const products = await Products.getProductById(req.params.id);
      if (!products) {
        return Promise.reject(new Error("there is no oroducts with this id "));
      }
    }),
];

const updateProduct = [
  param("id")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("id is required")
    .custom(async (id) => {
      const products = await Products.getProductById(id);
      if (!products) {
        return Promise.reject(new Error("this products is not exist "));
      }
    }),
  // name
  body("name")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("name required"),
  // imageUrl
  body("imagesUrl")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("image required"),
  // description
  body("description").optional(),
  body("price")
    .notEmpty()
    .withMessage("price required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),

];

const deleteProduct = [
  param("id")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("id is required")
    .custom(async (id) => {
      const products = await Products.getProductById(id);
      if (!products) {
        return Promise.reject(new Error("there is no products with this id "));
      }
    }),
];
export default {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
};
