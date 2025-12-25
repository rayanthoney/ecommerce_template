import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getCartId(): Promise<{ type: "user" | "guest"; id: string } | null> {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (session?.user) {
        return { type: "user", id: session.user.id };
    }

    const cookieStore = await cookies();
    const guestId = cookieStore.get("param911_guest_id")?.value;

    if (guestId) {
        return { type: "guest", id: guestId };
    }

    return null;
}
