import { AppError } from "./AppError";

export class UnauthorizedError extends AppError {
  constructor(messege: string) {
    super(messege, 401);
  }
}
