"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import {
    Button,
    Form,
    Input,
    InputGroup,
    TextField,
    Label,
    FieldError,
    Description,
} from "@heroui/react";
import toast from "react-hot-toast";
import { Eye } from "lucide-react";
import { BsEyeSlash } from "react-icons/bs";
import { auth } from "@/lib/firebase";
import GoogleSignInBtn from "@/components/share/GoogleSignInBtn";
import { motion } from "motion/react";

interface SignUpFormProps {
    onSwitchToLogin: () => void;
}

export default function SignUpForm({ onSwitchToLogin }: SignUpFormProps) {
    const router = useRouter();
    const [isRegisterPasswordVisible, setIsRegisterPasswordVisible] = useState(false);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loadingToast = toast.loading("Creating your account...");

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            await createUserWithEmailAndPassword(auth, email, password);

            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { displayName: name });
            }

            toast.success("Account created successfully. Welcome to Tripzo!", { id: loadingToast });
            router.push("/");
        } catch (error: unknown) {
            let message = "Something went wrong. Please try again.";

            const firebaseErr = error as { code?: string };
            if (firebaseErr?.code === "auth/email-already-in-use") {
                message = "This email is already registered.";
            } else if (firebaseErr?.code === "auth/weak-password") {
                message = "Password is too weak. Please use a stronger password.";
            } else if (firebaseErr?.code === "auth/invalid-email") {
                message = "Please enter a valid email address.";
            } else if (firebaseErr?.code === "auth/network-request-failed") {
                message = "Network error. Please check your connection.";
            }

            toast.error(message, { id: loadingToast });
        }
    };

    return (
        <motion.div
            key="register-form-view"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-full max-w-md mx-auto"
        >
            <div className="text-left mb-6">
                <h2 className="text-2xl font-bold text-[#0F566C]">Create Account</h2>
                <p className="text-gray-500 text-sm mt-1">Join our travel community</p>
            </div>

            <Form className="flex flex-col gap-4" onSubmit={handleRegister}>
                {/* Full Name */}
                <TextField
                    isRequired
                    name="name"
                    type="text"
                    minLength={3}
                    validate={(value) => {
                        if (!value.trim()) return "Name is required";
                        if (value.trim().length < 3) return "Name must be at least 3 characters";
                        return null;
                    }}
                >
                    <Label>Full Name</Label>
                    <Input placeholder="John Carter" autoComplete="name" />
                    <FieldError />
                </TextField>

                {/* Email */}
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                        if (!value.trim()) return "Email is required";
                        if (!pattern.test(value)) return "Please enter a valid email address";
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" autoComplete="username" />
                    <FieldError />
                </TextField>

                {/* Password */}
                <TextField
                    isRequired
                    name="password"
                    validate={(value) => {
                        if (!value) return "Password is required";
                        if (value.length < 8) return "Password must be at least 8 characters";
                        if (!/[A-Z]/.test(value)) return "Must contain at least one uppercase letter";
                        if (!/[a-z]/.test(value)) return "Must contain at least one lowercase letter";
                        if (!/[0-9]/.test(value)) return "Must contain at least one number";
                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <InputGroup>
                        <InputGroup.Input
                            className="w-full"
                            placeholder="Enter your password"
                            type={isRegisterPasswordVisible ? "text" : "password"}
                            autoComplete="new-password"
                        />
                        <InputGroup.Suffix className="pr-0">
                            <Button
                                isIconOnly
                                size="sm"
                                variant="ghost"
                                onPress={() => setIsRegisterPasswordVisible(!isRegisterPasswordVisible)}
                                aria-label={isRegisterPasswordVisible ? "Hide password" : "Show password"}
                            >
                                {isRegisterPasswordVisible ? (
                                    <Eye className="size-4" />
                                ) : (
                                    <BsEyeSlash className="size-4" />
                                )}
                            </Button>
                        </InputGroup.Suffix>
                    </InputGroup>
                    <Description>
                        Must be at least 8 characters with uppercase, lowercase & number
                    </Description>
                    <FieldError />
                </TextField>

                <div className="flex gap-2 justify-end mt-4">
                    <Button
                        type="submit"
                        className="bg-[#E88429] hover:bg-orange-600 text-white font-semibold h-12 rounded-lg w-full transition-colors cursor-pointer"
                    >
                        Register
                    </Button>
                </div>

                <div className="relative flex items-center gap-4 my-2">
                    <div className="flex-1 border-t border-gray-200"></div>
                    <span className="text-xs text-gray-400 font-medium">or</span>
                    <div className="flex-1 border-t border-gray-200"></div>
                </div>

                <GoogleSignInBtn redirectTo="/" />
            </Form>

            <p className="mt-6 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="font-medium text-[#E88429] hover:underline cursor-pointer"
                >
                    Log in
                </button>
            </p>
        </motion.div>
    );
}
