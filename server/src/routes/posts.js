import express from "express";
import { getFeedPosts, getUserPosts, likePost, deleteUserPost } from "../controllers/posts.js";
import { verifyToken } from "../controllers/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.delete("/delete/:id", verifyToken, deleteUserPost)
router.patch("/:id/like", verifyToken, likePost);

export default router;
