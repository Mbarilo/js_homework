import { CreatePostData, UpdatePostData } from "./post.types";
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
};

export default postService;