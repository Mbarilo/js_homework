const postService = require("./post.service");

const postController = {
  async getAllPosts(req, res) {
    try {
      const { skip, take } = req.query;
      const posts = await postService.getAll(skip, take);
      res.json(posts);
    } catch (err) {
      res.status(500).json("Помилка сервера");
    }
  },

  async getPostById(req, res) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) return res.status(400).json("ID має бути числом");

      const post = await postService.getById(id);
      if (!post) return res.status(404).json("Пост не знайдено");

      res.json(post);
    } catch (err) {
      res.status(500).json("Помилка сервера");
    }
  },

  async createPost(req, res) {
    try {
      const { title, description, image } = req.body;

      if (!title || !description || !image) {
        return res
          .status(422)
          .json("У поста должно быть title, description и image");
      }

      const newPost = await postService.create({ title, description, image });
      res.status(201).json(newPost);
    } catch (err) {
      console.error(err);
      res.status(500).json("Помилка сервера");
    }
  },
};

module.exports = postController;