"use server";

import { db } from "@/db";
import { cartItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateItemQuantity(itemId: number, quantity: number) {
    if (quantity <= 0) {
        await db.delete(cartItems).where(eq(cartItems.id, itemId));
    } else {
        await db.update(cartItems)
            .set({ quantity })
            .where(eq(cartItems.id, itemId));
    }
    revalidatePath("/cart");
}

export async function removeItem(itemId: number) {
    await db.delete(cartItems).where(eq(cartItems.id, itemId));
    revalidatePath("/cart");
}
