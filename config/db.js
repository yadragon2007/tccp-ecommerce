import mongoose from "mongoose";
import env from "./env.js";

connect().catch(err => console.log(err));
async function connect() {
  await mongoose.connect(env.Mongodb);
  console.log("Database Connected successfully");
}