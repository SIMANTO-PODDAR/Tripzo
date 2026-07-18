import React from "react";

export default function ExploreCardSkeleton() {
    return (
        <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm animate-pulse h-full">
            {/* Image Skeleton */}
            <div className="aspect-video w-full bg-gray-200" />

            {/* Content Skeleton */}
            <div className="flex flex-1 flex-col p-5 gap-3">
                {/* Location and Badge row */}
                <div className="flex justify-between items-center">
                    <div className="h-4 w-24 bg-gray-200 rounded-full" />
                    <div className="h-5 w-20 bg-gray-200 rounded-full" />
                </div>

                {/* Title */}
                <div className="h-6 w-3/4 bg-gray-200 rounded mt-1" />

                {/* Description */}
                <div className="space-y-2 mt-2">
                    <div className="h-3.5 w-full bg-gray-200 rounded" />
                    <div className="h-3.5 w-5/6 bg-gray-200 rounded" />
                </div>

                {/* Author and Date */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-gray-200" />
                        <div className="h-4 w-20 bg-gray-200 rounded" />
                    </div>
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>

                {/* Button */}
                <div className="h-10 w-full bg-gray-200 rounded-xl mt-3" />
            </div>
        </div>
    );
}
