"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { updateItemQuantity, removeItem } from "@/features/cart/actions/update-cart";
import { useTransition } from "react";
import { cn, formatCurrency } from "@/lib/utils";

// Helper type for the nested data structure
interface CartItemProps {
    item: {
        id: number;
        quantity: number;
        variant: {
            id: number;
            product: {
                name: string;
                basePrice: string;
            } | null; // Handle potential null if relation fails, though schema says not null usually
        };
    };
}

export function CartLineItem({ item }: CartItemProps) {
    const [isPending, startTransition] = useTransition();

    const handleQuantityChange = (delta: number) => {
        startTransition(async () => {
            await updateItemQuantity(item.id, item.quantity + delta);
        });
    };

    const handleRemove = () => {
        startTransition(async () => {
            await removeItem(item.id);
        });
    };

    const product = item.variant.product;
    const price = product ? parseFloat(product.basePrice) : 0;
    const total = price * item.quantity;

    return (
        <div className={cn("flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-b", isPending && "opacity-50")}>
            <div className="flex gap-4">
                {/* Placeholder image */}
                <div className="h-16 w-16 bg-muted rounded flex items-center justify-center text-xs font-bold uppercase">
                    {product?.name.substring(0, 2)}
                </div>
                <div>
                    <h4 className="font-semibold">{product?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                        {/* If we had variant options like Size/Color, they'd go here */}
                        Qty: {item.quantity}
                    </p>
                    <div className="sm:hidden mt-2 font-medium">
                        {formatCurrency(total)}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={isPending || item.quantity <= 1}
                    >
                        <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(1)}
                        disabled={isPending}
                    >
                        <Plus className="h-3 w-3" />
                    </Button>
                </div>

                <div className="hidden sm:block font-medium w-24 text-right">
                    {formatCurrency(total)}
                </div>

                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={handleRemove} disabled={isPending}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
