export interface TravelStoryData {
  title: string;
  description: string;
  location: [string, string];
  travelDate: string;
  travelType: string;
  image: string;
  userId: string;
  userName: string;
  userEmail: string;
  createdAt?: any; // Firestore Timestamp
}
