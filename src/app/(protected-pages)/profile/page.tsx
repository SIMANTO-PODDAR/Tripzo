"use client";

import { User, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ImProfile } from "react-icons/im";
import Link from "next/link";

export default function ProfilePage() {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <p className="text-gray-500 text-lg">
                    Please login to view profile
                </p>
            </div>
        );
    }

    return (
        <section className="min-h-[80vh] py-5 md:py-15 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <div className="mb-10 flex justify-center">
                        <span className="badge badge-outline inline-flex items-center gap-2 rounded-full border-[#0F566C] px-5 py-2 text-sm font-medium text-[#0F566C]">
                            <ImProfile className="w-4 h-4" />
                            Profile
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#0F566C] mb-4">
                        Tripzo Profile
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed text-justify sm:text-center">
                        Manage your account information and keep your travel
                        identity updated for your next adventure.
                    </p>
                </div>

                {/* Profile Card */}
                <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-8 md:p-10">
                    <div className="flex flex-col items-center text-center">
                        {/* Profile Image */}
                        <div className="relative w-32 h-32 mb-6">
                            <img
                                src={"https://i.ibb.co.com/xSqx1TWR/User-Avatar.png"}
                                alt="Profile Pic"
                                className="rounded-full w-30 h-30 object-cover border-4 border-[#0F566C]"
                            />
                        </div>

                        {/* User Info */}
                        <h3 className="text-3xl font-bold text-[#0F566C] mb-6">
                            {user.displayName || "Traveler"}
                        </h3>

                        <div className="space-y-4 w-full max-w-md">
                            <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-5 py-4">
                                <User className="w-5 h-5 text-[#E88429]" />

                                <div className="text-left">
                                    <p className="text-sm text-gray-500">
                                        Name
                                    </p>
                                    <p className="font-medium text-gray-800">
                                        {user.displayName || "Not added"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-5 py-4">
                                <Mail className="w-5 h-5 text-[#E88429]" />

                                <div className="text-left">
                                    <p className="text-sm text-gray-500">
                                        Email
                                    </p>
                                    <p className="font-medium text-gray-800 break-all text-sm sm:text-xl">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid w-full max-w-2xl grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                            <Link href="/post-story">
                                <button className="w-full rounded-xl border border-[#E88429] px-8 py-3 font-semibold text-[#E88429] hover:bg-[#E88429] hover:text-white transition">
                                    Post Story
                                </button>
                            </Link>

                            <Link href="/my-stories">
                                <button className="w-full rounded-xl border border-[#0F566C] px-8 py-3 font-semibold text-[#0F566C] hover:bg-[#0F566C] hover:text-white transition">
                                    My Stories
                                </button>
                            </Link>

                            <Link href="/ai-story-generator">
                                <button className="w-full rounded-xl border border-[#E88429] px-8 py-3 font-semibold text-[#E88429] hover:bg-[#E88429] hover:text-white transition">
                                    AI Story Generator
                                </button>
                            </Link>

                            <Link href="/ai-image-explorer">
                                <button className="w-full rounded-xl border border-[#0F566C] px-8 py-3 font-semibold text-[#0F566C] hover:bg-[#0F566C] hover:text-white transition">
                                    AI Image Explorer
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}