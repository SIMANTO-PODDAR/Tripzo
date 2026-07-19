"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { auth } from "@/lib/firebase";
import { Globe } from "lucide-react";

interface GoogleSignInBtnProps {
    redirectTo?: string;
}

const GoogleSignInBtn = ({ redirectTo = "/profile" }: GoogleSignInBtnProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        if (isLoading) return;

        setIsLoading(true);
        const loadingToast = toast.loading("Signing in with Google...");

        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            toast.success("Signed in successfully with Google.", { id: loadingToast });
            router.push(redirectTo);
        } catch (error: any) {
            let message = "Google sign-in failed. Please try again.";

            if (error.code === "auth/popup-closed-by-user") {
                message = "Sign-in was cancelled.";
            } else if (error.code === "auth/popup-blocked") {
                message = "Popup was blocked. Please allow popups for this site.";
            } else if (error.code === "auth/account-exists-with-different-credential") {
                message = "An account already exists with the same email address.";
            } else if (error.code === "auth/network-request-failed") {
                message = "Network error. Please check your connection.";
            }

            toast.error(message, { id: loadingToast });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={handleGoogleSignIn}
            isDisabled={isLoading}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 font-medium h-12 rounded-lg w-full flex items-center justify-center gap-2"
        >
            <Globe className="w-5 h-5" />
            {isLoading ? "Signing in..." : "Sign in with Google"}
        </Button>
    );
};

export default GoogleSignInBtn;