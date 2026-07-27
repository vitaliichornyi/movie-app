# Movie Web Application

A web application for browsing and discovering movies powered by the TMDb API.

The main goal of this project was to build an interface focused on the deep elaboration of UX and edge cases, along with high attention to UI details.

## About the Project

- **UX & Resilience First:** Special attention was given to exception scenarios. The interface uses custom Skeleton components, fallback UI and adaptive block hiding so that API errors never break the overall layout.
- **Flexible Service Layer:** Movie metadata is currently fetched directly from TMDb. However, the service layer allows linking local database records to TMDb IDs without changing any UI logic.

## Tech Stack

- **Supabase:** Chosen for its effortless integration with Next.js and built-in authentication planned for future user registration.
- **Next.js (App Router):** Chosen to securely hide TMDb API keys in `.env` via a built-in server layer and eliminate the need for React Router with clean file-based routing.

* **Next.js API Routes (Route Handlers):** Serve as explicit REST API endpoints (`/api/...`) connecting TanStack Query with external data, laying the foundation for a future React Native mobile app.

- **Zod:** Ensures schema validation on incoming API requests within Route Handlers, protecting endpoints from malformed query parameters.
- **TanStack Query:** Implemented to cache API responses, preserve scroll position upon navigating back, and power infinite scrolling with `useInfiniteQuery`.
- **React:** Chosen to keep the architecture ready for a future React Native app, allowing seamless integration with the existing backend.
