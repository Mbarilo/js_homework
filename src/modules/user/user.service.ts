import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userService = {
  async register(email: string, password: string, name?: string) {
    const registeredUser = await prisma.user.findUnique({ where: { email } });
    if (registeredUser) throw new Error("Пользователь уже зарегестрирован");

    const user = await prisma.user.create({
      data: { email,
         password,
          name: name ?? null },
    });

    return { id: user.id, email: user.email, name: user.name };
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      throw new Error("Неверный rmail или пароль");
    }

    return { id: user.id, email: user.email, name: user.name };
  },
};

export default userService;