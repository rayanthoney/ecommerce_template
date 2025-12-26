import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu } from "lucide-react";
import { UserMenu } from "@/features/auth/components/user-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export async function Navbar() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Mobile Menu */}
                <div className="md:hidden mr-2">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            <div className="flex flex-col gap-4 mt-8">
                                <Link href="/" className="text-lg font-medium hover:text-primary">
                                    Home
                                </Link>
                                <Link href="#products" className="text-lg font-medium hover:text-primary">
                                    Products
                                </Link>
                                <Link href="/about" className="text-lg font-medium hover:text-primary">
                                    About
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

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
