import { db } from "@/db";
import { carts, cartItems } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function mergeGuestCartIntoUser(userId: string, guestId: string) {
    if (!userId || !guestId) return;

    // 1. Find the guest cart
    const guestCart = await db.query.carts.findFirst({
        where: eq(carts.guestId, guestId),
        with: {
            items: true,
        },
    });

    if (!guestCart) return;

    // 2. Find the user cart
    const userCart = await db.query.carts.findFirst({
        where: eq(carts.userId, userId),
        with: {
            items: true,
        },
    });

    // Case A: User has no existing cart.
    // Simply adopt the guest cart.
    if (!userCart) {
        await db
            .update(carts)
            .set({ userId: userId, guestId: null }) // clear guestId to "finalize" it as a user cart
            .where(eq(carts.id, guestCart.id));
        return;
    }

    // Case B: User already has a cart.
    // We need to merge items from guestCart into userCart.
    const guestItems = guestCart.items;
    const userItems = userCart.items;

    for (const guestItem of guestItems) {
        const existingUserItem = userItems.find(
            (ui) => ui.productVariantId === guestItem.productVariantId
        );

        if (existingUserItem) {
            // Variant exists in user cart: Update quantity
            await db
                .update(cartItems)
                .set({
                    quantity: existingUserItem.quantity + guestItem.quantity,
                })
                .where(eq(cartItems.id, existingUserItem.id));

            // Delete the guest item since we merged it
            await db.delete(cartItems).where(eq(cartItems.id, guestItem.id));
        } else {
            // Variant does not exist: Move it to the user cart
            await db
                .update(cartItems)
                .set({
                    cartId: userCart.id,
                })
                .where(eq(cartItems.id, guestItem.id));
        }
    }

    // 3. Delete the now-empty guest cart
    await db.delete(carts).where(eq(carts.id, guestCart.id));
}
