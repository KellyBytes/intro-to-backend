import express from 'express';
// 以下はdefault exportのインポートなので自由に名付けしてOK
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';

const app = express(); // create an express app

app.use(express.json()); // サーバがクライアントからのデータをJSONにパース

// declare routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

// example route: http://localhost:7878/api/v1/users/register

export default app;
