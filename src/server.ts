import express from "express";
import cors from "cors";
import postRouter from "./modules/post/post.router";
import userRouter from "./modules/user/user.router";
import tagRouter from "./modules/tag/tag.router";
import commentRouter from "./modules/comment/comment.router";

const app = express();
const PORT = 8000;

app.use(
  cors({
    origin: "http://localhost:8000",
  })
);

app.use(express.json());

app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/tags", tagRouter);
app.use(commentRouter);

app.listen(PORT, () => {
  console.log(`Сервер ввімкнено: http://localhost:${PORT}`);
});