import { getCart } from "@/features/cart/data/get-cart";
import { CartLineItem } from "@/features/cart/components/cart-line-item";
import { CartSummary } from "@/features/cart/components/cart-summary";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export default async function CartPage() {
    const cart = await getCart();

    const items = cart?.items || [];

    // Calculate Subtotal
    const subtotal = items.reduce((acc, item) => {
        const price = item.variant.product ? parseFloat(item.variant.product.basePrice) : 0;
        return acc + (price * item.quantity);
    }, 0);

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center">
                    <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                </div>
                <h1 className="text-2xl font-bold">Your cart is empty</h1>
                <p className="text-muted-foreground">Looks like you haven&apos;t added anything yet.</p>
                <Button asChild>
                    <Link href="/">Continue Shopping</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="space-y-0">
                        {items.map((item) => (
                            <CartLineItem key={item.id} item={item} />
                        ))}
                    </div>
                </div>

                <div>
                    <CartSummary subtotal={subtotal} />
                </div>
            </div>
        </div>
    );
}
