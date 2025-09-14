'use client';
import { useSearchParams } from 'next/navigation';
import chargers from '../chargers';
import { useState, useEffect } from 'react';
import WaitingBanner from './waitBanner';

export default function LiveSession() {
    const searchParams = useSearchParams();
    const chargerId = searchParams.get('id');
    const [charger, setCharger] = useState(null);
    const [data, setData] = useState({
        power: '—',
        time: '—',
        cost: '—',
        rate: '—',
    });
    const [stopped, setStopped] = useState(false);

    const [waiting, setWaiting] = useState(true);

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

    useEffect(() => {
        (async () => {
            while (true) {
                await new Promise(resolve => setTimeout(resolve, 500));
                
                const result = await fetch(`/api/get_stats?userid=${chargerId}`);

                const data = await result.json();
                if (data) {
                    setWaiting(false);
                    setData(data);
                }
            }
        })();
    });

    if (!charger) {
        return <main className="min-h-screen flex items-center justify-center"> Loading...</main>;
    }

    async function handleEndSession() {
        await fetch("/api/chargers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            action: "updateSession",
            chargerId: charger._id,
            available: true,
            customerId: null,
            }),
        });
        window.location.href = `/Summary?id=${chargerId}`;
        }

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-between p-8">
            <div className="w-full max-w-lg">
                <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 tracking-tight">
                    Live Session
                </h1>
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                    <WaitingBanner visible={waiting}/>
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
                    {[{ label: 'Power used', value: `${data.power} kW` },
                    { label: 'Time', value: data.time },
                    { label: 'Cost', value: `$${data.cost}` },
                    { label: 'Rate', value: `$${data.rate}/kWh` },
                    ].map(({ label, value }) => (
                        <div
                            key={label}
                            className="flex justify-between items-center text-2xl font-semibold"
                        >
                            <span className="text-gray-600">{label}</span>
                            <span className="text-gray-900 bg-gray-100 rounded-lg px-4 py-2 min-w-[120px] text-right">
                                {value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            {!stopped ? (
                <button
                    className="mt-12 px-10 py-4 bg-red-600 text-white text-xl font-bold rounded-xl shadow-lg hover:bg-red-700 hover:scale-105 active:scale-95 transition transform"
                    onClick={() => setStopped(true)}
                >
                    Stop
                </button>
            ) : (
                <div className="mt-12 flex gap-8">
                    <button
                        className="px-10 py-4 bg-green-600 text-white text-xl font-bold rounded-xl shadow-lg hover:bg-green-700 transition"
                        onClick={() => setStopped(false)}
                    >
                        Resume
                    </button>
                    <button
                        className="px-10 py-4 bg-blue-600 text-white text-xl font-bold rounded-xl shadow-lg hover:bg-blue-700 transition"
                        onClick={handleEndSession}
                    >
                        End Session
                    </button>
                </div>
            )}
        </main>
    );
}
