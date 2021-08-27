import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./routers/router.js";
import dotenv from "dotenv";
import process from "node:process";
import errorMiddleware from "./middlewares/error-middleware.js";
import fileUpload from "express-fileupload";
import path from "path";

dotenv.config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const route = "/api";
const __dirname = process.cwd();

const app = express();
app.use(express.json());
app.use(fileUpload({}))
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));
app.use("/static", express.static(path.join(__dirname, "/public")));
app.use(route, router);
app.use(errorMiddleware);

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });
    app.listen(PORT, () => console.log("SERVER STARTED ON PORT " + PORT));
  } catch (e) {
    console.error(e);
  }
}

startApp();
