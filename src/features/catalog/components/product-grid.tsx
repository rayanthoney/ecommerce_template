import { db } from "@/db";
import { products } from "@/db/schema";
import { ProductCard } from "./product-card";

export async function ProductGrid() {
    const allProducts = await db.select().from(products).limit(50); // Simple fetch for now

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {allProducts.map((product) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    basePrice={product.basePrice}
                />
            ))}
        </div>
    );
}
