"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CartSummaryProps {
    subtotal: number;
}

export function CartSummary({ subtotal }: CartSummaryProps) {
    return (
        <div className="bg-card p-6 rounded-lg border sticky top-4">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>Calculated at checkout</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(subtotal)}</span>
                </div>
            </div>
            <Button asChild className="w-full mt-6" size="lg">
                <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-4">
                Taxes and shipping calculated at checkout.
            </p>
        </div>
    );
}
