import Category from "../services/categories.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import slug from "slug";

const category_create_post = asyncHandler(async (req, res) => {
  const { name, description, imageUrl } = req.body;
  const convSlug = await slug(name);
  const categoryData = {
    name,
    description,
    imageUrl,
    slug:convSlug,
  };
  const newCategory = await Category.createCategory(categoryData);

  res.status(200).send({ data: newCategory });
});

const category_getAllCategory_get = asyncHandler(async (req, res) => {
  const categories = await Category.getAllCategorys();

  res.status(200).send({ data: categories });
});

const category_getCategory_get = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.getCategoryById(id);

  res.status(200).send({ data: category });
});

const category_updateCategory_patch = asyncHandler(async (req, res) => {
  const { id,} = req.params;
  const { name, description, imageUrl } = req.body;
  const convSlug = await slug(name);
  const updateData = {
    name,
    slug:convSlug,
    description,
    imageUrl,
  };
  const category = await Category.updateCategory(id, updateData);

  res.status(200).send({ data: category });
});

const category_deleteCategory_delete = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await Category.deleteCategory(id);

  res.status(200).send({ msg: "Category has been deleted successfully" });
});

export default {
  category_create_post,
  category_getAllCategory_get,
  category_getCategory_get,
  category_updateCategory_patch,
  category_deleteCategory_delete,
};
