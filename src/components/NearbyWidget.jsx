import React from "react";
import Image from "next/image";

export default function NearbyWidget({ className, title, distance }) {
    return (
        <div
            className={`${className} w-full bg-white drop-shadow-sm aspect-square rounded-4xl p-4`}
        >
            <div className="h-3/5 relative flex flex-col">
                <Image
                    src="/ev-home-charger.jpg"
                    fill
                    alt="cover image"
                    className="object-cover rounded-2xl drop-shadow-md"
                />
            </div>
            <h1 className="text-black font-bold">{title}</h1>
            <p className="text-black opacity-50">{distance} away</p>
        </div>
    );
}
