// server/routes/postRoutes.js
import express from "express";
import { createPost, getPosts, likePost } from "../controllers/postController.js";

const router = express.Router();

router.post("/create", createPost);
router.get("/", getPosts);
router.put("/like/:id", likePost);

export default router;