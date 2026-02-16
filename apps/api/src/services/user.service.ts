import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateEmail, validatePassword } from "../utils/validators";
import {
  findUserById,
  findUserByEmail,
  createUser,
} from "../repositories/UserRepository";

import { BadRequestError } from "../errors/BadRequestError";
import { ConflictError } from "../errors/ConflictError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { NotFoundError } from "../errors/NotFoundError";

export const login = async (email: string, password: string) => {
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

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    token,
  };
};

export const register = async (email: string, password: string) => {
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
    return await createUser(normalizedEmail, hashedPassword);
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

export const getUserById = async (id: string) => {
  const user = await findUserById(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
};
