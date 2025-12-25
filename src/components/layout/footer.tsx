import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
    return (
        <footer className="bg-background">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Store</h4>
                        <p className="text-sm text-muted-foreground">
                            Premium quality products for the modern lifestyle.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Products</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">New Arrivals</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Featured</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Accessories</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">About</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Terms</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Privacy</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Social</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">Twitter</Link></li>
                            <li><Link href="#" className="hover:text-foreground">Instagram</Link></li>
                            <li><Link href="#" className="hover:text-foreground">GitHub</Link></li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Store Inc. Created by <Link href="https://meroiticmedia.com" target="_blank" rel="noreferrer" className="hover:text-foreground underline underline-offset-4">Meroitic Media</Link>. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
