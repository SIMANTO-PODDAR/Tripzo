import { Sparkles, Image, Check } from "lucide-react";
import Link from "next/link";

import type { FeatureCardProps } from "@/types/modules/sections";

function FeatureCard({
    icon: Icon,
    title,
    description,
    highlights,
    infoText,
    buttonLink,
}: FeatureCardProps) {
    return (
        <div className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0F566C]/50">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0F566C]/10 transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-7 w-7 text-[#0F566C]" />
            </div>

            <h3 className="mb-2 text-xl font-semibold text-[#0F566C]">{title}</h3>
            <p className="mb-5 text-base leading-relaxed text-black">{description}</p>

            <ul className="space-y-3">
                {highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#E88429]" />
                        <span className="text-black">{highlight}</span>
                    </li>
                ))}
            </ul>

            <div className="rounded-lg bg-[#E88429]/10 px-4 py-3 text-sm text-gray-700 mb-2">
                {infoText}
            </div>

            <Link
                href={buttonLink}
                className="mt-auto inline-flex items-center justify-center rounded-lg bg-[#0F566C] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#0F566C]/90 hover:shadow-md"
            >
                Try Now
            </Link>
        </div>
    );
}

export default function AiFeatures() {
    return (
        <section id="AiFeatures" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-12 text-center">
                {/* Powered by AI badge */}
                <div className="mb-10 flex justify-center">
                    <span className="badge badge-outline inline-flex items-center gap-2 rounded-full border-[#0F566C] px-5 py-2 text-sm font-medium text-[#0F566C]">
                        <Sparkles className="h-4 w-4" />
                        AI Features
                    </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#0F566C] mb-4">
                    Create Travel Stories with AI
                </h2>
                <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed text-justify sm:text-center">
                    Tripzo uses AI to make sharing your travel experiences easier and more
                    engaging. Generate well-written travel stories from your trip details
                    and gain meaningful insights from your travel photos before publishing
                    them with confidence.
                </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <FeatureCard
                    icon={Sparkles}
                    title="AI Story Generator"
                    description="Provide a few details about your trip, and AI will generate a well-structured travel story that captures your experience. You can edit, improve, or regenerate the content before publishing."
                    highlights={[
                        "Generate engaging travel stories",
                        "Choose short, medium, or long content",
                        "Regenerate better versions anytime",
                        "Edit before publishing",
                    ]}
                    infoText="Create meaningful travel stories in minutes with AI-assisted writing."
                    buttonLink="/ai-story-generator"
                />

                <FeatureCard
                    icon={Image}
                    title="AI Image Explorer"
                    description="Upload your travel photos and let AI analyze the scene to generate useful information that enriches your story and provides better context for readers.You can regenerate the content before publishing."
                    highlights={[
                        "Automatic image captions",
                        "Scene description",
                        "Detect important objects",
                        "Understand the mood of the photo",
                    ]}
                    infoText="Transform your travel photos into richer stories with intelligent image analysis."
                    buttonLink="/ai-image-explorer"
                />
            </div>
        </section>
    );
}