import { Request, Response } from "express";
import postService from "./post.service";
import {UpdatePostData, PostControllerContract } from "./post.types";

const postController: PostControllerContract = {
  async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      const { skip, take } = req.query;
      const skipNumber = typeof skip === "string" ? parseInt(skip, 10) : undefined;
      const takeNumber = typeof take === "string" ? parseInt(take, 10) : undefined;
      const posts = await postService.getAll(skipNumber, takeNumber);
      res.json(posts);
    } catch (err) {
      res.status(500).json("Помилка сервера");
    }
  },

  async getPostById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        res.status(400).json("ID має бути числом");
        return;
      }

      const post = await postService.getById(id);
      if (!post) {
        res.status(404).json("Пост не знайдено");
        return;
      }

      res.json(post);
    } catch (err) {
      res.status(500).json("Помилка сервера");
    }
  },

  async createPost(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, image } = req.body;

      if (!title || !description || !image) {
        res
          .status(422)
          .json("У поста должно быть title, description и image");
        return;
      }

      const newPost = await postService.create({ title, description, image });
      res.status(201).json(newPost);
    } catch (err) {
      console.error(err);
      res.status(500).json("Помилка сервера");
    }
  },
  async updatePost(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        res.status(400).json("ID має бути числом");
        return;
      }

      const data: UpdatePostData = req.body;

      if (data.title && typeof data.title !== "string") {
        res.status(400).json("title має бути рядком");
        return;
      }
      if (data.description && typeof data.description !== "string") {
        res.status(400).json("description має бути рядком");
        return;
      }
      if (data.image && typeof data.image !== "string") {
        res.status(400).json("image має бути рядком");
        return;
      }
      if (data.likes && typeof data.likes !== "string") {
        res.status(400).json("likes має бути рядком");
        return;
      }

      const updatedPost = await postService.update(id, data);
      if (!updatedPost) {
        res.status(404).json("Пост не знайдено");
        return;
      }

      res.json(updatedPost);
    } catch (err) {
      console.error(err);
      res.status(500).json("Помилка сервера");
    }
  },
};

export default postController;