"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AuthMode } from "./types";

interface AuthModeToggleProps {
    mode: AuthMode;
    onModeChange: (mode: AuthMode) => void;
}

export default function AuthModeToggle({ mode, onModeChange }: AuthModeToggleProps) {
    const innerTrackRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragPercent, setDragPercent] = useState<number | null>(null);

    const dragStartXRef = useRef<number | null>(null);
    const dragStartYRef = useRef<number | null>(null);
    const columnWidthRef = useRef<number>(140);
    const modeAtDragStartRef = useRef<AuthMode>("login");
    const hasCapturedRef = useRef(false);
    const isDragGestureRef = useRef(false);

    const handleTogglePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.button !== 0 && e.pointerType === "mouse") return;
        dragStartXRef.current = e.clientX;
        dragStartYRef.current = e.clientY;
        if (innerTrackRef.current) {
            columnWidthRef.current = innerTrackRef.current.clientWidth / 2;
        }
        modeAtDragStartRef.current = mode;
        hasCapturedRef.current = false;
        isDragGestureRef.current = false;
    };

    const handleTogglePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (dragStartXRef.current === null) return;
        const dx = e.clientX - dragStartXRef.current;
        const dy = e.clientY - (dragStartYRef.current ?? e.clientY);

        // Only engage drag if movement is predominantly horizontal and exceeds threshold (> 6px)
        if (!hasCapturedRef.current && Math.abs(dx) > 6) {
            if (Math.abs(dx) > Math.abs(dy)) {
                hasCapturedRef.current = true;
                isDragGestureRef.current = true;
                setIsDragging(true);
                try {
                    e.currentTarget.setPointerCapture(e.pointerId);
                } catch {
                    // Ignore pointer capture errors
                }
            } else {
                // Vertical scrolling intent: cancel drag
                dragStartXRef.current = null;
                setIsDragging(false);
                setDragPercent(null);
                return;
            }
        }

        if (hasCapturedRef.current) {
            const colWidth = Math.max(1, columnWidthRef.current);
            const percentChange = (dx / colWidth) * 100;

            let newPercent =
                modeAtDragStartRef.current === "login"
                    ? percentChange
                    : 100 + percentChange;

            // Strictly clamp between 0% and 100% so pill NEVER extends beyond buttons
            newPercent = Math.max(0, Math.min(100, newPercent));
            setDragPercent(newPercent);
        }
    };

    const handleTogglePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (dragStartXRef.current === null) return;

        if (hasCapturedRef.current) {
            try {
                e.currentTarget.releasePointerCapture(e.pointerId);
            } catch {
                // Ignore
            }

            const dx = e.clientX - dragStartXRef.current;
            const colWidth = Math.max(1, columnWidthRef.current);
            const percentChange = (dx / colWidth) * 100;

            if (modeAtDragStartRef.current === "login") {
                if (percentChange > 35) {
                    onModeChange("register");
                }
            } else {
                if (percentChange < -35) {
                    onModeChange("login");
                }
            }
        }

        dragStartXRef.current = null;
        dragStartYRef.current = null;
        hasCapturedRef.current = false;
        setIsDragging(false);
        setDragPercent(null);
        setTimeout(() => {
            isDragGestureRef.current = false;
        }, 50);
    };

    const handleTogglePointerCancel = () => {
        dragStartXRef.current = null;
        dragStartYRef.current = null;
        hasCapturedRef.current = false;
        setIsDragging(false);
        setDragPercent(null);
        setTimeout(() => {
            isDragGestureRef.current = false;
        }, 50);
    };

    return (
        <>
            {/* Segmented Mode Toggle */}
            <div
                role="tablist"
                aria-label="Authentication Mode"
                className="w-72 sm:w-80 h-11 p-1 rounded-full bg-gray-100 border border-gray-200/90 select-none shadow-inner overflow-hidden relative"
                style={{ touchAction: "none" }}
                onPointerDown={handleTogglePointerDown}
                onPointerMove={handleTogglePointerMove}
                onPointerUp={handleTogglePointerUp}
                onPointerCancel={handleTogglePointerCancel}
            >
                <div
                    ref={innerTrackRef}
                    className="relative h-full w-full rounded-full"
                >
                    {/* BASE TRACK LAYER: Always sharp dark text on light track, clickable */}
                    <div className="absolute inset-0 grid grid-cols-2 h-full w-full z-0">
                        <button
                            type="button"
                            role="tab"
                            aria-selected={mode === "login"}
                            onClick={() => {
                                if (isDragGestureRef.current) return;
                                onModeChange("login");
                            }}
                            className="w-full h-full rounded-full text-sm sm:text-[15px] font-semibold text-gray-800 hover:text-black transition-colors cursor-pointer flex items-center justify-center select-none"
                        >
                            Sign In
                        </button>

                        <button
                            type="button"
                            role="tab"
                            aria-selected={mode === "register"}
                            onClick={() => {
                                if (isDragGestureRef.current) return;
                                onModeChange("register");
                            }}
                            className="w-full h-full rounded-full text-sm sm:text-[15px] font-semibold text-gray-800 hover:text-black transition-colors cursor-pointer flex items-center justify-center select-none"
                        >
                            Create Account
                        </button>
                    </div>

                    {/* SLIDING PILL LAYER: Physical clipping mask containing white text */}
                    <motion.div
                        className="absolute inset-y-0 left-0 w-1/2 h-full rounded-full bg-[#0F566C] shadow-md overflow-hidden pointer-events-none z-10"
                        animate={{
                            x:
                                isDragging && dragPercent !== null
                                    ? `${dragPercent}%`
                                    : mode === "login"
                                        ? "0%"
                                        : "100%",
                        }}
                        transition={
                            isDragging
                                ? { duration: 0 }
                                : { type: "spring", stiffness: 450, damping: 35 }
                        }
                    >
                        <motion.div
                            className="absolute inset-y-0 left-0 w-[200%] h-full grid grid-cols-2"
                            animate={{
                                x:
                                    isDragging && dragPercent !== null
                                        ? `${-dragPercent / 2}%`
                                        : mode === "login"
                                            ? "0%"
                                            : "-50%",
                            }}
                            transition={
                                isDragging
                                    ? { duration: 0 }
                                    : { type: "spring", stiffness: 450, damping: 35 }
                            }
                        >
                            <div className="w-full h-full flex items-center justify-center text-sm sm:text-[15px] font-semibold text-white drop-shadow-sm select-none">
                                Sign In
                            </div>
                            <div className="w-full h-full flex items-center justify-center text-sm sm:text-[15px] font-semibold text-white drop-shadow-sm select-none">
                                Create Account
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Dynamic Directional Toggle Hint */}
            <div className="mt-2.5 h-6 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {mode === "login" ? (
                        <motion.button
                            key="hint-login"
                            type="button"
                            onClick={() => onModeChange("register")}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.18 }}
                            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#0F566C] font-medium cursor-pointer transition-colors"
                        >
                            <span>Swipe Right to Create Account</span>
                            <span className="text-[#E88429] font-bold text-sm leading-none">→</span>
                        </motion.button>
                    ) : (
                        <motion.button
                            key="hint-register"
                            type="button"
                            onClick={() => onModeChange("login")}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.18 }}
                            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#0F566C] font-medium cursor-pointer transition-colors"
                        >
                            <span className="text-[#E88429] font-bold text-sm leading-none">←</span>
                            <span>Swipe Left to Sign In</span>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
