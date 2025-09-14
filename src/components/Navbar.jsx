import React from "react";
import { HiBolt } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";

export default function Navbar() {
    const router = useRouter();
    const user = useUser();

    return (
        <div className="w-full bg-black h-15 p-3 flex items-center justify-center gap-3">
            <Image
                src="/logo.svg"
                width="32"
                height="32"
                alt="AmpleLogo"
                className="invert"
            />
            <h1 className="text-2xl italic font-bold font-mono mt-1">Ample</h1>
            <div className="flex-1" />
            <button
                onClick={() =>
                    router.push(user.user ? "/Account" : "/auth/login")
                }
                className="bg-yellow-400 text-bold px-4 py-2 rounded-lg hover:bg-yellow-500 font-bold transition"
            >
                {user.user ? "Account" : "Log In"}
            </button>
        </div>
    );
}
