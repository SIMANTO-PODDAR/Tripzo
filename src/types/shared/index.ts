// Core Story type
export interface Story {
  id: string;
  title: string;
  description: string;
  location: [string, string]; // Standardize on tuple
  travelDate: string;
  travelType: string;
  image: string;
  userId: string;
  userName: string;
  userEmail: string;
  createdAt?: string;
}

// API Response types
export interface ApiResponse<T = Story> {
  stories: T[];
  totalStories: number;
  totalPages: number;
  currentPage: number;
}

// Filter types
export interface FilterState {
  search: string;
  travelType: string;
  last7Days: string;
  sort: string;
}

// Page type literal
export type PageType = "explore" | "myStories" | "discoverMoreStories";

// Travel type options
export type TravelType =
  | "Solo Travel"
  | "Adventure"
  | "Cultural"
  | "Family Trip"
  | "Couple Trip"
  | "Mountain Trek"
  | "Wildlife Safari";
