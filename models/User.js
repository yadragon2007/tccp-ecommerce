import { Schema as Schema, model } from "mongoose";

// const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullName: { type: String, required: [true, "full name is required"] },
    email: {
      type: String,
      unique: [true, "this email is in use"],
      required: [true, "full name is required"],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "password is too short"],
      select: false,
    },
    whenPasswordChanged: Date,
    role: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    activation: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const User = model("User", userSchema);

export default User;
