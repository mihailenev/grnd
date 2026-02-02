import { Request, Response } from "express";

const signIn = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).send("Please Provide Both Email And Password");
  }

  console.log(email, password);
  res.status(200).send(`Welcome, ${email}`);
};

export { signIn };
