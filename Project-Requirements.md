# TRIPZO - Travel Experience Sharing Platform

## Project Requirements Document

---

## 1. Project Overview

TRIPZO is a **Travel Experience Sharing Platform** that enables users to share their travel experiences with a global community. The platform allows travelers to create, share, and discover authentic travel stories enhanced by AI-powered content generation and image analysis capabilities.

### 1.1 Core Value Proposition

- **Authentic Storytelling**: Real travel experiences shared by real travelers
- **AI-Enhanced Content**: Intelligent tools to help users craft compelling narratives
- **Community Discovery**: Explore destinations through the eyes of fellow travelers
- **Visual Storytelling**: Rich image-based storytelling with AI understanding

### 1.2 AI-Powered Features

The platform implements two substantial Agentic AI features:

#### AI Story Generator

- Generates complete travel story descriptions based on uploaded travel images and user prompts
- Supports multiple output length options (100-200, 200-300, 300-400 words)
- Allows response regeneration for improved results
- Includes copy-to-clipboard functionality
- Chat-based interface for conversational story generation

#### AI Image Explorer

- Analyzes uploaded travel images without requiring user prompts
- Generates comprehensive scene descriptions and context
- Identifies important objects and elements within images
- Provides mood and atmosphere analysis
- Offers travel insights and location hints
- Chat-based interface with analyze again and copy functionality

---

## 2. Technology Stack

### 2.1 Frontend Stack

- **Framework**: Next.js 16.2.10 (App Router)
- **Language**: TypeScript
- **UI Library**: HeroUI (React components)
- **Styling**: Tailwind CSS 4 + DaisyUI
- **Icons**: Lucide React, React Icons
- **State Management**: React Context API
- **Notifications**: React Hot Toast
- **Animations**: React Fast Marquee

### 2.2 Backend Stack

- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **Language**: TypeScript
- **Database**: Firebase Firestore (NoSQL)
- **Authentication**: Firebase Authentication
- **File Storage**: ImgBB API (image hosting)

### 2.3 AI Integration

- **Provider**: Google Generative AI (Gemini)
- **Model**: gemini-3.5-flash
- **Capabilities**: Vision (multimodal), Text generation

---

## 3. Application Architecture

### 3.1 Page Access Levels

| Page | Route | Access Level | Description |
|------|-------|--------------|-------------|
| Home | `/` | Public | Landing page with hero, destinations, features |
| Explore | `/explore` | Public | Browse all travel stories with filters |
| Community | `/community` | Public | Community information and social links |
| Login | `/login` | Public | User authentication |
| Registration | `/registration` | Public | New user registration |
| Post Story | `/post-story` | Protected | Create new travel story |
| My Stories | `/my-stories` | Protected | View and manage user's stories |
| Profile | `/profile` | Protected | User profile information |
| AI Story Generator | `/ai-story-generator` | Protected | AI-powered story generation |
| AI Image Explorer | `/ai-image-explorer` | Protected | AI-powered image analysis |

### 3.2 Navigation Structure

**Logged Out Navigation (3 routes):**

- Home
- Explore
- Community

**Logged In Navigation (8 routes):**

- Home
- Explore
- Community
- Profile
- Post Story
- My Stories
- Story Generator
- Image Explorer

---

## 4. Page Specifications

### 4.1 Home Page (`/`)

#### Navigation Bar

- Full-width background with sticky positioning
- Responsive design with mobile hamburger menu
- User avatar display when logged in
- Login/Logout buttons with appropriate states

#### Hero Section

- Height limited to 60-70% of screen
- Interactive elements and CTAs
- Clear visual flow to subsequent sections

#### Content Sections (Minimum 7)

1. **Popular Destinations** - Curated travel destinations with images
2. **Why Share Your Journey** - Platform benefits and value propositions
3. **AI Features** - Overview of AI-powered capabilities
4. **Testimonials** - User reviews and feedback
5. **Newsletter** - Email subscription form
6. **Footer** - Links, contact info, social media

#### Footer

- About link
- Contact information
- Privacy Policy link
- Terms & Conditions link
- Social media links (Instagram, Facebook, Twitter, YouTube, LinkedIn, TikTok, Threads, Reddit, WhatsApp, Telegram, Medium, Website)

---

### 4.2 Explore Page (`/explore`)

#### Search Functionality

- Search by location
- Search by title
- Debounced search input (350ms delay)

#### Filter Options

- Travel Type filter (Solo Travel, Adventure, Cultural, Family Trip, Couple Trip, Mountain Trek, Wildlife Safari)
- Last 7 Days filter (checkbox)
- Sort options (Newest, Oldest)

#### Pagination

- Display 6 stories per page
- Pagination controls at bottom
- URL-based pagination state

#### Story Card Component

Each card displays:

- Cover image
- Title
- Short description
- Location (city, country)
- Travel date
- Travel type
- Author name
- "View Details" button

**Loading State:** Skeleton loaders while data fetches

**Empty State:** Clear message when no stories match filters

---

### 4.3 Community Page (`/community`)

#### Hero Section

- Platform introduction
- CTAs for exploring and sharing

#### About Tripzo Section

- Platform mission and description
- Feature cards (Real Travel Stories, Share Your Journey, Connect with Travelers, AI Powered Tools)

#### Connect With Us Section

- Social media platform links (12 platforms)
- Interactive cards with hover effects

#### Contact Information

- Email, Phone, Location details
- Clickable contact links

#### Community Values Section

- Authentic Experiences
- Respect Everyone
- Inspire Others
- Explore Together

---

### 4.4 Authentication Pages

#### Registration Page (`/registration`)

**Form Fields:**

- Full Name
- Email Address
- Password

**Features:**

- Google Sign In
- Form validation
- Error handling
- Success feedback
- Redirect to login after successful registration

#### Login Page (`/login`)

**Form Fields:**

- Email Address
- Password

**Features:**

- Google Sign In
- Error handling for invalid credentials
- Demo Login button (auto-fill credentials)
- Remember me functionality
- Link to registration page

---

### 4.5 Protected Pages

#### Post Story Page (`/post-story`)

Accessible only to authenticated users. Redirects to `/login` if not authenticated.

**Story Information Form:**

- Title (3-50 characters, required)
- Story Description (max 2000 characters, required)
- City (required)
- Country (required)
- Travel Date (required, cannot be future date)
- Travel Type (dropdown: Solo Travel, Adventure, Cultural, Family Trip, Couple Trip, Mountain Trek, Wildlife Safari)
- Cover Image (required, max 5MB, JPG/PNG/GIF)

**Image Upload:**

- Drag and drop support
- File browser option
- Upload to ImgBB API
- Preview with remove option
- Loading states during upload

**User Information (Read-only):**

- Name (from Firebase auth)
- Email (from Firebase auth)

**Form Validation:**

- Client-side validation
- Character limits
- Required field checks
- Date validation
- File size and type validation

---

#### My Stories Page (`/my-stories`)

Accessible only to authenticated users.

**Display Format:**

- Responsive grid layout
- Each item shows:
  - Cover image thumbnail
  - Title
  - Location
  - Travel date
  - View button
  - Delete button (with confirmation)

**Features:**

- Fetch only user's own stories
- Delete functionality with confirmation
- Empty state when no stories exist

---

#### Profile Page (`/profile`)

Accessible only to authenticated users.

**User Information Display:**

- Full name (from Firebase auth)
- Email address (from Firebase auth)
- Profile avatar (first letter of name)
- Logout functionality

---

#### AI Story Generator Page (`/ai-story-generator`)

Accessible only to authenticated users.

**Chat-Based Interface:**

- Message history display
- User messages show uploaded image and prompt
- AI messages show generated story

**Input Composer:**

- Image upload (drag & drop, click to browse)
- Text prompt input (auto-growing textarea)
- Story length selection (100-200, 200-300, 300-400 words)
- Generate button

**Features:**

- Image upload to ImgBB
- Loading states during generation
- Regenerate functionality
- Copy to clipboard
- Auto-scroll to latest message
- Remove image before generation

**AI Integration:**

- Uses Gemini vision model
- Analyzes image + user prompt
- Generates travel story based on selected length
- Error handling for API failures

---

#### AI Image Explorer Page (`/ai-image-explorer`)

Accessible only to authenticated users.

**Chat-Based Interface:**

- Message history display
- User messages show uploaded image
- AI messages show image analysis

**Input Composer:**

- Image upload area (drag & drop, click to browse)
- Analyze button

**Features:**

- Image upload to ImgBB
- Loading states during analysis
- Analyze again functionality
- Copy to clipboard
- Auto-scroll to latest message
- Hidden prompt for consistent analysis

**AI Integration:**

- Uses Gemini vision model
- Generates comprehensive image analysis (300-400 words)
- Includes: scene description, objects, mood, location hints, travel insights
- Error handling for API failures

---

## 5. Core Listing / Card Section

### 5.1 Story Card Specifications

**Card Components:**

- Image (consistent aspect ratio)
- Title
- Short description
- Meta info (location, travel date, travel type, author)
- "View Details" button

**Card Rules:**

- Same height and width for all cards
- Same border radius and layout
- Desktop view: 3 cards per row
- Tablet view: 2 cards per row
- Mobile view: 1 card per row
- Skeleton loader while data is loading

---

## 6. Data Structure

### 6.1 Travel Story Data Model

```typescript
{
  id: string (Firestore document ID)
  title: string
  description: string
  location: [string, string] // [city, country]
  travelDate: string // ISO date string
  travelType: string // Enum: "Solo Travel" | "Adventure" | "Cultural" | "Family Trip" | "Couple Trip" | "Mountain Trek" | "Wildlife Safari"
  image: string // Image URL from ImgBB
  userId: string // Firebase user UID
  userName: string // User display name
  userEmail: string // User email
  createdAt: Timestamp // Firestore timestamp
}
```

### 6.2 User Data Model (Firebase Auth)

```typescript
{
  uid: string
  displayName: string | null
  email: string | null
  photoURL: string | null
  emailVerified: boolean
}
```

---

## 7. Global UI & Design Rules

### 7.1 Color Scheme

- **Primary Color**: #0F566C (Teal/Dark Blue)
- **Secondary Color**: #E88429 (Orange)
- **Accent Color**: #3498db (Blue)
- **Neutral Colors**: Gray scale for text and backgrounds

### 7.2 Design Consistency

- Maximum 3 primary colors + neutral colors
- Consistent layout, spacing, and alignment throughout
- All cards and components have same size, border radius, and visual style
- Fully responsive for mobile, tablet, and desktop
- No placeholder or dummy content allowed

### 7.3 Component Standards

- Rounded corners and borders consistent across components
- Hover states and transitions
- Loading states for all async operations
- Error boundaries for graceful error handling
- Form validation with clear error messages

---

## 8. AI Features Implementation

### 8.1 AI Story Generator (Feature 1)

**User Input:**

- Travel image (uploaded via ImgBB)
- Text prompt describing the experience
- Story length selection (100-200, 200-300, 300-400 words)

**AI Processing:**

- Fetch image from URL
- Convert to base64
- Send to Gemini vision model with custom prompt
- Generate travel story based on image and user description
- Return story text only (no markdown)

**User Actions:**

- Review generated story
- Regenerate if unsatisfied
- Copy to clipboard
- Continue generating more stories

**Technical Requirements:**

- Custom prompt templates
- Adjustable output length
- Regenerate response capability
- Error handling for API failures
- Loading states during generation

---

### 8.2 AI Image Understanding (Feature 2)

**User Input:**

- Travel image (uploaded via ImgBB)
- No text prompt required (uses hidden prompt)

**AI Processing:**

- Fetch image from URL
- Convert to base64
- Send to Gemini vision model with hidden analysis prompt
- Generate comprehensive analysis (300-400 words)
- Include: scene description, objects, mood, location hints, travel insights

**User Actions:**

- Review image analysis
- Analyze again with same image
- Copy analysis to clipboard
- Upload new image for analysis

**Technical Requirements:**

- Multimodal AI (vision + text)
- Automatic analysis without user prompts
- Consistent output format
- Error handling for API failures
- Loading states during analysis

---

## 9. API Endpoints

### 9.1 AI API Endpoint

**Route:** `/api/ai`
**Method:** POST
**Body:**

```typescript
{
  imageUrl: string
  prompt: string
  storyLength: string
  type?: "story-generation" | "image-analysis"
}
```

**Response:**

```typescript
{
  story?: string // For story generation
  analysis?: string // For image analysis
  error?: string
}
```

### 9.2 All Stories API Endpoint

**Route:** `/api/all-stories`
**Method:** GET
**Query Parameters:**

- search: string
- travelType: string
- last7Days: string
- sort: string ("newest" | "oldest")
- page: number
- limit: number

**Response:**

```typescript
{
  stories: TravelStory[]
  totalStories: number
  totalPages: number
  currentPage: number
}
```

### 9.3 Story Detail API Endpoint

**Route:** `/api/all-stories/[id]`
**Method:** GET
**Response:** Single TravelStory object

### 9.4 My Stories API Endpoint

**Route:** `/api/my-stories`
**Method:** GET
**Response:** Array of user's TravelStory objects

### 9.5 Delete Story API Endpoint

**Route:** `/api/my-stories/[id]`
**Method:** DELETE
**Response:** Success/error message

---

## 10. Authentication & Authorization

### 10.1 Firebase Authentication

- Email/password authentication
- User session management with React Context
- Protected route middleware
- Auto-redirect to login for protected pages
- User state persistence

### 10.2 Authorization Rules

- Public pages: Home, Explore, Community, Login, Registration
- Protected pages: Post Story, My Stories, Profile, AI Story Generator, AI Image Explorer
- Users can only view and delete their own stories
- All stories are publicly viewable on Explore page

---

## 11. File Upload & Image Handling

### 11.1 Image Upload Specifications

- **Service**: ImgBB API
- **Max File Size**: 5MB
- **Supported Formats**: JPG, PNG, GIF, WebP
- **Upload Method**: FormData POST request
- **Response**: Image URL stored in database

### 11.2 Image Display

- Responsive image sizing
- Object-fit cover for consistent aspect ratios
- Lazy loading for performance
- Alt text for accessibility

---

## 12. Error Handling & Validation

### 12.1 Form Validation

- Client-side validation for all forms
- Character limits with live counter
- Required field indicators
- Email format validation
- Date validation (no future dates for travel stories)
- File type and size validation

### 12.2 API Error Handling

- Try-catch blocks for all API calls
- User-friendly error messages
- Toast notifications for success/error states
- Fallback UI for failed data fetches
- Retry mechanisms for transient failures

### 12.3 AI Error Handling

- Graceful degradation when AI API fails
- Clear error messages to users
- Retry functionality for AI generation
- Loading states during AI processing

---

## 13. Performance Requirements

### 13.1 Loading States

- Skeleton loaders for card grids
- Loading spinners for buttons
- Progress indicators for uploads
- Loading states for AI generation

### 13.2 Optimization

- Image optimization and lazy loading
- Debounced search inputs
- Pagination for large datasets
- Efficient re-renders with React hooks
- Code splitting with Next.js

---

## 14. Responsive Design

### 14.1 Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### 14.2 Responsive Behavior

- Mobile-first approach
- Hamburger menu for mobile navigation
- Grid layout adjustments (1/2/3 columns)
- Touch-friendly button sizes
- Readable font sizes on all devices

---

## 15. Accessibility

### 15.1 Standards

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Color contrast compliance
- Alt text for images

---

## 16. Environment Variables

### 16.1 Required Environment Variables

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `GEMINI_API_KEY`
- `NEXT_PUBLIC_IMAGE_UPLOAD_API` (ImgBB API key)

---

*Document Version: 2.0*
*Last Updated: July 2026*
*Based on actual project implementation*

---
