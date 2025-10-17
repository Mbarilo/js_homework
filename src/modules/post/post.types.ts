import { Request, Response } from "express";

export interface Post {
    id: number;
    title: string;
    description: string;
    image: string;
    likes: string;
}

export type CreatePostData = Omit<Post, "id" | "likes">;
export type UpdatePostData = Partial<Omit<Post, "id">>;

export interface PostServiceContract{
    getAll(skip?: string | number, take?: string | number): Promise<Post[]>;
    getById(id: number): Promise<Post | undefined>;
    create(data: CreatePostData): Promise<Post>;
    update(id: number, data: UpdatePostData): Promise<Post | null>;
}
export interface PostControllerContract{
    getAllPosts(req: Request, res: Response): Promise<void>;
    getPostById(req: Request, res: Response): Promise<void>;
    createPost(req: Request, res: Response): Promise<void>;
    updatePost(req: Request, res: Response): Promise<void>;
}