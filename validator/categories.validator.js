import { body, validationResult ,header,param} from "express-validator";
import Category from "../services/categories.service.js";


const createCategory = [
  // name
  body("name")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("name required")
    .custom(async (name) => {
      const category = await Category.getCategory({ name });
      if (category) {
        return Promise.reject(new Error("this catecgory is existed "));
      }
    }),

  // imageUrl
  body("imageUrl")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("image required"),
  // description
  body("description").optional(),
];
const getCategory = [
  param("id")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("id is required")
    .custom(async (s,{req}) => {
      const category = await Category.getCategoryById(req.params.id);
      if (!category) {
        return Promise.reject(new Error("there is no category with this id "));
      }
    }),
];
const updateCategory = [
  param("id")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("id is required")
    .custom(async (id) => {
      const category = await Category.getCategoryById(id);
      if (!category) {
        return Promise.reject(new Error("this category is not exist "));
      }
    }),
  // name
  body("name")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("name required")
    .custom(async (name,{ req }) => {
      const category = await Category.getCategory({name})
      if (category && req.params.id != category.id) {
        return Promise.reject(new Error("this name is already taken"));
      }
    }),

  // imageUrl
  body("imageUrl")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("image required"),
  // description
  body("description").optional(),
];

const deleteCategory = [
  param("id")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("id is required")
    .custom(async (id) => {
      const category = await Category.getCategoryById(id);
      if (!category) {
        return Promise.reject(new Error("there is no category with this id "));
      }
    }),
];
export default {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
