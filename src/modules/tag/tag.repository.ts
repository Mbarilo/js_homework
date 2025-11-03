import prisma from "../../prisma";
import { ITagRepository } from "./tag.repository.types";
import { Tag } from "./tag.types";

class TagRepository implements ITagRepository {
  async getAll(skip?: number, take?: number): Promise<Tag[]> {
    return prisma.tag.findMany({
        ...(skip !== undefined && { skip }),
        ...(take !== undefined && { take }),
      });
  }
  async getById(id: number): Promise<Tag | null> {
    return prisma.tag.findUnique({ where: { id } });
  }
}

export default new TagRepository();