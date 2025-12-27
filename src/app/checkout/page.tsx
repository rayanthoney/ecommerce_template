import { getCart } from "@/features/cart/data/get-cart";
import { CheckoutForm } from "@/features/checkout/components/checkout-form";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
    const cart = await getCart();

    // Redirect if invalid or empty cart
    if (!cart || !cart.items || cart.items.length === 0) {
        redirect("/cart");
    }

    // Calculate Subtotal (reused logic for now, ideally shared util)
    const subtotal = cart.items.reduce((acc, item) => {
        const price = item.variant.product ? parseFloat(item.variant.product.basePrice) : 0;
        return acc + (price * item.quantity);
    }, 0);

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                    <div className="bg-card p-6 rounded-lg border">
                        <CheckoutForm />
                    </div>
                </div>

                <div>
                    {/* Reusing Cart Summary but modifying context later if needed */}
                    <div className="sticky top-4">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="bg-card p-6 rounded-lg border">
                            <div className="space-y-2 text-sm">
                                {cart.items.map((item) => (
                                    <div key={item.id} className="flex justify-between py-2 border-b last:border-0">
                                        <div className="flex gap-2">
                                            <span className="font-medium">{item.quantity}x</span>
                                            <span>{item.variant.product?.name}</span>
                                        </div>
                                        <span>
                                            {item.variant.product &&
                                                new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
                                                    .format(parseFloat(item.variant.product.basePrice) * item.quantity)
                                            }
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t space-y-2">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(subtotal)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
