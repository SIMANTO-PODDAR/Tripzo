export interface AiApiRequest {
  imageUrl: string;
  prompt: string;
  storyLength?: string;
  type?: "image-analysis" | "story-generation";
}

export interface AiStoriesApiResponse {
  analysis?: string;
  story?: string;
  error?: string;
}

export interface StoriesApiParams {
  search?: string;
  travelType?: string;
  last7Days?: string;
  sort?: string;
  page?: number;
  limit?: number;
  excludeId?: string;
}

export interface MyStoriesApiParams {
  uid: string;
  page?: number;
  limit?: number;
}
