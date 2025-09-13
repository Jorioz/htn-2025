'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import chargers from '../chargers';
import { useEffect } from 'react';

export default function CheckIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get('id');
  const chargerId = Number(idParam);
  const charger = chargers.find(c => c.id === chargerId);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn !== "true") {
        const current = `/CheckIn?id=${chargerId}`;
        router.push(`/Login?from=${encodeURIComponent(current)}`);
      }
    }
  }, [router, chargerId]);

  if (!charger) {
    return <main className="min-h-screen flex items-center justify-center">Charger not found. (id: {idParam})</main>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-between p-8">
      <div className="w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 tracking-tight">
          Check In
        </h1>
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-2xl font-semibold flex justify-between items-center">
            <span className="text-gray-600">Name</span>
            <span className="text-gray-900 bg-gray-100 rounded-lg px-4 py-2 min-w-[120px] text-right">{charger.name}</span>
          </div>
          <div className="text-2xl font-semibold flex justify-between items-center">
            <span className="text-gray-600">Available</span>
            <span className="text-gray-900 bg-gray-100 rounded-lg px-4 py-2 min-w-[120px] text-right">{charger.available ? 'Yes' : 'No'}</span>
          </div>
          <div className="text-2xl font-semibold flex justify-between items-center">
            <span className="text-gray-600">Rate</span>
            <span className="text-gray-900 bg-gray-100 rounded-lg px-4 py-2 min-w-[120px] text-right">${charger.rate}/kWh</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => router.push(`/LiveSession?id=${charger.id}`)}
        className="mt-12 px-10 py-4 bg-green-600 text-white text-xl font-bold rounded-xl shadow-lg hover:bg-green-700 hover:scale-105 active:scale-95 transition transform"
      >
        Start Charging
      </button>
    </main>
  );
}
