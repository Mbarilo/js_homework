const express = require("express");
const moment = require("moment");
const postRouter = require("./modules/Post/post.router");
const userRouter = require("./modules/User/user.router");

const app = express();
const PORT = 8000;
app.use(express.json());

app.get("/timestamp", (req, res) => {
  const nowDate = moment();
  res.json({ timestamp: nowDate.format("YYYY/DD/MM HH:mm:ss") });
});

app.use("/posts", postRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Сервер ввімкнено: http://localhost:${PORT}`);
});