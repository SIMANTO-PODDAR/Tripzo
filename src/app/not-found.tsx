"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiHome, HiArrowLeft } from "react-icons/hi2";
import { TbError404 } from "react-icons/tb";

export default function NotFound() {
    const router = useRouter();

    return (
        <main className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-md text-center space-y-6">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    {/* Powered by AI badge */}
                    <div className="mb-10 flex justify-center">
                        <span className="badge badge-outline inline-flex items-center gap-2 rounded-full border-[#0F566C] px-5 py-2 text-sm font-medium text-[#0F566C]">
                            <TbError404 className="h-5 w-5" />
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#0F566C] mb-4">
                        Page Not Found
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed text-justify sm:text-center">
                        The page you&apos;re looking for isn&apos;t available right now.
                        Let&apos;s get you back to where you can continue exploring.
                    </p>
                </div>

                <div className="flex items-center justify-center gap-3">
                    <Button
                        onPress={() => router.back()}
                        className="bg-[#E88429] hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                    >
                        <HiArrowLeft className="w-5 h-5" /> Go Back
                    </Button>

                    <Link href="/">
                        <Button className="bg-[#E88429] hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200">
                            <HiHome className="w-5 h-5" /> Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}