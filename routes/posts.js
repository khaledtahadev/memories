import express from "express";
import {
	getPosts,
	createPost,
	updatePost,
	deletePost,
	likePost,
} from "../controllers/posts.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

// posts routers

router.get("/", getPosts);
router.post("/", isAuth, createPost);
router.patch("/:postId", isAuth, updatePost);
router.delete("/:postId", isAuth, deletePost);
router.patch("/:postId/likePost", isAuth, likePost);

export default router;
