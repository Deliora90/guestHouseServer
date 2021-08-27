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
const allowedOrigins = [process.env.CLIENT_URL, process.env.DEVELOPMENT_CLIENT_URL];

const app = express();
app.use(express.json());
app.use(fileUpload({}))
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      let msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
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
