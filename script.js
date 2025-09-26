const moment = require("moment");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8000;

function getDate() {
  const nowDate = moment();
  return nowDate.format("YYYY/DD/MM HH:mm:ss");
}

app.get("/timestamp", (req, res) => {
  res.json({ timestamp: getDate() });
});

app.get("/posts", (req, res) => {
  const filePath = path.join(__dirname, "post.json");
  fs.readFile(filePath, "utf-8", (data) => {
    const posts = JSON.parse(data);
    let { skip, take } = req.query;

    skip = skip ? parseInt(skip) : 0;
    take = take ? parseInt(take) : posts.length;

    const result = posts.slice(skip, skip + take);
    res.json(result);
  });
});

app.get("/posts/:id", (req, res) => {
  const filePath = path.join(__dirname, "post.json");
  fs.readFile(filePath, "utf-8", (err, data) => {

    const posts = JSON.parse(data);
    const id = parseInt(req.params.id);

    const post = posts.find((p) => p.id === id);
    if (!post) {
      return res.status(404).json({ error: "Пост не знайдено" });
    }

    res.json(post);
  });
});

app.listen(PORT, () => {
  console.log(`Сервер ввімкнено: http://localhost:${PORT}`);
});