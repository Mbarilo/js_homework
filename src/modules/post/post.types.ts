export interface Post {
    id: number;
    title: string;
    description: string;
    image: string;
    likes: string;
}

export type CreatePostData = Omit<Post, "id" | "likes">;
export type UpdatePostData = Partial<Omit<Post, "id">>;