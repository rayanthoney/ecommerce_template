import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { UserMenu } from "@/features/auth/components/user-menu";
import { ModeToggle } from "@/components/mode-toggle";

export async function Navbar() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/#hero" className="flex items-center space-x-2 mr-6">
                    <span className="text-xl font-bold tracking-tight">LOGO</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground ml-auto mr-4">
                    <Link href="#products" className="transition-colors hover:text-foreground">
                        Products
                    </Link>
                    <Link href="/about" className="transition-colors hover:text-foreground">
                        About
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <ModeToggle />

                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/cart">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="sr-only">Cart</span>
                        </Link>
                    </Button>

                    {session?.user ? (
                        <UserMenu user={session.user} />
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/login">Log in</Link>
                            </Button>
                            <Button size="sm" asChild>
                                <Link href="/signup">Sign up</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
