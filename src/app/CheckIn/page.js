'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CheckIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chargerId = searchParams.get('id');

  const [charger, setCharger] = useState(null);

  useEffect(() => {
    async function fetchCharger() {
      const res = await fetch('/api/chargers');
      const data = await res.json();
      console.log(data);
      const found = data.find(c => c._id === chargerId);
      setCharger(found);
    }
    fetchCharger();
  }, [chargerId]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const isLoggedIn = localStorage.getItem("isLoggedIn");
  //     if (isLoggedIn !== "true") {
  //       const current = `/CheckIn?id=${chargerId}`;
  //       router.push(`/Login?from=${encodeURIComponent(current)}`);
  //     }
  //   }
  // }, [router, chargerId]);

  if (!charger) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading...
      </main>
    );
  }

  async function handleStartCharging() {
    const userId = "1"; // TODO user id
    await fetch("/api/chargers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "updateSession",
        chargerId: charger._id,
        available: false,
        customerId: userId,
      }),
    });
    router.push(`/LiveSession?id=${charger._id}`);
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
        onClick={handleStartCharging}
        className="mt-12 px-10 py-4 bg-green-600 text-white text-xl font-bold rounded-xl shadow-lg hover:bg-green-700 hover:scale-105 active:scale-95 transition transform"
      >
        Start Charging
      </button>
    </main>
  );
}
