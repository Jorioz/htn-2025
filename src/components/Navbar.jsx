import React from "react";
import { HiBolt } from "react-icons/hi2";
export default function Navbar() {
    return (
        <div className="w-full bg-black h-15 p-3 flex items-center gap-3">
            <HiBolt size={32} />
            <h1 className="text-2xl italic font-bold font-mono">Ample</h1>
        </div>
    );
}
