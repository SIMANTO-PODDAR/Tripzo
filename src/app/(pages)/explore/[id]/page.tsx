import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, CalendarDays, User, ArrowLeft } from 'lucide-react';

interface Story {
    id: string;
    title: string;
    description: string;
    location: string[];
    travelDate: string;
    travelType: string;
    image: string;
    userId: string;
    userName: string;
    userEmail: string;
}

async function getStory(id: string): Promise<Story> {
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/all-stories/${id}`, {
        cache: 'no-store',
    });

    if (res.status === 404) notFound();
    if (!res.ok) throw new Error('Failed to fetch story details');

    return res.json();
}


export default async function StoryDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const story = await getStory(id);

    const {
        title,
        description,
        location,
        travelDate,
        travelType,
        image,
        userName,
    } = story;


    const formattedDate = travelDate
        ? new Date(travelDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : 'N/A';

    return (
        <main className="bg-white py-12 md:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* ========== HERO SECTION ========== */}
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                    {/* Left: Story Image */}
                    <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl shadow-sm">

                        <img
                            src={image}
                            alt={title}
                            className="absolute inset-0 h-full w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    {/* Right: Story Details */}
                    <div className="flex flex-col justify-center">
                        {/* Travel Type Badge */}
                        <span className="mb-3 inline-block w-fit rounded-full border border-[#E88429]/20 bg-[#E88429]/10 px-3 py-1 text-sm font-medium text-[#E88429]">
                            {travelType}
                        </span>

                        {/* Title */}
                        <h1 className="text-3xl font-bold text-[#0F566C] sm:text-4xl lg:text-5xl">
                            {title}
                        </h1>

                        {/* Meta information */}
                        <div className="mt-6 space-y-3">
                            {/* Location */}
                            <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="h-5 w-5 shrink-0 text-[#E88429]" />
                                <span className="text-base">{location.join(', ')}</span>
                            </div>

                            {/* Travel Date */}
                            <div className="flex items-center gap-2 text-gray-600">
                                <CalendarDays className="h-5 w-5 shrink-0 text-[#E88429]" />
                                <span className="text-base">{formattedDate}</span>
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-2 text-gray-600">
                                <User className="h-5 w-5 shrink-0 text-[#E88429]" />
                                <span className="text-base">{userName}</span>
                            </div>
                        </div>

                        {/* Back */}
                        <div className="mt-8">
                            <Link
                                href="/explore"
                                className="inline-flex items-center gap-2 rounded-xl border border-[#0F566C] px-6 py-3 text-sm font-medium text-[#0F566C] transition-colors hover:bg-[#0F566C]/5"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Explore
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ========== DESCRIPTION ========== */}
                <section className="mt-16 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="text-2xl font-bold text-[#0F566C]">Travel Story</h2>
                    <p className="mt-4 text-base leading-relaxed text-gray-600">
                        {description}
                    </p>
                </section>

                {/* ========== JOURNEY INFORMATION ========== */}
                <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="text-2xl font-bold text-[#0F566C]">Journey Information</h2>
                    <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Travel Type</dt>
                            <dd className="mt-1 text-base font-semibold text-[#0F566C]">
                                {travelType}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Travel Date</dt>
                            <dd className="mt-1 text-base font-semibold text-[#0F566C]">
                                {formattedDate}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Location</dt>
                            <dd className="mt-1 text-base font-semibold text-[#0F566C]">
                                {location.join(', ')}
                            </dd>
                        </div>
                    </dl>
                </section>
            </div>
        </main>
    );
}