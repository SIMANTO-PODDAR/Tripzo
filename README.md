<div align="center">

# Tripzo

### *Share Your Journey. Inspire The World.*

**Tripzo** is a modern travel experience sharing platform that enables travelers to share authentic stories enhanced by AI-powered content generation and image analysis.

[![Live ](https://img.shields.io/badge/🚀_Live_URL-tripzo.com-22c55e?style=for-the-badge)](https://tripzo-by-simanto.vercel.app)

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Google AI](https://img.shields.io/badge/Google_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

---
</div>

## Project Overview

Tripzo connects travelers worldwide, allowing them to create, share, and discover authentic travel stories. With AI-powered tools for story generation and image analysis, users can craft compelling narratives and gain deeper insights into their travel experiences.

- **Travelers** share real experiences and connect with a global community
- **Explorers** discover destinations through authentic stories and AI-enhanced content
- **Tripzo** provides a seamless platform for storytelling and discovery

## Deployment

This project is deployed with automatic CI/CD from the `main` branch.

 **Live URL:** [https://tripzo-by-simanto.vercel.app](https://tripzo-by-simanto.vercel.app)

---

## Key Features

### 1. Interactive Landing Page

A responsive homepage with hero section, popular destinations, platform benefits, AI features overview, testimonials, and comprehensive footer with social links.

### 2. User Authentication

Secure Firebase Authentication with email/password registration, login, and demo login functionality for quick access.

### 3. Explore Travel Stories

Browse all travel stories with advanced search (by location/title), travel type filters (Solo, Adventure, Cultural, Family, Couple, Mountain Trek, Wildlife Safari), date filters, sorting options, and pagination.

### 4. Story Details View

Publicly accessible pages displaying complete story information including cover image, description, location, travel date, travel type, and author details.

### 5. Post Travel Stories

Protected route for authenticated users to create new travel stories with image upload (via ImgBB), form validation, and comprehensive metadata.

### 6. Manage My Stories

Dedicated dashboard for users to view and manage their posted stories with delete functionality.

### 7. User Profile

Protected profile page displaying user information from Firebase Authentication with logout functionality.

### 8. AI Story Generator

AI-powered tool that generates travel stories based on uploaded images and user prompts with adjustable length options (100-400 words), regeneration capability, and copy-to-clipboard.

### 9. AI Image Explorer

AI-powered image analysis that automatically generates comprehensive scene descriptions, identifies objects, analyzes mood, and provides travel insights without requiring user prompts.

### 10. Community Hub

Community page featuring platform information, social media connections, contact details, and community values.

---

## Tech Stack

| Category | Technology |
|---|---|
| **Core Framework** | Next.js (v16 App Router) |
| **Language** | TypeScript |
| **Frontend Library** | React (v19) |
| **Authentication** | Firebase Authentication |
| **Database** | Google Cloud Firestore |
| **Image Hosting** | ImgBB |
| **AI Integration** | Google Generative AI (Gemini) |
| **Styling** | Tailwind CSS (v4) |
| **Component Libraries**| HeroUI & DaisyUI |
| **Icons** | Lucide React & React Icons |
| **Notifications** | React Hot Toast |
| **Animations** | React Fast Marquee |

---

## Routing Structure

| Route | Access | Description |
|---|---|---|
| `/` | 🟢 Public | Landing page with hero, destinations, features, testimonials |
| `/explore` | 🟢 Public | Browse all travel stories with search, filters, and pagination |
| `/community` | 🟢 Public | Community information, social links, and contact details |
| `/login` | 🟢 Public | User authentication with demo login option |
| `/registration` | 🟢 Public | New user registration |
| `/post-story` | 🔴 Private | Create new travel story with image upload |
| `/my-stories` | 🔴 Private | View and manage user's posted stories |
| `/profile` | 🔴 Private | User profile information |
| `/ai-story-generator` | 🔴 Private | AI-powered story generation tool |
| `/ai-image-explorer` | 🔴 Private | AI-powered image analysis tool |

---

## Getting Started

### Prerequisites

- Node.js `>= 18`
- npm `>= 9`

### Installation

```bash
# Clone the repository
git clone https://github.com/SIMANTO-PODDAR/Tripzo.git
cd Tripzo

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Build the project
npm run build

# Start production server
npm run start
```

---

## Environment Variables

To run this project, create a `.env.local` file in your root directory and copy the following environment variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_IMAGE_UPLOAD_API=your_imgbb_api_key
```

---

<div align="center">

Made with 💚 using Next.js + Tailwind CSS + Google AI

</div>
