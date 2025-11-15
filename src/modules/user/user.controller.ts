import { Request, Response } from "express";
import userService from "./user.service";

const service = userService

export class UserController {
  async register(req: Request, res: Response) {
    try {
      const token = await service.register(req.body);
      res.json(token);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await service.login(email, password);
      res.json(token);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }

  async me(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
  
      if (!token) {
        return res.status(401).json({ message: "Token missing" });
      }
  
      const user = await userService.me(token);
      return res.json(user);
  
    } catch (e: any) {
      return res.status(401).json({ message: e.message });
    }
  }  
}

export default UserController