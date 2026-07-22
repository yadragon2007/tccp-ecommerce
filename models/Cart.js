import { Schema as _Schema, model } from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Cart = model("Cart", cartSchema);


export default User