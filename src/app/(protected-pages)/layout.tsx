"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FaCompass } from "react-icons/fa";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [loading, user, router]);

    if (loading) {
        return (
            <div
                className="flex min-h-[90vh] items-center justify-center px-4"
                role="status"
                aria-live="polite"
                aria-label="Checking authentication"
            >
                <div className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white px-8 py-10 text-center shadow-sm">
                    <div className="mx-auto mb-6 h-px w-12 bg-[#0F566C]" aria-hidden="true" />
                    <FaCompass
                        className="mx-auto mb-6 h-12 w-12 animate-spin text-[#0F566C] animation-duration-[3s]"
                        aria-hidden="true"
                    />
                    <h2 className="text-xl font-medium tracking-tight text-neutral-800">
                        Preparing your next adventure...
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                        We&apos;re verifying your account and getting everything ready.
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-1.5" aria-hidden="true">
                        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#E88429] [animation-delay:0ms]" />
                        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#E88429] [animation-delay:200ms]" />
                        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#E88429] [animation-delay:400ms]" />
                    </div>
                    <p className="mt-6 text-xs text-neutral-400">Please wait...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
}