"use client";

import { useState, useRef } from "react";
import { MapPin, CalendarDays, Upload, Check, User } from "lucide-react";
import toast from "react-hot-toast";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { FiFileText } from "react-icons/fi";
import { TbCameraShare } from "react-icons/tb";

const PostStoryPage = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { user } = useAuth();

    // Travel story fields
    const [title, setTitle] = useState("");
    const [storyDescription, setStoryDescription] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [travelDate, setTravelDate] = useState("");
    const [travelType, setTravelType] = useState("Solo Travel");
    const [imageUrl, setImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    // Image upload handlers 
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    const handleImageUpload = async (file: File) => {
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be under 5MB");
            return;
        }

        if (!file.type.startsWith("image/")) {
            toast.error("Please upload an image file");
            return;
        }

        try {
            setUploading(true);
            const uploadingToast = toast.loading("Uploading image...");

            const formData = new FormData();
            formData.append("image", file);

            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();

            if (data.success) {
                setImageUrl(data.data.url);
                toast.success("Image uploaded successfully", { id: uploadingToast });
            } else {
                toast.error("Upload failed", { id: uploadingToast });
            }
        } catch (error) {
            toast.error("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    // Form submission 
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            toast.error("You must be logged in to share a story.");
            return;
        }

        if (title.trim().length < 3 || title.trim().length > 50) {
            toast.error("Story title must be between 3 and 50 characters.");
            return;
        }

        if (storyDescription.trim().length > 2000) {
            toast.error("Description must be under 2000 characters.");
            return;
        }

        if (!city.trim()) {
            toast.error("City is required.");
            return;
        }

        if (!country.trim()) {
            toast.error("Country is required.");
            return;
        }

        if (!travelDate) {
            toast.error("Travel date is required.");
            return;
        }

        // Check future date
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(travelDate);
        if (selectedDate > today) {
            toast.error("Travel date cannot be in the future.");
            return;
        }

        if (!travelType) {
            toast.error("Please select a travel type.");
            return;
        }

        if (!imageUrl) {
            toast.error("A story image is required.");
            return;
        }

        const storyData = {
            title: title.trim(),
            description: storyDescription.trim(),
            location: [city.trim(), country.trim()],
            travelDate,
            travelType,
            image: imageUrl,
            userId: user.uid,
            userName: user.displayName,
            userEmail: user.email,
            createdAt: Timestamp.now(),
        };

        const loadingToast = toast.loading("Publishing your story...");
        try {
            await addDoc(collection(db, "allStories"), storyData);
            toast.success("Story shared successfully!", { id: loadingToast });

            // Reset form
            setTitle("");
            setStoryDescription("");
            setCity("");
            setCountry("");
            setTravelDate("");
            setTravelType("Solo Travel");
            setImageUrl("");
        } catch (error) {
            toast.error("Failed to share story. Please try again.", { id: loadingToast });
        }
    };

    // Today's date in YYYY-MM-DD for max attribute
    const todayString = new Date().toISOString().split("T")[0];

    return (
        <div className="py-5 md:py-15">
            {/* Header section */}
            <div className="text-center">
                <div className="mb-10 flex justify-center">
                    <span className="badge badge-outline inline-flex items-center gap-2 rounded-full border-[#0F566C] px-5 py-2 text-sm font-medium text-[#0F566C]">
                        <TbCameraShare className="w-4 h-4 text-[#0F566C]" />
                        Post Story
                    </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#0F566C] mb-4">
                    Share Your Travel Story
                </h2>
                <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed text-justify sm:text-center">
                    Share your real travel experiences, inspire other travelers, and build a collection of unforgettable journeys from around the world.
                </p>
            </div>

            {/* Form container */}
            <div className="max-w-4xl mx-auto px-4">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-xl rounded-2xl border border-gray-100 md:p-8 space-y-6"
                >
                    {/* Story Details */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <FiFileText className="w-5 h-5 text-[#0F566C]" />
                            Story Details
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Story Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    maxLength={50}
                                    minLength={3}
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. My Amazing Trek to Everest Base Camp"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent transition-all text-gray-700 bg-white"
                                />
                                <div className="text-right text-xs text-gray-400 mt-1">
                                    {title.length}/50 characters
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Story Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    maxLength={2000}
                                    required
                                    rows={4}
                                    value={storyDescription}
                                    onChange={(e) => setStoryDescription(e.target.value)}
                                    placeholder="Share your experience, highlights, tips, and memorable moments..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent transition-all text-gray-700 bg-white resize-none"
                                />
                                <div className="text-right text-xs text-gray-400 mt-1">
                                    {storyDescription.length}/2000 characters
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Location */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-[#0F566C]" />
                            Location
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    City <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="e.g. Cox’s Bazar"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent transition-all text-gray-700 bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Country <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    placeholder="e.g. Bangladesh"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent transition-all text-gray-700 bg-white"
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Travel Details */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <CalendarDays className="w-5 h-5 text-[#0F566C]" />
                            Travel Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Travel Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    required
                                    max={todayString}
                                    value={travelDate}
                                    onChange={(e) => setTravelDate(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent transition-all text-gray-700 bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Travel Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    required
                                    value={travelType}
                                    onChange={(e) => setTravelType(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent transition-all text-gray-700 bg-white"
                                >
                                    <option value="Solo Travel">Solo Travel</option>
                                    <option value="Adventure">Adventure</option>
                                    <option value="Cultural">Cultural</option>
                                    <option value="Family Trip">Family Trip</option>
                                    <option value="Couple Trip">Couple Trip</option>
                                    <option value="Mountain Trek">Mountain Trek</option>
                                    <option value="Wildlife Safari">Wildlife Safari</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Image Upload */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Upload className="w-5 h-5 text-[#0F566C]" />
                            Story Image <span className="text-red-500">*</span>
                        </h3>
                        <div className="flex flex-col gap-2">
                            {!imageUrl ? (
                                <div
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    className={`relative border-2 border-dashed rounded-xl p-6 transition-colors text-center ${dragActive
                                        ? "border-[#E88429] bg-orange-50"
                                        : "border-gray-300 hover:border-gray-400 bg-gray-50"
                                        } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
                                >
                                    <div className="flex flex-col items-center gap-3">
                                        {uploading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E88429]" />
                                                <p className="text-sm text-gray-600">Uploading...</p>
                                            </>
                                        ) : (
                                            <>
                                                <div className="p-3 rounded-full bg-gray-100">
                                                    <Upload className="w-6 h-6 text-gray-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">
                                                        Drop your photo here, or{" "}
                                                        <button
                                                            type="button"
                                                            onClick={() => fileInputRef.current?.click()}
                                                            className="hover:text-[#E88429] underline font-semibold"
                                                        >
                                                            browse
                                                        </button>
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Supports: JPG, PNG, GIF (Max 5MB)
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        disabled={uploading}
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center gap-4 p-3 border border-green-500 rounded-xl bg-green-50/30">
                                    <img
                                        src={imageUrl}
                                        alt="Story preview"
                                        className="w-24 h-16 rounded-lg object-cover border border-green-500 shrink-0"
                                    />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-700">Image uploaded</p>
                                        <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium mt-0.5">
                                            <Check className="w-3.5 h-3.5" /> Ready
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* User Information (read-only) */}
                    {user && (
                        <div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-[#0F566C]" />
                                Your Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={user.displayName || ""}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        readOnly
                                        value={user.email || ""}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <hr className="border-gray-100" />

                    {/* Submit */}
                    <div>
                        <button
                            type="submit"
                            disabled={uploading}
                            className="text-center flex items-center justify-center gap-2 bg-[#E88429] text-white font-semibold py-4 rounded-xl hover:bg-orange-600 transition-colors w-full"
                        >
                            <Check className="w-5 h-5" />
                            Post Story
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostStoryPage;