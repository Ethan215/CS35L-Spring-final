import express from "express";
import { Router } from "express";
import userController, { checkLogin } from "../controllers/userController";
import { authenticateUser } from "../middleware/authenticateUser";

const { signup, loginUser, logoutUser } = userController;

const router: Router = express.Router();

// Register a user
router.post("/signup", signup);

// Login a user
router.post("/login", loginUser);

// Check if a user is logged in
router.get("/login", authenticateUser, checkLogin);

// Logout a user
router.post("/logout", logoutUser);

export default router;
