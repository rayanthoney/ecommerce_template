# Task List: Autonomous E-Commerce Application

- [ ] **Phase 1: Project Initialization** <!-- id: 1 -->
    - [x] Initialize Next.js 15 project with TypeScript, Tailwind CSS, and ESLint <!-- id: 2 -->
    - [x] Configure modular file structure (`features/cart`, `features/catalog`, `features/auth`) <!-- id: 3 -->
    - [x] Install and configure Drizzle ORM and Neon PostgreSQL connection <!-- id: 4 -->
    - [x] Install `lucide-react` and other base dependencies <!-- id: 5 -->
    - [x] Set up strict TypeScript configuration <!-- id: 6 -->

- [ ] **Phase 2: Database Engineering** <!-- id: 7 -->
    - [x] Define database schema (Products, Variants, Options, OptionValues, Junctions) <!-- id: 8 -->
    - [x] Create database migration scripts <!-- id: 9 -->
    - [x] Develop `seed.ts` script using Faker for 50 fictitious products <!-- id: 10 -->
    - [x] Run migration and seed script <!-- id: 11 -->

- [ ] **Phase 3: Authentication & Guest Cart** <!-- id: 12 -->
    - [x] Implement Better Auth for user session management <!-- id: 13 -->
    - [x] Create middleware for Guest Session (guest_id cookie) <!-- id: 14 -->
    - [x] Implement Carts table and persistence logic <!-- id: 15 -->
    - [x] Create post-login hook to merge guest cart with user cart <!-- id: 16 -->

- [ ] **Phase 4: UI Construction** <!-- id: 17 -->
    - [x] Set up global layout and generic UI components (Buttons, Inputs) <!-- id: 18 -->
    - [x] Build Product Listing Page (PLP) with URL state management <!-- id: 19 -->
    - [x] Implement Product Card component with responsive design <!-- id: 20 -->
    - [/] Add Suspense boundaries and Skeleton loaders <!-- id: 21 -->

- [x] **Phase 5: Server Actions & Logic** <!-- id: 22 -->
    - [x] Create `addToCart` Server Action with Zod validation <!-- id: 23 -->
    - [x] Implement cart update and removal logic <!-- id: 24 -->
    - [-] Add unit tests for Server Actions <!-- id: 25 -->

- [x] **Phase 6: Checkout Logic** <!-- id: 26 -->
    - [x] Add Order and OrderItem tables to schema <!-- id: 27 -->
    - [x] Create Checkout Page UI with form <!-- id: 28 -->
    - [x] Implement `placeOrder` Server Action <!-- id: 29 -->
    - [x] Create Order Confirmation Page <!-- id: 30 -->

- [x] **Phase 7: Authentication UI** <!-- id: 31 -->
    - [x] Setup Better Auth Client (`lib/auth-client.ts`) <!-- id: 32 -->
    - [x] Create Login Page (`/login`) <!-- id: 33 -->
    - [x] Create Signup Page (`/signup`) <!-- id: 34 -->
    - [x] Update Navbar with User Menu <!-- id: 35 -->
