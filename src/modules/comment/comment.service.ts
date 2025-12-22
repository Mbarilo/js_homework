import prisma from "../../prisma";

export const createComment = async (
  postId: number,
  body: string,
  userId: number
) => {
  return prisma.comment.create({
    data: {
      body,
      postId,
      authorId: userId,
    },
  });
};