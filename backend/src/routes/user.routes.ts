import { Router } from "express";

import {
  getUserHandler,
  getTasksHandler,
  createTaskHandler,
  markDone,
  deleteTaskHandler,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", getUserHandler);
userRouter.route("/tasks").get(getTasksHandler).post(createTaskHandler);
userRouter.route("/task/:id").patch(markDone).delete(deleteTaskHandler);

export default userRouter;
