"use client";

import { useState, useRef, useEffect } from "react";
import {
    Sparkles,
    Bot,
    User,
    LoaderCircle,
    Check,
    Copy,
    RefreshCw,
    Send,
    ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";

// ---------- Types ----------
import type { ChatMessage } from "@/types/shared/ai";

// ---------- Hidden constants ----------
const HIDDEN_PROMPT =
    "Analyze this travel image and provide useful context including scene description, important objects, mood, location hints, and travel insights.";
const HIDDEN_STORY_LENGTH = "300-400";

export default function ImageUnderstandingPage() {
    // ----- Image upload states -----
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageUrl, setImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // ----- Chat states -----
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // ----- Cleanup preview URL -----
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    // ----- Auto‑scroll chat to bottom -----
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    // ============ IMAGE UPLOAD HANDLERS  ============
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

        if (previewUrl) URL.revokeObjectURL(previewUrl);
        const localPreview = URL.createObjectURL(file);
        setPreviewUrl(localPreview);

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
                setPreviewUrl(null);
                toast.success("Image uploaded successfully", { id: uploadingToast });
            } else {
                setPreviewUrl(null);
                toast.error("Upload failed", { id: uploadingToast });
            }
        } catch (error) {
            setPreviewUrl(null);
            toast.error("Upload failed due to network error");
        } finally {
            setUploading(false);
        }
    };

    const removeImage = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setImageUrl("");
        setPreviewUrl(null);
    };

    // ============ ANALYZE HANDLER ============
    const handleAnalyze = async () => {
        if (!imageUrl || uploading) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            type: "user",
            content: {
                imageUrl,
            },
        };

        const aiMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            type: "ai",
            content: {
                imageUrl,
                prompt: HIDDEN_PROMPT,
                storyLength: HIDDEN_STORY_LENGTH,
                loading: true,
            },
        };

        setMessages((prev) => [...prev, userMsg, aiMsg]);

        // Reset upload state (keep image cleared so user can upload another)
        setImageUrl("");
        setPreviewUrl(null);

        // Call API to analyze image
        try {
            const res = await fetch("/api/ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imageUrl,
                    prompt: HIDDEN_PROMPT,
                    storyLength: HIDDEN_STORY_LENGTH,
                    type: "image-analysis",
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === aiMsg.id
                            ? {
                                ...msg,
                                content: {
                                    ...msg.content,
                                    analysis: data.analysis,
                                    loading: false,
                                },
                            }
                            : msg
                    )
                );
            } else {
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === aiMsg.id
                            ? {
                                ...msg,
                                content: {
                                    ...msg.content,
                                    error: data.error || "Failed to analyze image",
                                    loading: false,
                                },
                            }
                            : msg
                    )
                );
                toast.error(data.error || "Failed to analyze image");
            }
        } catch (error) {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === aiMsg.id
                        ? {
                            ...msg,
                            content: {
                                ...msg.content,
                                error: "Network error occurred",
                                loading: false,
                            },
                        }
                        : msg
                )
            );
            toast.error("Network error occurred");
        }
    };

    // ----- Derived state -----
    const canAnalyze = !!imageUrl && !uploading;

    return (
        <div className="flex flex-col min-h-[90vh] bg-gray-50">
            {/* Minimal Header */}
            <header className="shrink-0 border-b border-gray-200 bg-white py-4 px-6">
                <div className="max-w-4xl mx-auto flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#E88429]" />
                    <h1 className="text-xl font-bold text-[#0F566C]">AI Image Explorer</h1>
                </div>
                <p className="text-sm text-gray-500 mt-1 max-w-4xl mx-auto">
                    Upload your travel photo and let AI understand the scene, objects, mood, and useful travel
                    context.
                </p>
            </header>

            {/* Chat area (scrollable) */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 py-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 py-20">
                            <div className="mb-3 rounded-full bg-gray-100 p-4">
                                <Bot className="h-8 w-8 text-[#0F566C]" />
                            </div>
                            <p className="text-sm font-medium">AI image analysis will appear here.</p>
                            <p className="text-xs mt-1">Upload a travel image and click analyze to get started.</p>
                        </div>
                    ) : (
                        messages.map((msg) => <ChatBubble key={msg.id} message={msg} onAnalyzeAgain={handleAnalyze} setImageUrl={setImageUrl} />)
                    )}
                </div>
            </div>

            {/* Fixed Composer */}
            <div className="shrink-0 border-t border-gray-200 bg-white p-4">
                <div className="max-w-4xl mx-auto">
                    {/* Drag overlay for composer */}
                    <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`relative flex items-center gap-3 rounded-2xl border-2 p-3 transition-colors ${dragActive
                            ? "border-[#E88429] bg-orange-50"
                            : "border-gray-300 bg-white hover:border-gray-400"
                            }`}
                    >
                        {/* Hidden file input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                            disabled={uploading}
                        />

                        {/* Image upload area */}
                        <div className="flex-1 min-w-0">
                            {imageUrl || previewUrl ? (
                                <div className="flex items-center gap-3">
                                    <div className="relative shrink-0">
                                        <img
                                            src={previewUrl || imageUrl}
                                            alt="Preview"
                                            className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                                        />
                                        {!uploading && (
                                            <button
                                                onClick={removeImage}
                                                className="absolute -top-1 -right-1 rounded-full bg-red-500 text-white p-0.5 hover:bg-red-600 transition-colors"
                                                title="Remove image"
                                            >
                                                <Check className="w-3 h-3" />
                                            </button>
                                        )}
                                        {uploading && (
                                            <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
                                                <LoaderCircle className="h-4 w-4 text-white animate-spin" />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 truncate">
                                        {uploading ? "Uploading..." : "Image ready"}
                                    </p>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors text-gray-500 hover:text-[#0F566C]"
                                >
                                    <ImageIcon className="w-6 h-6" />
                                    <span className="text-sm font-medium">Click or drag to upload image</span>
                                </button>
                            )}
                        </div>

                        {/* Analyze button */}
                        <button
                            onClick={handleAnalyze}
                            disabled={!canAnalyze}
                            className="shrink-0 p-2 rounded-full bg-[#E88429] text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                            title="Analyze image"
                        >
                            {uploading ? (
                                <LoaderCircle className="h-5 w-5 animate-spin" />
                            ) : (
                                <Send className="h-5 w-5" />
                            )}
                        </button>
                    </div>

                    {/* Helper text */}
                    <p className="text-xs text-gray-400 mt-2 text-center">
                        AI can make mistakes. Check important info.
                    </p>
                </div>
            </div>
        </div>
    );
}

// ---------- Chat Bubble Component ----------
function ChatBubble({ message, onAnalyzeAgain, setImageUrl }: { message: ChatMessage; onAnalyzeAgain: () => Promise<void>; setImageUrl: (url: string) => void }) {
    const isUser = message.type === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${isUser
                    ? "bg-[#0F566C] text-white rounded-br-none"
                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                    }`}
            >
                {/* Header icon */}
                <div className="flex items-center gap-2 mb-2">
                    <div
                        className={`rounded-full p-1 ${isUser ? "bg-white/20" : "bg-[#E88429]/10"
                            }`}
                    >
                        {isUser ? (
                            <User className="h-4 w-4 text-white" />
                        ) : (
                            <Bot className="h-4 w-4 text-[#E88429]" />
                        )}
                    </div>
                    <span className="text-xs font-semibold opacity-80">
                        {isUser ? "You" : "AI Assistant"}
                    </span>
                </div>

                {/* Content */}
                {isUser ? (
                    <div className="space-y-2">
                        {message.content.imageUrl ? (
                            <div className="flex flex-col items-center">
                                <img
                                    src={message.content.imageUrl}
                                    alt="Travel"
                                    className="max-h-48 rounded-xl object-cover"
                                />
                                <p className="text-xs mt-1 opacity-80">Travel image uploaded</p>
                            </div>
                        ) : (
                            <p className="text-sm italic opacity-60">No image provided</p>
                        )}
                    </div>
                ) : (
                    <div className="text-sm space-y-2">
                        <p className="font-medium text-[#0F566C]">Image Analysis</p>
                        {message.content.loading && (
                            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800 flex items-start gap-2">
                                <LoaderCircle className="h-4 w-4 animate-spin mt-0.5 shrink-0" />
                                <span>Analyzing your travel image...</span>
                            </div>
                        )}
                        {message.content.error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800">
                                {message.content.error}
                            </div>
                        )}
                        {message.content.analysis && (
                            <div className="mt-3">
                                <p className="leading-relaxed whitespace-pre-wrap">{message.content.analysis}</p>
                            </div>
                        )}
                        {!message.content.loading && !message.content.error && (
                            <div className="flex gap-2 pt-2">
                                <button
                                    onClick={() => {
                                        if (message.content.imageUrl) {
                                            setImageUrl(message.content.imageUrl!);
                                            onAnalyzeAgain();
                                        }
                                    }}
                                    className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                                >
                                    <RefreshCw className="w-3 h-3" />
                                    Analyze Again
                                </button>
                                <button
                                    onClick={() => {
                                        if (message.content.analysis) {
                                            navigator.clipboard.writeText(message.content.analysis!);
                                            toast.success("Analysis copied to clipboard");
                                        }
                                    }}
                                    className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                                >
                                    <Copy className="w-3 h-3" />
                                    Copy
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}