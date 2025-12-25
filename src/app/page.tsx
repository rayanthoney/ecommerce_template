import { ProductGrid } from "@/features/catalog/components/product-grid";
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UserMenu } from "@/features/auth/components/user-menu";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Autonomous Store</h1>

          {session ? (
            <UserMenu user={session.user} />
          ) : (
            <nav className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild variant="default" size="sm">
                <Link href="/signup">Sign Up</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/cart">Cart</Link>
              </Button>
            </nav>
          )}

        </div>
      </header>

      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6 px-4">Latest Arrivals</h2>
        <Suspense fallback={<div className="p-4 text-center">Loading products...</div>}>
          <ProductGrid />
        </Suspense>
      </div>
    </main>
  );
}
