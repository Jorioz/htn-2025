import React from "react";
import Image from "next/image";
export default function ChargerPort({ src, title, active }) {
    return (
        <div
            className={`w-fit rounded-2xl aspect-square p-5 flex flex-col justify-center text-center  drop-shadow-md bg-white border-gray-300`}
            style={{ opacity: active ? 1 : 0.5 }}
        >
            <Image
                src={src}
                width="64"
                height="64"
                alt="type1"
                className="invert"
            />
            <div className="text-sm">{title}</div>
        </div>
    );
}
