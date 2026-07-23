import { Schema as Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  slug: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  imagesUrl: [{ type: String, required: true }],
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

const Product = model("Product", productSchema);

export default Product;
