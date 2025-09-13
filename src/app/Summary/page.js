'use client';
import { useRouter, useSearchParams } from "next/navigation";
import chargers from '../chargers';

export default function SummaryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get('id');
  const chargerId = Number(idParam);
  const charger = chargers.find(c => c.id === chargerId);

  // change
  const kwh = 24.5;
  const total = charger ? (charger.rate * kwh).toFixed(2) : '0.00';

  function handleConfirm() {
    router.push(`/Receipt?id=${chargerId}`);
  }

  if (!charger) {
    return <main className="min-h-screen flex items-center justify-center">Charger not found. (id: {idParam})</main>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 tracking-tight">Session Summary</h1>
        <div className="text-2xl font-semibold mb-6 text-gray-700">Charger: <span className="bg-gray-100 rounded-lg px-4 py-2">{charger.name}</span></div>
        <div className="text-xl mb-4 text-gray-700">Rate: <span className="font-bold">${charger.rate}/kWh</span></div>
        <div className="text-xl mb-4 text-gray-700">Energy Used: <span className="font-bold">{kwh} kWh</span></div>
        <div className="text-xl mb-8 text-gray-700">Total: <span className="font-bold">${total}</span></div>
        <button
          onClick={handleConfirm}
          className="px-10 py-4 bg-green-600 text-white text-xl font-bold rounded-xl shadow-lg hover:bg-green-700 hover:scale-105 active:scale-95 transition transform"
        >
          Confirm & Pay
        </button>
      </div>
    </main>
  );
}
