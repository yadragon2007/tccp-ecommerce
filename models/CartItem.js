import { Schema as _Schema, model } from "mongoose";
const { Schema } = mongoose;

const cartItemSchema = new Schema({
  cartId: { type: Schema.Types.ObjectId, ref: "Cart" },
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, required: true },
});

const CartItem = model("CartItem", cartItemSchema);

export default User;
