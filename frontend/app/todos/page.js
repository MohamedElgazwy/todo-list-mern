'use client';

import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/services/api";
import { useEffect, useState } from "react";

export default function TodosPage() {
  const { token, logout } = useAuth();
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    apiRequest("/todos", "GET", null, token)
      .then(setTodos)
      .finally(() => setLoading(false));
  }, [token]);

  const addTodo = async () => {
    if (!title.trim()) return;

    const todo = await apiRequest("/todos", "POST", { title }, token);
    setTodos([todo, ...todos]);
    setTitle("");
  };

  const toggleTodo = async (id, completed) => {
    const updated = await apiRequest(
      `/todos/${id}`,
      "PUT",
      { completed: !completed },
      token
    );

    setTodos(todos.map((t) => (t._id === id ? updated : t)));
  };

  const deleteTodo = async (id) => {
    await apiRequest(`/todos/${id}`, "DELETE", null, token);
    setTodos(todos.filter((t) => t._id !== id));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            📝 My Todos
          </h1>
          <button
            onClick={logout}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>

        {/* Add Todo */}
        <div className="flex gap-3 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={addTodo}
            className="px-5 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Add
          </button>
        </div>

        {/* Todos List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading todos...</p>
        ) : todos.length === 0 ? (
          <p className="text-center text-gray-400">
            No todos yet. Add your first one 🚀
          </p>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl"
              >
                <span
                  onClick={() => toggleTodo(todo._id, todo.completed)}
                  className={`cursor-pointer select-none ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {todo.title}
                </span>

                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
