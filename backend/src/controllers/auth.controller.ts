import { NODE_ENV } from "../constants/env";
import UserModel from "../models/user.model";
import appAssert from "../utils/appAssert";
import AppError from "../utils/AppError";
import asyncHandler from "../utils/asyncHandler";
import { signToken } from "../utils/jwt";

const registerHandler = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    throw new AppError("All fields are required", 400);
  }

  if (password.length < 6) {
    throw new AppError("Password must be atleast 6 characters long", 400);
  }

  const existingUser = await UserModel.findOne({ email });
  appAssert(!existingUser, "Email already in use", 400);

  const user = await UserModel.create({ email, name, password });
  const token = signToken(user.id, res);

  res.status(201).json({ user, token });
});

const loginHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("All fields are required", 400);
  }

  const user = await UserModel.findOne({ email });
  appAssert(user, "Invalid email or password", 400);

  const isMatch = await user.comparePassword(password);
  appAssert(isMatch, "Invalid email or password", 400);

  const token = signToken(user.id, res);

  res.status(200).json({ user, token });
});

const logoutHandler = asyncHandler(async (req, res) => {
  req.userId = undefined;

  res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "user logged out successfully" });
});

export { registerHandler, loginHandler, logoutHandler };
