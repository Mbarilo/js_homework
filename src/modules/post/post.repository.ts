import prisma from "../../prisma";
import { IPostRepository } from "./post.repository.types";
import { Post, CreatePostData, UpdatePostData } from "./post.types";

class PostRepository implements IPostRepository {
    async getAll(skip?: number, take?: number): Promise<Post[]>{
        return prisma.post.findMany({
          ...(skip !== undefined && { skip }),
          ...(take !== undefined && { take }),
        });
    }

  async getById(id: number): Promise<Post | null> {
    return prisma.post.findUnique({ where: { id } });
  }

  async create(data: CreatePostData): Promise<Post> {
    return prisma.post.create({ data });
  }

  async update(id: number, data: UpdatePostData): Promise<Post | null> {
    return prisma.post.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Post | null> {
    return prisma.post.delete({ where: { id } });
  }
}
export default new PostRepository();