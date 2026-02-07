import { Request, Response } from "express";
import { db } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  findUserById,
  findUserByEmail,
  createUser,
} from "../repositories/UserRepository";

dotenv.config();

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const normalizedEmail = email.toLowerCase();

  try {
    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(401).json({ message: "Wrong email or password" });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return res.status(401).json({ message: "Wrong email or password" });
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to check users" });
  }
};

const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const normalizedEmail = email.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await createUser(normalizedEmail, hashedPassword);

    return res.status(201).json({
      message: "User created successfully",
      userId: result.insertId,
    });
  } catch (error: any) {
    //  duplicate email
    if (error.code === "23505" || error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    console.error("error:", error);
    return res.status(500).json({ message: "Failed to create user" });
  }
};

const getUser = async (req: Request, res: Response) => {
  const user = await findUserById(req.user!.id);

  res.json({ user });
};

export { loginUser, getUser, registerUser };
