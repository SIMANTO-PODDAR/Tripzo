import { NextRequest, NextResponse } from "next/server";
import { generateTravelStory, analyzeImage } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl, prompt, storyLength, type } = body;

    // Validate common inputs
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

    // Check API key configuration
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI service is temporarily unavailable. Please try again later." },
        { status: 500 }
      );
    }

    // Handle different request types
    if (type === "image-analysis") {
      // Image analysis request
      const analysis = await analyzeImage(imageUrl, prompt);
      return NextResponse.json({ analysis });
    } else {
      // Story generation request (default, backward compatible)
      if (!storyLength || typeof storyLength !== "string") {
        return NextResponse.json(
          { error: "Invalid or missing story length" },
          { status: 400 }
        );
      }
      const story = await generateTravelStory(imageUrl, prompt, storyLength);
      return NextResponse.json({ story });
    }
  } catch (error) {
    console.error("Error in AI API:", error);
      return NextResponse.json(
      { error: "AI service is temporarily unavailable. Please try again later." },
        { status: 500 }
      );
  }
}