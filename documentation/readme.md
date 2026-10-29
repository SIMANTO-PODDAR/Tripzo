# Tripzo — Technical Documentation

> **Documentation entry point for the Tripzo travel storytelling platform.**  
> All documentation files are located inside this `documentation/` directory.

---

## Purpose

This documentation system describes the actual implementation of the Tripzo application. It is intended for developers who need to understand the codebase, extend the platform, or maintain the project. Every technical claim in these documents has been verified against the source code.

---

## Documentation Sections

| Section | Directory | Description |
|---|---|---|
| [Project Overview](./01-project-overview/README.md) | `01-project-overview/` | Platform summary, technology stack, and directory structure |
| [Architecture](./02-architecture/README.md) | `02-architecture/` | Application architecture, routing, authentication, and data flow |
| [Setup and Configuration](./03-setup-and-configuration/README.md) | `03-setup-and-configuration/` | Installation, environment variables, and development workflow |
| [Features](./04-features/README.md) | `04-features/` | Detailed documentation of each implemented feature |
| [API Reference](./05-api-reference/README.md) | `05-api-reference/` | All Next.js API routes — endpoints, parameters, and responses |
| [Data and Integrations](./06-data-and-integrations/README.md) | `06-data-and-integrations/` | Firestore data model, Firebase, ImgBB, and Gemini AI integrations |
| [Deployment](./07-deployment/README.md) | `07-deployment/` | Production build and deployment information |

---

## Quick Navigation

### For a new developer onboarding

1. Start with **[Project Overview](./01-project-overview/README.md)** to understand what Tripzo does and its technology choices.
2. Read **[Architecture](./02-architecture/README.md)** to understand how the app is organized.
3. Follow **[Setup and Configuration](./03-setup-and-configuration/setup.md)** to get a local development environment running.

### For understanding specific features

Navigate to **[Features](./04-features/README.md)** and open the relevant feature document.

### For API integration or backend work

- **[API Reference](./05-api-reference/README.md)** — all endpoint documentation.
- **[Data and Integrations](./06-data-and-integrations/README.md)** — the Firestore schema and external service details.

### For deployment

See **[Deployment](./07-deployment/README.md)** for build and hosting information.

---

## Documentation File Index

```
documentation/
├── readme.md                              ← You are here (root index)
│
├── 01-project-overview/
│   ├── README.md                          ← Section index
│   ├── overview.md                        ← Platform description and purpose
│   ├── tech-stack.md                      ← Technology choices and versions
│   └── directory-structure.md             ← Source code layout and conventions
│
├── 02-architecture/
│   ├── README.md                          ← Section index
│   ├── application-architecture.md        ← App Router organization, SSR vs. CSR
│   ├── routing.md                         ← All routes and access control
│   └── authentication-flow.md             ← Firebase Auth integration and guard
│
├── 03-setup-and-configuration/
│   ├── README.md                          ← Section index
│   └── setup.md                           ← Install, env vars, dev server, build
│
├── 04-features/
│   ├── README.md                          ← Section index
│   ├── landing-page.md                    ← Homepage sections and behavior
│   ├── authentication.md                  ← Sign-in, register, Google OAuth
│   ├── explore-stories.md                 ← Browse, filter, sort, paginate stories
│   ├── story-detail.md                    ← Individual story view
│   ├── post-story.md                      ← Story creation and image upload
│   ├── my-stories.md                      ← User story management and deletion
│   ├── profile.md                         ← User profile page
│   ├── ai-story-generator.md              ← AI-powered story generation feature
│   ├── ai-image-explorer.md               ← AI-powered image analysis feature
│   └── community.md                       ← Community hub page
│
├── 05-api-reference/
│   ├── README.md                          ← Section index
│   ├── all-stories-api.md                 ← GET /api/all-stories and GET /api/all-stories/[id]
│   ├── my-stories-api.md                  ← GET /api/my-stories
│   └── ai-api.md                          ← POST /api/ai
│
├── 06-data-and-integrations/
│   ├── README.md                          ← Section index
│   ├── data-models.md                     ← TypeScript types and Firestore schema
│   ├── firebase-integration.md            ← Firebase Auth and Firestore setup
│   ├── imgbb-integration.md               ← Image hosting via ImgBB
│   └── gemini-integration.md              ← Google Gemini AI integration
│
└── 07-deployment/
    ├── README.md                          ← Section index
    └── deployment.md                      ← Build process and Vercel deployment
```

---

## Maintenance Notes

- All documentation reflects the codebase as it exists at the time of writing.
- When source code changes, update the corresponding documentation file.
- Do not add links to documents that have not been created.
- Section `README.md` files serve as navigation aids. Substantive content lives in the named documents within each section.
