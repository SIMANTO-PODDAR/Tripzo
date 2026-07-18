"use client";

import { Search, Calendar } from "lucide-react";

export interface FilterState {
    search: string;
    travelType: string;
    last7Days: string; // "true" or ""
    sort: string;
}

interface ExploreFiltersProps {
    filters: FilterState;
    onChange: (updated: Partial<FilterState>) => void;
}

const TRAVEL_TYPES = [
    { label: "All Travel Types", value: "" },
    { label: "Solo Travel", value: "Solo Travel" },
    { label: "Adventure", value: "Adventure" },
    { label: "Cultural", value: "Cultural" },
    { label: "Family Trip", value: "Family Trip" },
    { label: "Couple Trip", value: "Couple Trip" },
    { label: "Mountain Trek", value: "Mountain Trek" },
    { label: "Wildlife Safari", value: "Wildlife Safari" },
];

const SORTS = [
    { label: "Newest Stories", value: "newest" },
    { label: "Oldest Stories", value: "oldest" },
];

const selectCls =
    "h-11 rounded-xl border border-gray-200 bg-white px-3.5 text-sm text-gray-700 " +
    "shadow-xs transition duration-200 focus:border-[#0F566C] focus:outline-none focus:ring-2 " +
    "focus:ring-[#0F566C]/10 cursor-pointer";

export default function ExploreFilters({ filters, onChange }: ExploreFiltersProps) {
    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center justify-between mb-8 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
            {/* Search and Filters Controls */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
                {/* Search Input */}
                <div className="relative flex-1 min-w-50">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search stories by title or location..."
                        value={filters.search}
                        onChange={(e) => onChange({ search: e.target.value })}
                        className={
                            "w-full pl-10 pr-4 h-11 rounded-xl border border-gray-200 bg-white text-sm " +
                            "text-gray-700 shadow-xs transition duration-200 focus:border-[#0F566C] focus:outline-none " +
                            "focus:ring-2 focus:ring-[#0F566C]/10"
                        }
                    />
                </div>

                {/* Travel Type Select */}
                <select
                    value={filters.travelType}
                    onChange={(e) => onChange({ travelType: e.target.value })}
                    className={selectCls}
                >
                    {TRAVEL_TYPES.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Sorting and Date filters */}
            <div className="flex flex-wrap items-center gap-4">
                {/* Last 7 Days Switch */}
                <label className="flex items-center gap-2.5 px-4 h-11 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition duration-200 shadow-xs select-none">
                    <input
                        type="checkbox"
                        checked={filters.last7Days === "true"}
                        onChange={(e) =>
                            onChange({ last7Days: e.target.checked ? "true" : "" })
                        }
                        className="checkbox checkbox-sm [--chkbg:#0F566C] [--chkfg:white] border-gray-300 rounded-md cursor-pointer"
                    />
                    <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                        <Calendar className="w-4 h-4 text-[#E88429]" />
                        <span>Last 7 Days Only</span>
                    </div>
                </label>

                {/* Sort dropdown */}
                <select
                    value={filters.sort}
                    onChange={(e) => onChange({ sort: e.target.value })}
                    className={selectCls}
                >
                    {SORTS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
