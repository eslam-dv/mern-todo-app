import { ErrorRequestHandler, Response } from "express";
import AppError from "../utils/AppError";

const handleAppError = (error: AppError, res: Response) => {
  res.status(error.statusCode).json({ message: error.message });
};

const errorHandler: ErrorRequestHandler = (error, req, res, _) => {
  console.log(`PATH: ${req.path}`, error);

  if (error instanceof AppError) {
    return handleAppError(error, res);
  }

  res.status(500).send("Internal Server Error");
};

export default errorHandler;
