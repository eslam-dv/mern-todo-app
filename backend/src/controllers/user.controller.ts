import asyncHandler from "../utils/asyncHandler";
import UserModel from "../models/user.model";
import TaskModel from "../models/task.model";
import appAssert from "../utils/appAssert";
import AppError from "../utils/AppError";
import { Types } from "mongoose";

const getUserHandler = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const user = await UserModel.findById(userId);
  appAssert(user, "Not Authorized", 401);

  res.status(200).json({ user });
});

const getTasksHandler = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const user = await UserModel.findById(userId).populate("tasks");
  appAssert(user, "Not Authorized", 401);

  res.status(200).json({ tasks: user.tasks });
});

const createTaskHandler = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const userId = req.userId;

  const user = await UserModel.findById(userId);
  appAssert(user, "Not Authorized", 401);

  if (!title) {
    throw new AppError("Title is required", 400);
  }

  const newTask = await TaskModel.create({ userId, title });

  await UserModel.findByIdAndUpdate(
    userId,
    { $push: { tasks: newTask.id } },
    { new: true },
  );

  res.status(201).json({ message: "Task created successfully", task: newTask });
});

const markDone = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  const task = await TaskModel.findOne({ _id: id, userId });
  appAssert(task, "task not found", 404);

  task.isDone = !task.isDone;

  const updatedTask = await task.save();

  res
    .status(200)
    .json({ message: "Task edited successfully", task: updatedTask });
});

const deleteTaskHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  const task = await TaskModel.findOne({ _id: id, userId });
  appAssert(task, "Task not found", 404);

  await task.deleteOne();

  await UserModel.findByIdAndUpdate(userId, {
    $pull: { tasks: new Types.ObjectId(id) },
  });

  res.status(200).json({ message: "task deleted successfully" });
});

export {
  getUserHandler,
  getTasksHandler,
  createTaskHandler,
  markDone,
  deleteTaskHandler,
};
