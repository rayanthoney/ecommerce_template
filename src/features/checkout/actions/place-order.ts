"use server";

import { z } from "zod";
import { db } from "@/db";
import { carts, cartItems, orders, orderItems, productVariants } from "@/db/schema";
import { getCartId } from "@/lib/cart";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Validation Schema for Shipping Info
const shippingSchema = z.object({
    email: z.string().email(),
    name: z.string().min(2, "Name is required"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    zip: z.string().min(4, "ZIP code is required"),
});

export async function placeOrder(formData: FormData) {
    // 1. Validate Input
    const rawData = {
        email: formData.get("email"),
        name: formData.get("name"),
        address: formData.get("address"),
        city: formData.get("city"),
        zip: formData.get("zip"),
    };

    const validation = shippingSchema.safeParse(rawData);

    if (!validation.success) {
        return { error: "Invalid shipping details. Please check form." };
    }

    const shippingDetails = validation.data;

    // 2. Get Cart
    const cartInfo = await getCartId();
    if (!cartInfo) return { error: "Cart not found" };

    let dbCart;
    if (cartInfo.type === "user") {
        dbCart = await db.query.carts.findFirst({
            where: eq(carts.userId, cartInfo.id),
            with: { items: { with: { variant: { with: { product: true } } } } }
        });
    } else {
        dbCart = await db.query.carts.findFirst({
            where: eq(carts.guestId, cartInfo.id),
            with: { items: { with: { variant: { with: { product: true } } } } }
        });
    }

    if (!dbCart || dbCart.items.length === 0) {
        return { error: "Your cart is empty." };
    }

    // 3. Calculate Total & Prepare Order Data
    let total = 0;
    const orderItemsData = [];

    for (const item of dbCart.items) {
        const price = parseFloat(item.variant.product.basePrice); // Assuming base price for now
        // If variant has overrides, logic would go here
        total += price * item.quantity;

        orderItemsData.push({
            productVariantId: item.productVariantId,
            quantity: item.quantity,
            price: price.toString(), // Snapshot price
        });
    }

    // 4. Transaction: Create Order, Items, Clear Cart
    let newOrderId;

    // A. Create Order
    const [insertedOrder] = await db.insert(orders).values({
        userId: cartInfo.type === "user" ? cartInfo.id : null,
        guestId: cartInfo.type === "guest" ? cartInfo.id : null,
        email: shippingDetails.email,
        status: "paid", // MOCK: Auto-paid
        total: total.toString(),
        shippingDetails: shippingDetails,
    }).returning();

    newOrderId = insertedOrder.id;

    // B. Create Order Items
    for (const itemData of orderItemsData) {
        await db.insert(orderItems).values({
            orderId: newOrderId,
            ...itemData
        });
    }

    // C. Clear Cart Items
    await db.delete(cartItems).where(eq(cartItems.cartId, dbCart.id));

    // Optional: Delete the cart itself or just leave it empty. 
    // Usually keeping the cart record is fine, just empty items.

    if (!newOrderId) return { error: "Transaction failed" };

    // 5. Redirect
    revalidatePath("/cart");
    redirect(`/order/${newOrderId}`);
}
