import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma";
import { env } from "../config/env";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "Нет токена" });
    }

    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Неверный формат токена" });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: number };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ message: "Пользователь не найден" });
    }

    (req as any).user = user;

    return next();
  } catch (e) {
    return res
      .status(401)
      .json({ message: "Неправкльный или просроченный токен" });
  }
};