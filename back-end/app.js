import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; 
import dotenv from "dotenv";
import authRouter from "./routes/userRoute.js";
import residencyRouter from "./routes/residencyRoute.js";

dotenv.config();
export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true

}));


app.use('/api/users',authRouter );
app.use("/api/residencies", residencyRouter);
// app.use((err, req, res, next) => {
//   const status = err.status || 500;
//   const message = err.message || "Something went wrong";
//   return res.status(status).json({
//     success: false,
//     status,
//     message,
//   });
// });