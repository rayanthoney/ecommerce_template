# **The Autonomous E-Commerce Template: A Development Guide**

## **1\. Introduction: The Agentic Workflow**

This document serves as a master template for building scalable, production-ready e-commerce applications. It is designed for the "Autonomous Engineer"—a developer who orchestrates AI agents rather than writing every line of code manually.  
**The Core Shift:** We are replacing the traditional "coding" loop with an **Agentic Orchestration** loop using **Google Antigravity**. Unlike standard chat assistants, Antigravity provides a "Mission Control" interface where you manage autonomous agents that can plan, execute, and verify tasks across your editor, terminal, and browser.

## ---

**2\. The Tech Stack: "Bleeding Edge Stability"**

This template enforces a **Modular Monolith** architecture using the following high-performance stack. This combination provides the best balance of SEO, type safety, and developer velocity.

* **Platform:** **Google Antigravity** (Agentic IDE)  
* **Framework:** **Next.js 15** (App Router, Server Components)  
* **Language:** **TypeScript** (Strict Mode)  
* **Database:** **PostgreSQL** (via Neon)  
* **ORM:** **Drizzle ORM** (Schema-as-Code)  
* **Styling:** **Tailwind CSS**  
* **Auth:** **Better Auth** (Session Management)  
* **State:** **Zustand** (Global Client State)

## ---

**3\. Operational Methodology: The Antigravity Workflow**

Success in this paradigm relies on **"Engineer Prompting"**—delegating tasks with architectural precision rather than vague user requests.

### **3.1 The "Agent Manager" Protocol**

In Antigravity, you do not just "chat" with code. You spawn agents in the **Agent Manager** view to handle asynchronous tasks.  
The 5-Step Delegation Framework:  
When spawning an agent in Mission Control, use this structure:

1. **Objective:** High-level goal (e.g., "Build the Product Listing Page").  
2. **Structure:** Technical boundaries (e.g., "Use Server Components for the grid, Client Components for filters").  
3. **Tasks:** Atomic steps (e.g., "1. Define DB query. 2\. Build Filter UI. 3\. implement URL state syncing.").  
4. **Output:** Required Artifacts (e.g., "Generate a task list Artifact and a code diff for review.").  
5. **Notes:** Constraints (e.g., "Ensure mobile responsiveness matches the wireframe.").

### **3.2 Verification via Artifacts**

Antigravity agents generate **Artifacts**—tangible deliverables like implementation plans, task lists, and screenshots.

* **Do not** read every line of code immediately.  
* **Do:** Review the **Implementation Plan Artifact** first. If the logic is sound, approve it for execution.  
* **Do:** Use the **Browser Verification** artifact to see if the UI matches your expectations without running the app locally yourself.

## ---

**4\. Phase 1: Project Initialization**

**Goal:** Set up a type-safe, modular foundation.  
**Agent Prompt (in Agent Manager):**  
"Initialize a Next.js 15 project with TypeScript, Tailwind, and Drizzle. Configure a modular file structure with separate directories for features/cart, features/catalog, and features/auth. Set up strict TypeScript rules and install lucide-react for icons."  
Antigravity Action:  
The agent will execute terminal commands to scaffold the app, create the folder structure, and generate the initial drizzle.config.ts. It will present a Task List Artifact checking off each installation step.

## ---

**5\. Phase 2: Database Engineering (Generic & Normalized)**

**Goal:** Create a robust, normalized schema that supports complex product variations (e.g., Size, Color, Material) without data redundancy.

### **5.1 The Schema Strategy**

Do not use a single "Products" table. Instruct the agent to build a **3rd Normal Form** schema:

* products (Base metadata: Name, Description, Base Price)  
* product\_variants (SKU specific: Stock, Price Override)  
* options (Definitions: "Color", "Size")  
* option\_values (Values: "Red", "XL", "Cotton")  
* variant\_option\_values (Junction table linking Variants to Values)

### **5.2 Automated Placeholder Seeding**

Instead of scraping real data, we will generate "Lorem Ipsum" for e-commerce.  
**Agent Prompt:**  
"Create a database seed script seed.ts. Use the faker library to generate 50 fictitious products.

* Create 5 unique 'Brands' (e.g., 'Apex', 'Zenith').  
* For each product, generate a realistic name, description, and price.  
* Generate random variants (Sizes S-XL, random Colors).  
* Ensure referential integrity is maintained.  
* **Output:** A script that I can run via npm run db:seed."

**Why this works:** Antigravity can write complex logic to ensure that a "Red T-Shirt" variant is correctly linked to the "Red" option value, saving hours of manual data entry.

## ---

**6\. Phase 3: Authentication & Guest Cart Experience**

**Goal:** Allow anonymous users to shop (Guest Cart) and merge their cart upon registration.  
**The "Antigravity" Logic Flow:**

1. **Guest Session:** The agent creates middleware to check for a session cookie. If missing, it generates a guest\_id and stores it in an HTTP-Only cookie.  
2. **Cart Persistence:** Database calls to the carts table use this guest\_id.  
3. **Merge Hook:**  
   * **Prompt:** "Create a post-login hook using Better Auth. When a user logs in, search for any active cart associated with their guest\_id cookie. Update those cart rows to reference the new user\_id. Handle conflicts (e.g., if they already have a user cart, merge quantities)."

## ---

**7\. Phase 4: UI Construction (Visual Prompting)**

**Goal:** Build responsive, accessible UI components without writing CSS manually.

### **7.1 Visual-to-Code**

Use Antigravity's multimodal capabilities.

* **Input:** Upload a generic wireframe or a whiteboard sketch of a "Modern E-Commerce Product Card."  
* **Prompt:** "Build this component using Tailwind CSS. Use a standard 4-point grid system. The 'Add to Cart' button should be hidden until hover on desktop, but always visible on mobile."

### **7.2 The Product Listing Page (PLP)**

**Architecture:**

* **URL as State:** Instruct the agent: "Do not use useState for filters. Sync all filters (color, sort, price) to the URL Query Parameters."  
* **Server Component:** The Product Grid component reads searchParams prop and passes it directly to the Drizzle query.  
* **Suspense:** Wrap the grid in a \<Suspense\> boundary with a skeleton loader Artifact to ensure the page doesn't block while fetching data.

## ---

**8\. Phase 5: Server Actions & Logic**

**Goal:** Eliminate API routes in favor of type-safe Server Actions.  
**Agent Prompt:**  
"Create a Server Action addToCart.

1. **Validation:** Use Zod to validate the input (product ID, quantity \> 0).  
2. **Auth Check:** specific logic to determine if we use user\_id or guest\_id.  
3. **Database:** Perform an 'upsert' (update quantity if exists, insert if new).  
4. **Revalidation:** Trigger revalidatePath('/cart') to update the UI."

Antigravity Verification:  
Use the Agent Manager to spawn a "Tester Agent" that writes a Jest test case for this action, verifying that negative quantities are rejected.

## ---

**9\. Conclusion**

By using **Antigravity**, you have shifted from a "Typist" to an "Architect." Your primary artifact is no longer the code itself, but the *plans* and *prompts* that generate the code. This template provides the rigid skeleton (Next.js/Postgres/Auth) required for a professional app, while allowing the AI agent to handle the implementation details of the generic e-commerce logic.