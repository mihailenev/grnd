import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/AuthController";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(authMiddleware, getUser);

export default router;
