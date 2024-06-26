import express from "express";
import { Router } from "express";
import friendController from "../controllers/friendController";
import { authenticateUser } from "../middleware/authenticateUser";

const { sendRequest, acceptRequest, removeFriend, getFriends, getFriendRequests, getFriendStatus } = friendController;

const router: Router = express.Router();

// get friends
router.get("/", authenticateUser, getFriends);

// get friend requests
router.get("/requests", authenticateUser, getFriendRequests);

// get friend status with other user
router.get("/status/:otherUserId", authenticateUser, getFriendStatus);

// send request to other user
router.post("/send/:otherUserId", authenticateUser, sendRequest);

// accept request from other user
router.patch("/accept/:otherUserId", authenticateUser, acceptRequest);

// decline request from other user
router.delete("/decline/:otherUserId", authenticateUser, removeFriend);

export default router;
