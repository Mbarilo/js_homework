const moment = require("moment");
const express = require("express");

const app = express();
const PORT = 8000;

function getDate() {
  const nowDate = moment();
  return nowDate.format("YYYY/DD/MM HH:mm:ss");
}

app.get("/timestamp", (req, res) => {
  res.json({ timestamp: getDate()});
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});