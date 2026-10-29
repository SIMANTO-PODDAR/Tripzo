# Technology Stack

This document lists the technologies used in the Tripzo implementation, verified against `package.json` and the source code.

---

## Core Framework and Language

| Technology | Version | Role |
|---|---|---|
| **Next.js** | 16.2.10 | Full-stack React framework. Uses the App Router. Handles both server-rendered pages and API routes. |
| **React** | 19.2.4 | UI rendering library. |
| **React DOM** | 19.2.4 | React DOM renderer. |
| **TypeScript** | ^5 (dev) | Static typing throughout the application. |

---

## Styling

| Technology | Version | Role |
|---|---|---|
| **Tailwind CSS** | ^4 (dev) | Utility-first CSS framework. Used extensively across all components and pages. |
| **DaisyUI** | ^5.6.18 (dev) | Tailwind CSS component plugin. Provides DaisyUI classes (e.g., `navbar`, `btn`, `badge`, `menu`, `dropdown`) used in the Navbar and other UI elements. |
| **@tailwindcss/postcss** | ^4 (dev) | PostCSS integration for Tailwind v4. |
| **PostCSS** | via postcss.config.mjs | CSS processing pipeline. |

---

## UI Component Libraries

| Technology | Version | Role |
|---|---|---|
| **@heroui/react** | ^3.2.2 | Component library providing `Button`, `Form`, `Input`, `TextField`, `Label`, `FieldError`, `Description`, `InputGroup`, `Avatar`, `Card`, `CardHeader`, `AlertDialog` used across auth forms, story cards, and the community page. |
| **@heroui/styles** | ^3.2.2 | Style support package for HeroUI. |

---

## Icons

| Technology | Version | Role |
|---|---|---|
| **lucide-react** | ^1.24.0 | Icon set used throughout the application (e.g., `MapPin`, `Compass`, `Sparkles`, `Bot`, `Send`). |
| **react-icons** | ^5.7.0 | Additional icon set (e.g., `FaCompass`, `BsEyeSlash`, `MdDeleteForever`, `ImProfile`, `BsInstagram`). |

---

## Authentication and Database (Firebase)

| Technology | Version | Role |
|---|---|---|
| **firebase** | ^12.16.0 | Firebase SDK providing `firebase/auth` (email/password, Google OAuth) and `firebase/firestore` (Firestore database). |
| **react-firebase-hooks** | ^5.1.1 | React hooks for Firebase. Present as a dependency but not observed in active use in the inspected pages. |

Firebase services used:
- **Firebase Authentication** — user registration, sign-in, Google OAuth, session management via `onAuthStateChanged`.
- **Cloud Firestore** — primary database storing all travel stories in the `allStories` collection.

---

## AI Integration

| Technology | Version | Role |
|---|---|---|
| **@google/generative-ai** | ^0.24.1 | Official Google Generative AI JavaScript SDK. Used server-side in `src/lib/gemini.ts` and consumed by the `/api/ai` route. Interfaces with the `gemini-3.5-flash` model for multimodal (vision + text) content generation. |

---

## Image Hosting

| Technology | Version | Role |
|---|---|---|
| **ImgBB** | External API | Third-party image hosting service. Images are uploaded from the client side via the ImgBB REST API (`https://api.imgbb.com/1/upload`) using `NEXT_PUBLIC_IMAGE_UPLOAD_API` as the key. Returned image URLs are stored in Firestore. |

---

## Notifications and UI Utilities

| Technology | Version | Role |
|---|---|---|
| **react-hot-toast** | ^2.6.0 | Toast notification system. Used on all interactive actions (login, story submission, image upload, delete, etc.). |
| **motion** | ^13.2.0 | Animation library (Framer Motion). Used in the authentication page for animated panel transitions (`AnimatePresence`, `motion.div`). |
| **react-fast-marquee** | ^1.6.5 | Present as a dependency. Not observed in use in the inspected page source files. |
| **recharts** | ^3.9.2 | Charting library. Present as a dependency. Not observed in active use in the inspected page source files. |

---

## Build and Development Tools

| Technology | Version | Role |
|---|---|---|
| **eslint** | ^9 (dev) | JavaScript/TypeScript linting. |
| **eslint-config-next** | 16.2.10 (dev) | Next.js-specific ESLint configuration. |
| **babel-plugin-react-compiler** | 1.0.0 (dev) | React Compiler Babel plugin. Enabled via `reactCompiler: true` in `next.config.ts`. |

---

## Next.js Configuration Details

From `next.config.ts`:
- **React Compiler** is enabled (`reactCompiler: true`).
- **Image optimization** allows remote patterns from `https://i.ibb.co.com` (the ImgBB CDN domain) with quality presets of `[75, 90]`.

From `tsconfig.json`:
- **Target**: ES2017
- **Module resolution**: bundler
- **Strict mode**: enabled
- **Path alias**: `@/*` maps to `./src/*`

---

[Back to Project Overview](./README.md) | [Back to Documentation Root](../readme.md)
