'use client';
import Map from "./components/Map";

import { useRouter } from "next/navigation";
import { useUser } from '@auth0/nextjs-auth0';

export default function Home() {
  const router = useRouter();
  const user = useUser();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-8" style={{ position: "relative" }}>
      <button
        onClick={() => router.push(user.user ? "/Account" : "/auth/login")}
        className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-xl shadow hover:bg-blue-700 transition"
        style={{ position: "absolute", top: 32, right: 32 }}
      >
        {user.user ? "Account" : "Log In"}
      </button>
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 flex items-center justify-center">
        <Map />
      </div>
    </main>
  );
}