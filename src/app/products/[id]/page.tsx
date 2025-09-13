"use client";

import { useDataContext } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingCart, CheckCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Separator } from '@/components/ui/separator';

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

export default function ProductDetailPage() {
  const { id } = useParams();
  const { products, addToCart, toggleWishlist, isInWishlist } = useDataContext();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const foundProduct = products.find((p: Product) => p.id === id);
    if(product === undefined) setProduct(foundProduct);
    
    if (!foundProduct) {
        setTimeout(() => {
            if(!products.find((p: Product) => p.id === id)) {
                toast({ title: "Product not found", variant: "destructive" });
                router.push('/');
            }
        }, 500);
    }
  }, [id, products, router, toast, product]);
  
  if (!product) {
    return <div className="text-center py-20 font-headline text-2xl">Loading product...</div>;
  }

  const platformFee = product.price * 0.05;
  const total = product.price + platformFee;
  
  const handleAddToCart = () => {
    if (!currentUser) {
        toast({ title: "Please log in", description: "You must be logged in to add items to your cart.", variant: "destructive" });
        return;
    }
    addToCart(product.id);
    toast({ title: "Added to cart!", description: `${product.name} is now in your cart.` });
  };

  const handleBuyNow = () => {
      if (!currentUser) {
        toast({ title: "Please log in", description: "You must be logged in to purchase items.", variant: "destructive" });
        return;
    }
    setShowOrderSummary(true);
  }

  const handleConfirmPurchase = () => {
      setShowOrderSummary(false);
      setShowSuccess(true);
  }

  const handleToggleWishlist = () => {
    if (!currentUser) {
        toast({ title: "Please log in", description: "You must be logged in to manage your wishlist.", variant: "destructive" });
        return;
    }
    const isWishlisted = isInWishlist(product.id);
    toggleWishlist(product.id);
    toast({
        title: !isWishlisted ? "Added to wishlist" : "Removed from wishlist",
        description: `${product.name} has been ${!isWishlisted ? 'added to' : 'removed from'} your wishlist.`
    });
  };

  const conditionBadgeVariant = (condition: Product['condition']) => {
    switch(condition) {
        case 'new': return 'default';
        case 'used': return 'secondary';
        case 'refurbished': return 'secondary';
        default: return 'secondary';
    }
  }
  
  const hasImages = product.imageUrls && product.imageUrls.length > 0;

  return (
    <>
    <Card>
      <CardContent className="p-4 md:p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4">
             {hasImages ? (
                <Carousel className="w-full max-w-xs sm:max-w-sm">
                    <CarouselContent>
                        {product.imageUrls.map((url, index) => (
                            <CarouselItem key={index}>
                                <Image
                                    src={url}
                                    alt={`${product.name} image ${index + 1}`}
                                    data-ai-hint={product.imageHint}
                                    width={600}
                                    height={500}
                                    className="rounded-lg object-contain aspect-[4/3] w-full"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {product.imageUrls.length > 1 && (
                        <>
                            <CarouselPrevious />
                            <CarouselNext />
                        </>
                    )}
                </Carousel>
             ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center rounded-lg aspect-[4/3]">
                    <span className="text-muted-foreground text-sm">No image</span>
                </div>
             )}
          </div>
          <div className="flex flex-col justify-center">
            <Badge variant="secondary" className="w-fit mb-2">{product.category}</Badge>
            <h1 className="font-headline text-4xl lg:text-5xl font-bold mb-4">{product.name}</h1>
            <p className="text-muted-foreground mb-6">{product.description}</p>
            
            <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-muted-foreground">Condition:</span>
                <Badge variant={conditionBadgeVariant(product.condition)} className="capitalize">{product.condition}</Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6">Sold by: {product.sellerName}</p>

            <div className="bg-card p-6 rounded-lg border">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <p className="text-muted-foreground">Price</p>
                        <p className="text-4xl font-bold font-headline text-primary">₹{product.price.toFixed(2)}</p>
                    </div>
                     <Button variant="outline" size="icon" onClick={handleToggleWishlist}>
                        <Heart className={cn("h-5 w-5", isInWishlist(product.id) ? 'fill-red-500 text-red-500' : '')} />
                    </Button>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart
                    </Button>
                     <Button size="lg" className="flex-1" onClick={handleBuyNow}>
                        Buy Now
                    </Button>
                </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Dialog open={showOrderSummary} onOpenChange={setShowOrderSummary}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="font-headline text-2xl">Order Summary</DialogTitle>
                <DialogDescription>Review your order before confirming.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="flex items-center gap-4">
                    {hasImages && (
                      <Image src={product.imageUrls[0]} alt={product.name} width={80} height={80} className="rounded-md object-contain" />
                    )}
                    <div>
                        <h3 className="font-bold">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">Sold by {product.sellerName}</p>
                    </div>
                </div>
                <Separator />
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Price</span>
                        <span>₹{product.price.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between">
                        <span>Platform Fee (5%)</span>
                        <span>₹{platformFee.toFixed(2)}</span>
                    </div>
                     <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <DialogFooter>
                <Button variant="ghost" onClick={() => setShowOrderSummary(false)}>Cancel</Button>
                <Button onClick={handleConfirmPurchase}>Confirm Purchase</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>

     <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
            <SuccessAnimation onComplete={() => { setShowSuccess(false); router.push('/'); }} />
        </DialogContent>
    </Dialog>
    </>
  );
}
