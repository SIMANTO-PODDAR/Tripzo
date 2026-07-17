"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, Form, Input, InputGroup, TextField, Label } from "@heroui/react";
import toast from "react-hot-toast";
import { Eye, Compass, MapPinned, Plane, Globe } from "lucide-react";
import { auth } from "@/lib/firebase";
import { BsEyeSlash } from "react-icons/bs";

export default function LoginPage() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const Login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loadingToast = toast.loading("Logging in...");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Logged in successfully.", { id: loadingToast });
            router.push("/");
        } catch {
            toast.error("Login failed. Please try again.", { id: loadingToast });
        }
    };

    const DemoCredentials = () => {
        setEmail("John1@example.com");
        setPassword("John1@example.com");
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-white">
            {/* Left Hero Section */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-16">
                <div className="max-w-xl mx-auto lg:mx-0">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0F566C]/20 px-3 py-1 text-xs font-medium text-[#0F566C] mb-8">
                        <Compass className="w-3.5 h-3.5" />
                        Explore • Share • Inspire
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl xl:text-6xl font-bold text-[#0F566C] leading-tight">
                        Continue Your Journey
                    </h1>

                    {/* Description */}
                    <p className="text-body text-lg mt-6 max-w-xl">
                        Sign in to unlock a world of authentic travel stories, hidden gems, and
                        unforgettable experiences shared by explorers just like you.
                    </p>

                    {/* Feature List */}
                    <div className="mt-12 space-y-6">
                        <div className="flex items-start gap-4">
                            <MapPinned className="w-5 h-5 text-[#E88429] mt-0.5 shrink-0" />
                            <span className="text-body text-base">Discover Hidden Destinations</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <Plane className="w-5 h-5 text-[#E88429] mt-0.5 shrink-0" />
                            <span className="text-body text-base">Share Your Travel Stories</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <Globe className="w-5 h-5 text-[#E88429] mt-0.5 shrink-0" />
                            <span className="text-body text-base">Connect with Travelers Worldwide</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Login Card */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
                <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 lg:p-10 shadow-sm">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-heading">Welcome Back</h2>
                        <p className="text-body text-sm mt-1">Please sign in to continue</p>
                    </div>

                    <Form className="flex flex-col gap-4" onSubmit={Login}>
                        {/* Email */}
                        <TextField isRequired name="email" type="email">
                            <Label>Email</Label>
                            <Input
                                placeholder="john@example.com"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                    value={Password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={isVisible ? "text" : "password"}
                                    autoComplete="current-password"
                                />
                                <InputGroup.Suffix className="pr-0">
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="ghost"
                                        onPress={() => setIsVisible(!isVisible)}
                                        aria-label={isVisible ? "Hide password" : "Show password"}
                                    >
                                        {isVisible ? (
                                            <Eye className="size-4" />
                                        ) : (
                                            <BsEyeSlash className="size-4" />
                                        )}
                                    </Button>
                                </InputGroup.Suffix>
                            </InputGroup>
                        </TextField>

                        <div className="flex flex-col gap-3 mt-6">
                            <Button
                                type="submit"
                                className="bg-[#E88429] hover:bg-[#c96e1f] text-white font-semibold h-12 rounded-lg w-full"
                            >
                                Log In
                            </Button>

                            <Button
                                onClick={DemoCredentials}
                                variant="outline"
                                className="border-[#0F566C] text-[#0F566C] hover:bg-[#0F566C]/5 font-medium h-12 rounded-lg w-full"
                            >
                                Demo login
                            </Button>
                        </div>
                    </Form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Don’t have an account?{" "}
                        <Link
                            href="/registration"
                            className="font-medium text-[#E88429] hover:underline"
                        >
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}