import { Router } from "express";
import * as commentController from "./comment.controller";

const router = Router();

router.post("/posts/:postId/comments", commentController.create);

export default router;