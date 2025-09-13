"use client";

import { useDataContext } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CartPage() {
  const { cart, products, removeFromCart, updateCartQuantity, getCartTotal } = useDataContext();
  const { currentUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const shippingCost = 100;

  if (!currentUser) {
    router.push('/login');
    return null;
  }
  
  const cartProducts = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...product, quantity: item.quantity };
  }).filter(item => item.id);

  const handleCheckout = () => {
    toast({
        title: "Feature not implemented",
        description: "The checkout process is for demonstration purposes only."
    });
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="mt-4 font-headline text-3xl">Your Cart is Empty</h1>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild className="mt-6">
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-headline text-4xl mb-8">Your Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartProducts.map(item => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/3">
                  <Image src={item.imageUrl!} alt={item.name!} width={200} height={150} className="rounded-md object-cover w-full h-auto" data-ai-hint={item.imageHint} />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <Link href={`/products/${item.id}`} className="font-bold hover:underline">{item.name}</Link>
                    <p className="text-sm text-muted-foreground">Sold by {item.sellerName}</p>
                    <p className="text-lg font-headline text-primary mt-1">₹{item.price?.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateCartQuantity(item.id!, parseInt(e.target.value))}
                      className="w-20 text-center"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id!)}>
                      <Trash2 className="h-5 w-5 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{shippingCost.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>₹0.00</span>
                </div>
                <Separator />
                 <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{(getCartTotal() + shippingCost).toFixed(2)}</span>
                </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" onClick={handleCheckout}>Proceed to Checkout</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
