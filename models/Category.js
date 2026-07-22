import { Schema as _Schema, model } from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true , unique: true }
});

const Category = model("Category", categorySchema);

export default Category;
