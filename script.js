const moment = require("moment");
const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PORT = 8000;
app.use(express.json());

function getDate() {
  const nowDate = moment();
  return nowDate.format("YYYY/DD/MM HH:mm:ss");
}

app.get("/timestamp", (req, res) => {
  res.json({ timestamp: getDate() });
});

// Отримуємо всі пости (з skip/take)
app.get("/posts", (req, res) => {
  const filePath = path.join(__dirname, "post.json");
  fs.readFile(filePath, "utf-8", (err, data) => {
    const posts = JSON.parse(data);

    let { skip, take } = req.query;
    skip = skip ? Number(skip) : 0;
    take = take ? Number(take) : posts.length;

    if (Number.isNaN(skip) || skip < 0) {
      return res.status(400).json("skip має бути невід’ємним числом");
    }
    if (Number.isNaN(take) || take < 0) {
      return res.status(400).json("take має бути невід’ємним числом");
    }

    const result = posts.slice(skip, skip + take);
    res.json(result);
  });
});

// Отримуємо пост по id
app.get("/posts/:id", (req, res) => {
  const filePath = path.join(__dirname, "post.json");
  fs.readFile(filePath, "utf-8", (err, data) => {
    const posts = JSON.parse(data);
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json("ID має бути числом");
    }

    const post = posts.find((p) => p.id === id);
    if (!post) {
      return res.status(404).json("Пост не знайдено" );
    }

    res.json(post);
  });
});

// Отримуємо всіх користувачів
app.get("/users", (req, res) => {
  const filePath = path.join(__dirname, "users.json");
  fs.readFile(filePath, "utf-8", (err, data) => {
    const users = JSON.parse(data);
    res.json(users);
  });
});

// Отримуємо користувачів по id (з fields)
app.get("/users/:id", (req, res) => {
  const filePath = path.join(__dirname, "users.json");
  fs.readFile(filePath, "utf-8", (err, data) => {
    const users = JSON.parse(data);
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json("ID має бути числом");
    }

    const user = users.find((u) => u.id === id);
    if (!user) {
      return res.status(404).json("Юзера не знайдено");
    }

    let result = { ...user };

    if (req.query.fields) {
      const fields = req.query.fields.split(",");
      result = {};
      fields.forEach((field) => {
        if (user[field] !== undefined) {
          result[field] = user[field];
        }
      });
    }

    res.json(result);
  });
});

app.post("/posts", async (req, res) => {
  try {
    const { title, description, image } = req.body;
    if (!title || !description || !image) {
      return res
        .status(422)
        .json("У поста должно быть title, description и image");
    }

    const filePath = path.join(__dirname, "post.json");

    const data = await fs.readFile(filePath, "utf-8");
    const posts = JSON.parse(data);

    const newPost = {
      id: posts.length ? posts[posts.length - 1].id + 1 : 1,
      title,
      description,
      image,
      likes: "0",
    };

    const urlValid = /^(http|https):\/\/[^ "]+$/;
    if (!image || typeof image !== "string" || !urlValid.test(image)) {
      return res
        .status(422)
        .json("Поле 'image' обов'язкове і має бути");
    }

    posts.push(newPost);

    await fs.writeFile(filePath, JSON.stringify(posts, null, 2), "utf-8");

    res.json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json("Ошибка сервера");
  }
});

app.listen(PORT, () => {
  console.log(`Сервер ввімкнено: http://localhost:${PORT}`);
});