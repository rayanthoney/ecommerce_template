"use client";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/features/cart/actions/add-to-cart";
import { useTransition } from "react";
import { ShoppingCart } from "lucide-react";

export function AddToCartButton({ productId }: { productId: number }) {
    const [isPending, startTransition] = useTransition();

    return (
        <Button
            size="sm"
            variant="secondary"
            disabled={isPending}
            onClick={() => {
                startTransition(async () => {
                    const formData = new FormData();
                    formData.append("productId", productId.toString());
                    await addToCart(formData);
                });
            }}
        >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isPending ? "Adding..." : "Add"}
        </Button>
    );
}
