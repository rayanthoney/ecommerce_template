import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { AddToCartButton } from "./add-to-cart-button";

interface ProductCardProps {
    id: number;
    name: string;
    description: string | null;
    basePrice: string;
}

export function ProductCard({ id, name, description, basePrice }: ProductCardProps) {
    return (
        <div className="group relative border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-card">
            <div className="aspect-square bg-muted relative">
                {/* Placeholder for Product Image */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 text-4xl font-bold uppercase tracking-widest">
                    {name.substring(0, 2)}
                </div>
            </div>
            <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                    {description}
                </p>
                <div className="flex items-center justify-between pt-2">
                    <span className="font-bold text-lg">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(basePrice))}
                    </span>
                    <div className="flex gap-2">
                        <AddToCartButton productId={id} />
                        <Button size="sm" variant="outline" asChild>
                            <Link href={`/product/${id}`}>View</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
