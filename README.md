# Movie Web Application

A web application for browsing and discovering movies powered by the TMDb API.

<img width="800" height="418" alt="ezgif-89232c32263c2c5f" src="https://github.com/user-attachments/assets/4709c1fc-c20f-46c2-ba6b-d6503cc2d056" />

**Live Demo:** https://bit.ly/4foJ03r

The main goal of this project was to build an interface focused on the deep elaboration of UX and edge cases, along with high attention to UI details.

## About the Project

- **UX & Resilience First:** Special attention was given to exception scenarios. The interface uses custom Skeleton components, fallback UI and adaptive block hiding so that API errors never break the overall layout.
- **Flexible Service Layer:** Movie metadata is currently fetched directly from TMDb. However, the service layer allows linking local database records to TMDb IDs without changing any UI logic.

## Tech Stack

- **React:** Chosen to keep the architecture ready for a future React Native app, allowing seamless integration with the existing backend.
- **Next.js:** Chosen to securely hide TMDb API keys in `.env` via a built-in server layer and eliminate the need for React Router with clean file-based routing.
- **Next.js API Routes:** Serve as explicit REST API endpoints (`/api/...`) connecting TanStack Query with external data, laying the foundation for a future React Native mobile app.
- **Supabase:** Chosen for its effortless integration with Next.js and built-in authentication planned for future user registration.
- **Zod:** Ensures schema validation on incoming API requests within Route Handlers, protecting endpoints from malformed query parameters.
- **TanStack Query:** Implemented to cache API responses, preserve scroll position upon navigating back, and power infinite scrolling with `useInfiniteQuery`.

---

## Pages Overview

### Home Page

- **Hero Slider:** Built with Swiper. Loads collection data from the database and fetches details from TMDb, using custom Skeleton loaders and a fallback banner for error handling.
- **Database-Driven Collections:** Movie collections (e.g., "Night Adrenaline", "Timeless Classics") are managed via the database, allowing new collections to be added dynamically directly from the database.
- **Lazy Fetching via Intersection Observer:** To prevent blocking performance with hundreds of concurrent API calls, only collection wrappers are fetched initially. Individual movie items load lazily only when a carousel enters the viewport.
- **Pagination:** Carousels feature infinite scrolling to load additional movies when scrolled to the end.

### Movies Catalog Page

- **Infinite Scroll:** Powered by `useInfiniteQuery` to dynamically stream movie batches as the user scrolls.
- **URL-Driven Filtering:** Filters (genres, release years, ratings) continuously sync with URL parameters.

### Movie Details Page

- **Dynamic Routing:** Fetches movie details based on the URL ID.
- **Lazy-Loaded Sections:** Secondary sections (_Credits_, _Reviews_, _Similar Movies_) only trigger API requests when scrolled into view via `Intersection Observer`.
- **Graceful Degradation:** The UI dynamically adapts to available data. Non-critical missing blocks (such as missing budget figures or unavailable similar movies) seamlessly hide themselves without breaking the layout or showing disruptive error alerts.

### Search Page / Modal

- **Shared Search Provider:** A unified data provider serves both the desktop search modal and the dedicated mobile search view.
- **Debounced Requests:** User input is wrapped in a custom `useDebounce` hook to prevent spamming API requests on every keystroke.
- **Mobile Input Optimization:** Scrolling through search results on mobile automatically clears focus (`blur`) from the search bar, hiding the virtual keyboard for a cleaner view.
- **Search History & Fallbacks:** Recent searches are saved to `localStorage`.

---

## Lessons Learned & Key Takeaways

- **Architectural Validation:** The architecture built around Next.js, Route Handlers, and TanStack Query proved to be an ideal setup for performance, state management, and future cross-platform API scaling.
- **Custom vs. UI Libraries:** Building all components and custom hooks (`useDebounce`, `useIntersectionObserver`) from scratch was a valuable exercise in understanding low-level mechanics. For future production projects, leveraging UI ecosystems (such as shadcn/ui) and utility hook libraries will help shift focus toward business logic and features.
- **Balanced Perfectionism:** Developing a software product involves endless opportunities for micro-refinements. A key takeaway from this project was learning to draw a line at a stable, high-quality build while balancing engineering time with product completeness.
