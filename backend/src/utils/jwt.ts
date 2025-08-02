import jwt from "jsonwebtoken";
import { Response } from "express";

import { JWT_SECRET, NODE_ENV } from "../constants/env";
import { sevenDaysFromNow } from "./dates";

export const signToken = (userId: string, res: Response): string => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: NODE_ENV !== "development",
    sameSite: "strict",
    expires: sevenDaysFromNow(),
  });

  return token;
};

export const verifyToken = (token: string) => {
  try {
    const { userId } = jwt.verify(token, JWT_SECRET) as { userId: string };

    return { userId };
  } catch (error) {
    return { error };
  }
};
