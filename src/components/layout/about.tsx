export function AboutContent() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="space-y-8 text-center sm:text-left">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                    About Us
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Welcome to <span className="font-semibold text-foreground">Store Inc.</span>, where quality meets innovation.
                    We are dedicated to providing the finest products for the modern lifestyle, curated with care and precision.
                </p>
            </div>

            <div className="mt-16 grid gap-12 sm:grid-cols-2">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Our Mission</h2>
                    <p className="text-muted-foreground">
                        To empower individuals with tools and accessories that enhance their daily lives, helping them achieve more with style and efficiency.
                    </p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Our Vision</h2>
                    <p className="text-muted-foreground">
                        A world where technology and design blend seamlessly, creating experiences that are both functional and beautiful.
                    </p>
                </div>
            </div>

            <div className="mt-16 border-t pt-16">
                <h2 className="text-2xl font-bold mb-6">The Meroitic Media Touch</h2>
                <p className="text-muted-foreground leading-relaxed">
                    Built by <span className="font-semibold text-foreground">Meroitic Media</span>, this platform represents the pinnacle of autonomous e-commerce technology. We believe in building software that not only works flawlessly but also delights the user at every interaction.
                </p>
            </div>
        </div>
    );
}
