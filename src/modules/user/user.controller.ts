import { Request, Response } from "express";
import userService from "./user.service";

const userController = {
  async getAllUsers(res: Response): Promise<void> {
    try {
      const users = await userService.getAll();
      res.json(users);
    } catch (err) {
      res.status(500).json("Помилка сервера");
    }
  },

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        res.status(400).json("ID має бути числом");
        return;
      }

      const fields = req.query.fields
        ? String(req.query.fields).split(",")
        : null;

      const user = await userService.getById(id, fields);

      if (!user) {
        res.status(404).json("Юзера не знайдено");
        return;
      }

      res.json(user);
    } catch (err) {
      res.status(500).json("Помилка сервера");
    }
  },
};

export default userController;