import { db } from "@/db";
import { carts } from "@/db/schema";
import { getCartId } from "@/lib/cart";
import { eq } from "drizzle-orm";

export async function getCart() {
    const cartInfo = await getCartId();
    if (!cartInfo) return null;

    // Query by User ID or Guest ID
    const whereClause = cartInfo.type === "user"
        ? eq(carts.userId, cartInfo.id)
        : eq(carts.guestId, cartInfo.id);

    const cart = await db.query.carts.findFirst({
        where: whereClause,
        with: {
            items: {
                with: {
                    variant: {
                        with: {
                            product: true
                        }
                    }
                },
                orderBy: (items, { asc }) => [asc(items.id)],
            }
        }
    });

    return cart;
}

export type CartData = Awaited<ReturnType<typeof getCart>>;
