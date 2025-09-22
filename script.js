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
  res.json({ timestamp: getDate()});
});

app.get("/posts", (req, res) => {
  const PathToFile = path.join(__dirname, "post.json");
  fs.readFile(PathToFile, "utf-8", (err, data) => {
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Сервер ввімкнений: http://localhost:${PORT}`);
});