import fs from "fs/promises";
import path from "path";

interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
  likes: string;
}

interface CreatePostData {
  title: string;
  description: string;
  image: string;
}

const filePath = path.join(__dirname, "../../data/post.json");

const postService = {
  async getAll(skip?: string | number, take?: string | number): Promise<Post[]> {
    const data = await fs.readFile(filePath, "utf-8");
    const posts: Post[] = JSON.parse(data);

    const skipNum = skip ? Number(skip) : 0;
    const takeNum = take ? Number(take) : posts.length;

    if (Number.isNaN(skipNum) || skipNum < 0) {
      throw new Error("skip має бути невід’ємним числом");
    }
    if (Number.isNaN(takeNum) || takeNum < 0) {
      throw new Error("take має бути невід’ємним числом");
    }

    return posts.slice(skipNum, skipNum + takeNum);
  },

  async getById(id: number): Promise<Post | undefined> {
    const data = await fs.readFile(filePath, "utf-8");
    const posts: Post[] = JSON.parse(data);
    return posts.find((p) => p.id === id);
  },

  async create({ title, description, image }: CreatePostData): Promise<Post> {
    const data = await fs.readFile(filePath, "utf-8");
    const posts: Post[] = JSON.parse(data);

    const urlValid = /^(http|https):\/\/[^ "]+$/;
    if (!urlValid.test(image)) {
      throw new Error("Поле 'image' має бути коректною URL-адресою");
    }

    const newPost: Post = {
      id: posts.length ? (posts[posts.length - 1]?.id ?? 0) + 1 : 1,
      title,
      description,
      image,
      likes: "0",
    };

    posts.push(newPost);
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2), "utf-8");
    return newPost;
  },
};

export default postService;