export interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: {
    imageUrl?: string;
    prompt?: string;
    storyLength?: string;
    story?: string;
    analysis?: string;
    loading?: boolean;
    error?: string;
  };
}

export interface TravelStoryContext {
  imageUrl: string;
  prompt: string;
  storyLength: string;
}

export interface ImageAnalysisContext {
  imageUrl: string;
  prompt: string;
}

export type StoryLengthOption = "100-200" | "200-300" | "300-400";
