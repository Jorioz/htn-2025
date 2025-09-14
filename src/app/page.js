"use client";
import Map from "../components/Map";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import NearbyWidget from "@/components/NearbyWidget";
import chargers from "./chargers";

export default function Home() {
    const [isVisible, setIsVisible] = useState(false);
    const [isToggleAvailable, setIsToggleAvailable] = useState(false);
    const [showAvailable, setShowAvailable] = useState(false);
    return (
        <main className="h-svh bg-gray-200 flex flex-col relative overflow-y-hidden">
            <Navbar />
            <div className="w-full flex-1 flex flex-col">
                <Map showAvailable={showAvailable} />
                <div
                    className="bg-white rounded-t-4xl drop-shadow z-10 absolute left-0 right-0 h-full transition-all duration-150"
                    style={{ bottom: isVisible ? -200 : -700 }}
                >
                    <div className="w-full flex justify-center items-center p-3 flex-col gap-5">
                        <button
                            className="w-12 h-2 rounded-full bg-gray-400 cursor-pointer"
                            onClick={() => setIsVisible((prev) => !prev)}
                        ></button>
                        <div className="w-full h-20 bg-gray-100 rounded-full p-3 flex items-center justify-between">
                            <button
                                className={`gap-2 p-3 h-15 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 duration-150 ${
                                    showAvailable
                                        ? "bg-emerald-300"
                                        : "bg-white"
                                }`}
                                onClick={() =>
                                    setShowAvailable((prev) => !prev)
                                }
                            >
                                <FaCheckCircle
                                    size={32}
                                    className="fill-gray-400"
                                />
                                <p className="text-gray-400">Available</p>
                            </button>
                        </div>
                        <div className="text-black">Chargers Nearby</div>
                        <div className="w-full grid-cols-2 grid gap-3">
                            {chargers.map((charger) => (
                                <NearbyWidget
                                    key={charger.id}
                                    className="col-span-1"
                                    title={charger.name}
                                    distance="N/A"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
