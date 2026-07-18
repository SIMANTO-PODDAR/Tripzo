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
    Paperclip,
    Send,
} from "lucide-react";
import toast from "react-hot-toast";

// ---------- Types ----------
interface ChatMessage {
    id: string;
    type: "user" | "ai";
    content: {
        imageUrl?: string;
        prompt?: string;
        storyLength?: string;
    };
}

export default function StoryGeneratorPage() {
    // ----- Image upload states -----
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageUrl, setImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // ----- Form states -----
    const [prompt, setPrompt] = useState("");
    const [storyLength, setStoryLength] = useState("");

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

    // ============ GENERATE HANDLER ============
    const handleGenerate = () => {
        if (!imageUrl || !prompt.trim() || !storyLength) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            type: "user",
            content: {
                imageUrl,
                prompt: prompt.trim(),
                storyLength,
            },
        };

        const aiMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            type: "ai",
            content: {
                imageUrl,
                prompt: prompt.trim(),
                storyLength,
            },
        };

        setMessages((prev) => [...prev, userMsg, aiMsg]);

        // Clear composer inputs
        setImageUrl("");
        setPreviewUrl(null);
        setPrompt("");
        setStoryLength("");
    };

    // ----- Derived state -----
    const isGenerateDisabled = !imageUrl || !prompt.trim() || !storyLength || uploading;

    return (
        <div className="flex flex-col min-h-[90vh] bg-gray-50">
            {/* Minimal Header */}
            <header className="shrink-0 border-b border-gray-200 bg-white py-4 px-6">
                <div className="max-w-4xl mx-auto flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#E88429]" />
                    <h1 className="text-xl font-bold text-[#0F566C]">AI Story Generator</h1>
                </div>
                <p className="text-sm text-gray-500 mt-1 max-w-4xl mx-auto">
                    Upload a travel image, describe your experience, and generate a story with AI.
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
                            <p className="text-sm font-medium">Your generated story will appear here.</p>
                            <p className="text-xs mt-1">Start by uploading an image and describing your trip below.</p>
                        </div>
                    ) : (
                        messages.map((msg) => <ChatBubble key={msg.id} message={msg} />)
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
                        className={`relative flex flex-col lg:flex-row lg:items-end gap-3 rounded-2xl border-2 p-3 transition-colors ${dragActive
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

                        {/* Image upload button / thumbnail */}
                        <div className="shrink-0 self-center">
                            {imageUrl || previewUrl ? (
                                <div className="relative">
                                    <img
                                        src={previewUrl || imageUrl}
                                        alt="Preview"
                                        className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                                    />
                                    {!uploading && (
                                        <button
                                            onClick={() => {
                                                setImageUrl("");
                                                setPreviewUrl(null);
                                            }}
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
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-[#0F566C] transition-colors"
                                    title="Attach image"
                                >
                                    <Paperclip className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {/* Textarea (auto-grow) */}
                        <div className="flex-1 min-w-0">
                            <textarea
                                rows={1}
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Describe your travel experience..."
                                className="w-full resize-none bg-transparent py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                                style={{ height: "auto", maxHeight: "120px" }}
                                onInput={(e) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    target.style.height = "auto";
                                    target.style.height = target.scrollHeight + "px";
                                }}
                            />
                        </div>

                        {/* Story length dropdown */}
                        <select
                            value={storyLength}
                            onChange={(e) => setStoryLength(e.target.value)}
                            className="shrink-0 bg-transparent border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent appearance-none"
                        >
                            <option value="" disabled>
                                Select Length
                            </option>
                            <option value="200-300">200-300 words</option>
                            <option value="300-400">300-400 words</option>
                            <option value="400-500">400-500 words</option>
                        </select>

                        {/* Generate button */}
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerateDisabled}
                            className="shrink-0 p-2 rounded-full bg-[#E88429] text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                            title="Generate story"
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
function ChatBubble({ message }: { message: ChatMessage }) {
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
                    <div className="space-y-2 text-sm">
                        {message.content.imageUrl && (
                            <div className="flex justify-center">
                                <img
                                    src={message.content.imageUrl}
                                    alt="Travel"
                                    className="max-h-32 rounded-xl object-cover"
                                />
                            </div>
                        )}
                        {message.content.prompt && (
                            <p className="leading-relaxed">{message.content.prompt}</p>
                        )}
                        {message.content.storyLength && (
                            <span className="inline-block bg-white/20 text-white text-xs px-2 py-0.5 rounded-full mt-1">
                                {message.content.storyLength} words
                            </span>
                        )}
                    </div>
                ) : (
                    <div className="text-sm space-y-2">
                        <p className="font-medium text-[#0F566C]">AI Response</p>
                        <p className="leading-relaxed break-all">
                            Travel Image:{" "}
                            <a
                                href={message.content.imageUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#E88429] underline"
                            >
                                {message.content.imageUrl}
                            </a>
                        </p>
                        <p>
                            <span className="font-medium">Prompt:</span> {message.content.prompt}
                        </p>
                        <p>
                            <span className="font-medium">Requested Length:</span> {message.content.storyLength} words
                        </p>
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800 flex items-start gap-2">
                            <LoaderCircle className="h-4 w-4 animate-spin mt-0.5 shrink-0" />
                            <span>Waiting for AI integration...</span>
                        </div>

                        {/* Disabled action buttons */}
                        <div className="flex gap-2 pt-2">
                            <button
                                disabled
                                className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-400 cursor-not-allowed"
                            >
                                <RefreshCw className="w-3 h-3" />
                                Regenerate
                            </button>
                            <button
                                disabled
                                className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-400 cursor-not-allowed"
                            >
                                <Copy className="w-3 h-3" />
                                Copy
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}