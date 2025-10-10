import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(__dirname, "../../data/users.json");

interface User {
  id: number;
  name: string;
  email: string;
  [key: string]: any;
}

const userService = {
  async getAll(): Promise<User[]> {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as User[];
  },

  async getById(id: number, fields?: string[] | null): Promise<User | Record<string, any> | null> {
    const data = await fs.readFile(filePath, "utf-8");
    const users: User[] = JSON.parse(data);
    const user = users.find((u) => u.id === id);
    if (!user) return null;

    if (!fields) return user;

    const filtered: Record<string, any> = {};
    for (const field of fields) {
      if (user[field] !== undefined) {
        filtered[field] = user[field];
      }
    }

    return filtered;
  },
};

export default userService;