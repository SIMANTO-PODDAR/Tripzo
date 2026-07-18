import { headers } from 'next/headers';
import ExploreCard from '@/components/explore/ExploreCard';

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

type Props = {
    travelType: string;
    currentId: string;
};

async function getRelatedStories(
    travelType: string,
    excludeId: string
): Promise<Story[]> {
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;

    const params = new URLSearchParams({
        travelType: travelType,
        excludeId: excludeId,
        limit: '6',
        sort: 'newest',
    });

    const res = await fetch(`${baseUrl}/api/all-stories?${params.toString()}`, {
        cache: 'no-store',
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.stories ?? [];
}

export default async function DiscoverMoreStories({
    travelType,
    currentId,
}: Props) {
    const stories = await getRelatedStories(travelType, currentId);

    if (!stories || stories.length === 0) return null;

    return (
        <section className="mt-16">
            <h2 className="text-2xl font-bold text-[#0F566C]">
                Discover More Stories
            </h2>
            <p className="mt-2 text-base text-gray-500">
                Explore more travel experiences shared by travelers with similar
                journeys.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {stories.map((story) => (
                    <ExploreCard
                        key={story.id}
                        story={story}
                        page="discoverMoreStories"
                    />
                ))}
            </div>
        </section>
    );
}