"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Compass,
    MapPinned,
    Plane,
    Globe,
    Sparkles,
    ShieldCheck,
    CheckCircle2,
} from "lucide-react";
import { AuthMode } from "./types";

interface AuthShowcaseProps {
    mode: AuthMode;
}

export default function AuthShowcase({ mode }: AuthShowcaseProps) {
    return (
        <motion.div
            layout
            transition={{ type: "spring", stiffness: 350, damping: 32 }}
            className={`w-full lg:w-1/2 p-8 sm:p-10 lg:p-12 flex flex-col justify-center bg-linear-to-br from-[#0F566C]/5 via-[#0F566C]/10 to-[#E88429]/5 border-t lg:border-t-0 ${mode === "login"
                    ? "order-2 lg:order-2 lg:border-l border-gray-100"
                    : "order-2 lg:order-1 lg:border-r border-gray-100"
                }`}
        >
            <AnimatePresence mode="wait">
                {mode === "login" ? (
                    /* LOGIN SHOWCASE CONTENT */
                    <motion.div
                        key="login-showcase-view"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="max-w-md mx-auto lg:mx-0"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0F566C]/20 bg-white/80 px-3 py-1 text-xs font-medium text-[#0F566C] mb-6 shadow-xs">
                            <Compass className="w-3.5 h-3.5" />
                            Explore • Share • Inspire
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#0F566C] leading-tight">
                            Continue Your Journey
                        </h2>

                        {/* Description */}
                        <p className="text-gray-600 text-base mt-4 leading-relaxed">
                            Sign in to unlock a world of authentic travel stories, hidden gems, and
                            unforgettable experiences shared by explorers just like you.
                        </p>

                        {/* Feature List */}
                        <div className="mt-8 space-y-4">
                            <div className="flex items-start gap-3.5 bg-white/70 backdrop-blur-xs p-3.5 rounded-xl border border-gray-100">
                                <MapPinned className="w-5 h-5 text-[#E88429] mt-0.5 shrink-0" />
                                <div>
                                    <p className="font-semibold text-sm text-[#0F566C]">
                                        Discover Hidden Destinations
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        Browse verified journeys from around the globe.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3.5 bg-white/70 backdrop-blur-xs p-3.5 rounded-xl border border-gray-100">
                                <Plane className="w-5 h-5 text-[#E88429] mt-0.5 shrink-0" />
                                <div>
                                    <p className="font-semibold text-sm text-[#0F566C]">
                                        Share Your Travel Stories
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        Turn your memories into beautiful, permanent narratives.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3.5 bg-white/70 backdrop-blur-xs p-3.5 rounded-xl border border-gray-100">
                                <Globe className="w-5 h-5 text-[#E88429] mt-0.5 shrink-0" />
                                <div>
                                    <p className="font-semibold text-sm text-[#0F566C]">
                                        Connect with Travelers
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        Join thousands of adventurers exchanging real insights.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Trust badge */}
                        <div className="mt-8 pt-6 border-t border-gray-200/60 flex items-center gap-2 text-xs text-gray-500">
                            <ShieldCheck className="w-4 h-4 text-[#0F566C]" />
                            <span>Secure authentication powered by Firebase</span>
                        </div>
                    </motion.div>
                ) : (
                    /* REGISTER SHOWCASE CONTENT */
                    <motion.div
                        key="register-showcase-view"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="max-w-md mx-auto lg:mx-0"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0F566C]/20 bg-white/80 px-3 py-1 text-xs font-medium text-[#0F566C] mb-6 shadow-xs">
                            <Compass className="w-3.5 h-3.5" />
                            Explore • Share • Inspire
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#0F566C] leading-tight">
                            Begin Your Journey
                        </h2>

                        {/* Description */}
                        <p className="text-gray-600 text-base mt-4 leading-relaxed">
                            Join a global community of travelers. Share your stories, discover hidden gems,
                            and make every trip an experience worth telling.
                        </p>

                        {/* Feature List */}
                        <div className="mt-8 space-y-4">
                            <div className="flex items-start gap-3.5 bg-white/70 backdrop-blur-xs p-3.5 rounded-xl border border-gray-100">
                                <Sparkles className="w-5 h-5 text-[#E88429] mt-0.5 shrink-0" />
                                <div>
                                    <p className="font-semibold text-sm text-[#0F566C]">
                                        AI Story Generator
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        Transform your photos into engaging, well-crafted stories.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3.5 bg-white/70 backdrop-blur-xs p-3.5 rounded-xl border border-gray-100">
                                <MapPinned className="w-5 h-5 text-[#E88429] mt-0.5 shrink-0" />
                                <div>
                                    <p className="font-semibold text-sm text-[#0F566C]">
                                        AI Image Explorer
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        Gain rich context, mood, and insights from your travel photos.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3.5 bg-white/70 backdrop-blur-xs p-3.5 rounded-xl border border-gray-100">
                                <CheckCircle2 className="w-5 h-5 text-[#E88429] mt-0.5 shrink-0" />
                                <div>
                                    <p className="font-semibold text-sm text-[#0F566C]">
                                        Personal Travel Profile
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        Manage and publish your personal story collection anytime.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Trust badge */}
                        <div className="mt-8 pt-6 border-t border-gray-200/60 flex items-center gap-2 text-xs text-gray-500">
                            <ShieldCheck className="w-4 h-4 text-[#0F566C]" />
                            <span>Free to join • No hidden fees • Verified travelers</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
