import { Schema as Schema, model } from "mongoose";

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" ,required: false},
  signIn: { type: Boolean, default: false },
});

const Cart = model("Cart", cartSchema);

export default Cart;
