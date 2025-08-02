import assert from "node:assert";

import AppError from "./AppError";

type AppAssert = (
  condition: any,
  message: string,
  statusCode: number,
) => asserts condition;

const appAssert: AppAssert = (condition, message, statusCode) =>
  assert(condition, new AppError(message, statusCode));

export default appAssert;
