import { Router } from "express";

import protect from "../middleware/protect";

import {
  registerHandler,
  loginHandler,
  logoutHandler,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", registerHandler);
authRouter.post("/login", loginHandler);
authRouter.post("/logout", protect, logoutHandler);

export default authRouter;
