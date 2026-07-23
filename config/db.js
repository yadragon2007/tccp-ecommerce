import mongoose from "mongoose";
import env from "./env.js";

connect().catch(err => console.log(err));
async function connect() {
  await mongoose.connect("mongodb://yousef6448_db_user:5dvlW2FS804I3pzY@ac-7i7wejc-shard-00-00.x5qj608.mongodb.net:27017,ac-7i7wejc-shard-00-01.x5qj608.mongodb.net:27017,ac-7i7wejc-shard-00-02.x5qj608.mongodb.net:27017/TCCD?ssl=true&replicaSet=atlas-147ckg-shard-0&authSource=admin&appName=Cluster0");
  console.log("Database Connected successfully");
}
