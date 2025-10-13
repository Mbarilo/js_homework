import { Router } from "express";
import postController from "./post.controller";

const router = Router();

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.post("/", postController.createPost);
router.patch("/:id", postController.updatePost);
export default router;