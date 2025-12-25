"use server";

import { z } from "zod";
import { db } from "@/db";
import { carts, cartItems, productVariants } from "@/db/schema";
import { getCartId } from "@/lib/cart";
import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";
import { cookies } from "next/headers";

const addToCartSchema = z.object({
    productId: z.number(),
    quantity: z.number().min(1).default(1),
});

export async function addToCart(formData: FormData) {
    // 1. Validate Input
    const productId = parseInt(formData.get("productId") as string);
    const result = addToCartSchema.safeParse({
        productId,
        quantity: 1, // Defaulting to 1 for Quick Add
    });

    if (!result.success) {
        return { error: "Invalid input" };
    }

    // 2. Resolve Cart ID (User or Guest)
    let cart = await getCartId();
    let cartId = cart?.id;

    // 3. Ensure Cart Exists
    if (!cart) {
        // Should typically be handled by middleware, but good fallback
        const cookieStore = await cookies();
        // Fallback if middleware didn't run or something weird
        let guestId = cookieStore.get("param911_guest_id")?.value;

        if (!guestId) {
            // Create a guest ID if absolutely missing
            guestId = crypto.randomUUID();
            // Note: Can't set cookie in Server Action easily without middleware cooperation usually,
            // but we assume middleware has set it.
        }

        // Create the cart in DB
        const newCart = await db.insert(carts).values({
            guestId: guestId,
        }).returning();
        cartId = newCart[0].id.toString(); // schema has id as serial (number) but getCartId returns string. Wait, schema has id as number.
        // Correction: carts.id is serial (number). getCartId returns { id: string } because user.id is string (better-auth).
        // We need to handle the type mismatch.carts.id is number.
    }

    // Refetch cart ID as number since we are inserting into cartItems where cartId is number
    // Simplified logic: Check if we have a cart record for this user/guest.

    let dbCart;
    if (cart?.type === "user") {
        dbCart = await db.query.carts.findFirst({ where: eq(carts.userId, cart.id) });
        if (!dbCart) {
            dbCart = (await db.insert(carts).values({ userId: cart.id }).returning())[0];
        }
    } else {
        // Guest
        const guestId = cart?.id || (await cookies()).get("param911_guest_id")?.value;
        if (!guestId) return { error: "No guest session found" };

        dbCart = await db.query.carts.findFirst({ where: eq(carts.guestId, guestId) });
        if (!dbCart) {
            dbCart = (await db.insert(carts).values({ guestId }).returning())[0];
        }
    }


    // 4. Find a variant for this product (Quick Add Logic: First available variant)
    const variants = await db
        .select()
        .from(productVariants)
        .where(eq(productVariants.productId, productId))
        .limit(1);

    if (variants.length === 0) {
        return { error: "Product currently unavailable" };
    }
    const variant = variants[0];

    // 5. Upsert Cart Item
    const existingItem = await db.query.cartItems.findFirst({
        where: and(
            eq(cartItems.cartId, dbCart.id),
            eq(cartItems.productVariantId, variant.id)
        ),
    });

    if (existingItem) {
        await db
            .update(cartItems)
            .set({ quantity: existingItem.quantity + 1 })
            .where(eq(cartItems.id, existingItem.id));
    } else {
        await db.insert(cartItems).values({
            cartId: dbCart.id,
            productVariantId: variant.id,
            quantity: 1,
        });
    }

    // 6. Revalidate
    revalidatePath("/");
    return { success: true };
}
