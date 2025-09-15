
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
import { Trash2, ShoppingBag, CheckCircle, CreditCard, ImageOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';

const SuccessAnimation = ({ onComplete }: { onComplete: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onComplete, 2000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <CheckCircle className="w-24 h-24 text-green-500 animate-pulse" />
            <p className="mt-4 text-xl font-headline">Transaction Successful!</p>
        </div>
    );
};

export default function CartPage() {
  const { cart, products, removeFromCart, updateCartQuantity, getCartTotal, addSale, clearCart } = useDataContext();
  const { currentUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const shippingCost = 100;
  
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!currentUser) {
    router.push('/login');
    return null;
  }
  
  const cartProducts = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return product ? { ...product, quantity: item.quantity } : null;
  }).filter((item): item is Product & { quantity: number } => item !== null);

  const subtotal = getCartTotal();
  const total = subtotal + shippingCost;

  const handleCheckout = () => {
    if (!currentUser) {
        toast({ title: "Please log in", description: "You must be logged in to purchase items.", variant: "destructive" });
        return;
    }
    setShowCheckout(true);
  }

  const handleConfirmPurchase = () => {
      if(currentUser) {
        cartProducts.forEach(product => {
            addSale(product.id, currentUser.id);
        })
      }
      clearCart();
      setShowCheckout(false);
      setShowSuccess(true);
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
    <>
    <div>
      <h1 className="font-headline text-4xl mb-8">Your Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
          {cartProducts.map(item => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/4 flex items-center justify-center bg-gray-50 rounded-md p-2">
                  {item.imageUrls && item.imageUrls.length > 0 ? (
                    <Image src={item.imageUrls[0]} alt={item.name} width={150} height={150} className="rounded-md object-contain w-full h-auto" data-ai-hint={item.imageHint} />
                  ) : (
                    <div className="w-full h-32 bg-muted flex items-center justify-center rounded-lg">
                      <ImageOff className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <Link href={`/products/${item.id}`} className="font-bold hover:underline">{item.name}</Link>
                    <p className="text-sm text-muted-foreground">Sold by {item.sellerName}</p>
                    <p className="text-lg font-headline text-primary mt-1">₹{item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateCartQuantity(item.id, parseInt(e.target.value))}
                      className="w-20 text-center"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-5 w-5 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="lg:col-span-1 sticky top-24">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
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
                    <span>₹{total.toFixed(2)}</span>
                </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" onClick={handleCheckout}>Proceed to Checkout</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>

    <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="font-headline text-2xl">Complete Your Purchase</DialogTitle>
                <DialogDescription>Review your order and enter payment details.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <Card>
                    <CardContent className="p-4 space-y-2">
                        {cartProducts.map(item => (
                             <div key={item.id} className="flex justify-between items-center text-sm">
                                <span>{item.name} x {item.quantity}</span>
                                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </CardContent>
                </Card>

                <Separator />
                
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2"><CreditCard /> Payment Information</h3>
                    <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2 col-span-2">
                            <Label htmlFor="expiry">Expiration Date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                        </div>
                    </div>
                </div>
            </div>
            <DialogFooter>
                <Button variant="ghost" onClick={() => setShowCheckout(false)}>Cancel</Button>
                <Button onClick={handleConfirmPurchase}>Confirm Purchase</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    
    <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
            <SuccessAnimation onComplete={() => { setShowSuccess(false); router.push('/dashboard'); }} />
        </DialogContent>
    </Dialog>
    </>
  );
}
