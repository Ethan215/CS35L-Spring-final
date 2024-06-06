import express from "express";
import { Router } from "express";
import postController from "../controllers/postController";

import { authenticateUser } from "../middleware/authenticateUser";

const { getPosts, getPost, createPost, deletePost, updatePost, addComment } = postController;

const router: Router = express.Router();

//GET all posts
router.get("/", authenticateUser, getPosts);

//GET a single post by id
router.get("/id/:id", authenticateUser, getPost);

//POST a new post
router.post("/", authenticateUser, createPost);

//DELETE a post
router.delete("/id/:id", authenticateUser, deletePost);

//UPDATE a post
router.patch("/id/:id", authenticateUser, updatePost);

//POST a comment on a post
router.post("/id/:id/comment", authenticateUser, addComment);

export default router;