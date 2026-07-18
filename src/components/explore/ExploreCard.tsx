"use client";

import { MapPin, Calendar, ArrowRight } from "lucide-react";
import ExploreDeleteBtn from "./ExploreDeleteBtn";
import Link from "next/link";

interface Story {
    id: string;
    title: string;
    description: string;
    location: [string, string];
    travelDate: string;
    travelType: string;
    image: string;
    userId: string;
    userName: string;
    userEmail: string;
    createdAt?: string;
}

interface ExploreCardProps {
    story: Story;
    page: "explore" | "myStories" | "discoverMoreStories";
}

export default function ExploreCard({ story, page }: ExploreCardProps) {


    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
            });
        } catch {
            return dateStr;
        }
    };

    const authorName = story.userName || story.userEmail?.split("@")[0] || "Anonymous";
    const authorInitial = authorName.charAt(0).toUpperCase();

    return (
        <>
            <article className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1.5 border border-gray-100">
                {/* Story Image */}
                <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                    <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        loading="lazy"
                    />
                    {/* Travel Type Badge on Image */}
                    <span className="absolute top-3 right-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#0F566C]/90 text-white backdrop-blur-xs shadow-xs">
                        {story.travelType}
                    </span>
                </div>

                {/* Card Content */}
                <div className="flex flex-col grow p-5">
                    {/* Location */}
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-[#E88429]" />
                        {story.location?.[0]}, {story.location?.[1]}
                    </p>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[#0F566C] mb-2 line-clamp-1 group-hover:text-[#2390b1] transition-colors duration-200">
                        {story.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                        {story.description}
                    </p>

                    {/* Author & Date Row */}
                    <div className="flex items-center justify-between text-xs text-gray-600 border-t border-gray-100 pt-4 mt-auto mb-4">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0F566C]/10 text-[#0F566C] font-bold text-[10px]">
                                {authorInitial}
                            </div>
                            <span className="font-medium text-gray-700 max-w-24 truncate" title={authorName}>
                                {authorName}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                            <Calendar className="w-3.5 h-3.5 text-[#E88429]" />
                            <span>{formatDate(story.travelDate)}</span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <Link href={`/explore/${story.id}`}>
                        <button
                            className="w-full flex items-center justify-center gap-2 bg-[#0F566C] hover:bg-[#2390b1] font-bold text-white py-2.5 px-4 rounded-xl transition-colors duration-300 text-sm cursor-pointer shadow-md shadow-orange-500/10"
                        >
                            Read Story
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>

                    {/* Delete button (if applicable) */}
                    <ExploreDeleteBtn
                        storyId={story.id}
                        storyTitle={story.title}
                        userId={story.userId}
                        page={page}
                    />
                </div>
            </article>
        </>
    );
}
