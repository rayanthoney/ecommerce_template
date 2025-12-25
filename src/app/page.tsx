import { ProductGrid } from "@/features/catalog/components/product-grid";
import { Suspense } from "react";

import { Hero } from "@/components/layout/hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <div id="products" className="container mx-auto py-16">
        <h2 className="text-3xl font-bold mb-6 px-4">Latest Arrivals</h2>
        <Suspense fallback={<div className="p-4 text-center">Loading products...</div>}>
          <ProductGrid />
        </Suspense>
      </div>
    </main>
  );
}
