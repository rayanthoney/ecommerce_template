"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function SignUpForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const form = e.currentTarget;

        await signUp.email({
            email,
            password,
            name,
        }, {
            onSuccess: () => {
                toast.success("Account created successfully");
                form.reset();
                router.push("/");
                router.refresh();
            },
            onError: (ctx) => {
                toast.error(ctx.error.message);
                setError(ctx.error.message);
                setLoading(false);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm" autoComplete="off">
            {error && (
                <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                <input
                    name="name"
                    id="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input
                    name="email"
                    id="email"
                    type="email"
                    required
                    autoComplete="username"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <input
                    name="password"
                    id="password"
                    type="password"
                    required
                    autoComplete="new-password"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sign Up
            </Button>
        </form>
    );
}
