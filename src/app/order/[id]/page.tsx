import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function OrderPage({ params }: { params: { id: string } }) {
    // Await params if Next.js version requires it (15 might), though typically sync in args in recent versions? 
    // Wait, params is promise in new Next/Canary but we are using 15.
    // Let's assume params is available.
    // Wait, params in generated code usually needs await in async components in 15? 
    // Let's safe bet.
    const { id } = await (params as any); // Type assertion for safety if types mismatch

    // Parse int ID
    const orderId = parseInt(id);
    if (isNaN(orderId)) notFound();

    // Fetch Order
    const order = await db.query.orders.findFirst({
        where: eq(orders.id, orderId),
        with: {
            items: {
                with: {
                    variant: {
                        with: {
                            product: true
                        }
                    }
                }
            }
        }
    });

    if (!order) notFound();

    return (
        <div className="container mx-auto py-16 px-4 flex flex-col items-center max-w-2xl text-center">
            <div className="h-20 w-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>

            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-8">
                Thank you, {order.shippingDetails ? (order.shippingDetails as any).name : 'Guest'}.
                Your order #{order.id} has been placed.
            </p>

            <div className="bg-card w-full rounded-lg border p-6 text-left mb-8">
                <h3 className="font-semibold mb-4 border-b pb-2">Order Details</h3>
                <div className="space-y-3">
                    {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.quantity}x {item.variant.product?.name}</span>
                            <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(item.price))}</span>
                        </div>
                    ))}
                    <div className="flex justify-between font-bold pt-4 border-t mt-4">
                        <span>Total</span>
                        <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(order.total))}</span>
                    </div>
                </div>
            </div>

            <Button asChild size="lg">
                <Link href="/">Continue Shopping</Link>
            </Button>
        </div>
    );
}
