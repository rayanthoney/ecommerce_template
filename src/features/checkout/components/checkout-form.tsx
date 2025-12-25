"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { placeOrder } from "@/features/checkout/actions/place-order";
import { useState } from "react";

export function CheckoutForm() {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        setError(null);
        startTransition(async () => {
            const result = await placeOrder(formData);
            if (result?.error) {
                setError(result.error);
            }
        });
    };

    return (
        <form action={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input
                        name="email"
                        id="email"
                        type="email"
                        required
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <input
                        name="name"
                        id="name"
                        type="text"
                        required
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">Address</label>
                <input
                    name="address"
                    id="address"
                    type="text"
                    required
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="city" className="text-sm font-medium">City</label>
                    <input
                        name="city"
                        id="city"
                        type="text"
                        required
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="zip" className="text-sm font-medium">ZIP Code</label>
                    <input
                        name="zip"
                        id="zip"
                        type="text"
                        required
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
            </div>

            <Button type="submit" className="w-full mt-6" size="lg" disabled={isPending}>
                {isPending ? "Placing Order..." : "Place Order"}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
                Payment is mocked for this prototype. Order will be placed immediately.
            </p>
        </form>
    );
}
