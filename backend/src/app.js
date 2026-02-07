import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js'
import todoRoutes from './routes/todo.routes.js'
const app = express();

// Middleware to parse JSON bodies
app.use(cors({
  origin: "https://todo-list-mern-eta.vercel.app",
  credentials: true
}));

app.use(express.json());

// test route

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API is running'});
});

export default app;
