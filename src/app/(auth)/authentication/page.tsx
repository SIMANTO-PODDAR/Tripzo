"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    AuthModeToggle,
    SignInForm,
    SignUpForm,
    AuthShowcase,
    AuthMode,
} from "@/components/auth";
import { Compass } from "lucide-react";

export default function AuthenticationPage() {
    const [mode, setMode] = useState<AuthMode>("login");

    return (
        <div className="w-full min-h-[calc(100vh-140px)] py-5 md:py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
            {/* Top Navigation & Mode Segmented Toggle */}
            <div className="w-full max-w-md mx-auto mb-8 flex flex-col items-center text-center">
                <div className="flex flex-col items-center text-center">
                    {/* Header Badge */}
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0F566C]/20 bg-[#0F566C]/5 px-3.5 py-1 text-xs font-semibold text-[#0F566C] mb-4">
                        <Compass className="w-3.5 h-3.5" />
                        Tripzo Authentication
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-[#0F566C] tracking-tight mb-2">
                        {mode === "login" ? "Welcome Back to Tripzo" : "Join the Tripzo Community"}
                    </h1>
                    <p className="text-sm text-gray-500 max-w-sm mb-6">
                        {mode === "login"
                            ? "Sign in to manage your journeys and discover inspiring stories."
                            : "Create an account to start documenting and sharing your travels."}
                    </p>
                </div>

                <AuthModeToggle mode={mode} onModeChange={setMode} />
            </div>

            {/* Unified Two-Column Authentication Card */}
            <div className="w-full max-w-5xl rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50 overflow-hidden flex flex-col lg:flex-row transition-all duration-300">
                {/* COLUMN: AUTHENTICATION FORM */}
                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 350, damping: 32 }}
                    className={`w-full lg:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white ${mode === "login" ? "order-1 lg:order-1" : "order-1 lg:order-2"
                        }`}
                >
                    <AnimatePresence mode="wait">
                        {mode === "login" ? (
                            <SignInForm onSwitchToRegister={() => setMode("register")} />
                        ) : (
                            <SignUpForm onSwitchToLogin={() => setMode("login")} />
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* COLUMN: SHOWCASE PANEL */}
                <AuthShowcase mode={mode} />
            </div>
        </div>
    );
}
