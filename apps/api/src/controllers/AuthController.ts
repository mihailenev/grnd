import { Request, Response } from "express";
import dotenv from "dotenv";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import * as userService from "../services/user.service";

dotenv.config();

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await userService.login(email, password);

  return res.status(200).json(result);
};

const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userService.register(email, password);

  return res.status(201).json({
    message: "User created successfully",
    userId: user.id,
  });
};

const getUser = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new UnauthorizedError("Not authenticated");
  }

  const userId = req.user.id;
  const user = await userService.getUserById(userId);

  return res.status(200).json({ user });
};

export { loginUser, getUser, registerUser };
