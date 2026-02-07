"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-10 text-center">

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          📝 Todo List App
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-8">
          Organize your tasks, boost your productivity, and stay focused every day.
        </p>

        {/* Buttons */}
        {!user ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="px-6 py-3 rounded-xl border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
            >
              Create Account
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              👋 Welcome back, <span className="font-semibold">{user.name}</span>
            </p>

            <Link
              href="/todos"
              className="inline-block px-8 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
            >
              Go to My Todos
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
