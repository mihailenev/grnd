import { Request, Response } from "express";
import { db } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { validateEmail, validatePassword } from "../utils/validators";
import {
  findUserById,
  findUserByEmail,
  createUser,
} from "../repositories/UserRepository";
import { BadRequestError } from "../errors/BadRequestError";
import { ConflictError } from "../errors/ConflictError";
import { UnauthorizedError } from "../errors/UnauthorizedError";

dotenv.config();

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Email and password are required");
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await findUserByEmail(normalizedEmail);

  if (!user) {
    throw new UnauthorizedError("Wrong email or password");
  }

  const isValid = await bcrypt.compare(password, user.password_hash);

  if (!isValid) {
    throw new UnauthorizedError("Wrong email or password");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return res
    .status(200)
    .json({ user: { id: user.id, email: user.email }, token: token });
};

const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Email and password are required");
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (!validateEmail(normalizedEmail)) {
    throw new BadRequestError("Invalid email");
  }

  if (!validatePassword(password)) {
    throw new BadRequestError("Weak password");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await createUser(normalizedEmail, hashedPassword);

    return res.status(201).json({
      message: "User created successfully",
      userId: result.insertId,
    });
  } catch (error: unknown) {
    //  duplicate email
    if (
      error instanceof Error &&
      "code" in error &&
      (error as any).code === "23505"
    ) {
      throw new ConflictError("Email already exists");
    }
    throw error;
  }
};

const getUser = async (req: Request, res: Response) => {
  const user = await findUserById(req.user!.id);

  res.json({ user });
};

export { loginUser, getUser, registerUser };
