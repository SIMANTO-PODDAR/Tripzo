import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set. AI story generation will be disabled.");
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export interface TravelStoryContext {
  imageUrl: string;
  prompt: string;
  storyLength: string;
}


export async function generateTravelStory(
  imageUrl: string,
  prompt: string,
  storyLength: string
): Promise<string> {
  if (!genAI) {
    console.error("Gemini client not initialized. GEMINI_API_KEY is not set.");
    throw new Error("AI service is temporarily unavailable. Please try again later.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

  // Fetch image from URL
  let imageResponse: Response;
  try {
    imageResponse = await fetch(imageUrl);
  } catch (error) {
    console.error("Failed to fetch image from URL:", error);
    throw new Error("AI service is temporarily unavailable. Please try again later.");
  }

  if (!imageResponse.ok) {
    console.error(`Failed to fetch image from URL. Status: ${imageResponse.status}`);
    throw new Error("AI service is temporarily unavailable. Please try again later.");
  }

  const imageBuffer = await imageResponse.arrayBuffer();
  const base64Image = Buffer.from(imageBuffer).toString("base64");

  // Determine MIME type from URL or default to jpeg
  let mimeType = "image/jpeg";
  const urlLower = imageUrl.toLowerCase();
  if (urlLower.endsWith(".png")) {
    mimeType = "image/png";
  } else if (urlLower.endsWith(".webp")) {
    mimeType = "image/webp";
  } else if (urlLower.endsWith(".gif")) {
    mimeType = "image/gif";
  }

  // Generate prompt based on story length
  const lengthInstruction = getLengthInstruction(storyLength);
  const textPrompt = `Analyze the travel image carefully. Understand the location, environment, mood, and visual details. Write a beautiful travel experience story based on the image and the user's description.

${lengthInstruction}

User's description: ${prompt}

Make it feel like a real human travel memory. Use engaging storytelling. Return only the story text. Do not add markdown, headings, or extra explanations.`;

  // Call Gemini vision model
  let result;
  try {
    result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: textPrompt },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Image,
              },
            },
          ],
        },
      ],
    });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("AI service is temporarily unavailable. Please try again later.");
  }

  const response = await result.response;
  const story = response.text();

  if (!story) {
    console.error("No story generated from Gemini API");
    throw new Error("AI service is temporarily unavailable. Please try again later.");
  }

  return story;
}

/**
 * Generate a travel story from text description only 
 * Useful for text-only prompts
 */
export async function generateTravelStoryFromText(
  prompt: string,
  storyLength: string
): Promise<string> {
  if (!genAI) {
    console.error("Gemini client not initialized. GEMINI_API_KEY is not set.");
    throw new Error("AI service is temporarily unavailable. Please try again later.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

  // Generate prompt based on story length
  const lengthInstruction = getLengthInstruction(storyLength);
  const textPrompt = `Write a beautiful travel experience story based on the user's description.

${lengthInstruction}

User's description: ${prompt}

Make it feel like a real human travel memory. Use engaging storytelling. Return only the story text. Do not add markdown, headings, or extra explanations.`;

  let result;
  try {
    result = await model.generateContent(textPrompt);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("AI service is temporarily unavailable. Please try again later.");
  }

  const response = await result.response;
  const story = response.text();

  if (!story) {
    console.error("No story generated from Gemini API");
    throw new Error("AI service is temporarily unavailable. Please try again later.");
  }

  return story;
}

/**
 * Get length instruction based on requested story length
 */
function getLengthInstruction(storyLength: string): string {
  switch (storyLength) {
    case "100-200":
      return "Follow the requested story length approximately: 100-200 words.";
    case "200-300":
      return "Follow the requested story length approximately: 200-300 words.";
    case "300-400":
      return "Follow the requested story length approximately: 300-400 words.";
    default:
      return "Follow the requested story length approximately: 250-350 words.";
  }
}

/**
 * Chat with AI about travel experiences
 * Can be used for follow-up questions or travel advice
 */
export async function chatWithTravelAI(
  conversationHistory: Array<{ role: string; content: string }>,
  question: string
): Promise<string> {
  if (!genAI) {
    console.error("Gemini client not initialized. GEMINI_API_KEY is not set.");
    throw new Error("AI service is temporarily unavailable. Please try again later.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

  // Build conversation context
  const prompt = `You are a helpful travel assistant. The user is asking about travel experiences or advice.

Previous conversation:
${conversationHistory
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n")}

Current question: ${question}

Provide helpful, engaging travel advice or information. Keep responses concise and practical. Do not use markdown formatting.`;

  let result;
  try {
    result = await model.generateContent(prompt);
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("AI service is temporarily unavailable. Please try again later.");
  }

  const response = await result.response;
  return response.text();
}
