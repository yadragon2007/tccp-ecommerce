import dotenv from "dotenv"
dotenv.config();

export default {
    port : process.env.PORT,
    Mongodb: process.env.MONGODB,
    jwt:{
        secret: process.env.JWTSECRET,
        expiresIn: "30d",
    },
    nodeEnv: process.env.NODEENV,
    owner:{
        email:process.env.ADMINEMAIL,
        password:process.env.ADMINPASSWORD,
    }
} 