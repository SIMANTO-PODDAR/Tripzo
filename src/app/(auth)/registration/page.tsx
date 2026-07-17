"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Button, Form, Input, InputGroup, TextField, Label, FieldError, Description } from "@heroui/react";
import { Eye, Compass, MapPinned, Plane, Globe } from "lucide-react";
import toast from "react-hot-toast";
import { auth } from "@/lib/firebase";
import { BsEyeSlash } from "react-icons/bs";

export default function RegisterPage() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    const Register = async (e: React.FormEvent<HTMLFormElement>) => {
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
        } catch (error: any) {
            let message = "Something went wrong. Please try again.";

            if (error.code === "auth/email-already-in-use") {
                message = "This email is already registered.";
            } else if (error.code === "auth/weak-password") {
                message = "Password is too weak. Please use a stronger password.";
            } else if (error.code === "auth/invalid-email") {
                message = "Please enter a valid email address.";
            } else if (error.code === "auth/network-request-failed") {
                message = "Network error. Please check your connection.";
            }

            toast.error(message, { id: loadingToast });
        }
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
                        Begin Your Journey
                    </h1>

                    {/* Description */}
                    <p className="text-body text-lg mt-6 max-w-xl">
                        Join a global community of travelers. Share your stories, discover hidden gems,
                        and make every trip an experience worth telling.
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

            {/* Right Registration Card */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
                <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 lg:p-10 shadow-sm">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-heading">Create Account</h2>
                        <p className="text-body text-sm mt-1">Join our travel community</p>
                    </div>

                    <Form className="flex flex-col gap-4" onSubmit={Register}>
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
                                    type={isVisible ? "text" : "password"}
                                    autoComplete="new-password"
                                />
                                <InputGroup.Suffix className="pr-0">
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="ghost"
                                        onPress={() => setIsVisible(!isVisible)}
                                        aria-label={isVisible ? "Hide password" : "Show password"}
                                    >
                                        {isVisible ? <Eye className="size-4" /> : <BsEyeSlash className="size-4" />}
                                    </Button>
                                </InputGroup.Suffix>
                            </InputGroup>
                            <Description>Must be at least 8 characters with uppercase, lowercase & number</Description>
                            <FieldError />
                        </TextField>

                        <div className="flex gap-2 justify-end mt-6">
                            <Button
                                type="submit"
                                className="bg-[#E88429] hover:bg-orange-600 text-white font-semibold h-12 rounded-lg w-full"
                            >
                                Register
                            </Button>
                        </div>
                    </Form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link href="/login" className="font-medium text-[#E88429] hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}