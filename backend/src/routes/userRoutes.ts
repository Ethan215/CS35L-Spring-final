import express from "express";
import { Router } from "express";
import userController from "../controllers/userController";

const { register, loginUser, logoutUser } = userController;

const router: Router = express.Router();

// Register a user
router.post("/register", register);

// Login a user
router.post("/login", loginUser);

// Logout a user
router.post("/logout", logoutUser);

export default router;
