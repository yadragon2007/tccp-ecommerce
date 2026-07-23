import mongoose, { Schema, model } from "mongoose";

const cartItemSchema = new Schema({
  cartId: { type: Schema.Types.ObjectId, ref: "Cart" },
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, required: true },
});

// Access models via mongoose.models
const CartItem = mongoose.models.CartItem || model("CartItem", cartItemSchema);

export default CartItem;