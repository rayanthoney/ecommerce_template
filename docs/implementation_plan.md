# Implementation Plan - Phase 7: Authentication UI

## Goal Description
Implement the user interface for Authentication, enabling users to Sign Up, Log In, and Log Out. Integrate user session state into the Navbar.

## User Review Required
> [!NOTE]
> Using Email/Password authentication as configured in `src/lib/auth.ts`.
> Client-side authentication will be handled using `better-auth/react`.

## Proposed Changes

### Configuration
#### [NEW] [src/lib/auth-client.ts](file:///src/lib/auth-client.ts)
- Initialize Better Auth client.
- Export `authClient`, `useSession`, `signIn`, `signUp`, `signOut`.

### UI Components
#### [NEW] [src/features/auth/components/sign-in-form.tsx](file:///src/features/auth/components/sign-in-form.tsx)
- Client Component.
- Form validation (Zod).
- Uses `authClient.signIn.email`.
- Redirects to `/` or previous page on success.

#### [NEW] [src/features/auth/components/sign-up-form.tsx](file:///src/features/auth/components/sign-up-form.tsx)
- Client Component.
- Fields: Name, Email, Password.
- Uses `authClient.signUp.email`.

#### [NEW] [src/features/auth/components/user-menu.tsx](file:///src/features/auth/components/user-menu.tsx)
- Display user name/avatar.
- Dropdown with "Sign Out".

### Pages
#### [NEW] [src/app/login/page.tsx](file:///src/app/login/page.tsx)
- Renders `SignInForm`.
- Link to Signup.

#### [NEW] [src/app/signup/page.tsx](file:///src/app/signup/page.tsx)
- Renders `SignUpForm`.
- Link to Login.

### Integration
#### [MODIFY] [src/app/page.tsx](file:///src/app/page.tsx)
- Replace "Guest" placeholder with `UserMenu` (conditionally rendered) or "Sign In" button.
- Check session on server or client.

## Verification Plan
1.  **Build**: Ensure no type errors.
2.  **Sign Up**: Create a new user account.
    - Verify redirection to Home/Dashboard.
    - Verify Database record in `user` table.
3.  **Sign In**: Log out and log back in.
4.  **Session**: Reload page, ensure session persists.
5.  **Logout**: Verify logout clears session.
