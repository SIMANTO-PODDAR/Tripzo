# Directory Structure

This document describes the source code organization of the Tripzo project.

---

## Root Layout

```
Tripzo/
├── documentation/          ← All project documentation (this directory)
├── public/                 ← Static assets (logo, hero background image)
├── src/                    ← All application source code
├── .env                    ← Environment variables (not committed to VCS)
├── .gitignore
├── eslint.config.mjs       ← ESLint configuration
├── next.config.ts          ← Next.js configuration
├── package.json            ← Dependencies and npm scripts
├── postcss.config.mjs      ← PostCSS configuration
├── README.md               ← Project README (separate from this documentation)
└── tsconfig.json           ← TypeScript configuration
```

---

## Source Directory (`src/`)

```
src/
├── app/                    ← Next.js App Router pages and API routes
├── components/             ← Reusable React components
├── context/                ← React context providers
├── data/                   ← Static data constants
├── lib/                    ← External service clients and utilities
├── sections/               ← Page-level layout sections (homepage)
└── types/                  ← TypeScript type definitions
```

---

## App Router (`src/app/`)

The App Router uses route groups (parenthesized directory names) to apply layouts without affecting URL paths.

```
src/app/
├── (auth)/                         ← Route group: no layout wrapping (uses root layout)
│   └── authentication/
│       └── page.tsx                ← /authentication — Sign-in and registration page
│
├── (pages)/                        ← Route group: public pages (uses root layout)
│   ├── community/
│   │   └── page.tsx                ← /community — Community hub page
│   └── explore/
│       ├── page.tsx                ← /explore — Story listing with filters
│       └── [id]/
│           ├── page.tsx            ← /explore/[id] — Story detail view (Server Component)
│           └── loading.tsx         ← Skeleton loading UI for story detail
│
├── (protected-pages)/              ← Route group: authenticated users only
│   ├── layout.tsx                  ← Protected layout: checks auth, redirects to /authentication
│   ├── ai-image-explorer/
│   │   └── page.tsx                ← /ai-image-explorer — AI image analysis tool
│   ├── ai-story-generator/
│   │   └── page.tsx                ← /ai-story-generator — AI story generation tool
│   ├── my-stories/
│   │   └── page.tsx                ← /my-stories — User's own stories management
│   ├── post-story/
│   │   └── page.tsx                ← /post-story — Create and publish a new story
│   └── profile/
│       └── page.tsx                ← /profile — User profile information
│
├── api/                            ← Next.js API Route Handlers
│   ├── ai/
│   │   └── route.ts                ← POST /api/ai
│   ├── all-stories/
│   │   ├── route.ts                ← GET /api/all-stories
│   │   └── [id]/
│   │       └── route.ts            ← GET /api/all-stories/[id]
│   └── my-stories/
│       └── route.ts                ← GET /api/my-stories
│
├── error.tsx                       ← Global error boundary component
├── globals.css                     ← Global CSS (Tailwind directives)
├── layout.tsx                      ← Root layout (AuthProvider, Navbar, Footer, Toaster)
├── not-found.tsx                   ← 404 page
└── page.tsx                        ← / — Homepage (Server Component)
```

---

## Components (`src/components/`)

Reusable components are organized by feature domain.

```
src/components/
├── auth/                           ← Authentication form components
│   ├── AuthModeToggle.tsx          ← Segmented toggle between login and register modes
│   ├── AuthShowcase.tsx            ← Decorative right-side panel on the auth page
│   ├── SignInForm.tsx              ← Email/password login form with demo login
│   ├── SignUpForm.tsx              ← Registration form with validation
│   ├── index.ts                    ← Re-exports for auth components
│   └── types.ts                    ← AuthMode type ("login" | "register")
│
├── explore/                        ← Story browsing and management components
│   ├── ExploreCard.tsx             ← Story card shown in listing grids
│   ├── ExploreCardSkeleton.tsx     ← Loading skeleton for ExploreCard
│   ├── ExploreDeleteBtn.tsx        ← Confirmation dialog for story deletion
│   ├── ExploreFilters.tsx          ← Search, travel type, date, and sort controls
│   └── ExplorePagination.tsx       ← Page navigation controls
│
└── share/                          ← Shared utility components
    ├── ExploreDestinationsBtn.tsx  ← "Explore Destinations" CTA button
    ├── GoogleSignInBtn.tsx         ← Google OAuth sign-in button
    └── ShareExperienceBtn.tsx      ← "Share Experience" CTA button
```

---

## Context (`src/context/`)

```
src/context/
└── AuthContext.tsx                 ← AuthProvider (wraps entire app) and useAuth() hook
```

The `AuthProvider` listens to Firebase `onAuthStateChanged` and exposes `{ user, loading }` to any component through `useAuth()`.

---

## Library (`src/lib/`)

```
src/lib/
├── firebase.ts                     ← Firebase app initialization; exports auth and db
└── gemini.ts                       ← Gemini AI client; exports generateTravelStory,
                                       analyzeImage, generateTravelStoryFromText,
                                       and chatWithTravelAI
```

---

## Data (`src/data/`)

```
src/data/
└── TravelData.ts                   ← Static array of 12 sample story objects (used for
                                       seeding or display purposes, not queried by the API)
```

---

## Sections (`src/sections/`)

Page-level section components assembled in `src/app/page.tsx` (homepage).

```
src/sections/
├── AiFeatures.tsx                  ← AI feature cards promoting Story Generator and Image Explorer
├── DiscoverMoreStories.tsx         ← Related stories shown on story detail pages (Server Component)
├── Footer.tsx                      ← Site-wide footer with navigation, contact, and social links
├── Hero.tsx                        ← Homepage hero section with background image and CTA buttons
├── Navbar.tsx                      ← Sticky navigation bar with auth-aware links
├── Newsletter.tsx                  ← Newsletter subscription section (homepage)
├── PopularDestinations.tsx         ← Featured destinations section (homepage)
├── Testimonials.tsx                ← User testimonials section (homepage)
└── WhyShareYourJourney.tsx         ← Value proposition section (homepage)
```

---

## Types (`src/types/`)

TypeScript type definitions are separated into shared types and module-specific types.

```
src/types/
├── shared/                         ← Types used across multiple modules
│   ├── index.ts                    ← Story, ApiResponse, FilterState, PageType, TravelType
│   ├── ai.ts                       ← ChatMessage, TravelStoryContext, ImageAnalysisContext, StoryLengthOption
│   └── auth.ts                     ← AuthContextType
│
└── modules/                        ← Types scoped to specific modules
    ├── api.ts                       ← AiApiRequest, AiStoriesApiResponse, StoriesApiParams, MyStoriesApiParams
    ├── components.ts                ← ExploreCardProps, ExploreFiltersProps, ExplorePaginationProps, ExploreDeleteBtnProps, GoogleSignInBtnProps
    ├── data.ts                      ← TravelStoryData (Firestore write shape)
    └── sections.ts                  ← Destination, Testimonial, Feature, FeatureCardProps
```

---

## Public Assets (`public/`)

```
public/
├── tripzo.png                      ← Application logo (used in Navbar and Footer)
└── hero-bg.jpg                     ← Hero section background image
```

---

[Back to Project Overview](./README.md) | [Back to Documentation Root](../readme.md)
