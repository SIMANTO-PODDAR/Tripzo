"use client";

import { Suspense, useEffect, useReducer, useState } from "react";
import { MdOutlineMenuBook } from "react-icons/md";
import Link from "next/link";
import { Button } from "@heroui/react";

import ExploreCard from "@/components/explore/ExploreCard";
import ExplorePagination from "@/components/explore/ExplorePagination";
import ExploreCardSkeleton from "@/components/explore/ExploreCardSkeleton";
import { useAuth } from "@/context/AuthContext";

import type { Story, ApiResponse } from "@/types/shared";

type FetchState = {
    stories: Story[];
    totalPages: number;
    totalStories: number;
    loading: boolean;
    error: string | null;
};

type FetchAction =
    | { type: "FETCH_START" }
    | {
        type: "FETCH_SUCCESS";
        stories: Story[];
        totalPages: number;
        totalStories: number;
    }
    | { type: "FETCH_ERROR"; error: string };

function fetchReducer(state: FetchState, action: FetchAction): FetchState {
    switch (action.type) {
        case "FETCH_START":
            return { ...state, loading: true, error: null };
        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                stories: action.stories,
                totalPages: action.totalPages,
                totalStories: action.totalStories,
            };
        case "FETCH_ERROR":
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
}

const LIMIT = 6;
const SKELETON_COUNT = LIMIT;

function buildApiUrl(uid: string, page: number): string {
    const params = new URLSearchParams();
    params.set("uid", uid);
    params.set("page", String(page));
    params.set("limit", String(LIMIT));
    return `/api/my-stories?${params.toString()}`;
}


function ManageStoriesContent() {
    const { user, loading: authLoading } = useAuth();
    const [page, setPage] = useState(1);

    const [state, dispatch] = useReducer(fetchReducer, {
        stories: [],
        totalPages: 1,
        totalStories: 0,
        loading: true,
        error: null,
    });

    useEffect(() => {
        if (!user?.uid) return;

        let cancelled = false;
        dispatch({ type: "FETCH_START" });

        (async () => {
            try {
                const url = buildApiUrl(user.uid, page);
                const res = await fetch(url, { cache: "no-store" });
                if (!res.ok) throw new Error("Failed to fetch stories");
                const data: ApiResponse = await res.json();
                if (!cancelled) {
                    dispatch({
                        type: "FETCH_SUCCESS",
                        stories: data.stories,
                        totalPages: data.totalPages,
                        totalStories: data.totalStories,
                    });
                }
            } catch (err: unknown) {
                if (!cancelled) {
                    const msg =
                        err instanceof Error ? err.message : "Something went wrong";
                    dispatch({ type: "FETCH_ERROR", error: msg });
                }
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [user?.uid, page]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (authLoading || !user) {
        return (
            <section className="w-full bg-white py-5 md:py-10">
                <div className="mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                            <ExploreCardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    const { stories, totalPages, totalStories, loading, error } = state;

    return (
        <section className="w-full bg-white py-5 md:py-10">
            <div className="mx-auto px-6 lg:px-8">
                <div className="max-w-3xl mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F566C]/10 border border-[#0F566C]/20 mb-8">
                        <MdOutlineMenuBook className="w-4 h-4 text-[#0F566C]" />
                        <span className="text-sm font-medium text-[#0F566C]">
                            Manage Your Stories
                        </span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#0F566C] tracking-tight leading-tight mb-6">
                        My Stories
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl">
                        View and manage all stories that you have shared.
                    </p>
                </div>

                {/* Results count */}
                {!loading && !error && (
                    <p className="text-sm text-gray-500 mb-4">
                        {totalStories === 0
                            ? "No results"
                            : `Showing ${stories.length} of ${totalStories} item${totalStories !== 1 ? "s" : ""}`}
                    </p>
                )}

                {/* Error */}
                {error && (
                    <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center text-sm text-red-600">
                        Failed to load stories. Please try again later.
                    </div>
                )}

                {/* Loading skeletons */}
                {loading && !error && (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                            <ExploreCardSkeleton key={i} />
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && stories.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                            <MdOutlineMenuBook className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            You haven&apos;t added any stories yet.
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Start by sharing your first travel story.
                        </p>
                        <Link href="/post-story" className="mt-4">
                            <Button className="bg-[#0F566C] text-white hover:bg-[#E88429]">
                                Share Your First Story
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Story grid */}
                {!loading && !error && stories.length > 0 && (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {stories.map((story) => (
                            <ExploreCard key={story.id} story={story} page="myStories" />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!loading && !error && totalPages > 1 && (
                    <ExplorePagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </section>
    );
}


export default function ManageStoriesPage() {
    return (
        <Suspense
            fallback={
                <section className="w-full bg-white py-5 md:py-10">
                    <div className="mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                                <ExploreCardSkeleton key={i} />
                            ))}
                        </div>
                    </div>
                </section>
            }
        >
            <ManageStoriesContent />
        </Suspense>
    );
}