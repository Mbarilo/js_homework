import { Router } from "express";
import postController from "./post.controller";
import { authMiddleware } from "../../middlewares/auth-middleware";

const router = Router();

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.post("/", authMiddleware, postController.createPost);
router.patch("/:id", authMiddleware, postController.updatePost);
router.get("/posts/:id", postController.getPostById);
router.put("/posts/:postId/likes/:userId", postController.likePost);
router.delete("/posts/:postId/likes/:userId", postController.unlikePost);
export default router;