"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiHome, HiArrowLeft } from "react-icons/hi2";

export default function NotFound() {
    const router = useRouter();

    return (
        <main className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-md text-center space-y-6">
                <h1 className="text-5xl font-bold" style={{ color: "#0F566C" }}>
                    Page Not Found
                </h1>
                <p className="text-gray-700 text-lg leading-relaxed">
                    The page you&apos;re looking for isn&apos;t available right now.
                    Let&apos;s get you back to where you can continue exploring.
                </p>

                <div className="flex items-center justify-center gap-3">
                    <Button
                        onPress={() => router.back()}
                        className="bg-[#E88429] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#d1731e] transition-colors duration-200"
                    >
                        <HiArrowLeft className="w-5 h-5" /> Go Back
                    </Button>

                    <Link href="/">
                        <Button className="bg-[#E88429] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#d1731e] transition-colors duration-200">
                            <HiHome className="w-5 h-5" /> Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}