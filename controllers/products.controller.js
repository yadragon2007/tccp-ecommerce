import Product from "../services/products.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import slug from "slug";

const product_create_post = asyncHandler(async (req, res) => {
  const { name, description, imagesUrl, price, stock, category } = req.body;
  const convSlug = await slug(name);
  const productData = {
    name,
    description,
    imagesUrl,
    slug: convSlug,
    price,
    stock,
    category,
  };
  const newCategory = await Product.createProduct(productData);

  res.status(200).send({ data: newCategory });
});

const product_getAllProducts_get = asyncHandler(async (req, res) => {
  const products = await Product.getAllProducts();
  res.status(200).send({ data: products });
});

const product_getProduct_get = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.getProductById(id);

  res.status(200).send({ data: product });
});

const product_updateProduct_patch = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, imagesUrl, price, stock, category } = req.body;
  const convSlug = await slug(name);
  const productData = {
    name,
    description,
    imagesUrl,
    slug: convSlug,
    price,
    stock,
    category,
  };
  const product = await Product.updateProduct(id, productData);

  res.status(200).send({ data: product });
});

const product_deleteProduct_delete = asyncHandler(async (req, res) => {
  const { id } = req.params;
 
 await Product.deleteProduct(id);

  res.status(200).send({ data: "product has been deleted successfully" });
});


export default {
    product_create_post,
    product_getAllProducts_get,
    product_getProduct_get,
    product_updateProduct_patch,
    product_deleteProduct_delete,
};
