import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UnauthorizedError } from "../errors/UnauthorizedError";

dotenv.config();

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new UnauthorizedError("No token provided");

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    req.user = decoded;
    next();
  } catch {
    throw new UnauthorizedError("Invalid token");
  }
};
