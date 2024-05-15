import express from "express";
import { Router } from "express";
import profileController from "../controllers/profileController";

const {
  getProfiles,
  getProfile,
  createProfile,
  deleteProfile,
  updateProfile,
} = profileController;

const router : Router = express.Router();

//GET all profiles
router.get("/", getProfiles);

//GET a single profile
router.get("/:id", getProfile);

//POST a new profile
router.post("/", createProfile);

//DELETE a profile
router.delete("/:id", deleteProfile);

//UPDATE a profile
router.patch("/:id", updateProfile);

export default router;
