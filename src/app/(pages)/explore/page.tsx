"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Compass } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";

import ExploreCard from "@/components/explore/ExploreCard";
import ExploreFilters, { type FilterState } from "@/components/explore/ExploreFilters";
import ExplorePagination from "@/components/explore/ExplorePagination";
import ExploreCardSkeleton from "@/components/explore/ExploreCardSkeleton";

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

interface ApiResponse {
    stories: Story[];
    totalStories: number;
    totalPages: number;
    currentPage: number;
}

const LIMIT = 6;
const DEBOUNCE_MS = 350;
const SKELETON_COUNT = LIMIT;

/* ─── Helpers ─── */
function buildApiUrl(filters: FilterState, page: number): string {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.travelType) params.set("travelType", filters.travelType);
    if (filters.last7Days) params.set("last7Days", filters.last7Days);
    if (filters.sort) params.set("sort", filters.sort);
    params.set("page", String(page));
    params.set("limit", String(LIMIT));
    return `/api/all-stories?${params.toString()}`;
}

function buildRouteUrl(
    pathname: string,
    filters: FilterState,
    page: number
): string {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.travelType) params.set("travelType", filters.travelType);
    if (filters.last7Days) params.set("last7Days", filters.last7Days);
    if (filters.sort) params.set("sort", filters.sort);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
}

/* ─── Inner component ──── */
function ExploreContent() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    /* ── Initialise from URL ── */
    const [filters, setFilters] = useState<FilterState>({
        search: searchParams.get("search") ?? "",
        travelType: searchParams.get("travelType") ?? "",
        last7Days: searchParams.get("last7Days") ?? "",
        sort: searchParams.get("sort") ?? "oldest",
    });
    const [page, setPage] = useState<number>(
        parseInt(searchParams.get("page") ?? "1", 10)
    );

    /* ── Data state ── */
    const [stories, setStories] = useState<Story[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalStories, setTotalStories] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [debouncedSearch, setDebouncedSearch] = useState(filters.search);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    /* ── Fetch ── */
    const fetchStories = useCallback(
        async (currentFilters: FilterState, currentPage: number) => {
            setLoading(true);
            setError(null);
            try {
                const url = buildApiUrl(currentFilters, currentPage);
                const res = await fetch(url, { cache: "no-store" });
                if (!res.ok) throw new Error("Failed to fetch stories");
                const data: ApiResponse = await res.json();
                setStories(data.stories);
                setTotalPages(data.totalPages);
                setTotalStories(data.totalStories);
            } catch (err: unknown) {
                const msg =
                    err instanceof Error ? err.message : "Something went wrong";
                setError(msg);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    /* ── filter / page changes ──── */
    useEffect(() => {
        const effectiveFilters = { ...filters, search: debouncedSearch };
        fetchStories(effectiveFilters, page);

        // Sync URL
        router.replace(buildRouteUrl(pathname, effectiveFilters, page), {
            scroll: false,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch, filters.travelType, filters.last7Days, filters.sort, page]);

    const handleFilterChange = (updated: Partial<FilterState>) => {
        const next = { ...filters, ...updated };
        setFilters(next);

        // Debounce only the search field; reset page immediately for everything
        if ("search" in updated) {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
            debounceTimer.current = setTimeout(() => {
                setDebouncedSearch(updated.search ?? "");
                setPage(1);
            }, DEBOUNCE_MS);
        } else {
            // For dropdowns or checkboxes, apply instantly and reset page
            setPage(1);
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section className="w-full bg-white py-10 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
                {/* Header */}
                <div className="max-w-3xl mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F566C]/10 border border-[#0F566C]/20 mb-6">
                        <Compass className="w-4 h-4 text-[#0F566C]" />
                        <span className="text-sm font-medium text-[#0F566C]">
                            Explore
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F566C] tracking-tight leading-tight mb-4">
                        Explore Stories
                    </h1>

                    <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                        Dive into authentic travel experiences shared by explorers worldwide. Find inspiration for your next journey, or search for specific destinations.
                    </p>
                </div>

                {/* Filters */}
                <ExploreFilters filters={filters} onChange={handleFilterChange} />

                {/* Status message */}
                {!loading && !error && (
                    <p className="text-sm text-gray-500 mb-6">
                        {totalStories === 0
                            ? "No travel stories found"
                            : `Showing ${stories.length} of ${totalStories} travel stor${totalStories !== 1 ? "ies" : "y"}`}
                    </p>
                )}

                {/* Error State */}
                {error && (
                    <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center text-sm text-red-600 max-w-lg mx-auto my-10">
                        <p className="font-semibold text-base mb-1">Failed to load stories</p>
                        <p className="text-xs text-red-500/80">Please check your internet connection or try again later.</p>
                    </div>
                )}

                {/* Loading Skeletons */}
                {loading && !error && (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                            <ExploreCardSkeleton key={i} />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && stories.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0F566C]/10">
                            <Compass className="h-8 w-8 text-[#0F566C]" />
                        </div>
                        <h3 className="text-xl font-bold text-[#0F566C]">
                            No stories found
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            We couldn&apos;t find any travel stories matching your search or filters.
                        </p>
                        <Link href="/explore" className="mt-6 w-full">
                            <Button
                                className="bg-[#E88429] text-white hover:bg-orange-600 w-full font-semibold rounded-xl"
                            >
                                Clear all filters
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Results Grid */}
                {!loading && !error && stories.length > 0 && (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {stories.map((story) => (
                            <ExploreCard key={story.id} story={story} page="explore" />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!loading && !error && (
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

export default function ExplorePage() {
    return (
        <Suspense
            fallback={
                <section className="w-full bg-white py-10 md:py-16 animate-pulse">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mb-12">
                            <div className="h-8 w-44 bg-gray-200 rounded-full mb-6" />
                            <div className="h-12 w-80 bg-gray-200 rounded mb-4" />
                            <div className="h-6 w-full max-w-xl bg-gray-200 rounded" />
                        </div>

                        {/* Filters Placeholder */}
                        <div className="h-20 w-full bg-gray-100 rounded-2xl mb-8" />

                        {/* Card Grid Placeholder */}
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <ExploreCardSkeleton key={i} />
                            ))}
                        </div>
                    </div>
                </section>
            }
        >
            <ExploreContent />
        </Suspense>
    );
}