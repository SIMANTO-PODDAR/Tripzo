"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
    Button,
    Form,
    Input,
    InputGroup,
    TextField,
    Label,
} from "@heroui/react";
import toast from "react-hot-toast";
import { Eye } from "lucide-react";
import { BsEyeSlash } from "react-icons/bs";
import { auth } from "@/lib/firebase";
import GoogleSignInBtn from "@/components/share/GoogleSignInBtn";
import { motion } from "motion/react";

interface SignInFormProps {
    onSwitchToRegister: () => void;
}

export default function SignInForm({ onSwitchToRegister }: SignInFormProps) {
    const router = useRouter();
    const [isLoginPasswordVisible, setIsLoginPasswordVisible] = useState(false);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loadingToast = toast.loading("Logging in...");

        const formData = new FormData(e.currentTarget);
        const email = (formData.get("email") as string) || loginEmail;
        const password = (formData.get("password") as string) || loginPassword;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Logged in successfully.", { id: loadingToast });
            router.push("/profile");
        } catch {
            toast.error("Login failed. Please try again.", { id: loadingToast });
        }
    };

    const handleDemoCredentials = () => {
        setLoginEmail("John1@example.com");
        setLoginPassword("John1@example.com");
        toast.success("Demo credentials loaded!");
    };

    return (
        <motion.div
            key="login-form-view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-full max-w-md mx-auto"
        >
            <div className="text-left mb-6">
                <h2 className="text-2xl font-bold text-[#0F566C]">Welcome Back</h2>
                <p className="text-gray-500 text-sm mt-1">Please sign in to continue</p>
            </div>

            <Form className="flex flex-col gap-4" onSubmit={handleLogin}>
                {/* Email */}
                <TextField isRequired name="email" type="email">
                    <Label>Email</Label>
                    <Input
                        placeholder="john@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        autoComplete="email"
                    />
                </TextField>

                {/* Password */}
                <TextField isRequired name="password">
                    <Label>Password</Label>
                    <InputGroup>
                        <InputGroup.Input
                            className="w-full"
                            placeholder="Enter your password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            type={isLoginPasswordVisible ? "text" : "password"}
                            autoComplete="current-password"
                        />
                        <InputGroup.Suffix className="pr-0">
                            <Button
                                isIconOnly
                                size="sm"
                                variant="ghost"
                                onPress={() => setIsLoginPasswordVisible(!isLoginPasswordVisible)}
                                aria-label={isLoginPasswordVisible ? "Hide password" : "Show password"}
                            >
                                {isLoginPasswordVisible ? (
                                    <Eye className="size-4" />
                                ) : (
                                    <BsEyeSlash className="size-4" />
                                )}
                            </Button>
                        </InputGroup.Suffix>
                    </InputGroup>
                </TextField>

                <div className="flex flex-col gap-3 mt-4">
                    <Button
                        type="submit"
                        className="bg-[#E88429] hover:bg-orange-600 text-white font-semibold h-12 rounded-lg w-full transition-colors cursor-pointer"
                    >
                        Log In
                    </Button>

                    <Button
                        type="button"
                        onClick={handleDemoCredentials}
                        variant="outline"
                        className="border-[#0F566C] text-[#0F566C] hover:bg-[#0F566C]/5 font-medium h-12 rounded-lg w-full transition-colors cursor-pointer"
                    >
                        Demo login
                    </Button>

                    <div className="relative flex items-center gap-4 my-2">
                        <div className="flex-1 border-t border-gray-200"></div>
                        <span className="text-xs text-gray-400 font-medium">or</span>
                        <div className="flex-1 border-t border-gray-200"></div>
                    </div>

                    <GoogleSignInBtn redirectTo="/profile" />
                </div>
            </Form>

            <p className="mt-6 text-center text-sm text-gray-500">
                Don’t have an account?{" "}
                <button
                    type="button"
                    onClick={onSwitchToRegister}
                    className="font-medium text-[#E88429] hover:underline cursor-pointer"
                >
                    Create one
                </button>
            </p>
        </motion.div>
    );
}
