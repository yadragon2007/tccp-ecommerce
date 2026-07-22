import { Schema as _Schema, model } from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  name: { type: string, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  images: [{type:String,required: true}],
});

const Product = model("Product", productSchema);

export default User;
