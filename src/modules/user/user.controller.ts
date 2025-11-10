import { Request, Response } from "express";
import userService from "./user.service";

const userController = {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name } = req.body;
      const user = await userService.register(email, password, name);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await userService.login(email, password);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default userController;