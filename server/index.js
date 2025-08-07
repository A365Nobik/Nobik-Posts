import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import cookieParser from "cookie-parser";
import { userRouter, postRouter } from "./routes/index.js";
import session from "./services/session-service.js";


export const supabaseUrl = process.env.SUPABASE_URL;
export const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
dotenv.config();

const PORT = process.env.PORT || 5200;
console.log(supabaseUrl,supabaseKey)
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

