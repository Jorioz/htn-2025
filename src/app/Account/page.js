'use client';
import { useRouter } from "next/navigation";
import { useUser } from '@auth0/nextjs-auth0';

export default function AccountPage() {
  const router = useRouter();
  const user = useUser();

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  console.log("User:", user.user.name);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 tracking-tight">Account</h1>
        <div className="text-2xl font-semibold mb-8 text-gray-700">Hi, {user.user.name || user.user.email}!</div>
        <button
          onClick={() => router.push('/auth/logout')}
          className="px-10 py-4 bg-red-600 text-white text-xl font-bold rounded-xl shadow-lg hover:bg-red-700 hover:scale-105 active:scale-95 transition transform"
        >
          Log Out
        </button>
      </div>
    </main>
  );
}