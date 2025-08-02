import { RequestHandler } from "express";
import appAssert from "../utils/appAssert";
import { verifyToken } from "../utils/jwt";

const protect: RequestHandler = (req, _, next) => {
  const token = req.cookies.access_token;
  appAssert(token, "Not Authorized", 401);

  const { error, userId } = verifyToken(token);
  appAssert(
    userId,
    error === "jwt expired" ? "Token expired" : "Invalid token",
    401,
  );

  req.userId = userId;

  next();
};

export default protect;
