import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/AuthController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { asyncHandler } from "../middlewares/asyncHandler";

const router = express.Router();

router.route("/register").post(asyncHandler(registerUser));
router.route("/login").post(asyncHandler(loginUser));
router.route("/me").get(authMiddleware, asyncHandler(getUser));

export default router;
