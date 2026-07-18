import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(_: Request, { params }: Props) {
    const { id } = await params;

    try {
        const docRef = doc(db, "allStories", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return NextResponse.json(
                { message: "Not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            id: docSnap.id,
            ...docSnap.data(),
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch" },
            { status: 500 }
        );
    }
}