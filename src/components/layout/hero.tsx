import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section id="hero" className="relative overflow-hidden py-24 sm:py-32 lg:pb-40">
            {/* Background Gradient */}
            <div className="absolute inset-0 -z-10 bg-background">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-background" />
                <div className="absolute top-0 -z-10 h-full w-full overflow-hidden opacity-20 blur-3xl" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-primary to-secondary sm:left-[calc(50%-30rem)] sm:w-288.75"
                        style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}>
                    </div>
                </div>
            </div>

            <div className="container px-4 md:px-6 relative">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                        New Collection 2025
                    </div>
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                        Elevate Your Lifestyle
                    </h1>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Discover our curated collection of premium products designed to inspire and empower. Quality you can trust, style you can flaunt.
                    </p>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row mt-6">
                        <Button size="lg" asChild className="px-8">
                            <Link href="#products">
                                Shop Now
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" asChild className="px-8">
                            <Link href="/about">
                                Our Story
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
