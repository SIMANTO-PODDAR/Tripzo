import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const search = searchParams.get("search") ?? "";
    const travelType = searchParams.get("travelType") ?? "";
    const last7Days = searchParams.get("last7Days") ?? "";
    const sort = searchParams.get("sort") ?? "newest";
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "8", 10);

    try {
        const q = query(
            collection(db, "allStories"),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        let result = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
            };
        }) as any[];

        // 1. Search Filter (Search by Story title or location city/country)
        if (search) {
            const cleanSearch = search.toLowerCase().trim();
            result = result.filter((story) => {
                const titleMatch = story.title?.toLowerCase().includes(cleanSearch);
                const cityMatch = story.location?.[0]?.toLowerCase().includes(cleanSearch);
                const countryMatch = story.location?.[1]?.toLowerCase().includes(cleanSearch);
                return titleMatch || cityMatch || countryMatch;
            });
        }

        // 2. Travel Type Filter
        if (travelType) {
            result = result.filter(
                (story) => story.travelType?.toLowerCase() === travelType.toLowerCase()
            );
        }

        // 3. Last 7 Days Filter
        if (last7Days === "true") {
            const today = new Date();
            today.setHours(23, 59, 59, 999);
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(today.getDate() - 7);
            sevenDaysAgo.setHours(0, 0, 0, 0);

            result = result.filter((story) => {
                if (!story.travelDate) return false;
                const storyDate = new Date(story.travelDate);
                return !isNaN(storyDate.getTime()) && storyDate >= sevenDaysAgo && storyDate <= today;
            });
        }

        // 4. Sort
        if (sort === "newest") {
            result.sort((a, b) => {
                const timeA = a.createdAt?.seconds ?? 0;
                const timeB = b.createdAt?.seconds ?? 0;
                return timeB - timeA;
            });
        } else if (sort === "oldest") {
            result.sort((a, b) => {
                const timeA = a.createdAt?.seconds ?? 0;
                const timeB = b.createdAt?.seconds ?? 0;
                return timeA - timeB;
            });
        }

        // 5. Paginate
        const totalStories = result.length;
        const totalPages = Math.max(1, Math.ceil(totalStories / limit));
        const safePage = Math.min(Math.max(1, page), totalPages);
        const startIndex = (safePage - 1) * limit;

        const paginatedStories = result.slice(startIndex, startIndex + limit);

        // Convert any timestamps to simple ISO string
        const serializableStories = paginatedStories.map(story => {
            const serialized = { ...story };
            if (story.createdAt && typeof story.createdAt.toDate === 'function') {
                serialized.createdAt = story.createdAt.toDate().toISOString();
            } else if (story.createdAt && story.createdAt.seconds) {
                serialized.createdAt = new Date(story.createdAt.seconds * 1000).toISOString();
            }
            return serialized;
        });

        return NextResponse.json({
            stories: serializableStories,
            totalStories,
            totalPages,
            currentPage: safePage,
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch food" },
            { status: 500 }
        );
    }
}
