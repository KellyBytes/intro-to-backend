import express from 'express';
import userRouter from './routes/user.route.js';
import postRouter from './routes/user.route.js';

const app = express(); // create an express app

app.use(express.json()); // サーバがクライアントからのデータをJSONにパース

// declare routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

// example route: http://localhost:7878/api/v1/users/register

export default app;
