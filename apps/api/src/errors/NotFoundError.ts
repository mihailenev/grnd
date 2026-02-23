import { AppError } from "./AppError";

export class NotFoundError extends AppError {
  constructor(messege: string) {
    super(messege, 404);
  }
}
