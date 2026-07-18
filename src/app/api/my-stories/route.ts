import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const uid = searchParams.get("uid");
        const page = Number(searchParams.get("page") || 1);
        const limit = Number(searchParams.get("limit") || 8);

        if (!uid) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User ID is required.",
                },
                { status: 400 }
            );
        }

        const storiesRef = collection(db, "allStories");

        const q = query(
            storiesRef,
            where("userId", "==", uid)
        );

        const snapshot = await getDocs(q);

        const allStories = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        const totalStories = allStories.length;
        const totalPages = Math.max(1, Math.ceil(totalStories / limit));

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const stories = allStories.slice(startIndex, endIndex);

        return NextResponse.json(
            {
                success: true,
                stories,
                totalStories,
                totalPages,
                currentPage: page,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("My Stories API Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong.",
            },
            { status: 500 }
        );
    }
}
