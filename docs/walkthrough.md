# Walkthrough - Autonomous Store Prototype

## Overview
We have built a functional E-commerce prototype with the following core flows:
1.  **Product Discovery**: Products are listed on the homepage.
2.  **Cart Management**: Users (authenticated or guest) can add/remove items.
3.  **Checkout**: A form collects shipping info and places a mock order.
4.  **Order Confirmation**: Users receive a confirmation with their Order ID.
5.  **Authentication**: Users can Sign Up, Log In, and Log Out.

## Features

### Authentication
- **Sign In/Up**: `/login` and `/signup` pages using Email/Password.
- **Session Management**: Better Auth handles sessions (persists in DB).
- **Navbar**: dynamically updates to show "Sign In" vs User Menu (Name + Sign Out).

### Checkout Flow
- **Guest Checkout**: Works seamlessly using the `param911_guest_id` cookie.
- **Validation**: Shipping form strictly validates inputs (Email, Name, Address, City, Zip).
- **Transaction**: Placing an order creates the order, moves items from `cartItems` to `orderItems`, and clears the cart.
- **Confirmation**: Redirects to a unique order page (e.g., `/order/1`).

## How to Test
1.  **Home**: Check the top right. You should see "Sign In" / "Sign Up".
2.  **Sign Up**: Create an account. You will be logged in and redirected Home.
3.  **User Menu**: You should now see your name. Click to see "Sign Out".
4.  **Cart**: Add items. Go to Checkout.
5.  **Place Order**: Verify order placement.

## Technical Details
- **Database**: PostgreSQL (Neon) with Drizzle ORM.
- **State**: Server Actions handle all mutations (Cart & Order).
- **Auth**: Better Auth (Email/Pass) + Client components.
- **Styling**: Tailwind CSS v4.
