import { db } from "../db";

export async function findUserById(id: string) {
  return db
    .selectFrom("users")
    .where("id", "=", id)
    .select(["id", "email"])
    .executeTakeFirst();
}

export async function findUserByEmail(email: string) {
  return db
    .selectFrom("users")
    .where("email", "=", email)
    .select(["id", "email", "password_hash"])
    .executeTakeFirst();
}

export async function createUser(email: string, password_hash: string) {
  return db
    .insertInto("users")
    .values({ email, password_hash })
    .returning(["id"])
    .executeTakeFirstOrThrow();
}
