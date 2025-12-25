import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),
    emailAndPassword: {
        enabled: true,
    },
    // Add other providers here (e.g., Google, GitHub)
    databaseHooks: {
        session: {
            create: {
                after: async (session) => {
                    const { cookies } = await import("next/headers");
                    const cookieStore = await cookies();
                    const guestId = cookieStore.get("param911_guest_id")?.value;

                    if (guestId) {
                        const { mergeGuestCartIntoUser } = await import("@/features/cart/data/merge-cart");
                        await mergeGuestCartIntoUser(session.userId, guestId);
                    }
                },
            },
        },
    },
});
