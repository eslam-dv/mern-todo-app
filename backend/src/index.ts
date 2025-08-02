import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { APP_ORIGIN, PORT } from "./constants/env";
import { connectDB } from "./config/db";
import errorHandler from "./middleware/errorHandler";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import protect from "./middleware/protect";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  }),
);

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", protect, userRouter);

// Error Handling Middleware
// must be after all routes
app.use(errorHandler);

connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
