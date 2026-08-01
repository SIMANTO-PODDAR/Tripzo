"use client";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { AlertDialog, Button } from "@heroui/react";
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import { MdDeleteForever, MdOutlineMenuBook } from "react-icons/md";

import type { ExploreDeleteBtnProps as Props } from "@/types/modules/components";

export default function ExploreDeleteBtn({
    storyId,
    storyTitle,
    page,
    userId
}: Props) {

    const { user } = useAuth();
    if (page === "explore" || page === "discoverMoreStories") return null;

    const deleteStory = async () => {
        const loadingToast = toast.loading("Deleting story...");

        const uid = user?.uid;

        if (!userId || userId !== uid) {
            toast.error("Unauthorized user", {
                id: loadingToast,
            });
            return;
        }

        try {
            await deleteDoc(doc(db, "allStories", storyId));

            toast.success("Story deleted successfully!", {
                id: loadingToast,
            });

            window.location.reload();
        } catch (error) {
            console.error(error);

            toast.error("Something went wrong!", {
                id: loadingToast,
            });
        }
    };

    return (
        <AlertDialog>
            <Button
                variant="danger-soft"
                size="sm"
                className="w-full mt-3 rounded-xl bg-[#E88429] hover:bg-orange-600 font-bold text-white"
            >
                Delete
                <MdDeleteForever />
            </Button>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-105">
                        <AlertDialog.CloseTrigger />

                        <AlertDialog.Header>
                            <MdOutlineMenuBook className="text-3xl" />

                            <AlertDialog.Heading>
                                <p className="text-danger font-bold text-lg">
                                    Delete This Story?
                                </p>
                            </AlertDialog.Heading>
                        </AlertDialog.Header>

                        <AlertDialog.Body>
                            <p className="mb-3">
                                This action is permanent and cannot be undone.
                            </p>

                            <p className="font-bold text-lg">
                                Title: {storyTitle}
                            </p>
                        </AlertDialog.Body>

                        <AlertDialog.Footer>
                            <Button
                                slot="close"
                                variant="tertiary"
                            >
                                Cancel
                            </Button>

                            <Button
                                slot="close"
                                variant="danger"
                                onClick={deleteStory}
                            >
                                Delete
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}
