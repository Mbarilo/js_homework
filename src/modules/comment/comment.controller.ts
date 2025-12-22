import { Request, Response } from "express";
import * as commentService from "./comment.service";

export const create = async (req: Request, res: Response): Promise<void> => {
    const postId = Number(req.params.postId);
    const { body, userId } = req.body;
  
    if (!body || !userId) {
      res.status(400).json({ message: "body and userId required" });
      return;
    }
  
    const comment = await commentService.createComment(postId, body, userId);
    res.status(201).json(comment);
  };