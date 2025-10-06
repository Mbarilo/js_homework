const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "../../data/post.json");

const postService = {
  async getAll(skip, take) {
    const data = await fs.readFile(filePath, "utf-8");
    const posts = JSON.parse(data);

    skip = skip ? Number(skip) : 0;
    take = take ? Number(take) : posts.length;

    if (Number.isNaN(skip) || skip < 0) {
      throw new Error("skip має бути невід’ємним числом");
    }
    if (Number.isNaN(take) || take < 0) {
      throw new Error("take має бути невід’ємним числом");
    }

    return posts.slice(skip, skip + take);
  },

  async getById(id) {
    const data = await fs.readFile(filePath, "utf-8");
    const posts = JSON.parse(data);
    return posts.find((p) => p.id === id);
  },

  async create({ title, description, image }) {
    const data = await fs.readFile(filePath, "utf-8");
    const posts = JSON.parse(data);

    const urlValid = /^(http|https):\/\/[^ "]+$/;
    if (!urlValid.test(image)) {
      throw new Error("Поле 'image' має бути коректною URL-адресою");
    }

    const newPost = {
      id: posts.length ? posts[posts.length - 1].id + 1 : 1,
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

module.exports = postService;