"use client";
import React from "react";
import Image from "next/image";
import ChargerPort from "@/components/ChargerPort";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const chargerId = searchParams.get("id");

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

    if (!charger) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    async function handleCheckIn() {
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

    const nickname = charger.name;
    const location = charger.description;
    return (
        <div className="bg-gray-100 h-svh relative">
            <div className="h-2/5 relative">
                <Image
                    src="/ev-home-charger.jpg"
                    fill
                    className="object-cover object-right"
                    alt="ev-home-charger"
                />
                <div className="absolute bottom-0 w-full flex flex-col justify-center text-center p-3 rounded-t-4xl bg-gray-100 ">
                    <div className="text-black font-bold text-2xl">
                        {nickname}
                    </div>
                    <div className="text-sm text-black">{location}</div>
                </div>
            </div>
            <div className="px-4 pb-32">
                <div className="text-black  text-sm font-semibold py-3">
                    PLUGS
                </div>
                <div className="text-black text-xl flex justify-between border-black">
                    <ChargerPort src="/type1.svg" title="J1172" active={true} />
                    <ChargerPort src="/nacs.svg" title="NACS" active={false} />
                    <ChargerPort
                        src="/chademo.svg"
                        title="CHAdeMO"
                        active={false}
                    />
                </div>
                <div className="text-black  text-sm font-semibold py-3">
                    COST
                </div>
                <div className="bg-white w-full text-black  drop-shadow-md p-3 rounded-2xl">
                    <h1>
                        Activation:{" "}
                        <span className="font-bold">${charger.fee}</span>
                    </h1>
                    <h1>
                        Fee:{" "}
                        <span className="font-bold">${charger.rate}/kWh</span>
                    </h1>
                    <h1>
                        Ample Service Fee: <span className="font-bold">$1</span>
                    </h1>
                </div>
            </div>
            <div className="absolute bottom-6 left-0 w-full flex justify-center">
                <button
                    className="bg-emerald-300 rounded-full p-5 w-11/12 text-center font-bold"
                    onClick={handleCheckIn}
                >
                    CHECK IN
                </button>
            </div>
        </div>
    );
}