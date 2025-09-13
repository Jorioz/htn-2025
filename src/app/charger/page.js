import React from "react";
import Image from "next/image";

export default function page() {
    const nickname = "Philip St. Level 2 Charger";
    const location = "1111 Location St.";
    return (
        <div className="bg-gray-50 h-svh relative">
            <div className="h-2/5 relative">
                <Image
                    src="/ev-home-charger.jpg"
                    fill
                    className="object-cover object-right"
                    alt="ev-home-charger"
                />
                <div className="absolute bottom-0 w-full flex flex-col justify-center text-center p-3 rounded-t-4xl bg-gray-50">
                    <div className="text-black font-bold text-2xl">
                        {nickname}
                    </div>
                    <div className="text-sm text-black">{location}</div>
                </div>
            </div>
        </div>
    );
}
