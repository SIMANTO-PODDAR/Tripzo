import { NextRequest, NextResponse } from "next/server";
import { generateTravelStory } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl, prompt, storyLength } = body;

    // Validate inputs
    if (!imageUrl || typeof imageUrl !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing image URL" },
        { status: 400 }
      );
    }

    if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
      return NextResponse.json(
        { error: "Invalid or missing prompt" },
        { status: 400 }
      );
    }

    if (!storyLength || typeof storyLength !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing story length" },
        { status: 400 }
      );
    }

    // Check API key configuration
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI service is temporarily unavailable. Please try again later." },
        { status: 500 }
      );
    }

    // Generate story using centralized gemini library
    const story = await generateTravelStory(imageUrl, prompt, storyLength);

    return NextResponse.json({ story });
  } catch (error) {
    console.error("Error generating story:", error);
      return NextResponse.json(
      { error: "AI service is temporarily unavailable. Please try again later." },
        { status: 500 }
      );
  }
}