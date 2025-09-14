'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';

export default function ReceiptPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chargerId = searchParams.get('id');

  const [charger, setCharger] = useState(null);

  useEffect(() => {
    async function fetchCharger() {
      const res = await fetch('/api/chargers');
      const data = await res.json();
      const found = data.find(c => c._id === chargerId);
      setCharger(found);
    }
    fetchCharger();
  }, [chargerId]);

  const kwh = searchParams.get('kwh');
  const total = searchParams.get('total');

  if (!charger) {
    return <main className="min-h-screen flex items-center justify-center">Loading...</main>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 tracking-tight">Payment Confirmation</h1>
        <div className="text-2xl font-semibold mb-6 text-gray-700">Charger: <span className="bg-gray-100 rounded-lg px-4 py-2">{charger.name}</span></div>
        <div className="text-xl mb-4 text-gray-700">
            Date: <span className="font-bold">{new Date().toLocaleString()}</span>
        </div>
        <div className="text-xl mb-4 text-gray-700">
            Rate: <span className="font-bold">${charger.rate.toFixed(2)} / kWh</span>
        </div>
        <div className="text-xl mb-4 text-gray-700">Energy: <span className="font-bold">{kwh} kWh</span></div>
        <div className="text-xl mb-8 text-gray-700">Total: <span className="font-bold">${total}</span></div>
        <div className="flex gap-6">
          <button
            onClick={() => router.push("/")}
            className="px-8 py-3 bg-green-600 text-white text-lg font-bold rounded-xl shadow hover:bg-green-700 transition"
          >
            Home
          </button>
          <button
            onClick={() => router.push("/Account")}
            className="px-8 py-3 bg-blue-600 text-white text-lg font-bold rounded-xl shadow hover:bg-blue-700 transition"
          >
            Account
          </button>
        </div>
      </div>
    </main>
  );
}
