'use client';
import Map from "./components/Map";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  const session = await auth0.getSession();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-8" style={{ position: "relative" }}>
      <button
        onClick={() => router.push(isLoggedIn ? "/Account" : "/auth/login")}
        className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-xl shadow hover:bg-blue-700 transition"
        style={{ position: "absolute", top: 32, right: 32 }}
      >
        {session ? "Account" : "Log In"}
        {/* TODO: add sign up button "/auth/login?screen_hint=signup" */}
      </button>
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 flex items-center justify-center">
        <Map />
      </div>
    </main>
  );
}