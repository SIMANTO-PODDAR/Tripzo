"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface ExplorePaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function ExplorePagination({
    currentPage,
    totalPages,
    onPageChange,
}: ExplorePaginationProps) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const btnBase =
        "flex items-center justify-center h-10 min-w-[40px] rounded-xl border text-sm font-semibold " +
        "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0F566C]/20 hover:cursor-pointer";

    const btnActive =
        "bg-[#0F566C] border-[#0F566C] text-white shadow-sm shadow-[#0F566C]/20";

    const btnDefault =
        "bg-white border-gray-200 text-gray-700 hover:border-[#0F566C] hover:text-[#0F566C]";

    const btnDisabled =
        "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed pointer-events-none";

    return (
        <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${btnBase} px-3.5 gap-1.5 ${currentPage === 1 ? btnDisabled : btnDefault}`}
                aria-label="Previous page"
            >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Page Numbers */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`${btnBase} px-3.5 ${page === currentPage ? btnActive : btnDefault}`}
                    aria-label={`Page ${page}`}
                    aria-current={page === currentPage ? "page" : undefined}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${btnBase} px-3.5 gap-1.5 ${currentPage === totalPages ? btnDisabled : btnDefault}`}
                aria-label="Next page"
            >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    );
}
