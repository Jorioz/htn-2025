'use client';
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleLogin(e) {
    e.preventDefault();
    if (username === "user" && password === "1234") {
      localStorage.setItem("isLoggedIn", "true");
      const from = searchParams.get("from");
      if (from) {
        router.push(from);
      } else {
        router.push("/");
      }
    } else {
      setError("Invalid credentials.");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 tracking-tight">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="px-4 py-3 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="px-4 py-3 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-400"
          />
          <button type="submit" className="px-10 py-4 bg-blue-600 text-white text-xl font-bold rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition transform">
            Log In
          </button>
          {error && <div className="text-red-600 text-lg text-center mt-2">{error}</div>}
        </form>
      </div>
    </main>
  );
}
