import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import cookieParser from "cookie-parser";
import { userRouter, postRouter } from "./routes/index.js";
import session from "./services/session-service.js";

dotenv.config();

const PORT = process.env.PORT || 5200;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("", userRouter);
app.use("", postRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(colors.bgGreen.white(`Server started on ${PORT} port`));
  console.log(colors.bgBlue.white(`Server accessible from other computers`));
});
