# Application Architecture

## Overview

Tripzo is a **Next.js 16 App Router** application. It is a hybrid application combining server-rendered pages, server-side API routes, and client-side React components.

The application follows a conventional Next.js App Router structure with route groups to apply layouts selectively, Server Components for data-fetching pages, and Client Components for interactive UI.

---

## Rendering Strategy

Next.js App Router allows each component to independently choose whether to run on the server or the client.

### Server Components

Server Components run on the server at request time and produce static HTML. They can directly read from databases and call internal APIs without exposing credentials to the browser.

In Tripzo, the following are Server Components:

| Component | Location | Why server-rendered |
| --- | --- | --- |
| Homepage | `src/app/page.tsx` | Assembles static section components; no client interactivity needed |
| Story Detail Page | `src/app/(pages)/explore/[id]/page.tsx` | Fetches story data from `/api/all-stories/[id]` at request time |
| DiscoverMoreStories section | `src/sections/DiscoverMoreStories.tsx` | Fetches related stories from the API at render time |

### Client Components (`"use client"`)

Client Components run in the browser and can use React hooks, event handlers, and browser APIs.

All pages that require authentication state, filtering, form handling, or AI interaction are Client Components. Key examples:

| Component | Location | Why client-rendered |
| --- | --- | --- |
| Protected layout | `src/app/(protected-pages)/layout.tsx` | Uses `useAuth()` hook and `useRouter()` for redirect |
| Explore page | `src/app/(pages)/explore/page.tsx` | Uses `useState`, `useEffect`, `useSearchParams` for filters and pagination |
| Authentication page | `src/app/(auth)/authentication/page.tsx` | Uses `useState` for mode switching and AnimatePresence |
| Post Story page | `src/app/(protected-pages)/post-story/page.tsx` | Uses form state, file upload, and Firestore write |
| My Stories page | `src/app/(protected-pages)/my-stories/page.tsx` | Uses `useReducer`, `useEffect`, and auth context |
| AI Story Generator | `src/app/(protected-pages)/ai-story-generator/page.tsx` | Manages chat state and image upload |
| AI Image Explorer | `src/app/(protected-pages)/ai-image-explorer/page.tsx` | Manages chat state and image upload |
| Navbar | `src/sections/Navbar.tsx` | Uses `useAuth()` for login state and sign-out handler |
| AuthContext | `src/context/AuthContext.tsx` | Subscribes to Firebase auth state changes |
| SignInForm, SignUpForm | `src/components/auth/` | Controlled form inputs and Firebase auth calls |

---

## Route Groups and Layouts

Next.js route groups (directories in parentheses) allow co-locating routes with a shared layout without affecting the URL path.

### Root Layout (`src/app/layout.tsx`)

Wraps the entire application. Provides:

- `AuthProvider` (React context for auth state)
- `Navbar` (sticky navigation bar)
- A `container mx-auto` content wrapper
- `Footer`
- `Toaster` (react-hot-toast notification container)
- Google Fonts (Geist Sans and Geist Mono)

### Protected Pages Layout (`src/app/(protected-pages)/layout.tsx`)

Applied exclusively to routes inside `(protected-pages)/`. This layout:

1. Reads `{ user, loading }` from `AuthContext`.
2. While `loading` is `true`, renders a centered loading spinner.
3. When `loading` is `false` and `user` is `null`, calls `router.replace("/authentication")`.
4. When `user` is present, renders the children normally.

This guard means all pages in `(protected-pages)/` are inaccessible to unauthenticated users without any per-page auth check.

---

## API Route Architecture

Next.js API routes (`src/app/api/`) run exclusively on the server. They use the `NextRequest`/`NextResponse` pattern from `next/server`.

Three API namespaces exist:

| Path | File | Purpose |
| --- | --- | --- |
| `/api/all-stories` | `all-stories/route.ts` | Reads from Firestore, applies filters/sort/pagination |
| `/api/all-stories/[id]` | `all-stories/[id]/route.ts` | Fetches a single story document by Firestore ID |
| `/api/my-stories` | `my-stories/route.ts` | Fetches stories by user ID with pagination |
| `/api/ai` | `ai/route.ts` | Dispatches to Gemini AI for story generation or image analysis |

All Firestore reads happen inside API routes, not in Client Components directly. This means the Firebase Admin-equivalent operations use the client SDK on the server side (with server-environment environment variables not exposed to the browser).

The `/api/ai` route additionally requires `GEMINI_API_KEY`, which is a server-only environment variable (no `NEXT_PUBLIC_` prefix).

---

## External Service Communication

```
Client Browser
      |
      | (1) Image upload (multipart form)
      v
ImgBB REST API
      |
      | (2) Returns image URL
      v
Client Browser
      |
      | (3) POST /api/ai { imageUrl, prompt, storyLength, type }
      v
Next.js Server (/api/ai route handler)
      |
      | (4) Fetches image bytes from ImgBB URL
      |     Converts to base64
      |     Calls Gemini API with image + text prompt
      v
Google Gemini API (gemini-3.5-flash)
      |
      | (5) Returns generated text
      v
Next.js Server
      |
      | (6) Returns { story } or { analysis }
      v
Client Browser (renders result in chat UI)
```

---

## State Management

Tripzo does not use a global state management library such as Redux or Zustand. State is managed through:

- **React Context** — `AuthContext` provides the authenticated user globally. This is the only shared context.
- **Component-local state** — `useState` and `useReducer` for page-specific data such as story lists, filter values, pagination, and AI chat messages.
- **URL search parameters** — The Explore page persists filter state in the URL (`?search=...&travelType=...&sort=...&page=...`) so the page is bookmarkable and shareable.

---

## Error and Loading Handling

| Scenario | Implementation |
| --- | --- |
| Global uncaught error | `src/app/error.tsx` — Next.js error boundary with retry and home navigation |
| 404 Not Found | `src/app/not-found.tsx` — Custom 404 page with back and home buttons |
| Story detail not found | `notFound()` call in `getStory()` triggers the 404 page |
| Story detail loading | `src/app/(pages)/explore/[id]/loading.tsx` — Skeleton placeholder |
| Story list loading | `ExploreCardSkeleton` components rendered while fetch is in progress |
| Explore page wrapped in Suspense | `ExploreContent` wrapped in `<Suspense>` with skeleton fallback |
| API error responses | JSON with `{ message }` or `{ error }` and appropriate HTTP status codes |
| Toast notifications | `react-hot-toast` used for user-visible success, error, and loading feedback |

---

[Back to Architecture](./README.md) | [Back to Documentation Root](../readme.md)
