import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./database/connectDB.js";
import errorHandler from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.route.js";

dotenv.config({ path: "./.env" });


const app = express();
const port = process.env.PORT || 3001;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Homepage");
});



app.use("/api/auth", authRouter);

connectDB();

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
