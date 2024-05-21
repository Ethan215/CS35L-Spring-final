import express from "express";
import { Router } from "express";
import profileController from "../controllers/profileController";

import { authenticateUser } from "../middleware/authenticateUser";

const { getProfiles, getProfile, createProfile, deleteProfile, updateProfile } =
	profileController;

const router: Router = express.Router();

//GET all profiles
router.get("/", getProfiles);

//GET a single profile
router.get("/:id", getProfile);

//POST a new profile
router.post("/", authenticateUser, createProfile);

//DELETE a profile
router.delete("/", authenticateUser, deleteProfile);

//UPDATE a profile
router.patch("/", authenticateUser, updateProfile);

export default router;
