# Project Overview

## What is Tripzo?

Tripzo is a modern travel storytelling and community platform. It allows travelers to create and share authentic travel experiences as stories, discover destinations through other users' stories, and use AI-powered tools to generate story content from images and text prompts.

The platform is live at: **https://tripzo-by-simanto.vercel.app**

---

## Mission and Purpose

Tripzo is built around three principles visible throughout the application — **Explore, Share, and Inspire**.

- **Explore** — Authenticated and unauthenticated users can browse the full story catalog, search by keyword, filter by travel type, sort, and paginate results.
- **Share** — Authenticated users can create and publish travel stories with images, location data, travel type, and a descriptive account of their journey.
- **Inspire** — AI-powered tools allow users to generate written travel stories from a photo and a prompt, and to analyze images for scene insights.

---

## User Roles

Tripzo distinguishes between two classes of users:

| Role | Access Level |
|---|---|
| **Unauthenticated visitor** | Can view the homepage, explore all stories, read story details, and view the community page. Cannot post, manage, or use AI features. |
| **Authenticated user** | Has full access including posting stories, managing their own stories, accessing the profile page, and using the AI Story Generator and AI Image Explorer. |

Authentication is enforced through Firebase Authentication. Route protection is implemented client-side in the protected pages layout.

---

## Key Features Summary

1. **Landing page** — Hero section, popular destinations showcase, AI feature highlights, community testimonials, newsletter section, and a footer.
2. **User authentication** — Email/password registration and login, Google OAuth sign-in, and a demo login path for quick access.
3. **Explore stories** — A paginated, filterable, and searchable catalog of all community travel stories.
4. **Story detail view** — A publicly accessible page showing the full story, journey metadata, and related stories in the same travel category.
5. **Post a story** — A protected form allowing authenticated users to publish a new story with title, description, location (city and country), travel date, travel type, and an uploaded image.
6. **My Stories** — A protected page where users view and delete their own published stories.
7. **Profile** — A protected page displaying the authenticated user's display name and email, with quick navigation links.
8. **AI Story Generator** — A protected chat-like interface where users upload a travel photo, provide a prompt, choose a story length, and receive a Gemini-generated travel story.
9. **AI Image Explorer** — A protected interface where users upload a travel photo and receive an automatic AI analysis of the scene, objects, mood, location hints, and travel insights.
10. **Community** — A static public page describing the platform, listing social channels, providing contact details, and stating community values.

---

## Deployment

Tripzo is deployed on **Vercel** with automatic deployments from the main branch.

Live URL: [https://tripzo-by-simanto.vercel.app](https://tripzo-by-simanto.vercel.app)

---

[Back to Project Overview](./README.md) | [Back to Documentation Root](../readme.md)
