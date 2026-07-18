"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

interface ExploreDeleteBtnProps {
    storyId: string;
    storyTitle: string;
    userId: string;
    page: "explore" | "manageStories" | "alsoLike";
    onDeleteSuccess?: () => void;
}

export default function ExploreDeleteBtn({
    storyId,
    storyTitle,
    userId,
    page,
    onDeleteSuccess,
}: ExploreDeleteBtnProps) {
    const { user } = useAuth();
    const [deleting, setDeleting] = useState(false);

    // Only show delete button on Manage Stories page and if the user is the owner
    if (page !== "manageStories" || !user || userId !== user.uid) {
        return null;
    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete the story "${storyTitle}"?`
        );
        if (!confirmDelete) return;

        setDeleting(true);
        const loadingToast = toast.loading("Deleting your story...");

        try {
            await deleteDoc(doc(db, "allStories", storyId));
            toast.success("Story deleted successfully!", { id: loadingToast });
            if (onDeleteSuccess) {
                onDeleteSuccess();
            } else {
                window.location.reload();
            }
        } catch (error: any) {
            console.error("Error deleting story:", error);
            toast.error("Failed to delete story. Please try again.", {
                id: loadingToast,
            });
        } finally {
            setDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center justify-center gap-1.5 bg-red-50 text-red-600 hover:bg-red-100 disabled:bg-gray-100 disabled:text-gray-400 font-semibold py-2 px-4 rounded-xl text-sm transition-all duration-200 cursor-pointer border border-red-200/50 mt-2 w-full"
            title="Delete Story"
        >
            <Trash2 className="w-4 h-4" />
            {deleting ? "Deleting..." : "Delete Story"}
        </button>
    );
}
