import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://todo-list-mern-rust.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// routes بعد كده
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
export default app;