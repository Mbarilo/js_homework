import { Request, Response } from "express";
import tagService from "./tag.service";

const tagController = {
  async getAllTags(req: Request, res: Response): Promise<void> {
    const { skip, take } = req.query;
    
    const tags = await tagService.getAll(
      skip ? Number(skip) : undefined,
      take ? Number(take) : undefined
    );

    res.json(tags);
  },

  async getTagById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);

    if (!id) {
      res.status(400).json({ message: "невалидный ID" });
      return;
    }

    const tag = await tagService.getById(id);

    if (!tag) {
      res.status(404).json({ message: "тег не найден" });
      return;
    }

    res.json(tag);
  },
};

export default tagController;