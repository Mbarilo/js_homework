import { Post, CreatePostData, UpdatePostData } from "./post.types";

export interface IPostRepository {
  getAll(skip?: number, take?: number): Promise<Post[]>;
  getById(id: number): Promise<Post | null>;
  create(data: CreatePostData): Promise<Post>;
  update(id: number, data: UpdatePostData): Promise<Post | null>;
  delete(id: number): Promise<Post | null>;
}