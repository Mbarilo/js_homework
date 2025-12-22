import { CreatePostData, UpdatePostData } from "./post.types";
import prisma from "../../prisma";
/**import { IPostRepository } from "./post.repository.types";*/
import postRepository from "./post.repository";

const postService = {
  getAll(skip?: number, take?: number) {
    return postRepository.getAll(skip, take);
  },

  getById(id: number) {
    return postRepository.getById(id);
  },

  create(data: CreatePostData) {
    return postRepository.create(data);
  },

  update(id: number, data: UpdatePostData) {
    return postRepository.update(id, data);
  },

  delete(id: number) {
    return postRepository.delete(id);
  },

  like(postId: number, userId: number) {
    return prisma.postLike.create({
      data: { postId, userId },
    });
  },

  unlike(postId: number, userId: number) {
    return prisma.postLike.delete({
      where: {
        postId_userId: { postId, userId },
      },
    });
  },

  getByIdWithInclude(id: number, include: string[]) {
    return prisma.post.findUnique({
      where: { id },
      include: {
        comments: include.includes("comments"),
        likedBy: include.includes("likedBy"),
      },
    });
  },
};

export default postService;