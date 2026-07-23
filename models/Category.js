import { Schema as Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true, default: "" },
  imageUrl: { type: String, required: true, default: "" },
});

const Category = model("Category", categorySchema);

export default Category;
