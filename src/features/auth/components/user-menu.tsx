"use client";

import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, LogOut } from "lucide-react";

interface UserMenuProps {
    user: {
        name: string;
        email: string;
    };
}

export function UserMenu({ user }: UserMenuProps) {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.refresh();
                },
            },
        });
    };

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                <span className="font-medium">{user.name}</span>
            </div>
            <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-muted-foreground hover:text-foreground"
            >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
            </Button>
            <Button asChild variant="outline" size="sm">
                <Link href="/cart">Cart</Link>
            </Button>
        </div>
    );
}
