import express, { json } from "express";
import cookies from "cookie-parser";
import expressSession from "express-session";
import helmet from "helmet";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import envConfig from "./config/env.js";

const app = express();

app.set("trust proxy", 1);

/*====================== connect to database =======================*/
import "./config/db.js";
/*====================== middleware =======================*/
// json
app.use(json());
// cookies
app.use(cookies());
// helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
      },
    },
  }),
);
// cors
app.use(
  cors({
    origin: envConfig.allowedOrigins,
    credentials: true,
  }),
);
// seeder 
import startup from "./utils/startup.js";
await startup();
// expressSession
app.use(
  expressSession({
    secret: "324dfsf",
    resave: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30d
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.SESSION_SECURE === "true",
    },
    saveUninitialized: false,
  }),
);
// Global error handler
import errorHandler from "./middlewares/errorHandler.js";
app.use(errorHandler);

/*====================== routes =======================*/
import auth from "./routes/auth.routes.js";
app.use("/api/auth", auth);
import users from "./routes/users.routes.js";
app.use("/api/users", users);
import categories from "./routes/categories.routes.js";
app.use("/api/categories", categories);
import products from "./routes/products.routes.js";
app.use("/api/products", products);

// 404
app.use((req, res) => {
  res.status(404).json({ status: "fail", message: "Route not found", code: "0006" });
});


/*====================== listening =======================*/
const port = envConfig.port || 8080;
app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
