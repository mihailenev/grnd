import { AppError } from "./AppError";

export class ConflictError extends AppError {
  constructor(messege: string) {
    super(messege, 409);
  }
}
