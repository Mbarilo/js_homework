import express, {Response } from "express";
import moment from "moment";
import postRouter from "./modules/post/post.router";
import userRouter from "./modules/user/user.router";

const app = express();
const PORT = 8000;

app.use(express.json());

app.get("/timestamp", (res: Response) => {
  const nowDate = moment();
  res.json({ timestamp: nowDate.format("YYYY/DD/MM HH:mm:ss") });
});

app.use("/posts", postRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Сервер ввімкнено: http://localhost:${PORT}`);
});