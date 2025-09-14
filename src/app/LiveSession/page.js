"use client";
import { useSearchParams } from "next/navigation";
import chargers from "../chargers";
import { useState, useEffect } from "react";
import WaitingBanner from "./waitBanner";
import { globals } from "../clientGlobals";

export default function LiveSession() {
    const searchParams = useSearchParams();
    const chargerId = searchParams.get('id');
    const [charger, setCharger] = useState(null);
    const [data, setData] = useState({
        power: "—",
        time: "—",
        cost: "—",
        rate: "—",
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
                await new Promise((resolve) => setTimeout(resolve, 500));

                const result = await fetch(
                    `/api/get_stats?userid=${chargerId}`
                );

                const data = await result.json();
                if (data) {
                    setWaiting(false);
                    setData(data);

                    globals.connection.totalPower = data.totalPower;
                }
            }
        })();
    });

    useEffect(() => {
        if (stopped) {
            fetch(`/api/request_stop?userid=${chargerId}`);
        }
    }, [stopped, chargerId]);

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
        <main className="h-svh bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center">
            <nav className="w-full bg-black h-15 p-3 flex items-center justify-center">
                <h1 className="text-2xl italic font-bold font-mono flex-3">
                    Ample
                </h1>
                <div className="flex-1 flex gap-2 items-center justify-center">
                    <p className="font-mono ">
                        {waiting ? "Connecting..." : "Connected"}
                    </p>
                    <div className="relative w-3 h-3 flex items-center justify-center">
                        <div
                            className={`absolute w-3 h-3 rounded-full ${
                                waiting ? "bg-red-500" : "bg-green-500"
                            }`}
                        ></div>
                        <div
                            className={`absolute w-3 h-3 rounded-full ${
                                waiting ? "bg-red-500" : "bg-green-500"
                            } animate-ping`}
                        ></div>
                    </div>
                </div>
            </nav>
            <div className="w-full max-w-lg mt-5">
                <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 tracking-tight">
                    Live Session
                </h1>
                <div className="w-full px-3 py-3 gap-3">
                    <div className="w-full bg-white drop-shadow-md rounded-3xl p-3 flex flex-col">
                        <div className="relative w-full"></div>
                        <h1 className="text-black text-3xl">
                            Charger Details:
                        </h1>
                        <ul className="mt-2 space-y-2 list-inside pl-4">
                            <li className="text-black font-mono text-lg">
                                Name: {charger.name}
                            </li>
                            <li className="text-black font-mono text-lg">
                                Activation Fee: ${charger.fee}
                            </li>
                            <li className="text-black font-mono text-lg">
                                Rate: {charger.rate}/kWh
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="p-3">
                    <div className="w-full bg-white drop-shadow-md rounded-3xl flex flex-col h-fit p-4">
                        <div className="flex flex-row justify-between items-center gap-4">
                            <div className="flex flex-col items-center flex-1">
                                <span className="font-mono text-gray-500 text-sm">
                                    Time Charged
                                </span>
                                <span className="font-bold text-xl text-black">
                                    {data.time} h
                                </span>
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <span className="font-mono text-gray-500 text-sm">
                                    Power Used
                                </span>
                                <span className="font-bold text-xl text-black">
                                    {data.power}
                                </span>
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <span className="font-mono text-gray-500 text-sm">
                                    Current Cost
                                </span>
                                <span className="font-bold text-xl text-black">
                                    ${data.cost}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-3 flex justify-center items-center w-full">
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
                                onClick={handleEndSession()}
                            >
                                End Session
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
