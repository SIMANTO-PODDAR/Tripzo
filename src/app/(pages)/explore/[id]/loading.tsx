import { MapPin, CalendarDays, User } from 'lucide-react';

export default function Loading() {
    return (
        <main className="bg-white py-12 md:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                    <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl shadow-sm animate-pulse bg-gray-200" />

                    <div className="flex flex-col justify-center">
                        <div className="mb-3 inline-block h-7 w-24 animate-pulse rounded-full bg-gray-200" />

                        <div className="h-12 w-full animate-pulse rounded bg-gray-200 sm:h-14 lg:h-16" />

                        <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 shrink-0 text-[#E88429]" />
                                <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
                            </div>

                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-5 w-5 shrink-0 text-[#E88429]" />
                                <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />
                            </div>

                            <div className="flex items-center gap-2">
                                <User className="h-5 w-5 shrink-0 text-[#E88429]" />
                                <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200" />
                            </div>
                        </div>

                        <div className="mt-8 h-12 w-40 animate-pulse rounded-xl bg-gray-200" />
                    </div>
                </div>

                <section className="mt-16 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                    <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
                    <div className="mt-4 space-y-3">
                        <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
                        <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
                        <div className="h-5 w-5/6 animate-pulse rounded bg-gray-200" />
                        <div className="h-5 w-4/6 animate-pulse rounded bg-gray-200" />
                    </div>
                </section>
            </div>
        </main>
    );
}
