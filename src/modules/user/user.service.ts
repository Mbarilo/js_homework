import prisma from "../../prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { env } from "../../config/env";

export class UserService {
  async register({
    email,
    password,
    firstName,
    secondName,
    avatar,
  }: {
    email: string;
    password: string;
    firstName: string;
    secondName: string;
    avatar: string;
  }) {
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      throw new Error("Пользователь с таким email уже существует");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        secondName,
        avatar,
      },
    });

    const token = jwt.sign({ id: user.id }, env.JWT_SECRET);

    return { token };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Неверный email или пароль");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Неверный email или пароль");
    }

    const token = jwt.sign({ id: user.id }, env.JWT_SECRET);

    return { token };
  }

  async me(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        secondName: true,
        avatar: true,
        isAdmin: true,
      },
    });
  
    if (!user) throw new Error("Пользователь не найден");
    return user;
  }
}

export default new UserService;