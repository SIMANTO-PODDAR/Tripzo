"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { HiExclamationCircle, HiHome } from "react-icons/hi2";

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-md text-center space-y-6">
                <h1 className="text-5xl font-bold" style={{ color: "#0F566C" }}>
                    Something went wrong
                </h1>
                <p className="text-gray-700 text-lg leading-relaxed">
                    An unexpected issue occurred. Don’t worry — let’s get you back on
                    track.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button
                        onPress={() => reset()}
                        className="bg-[#E88429] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#d1731e] transition-colors duration-200"
                    >
                        <HiExclamationCircle className="w-5 h-5" /> Try again
                    </Button>

                    <Link href='/'>
                        <Button
                            className="bg-[#E88429] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#d1731e] transition-colors duration-200"
                        >
                            <HiHome className="w-5 h-5" />Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}