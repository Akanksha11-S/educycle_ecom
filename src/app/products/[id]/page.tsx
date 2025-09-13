"use client";

import { useDataContext } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';
import { useEffect, useState } from 'react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { products, addToCart, toggleWishlist, isInWishlist } = useDataContext();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const foundProduct = products.find((p: Product) => p.id === id);
    if(foundProduct) {
      setProduct(foundProduct);
    } else {
        // In a real app, you might show a 404 page
        toast({ title: "Product not found", variant: "destructive" });
        router.push('/');
    }
  }, [id, products, router, toast]);

  if (!product) {
    return <div className="text-center py-20 font-headline text-2xl">Loading product...</div>;
  }

  const handleAddToCart = () => {
    if (!currentUser) {
        toast({ title: "Please log in", description: "You must be logged in to add items to your cart.", variant: "destructive" });
        return;
    }
    addToCart(product.id);
    toast({ title: "Added to cart!", description: `${product.name} is now in your cart.` });
  };

  const handleToggleWishlist = () => {
    if (!currentUser) {
        toast({ title: "Please log in", description: "You must be logged in to manage your wishlist.", variant: "destructive" });
        return;
    }
    toggleWishlist(product.id);
    toast({
        title: isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist",
        description: `${product.name} has been ${isInWishlist(product.id) ? 'removed from' : 'added to'} your wishlist.`
    });
  };

  const conditionBadgeVariant = (condition: Product['condition']) => {
    switch(condition) {
        case 'new': return 'default';
        case 'used': return 'secondary';
        case 'refurbished': return 'outline';
        default: return 'secondary';
    }
  }

  return (
    <Card>
      <CardContent className="p-4 md:p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center bg-gray-100 rounded-lg">
            <Image
              src={product.imageUrl}
              alt={product.name}
              data-ai-hint={product.imageHint}
              width={600}
              height={500}
              className="rounded-lg object-contain max-h-[500px]"
            />
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
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-muted-foreground">Price</p>
                        <p className="text-4xl font-bold font-headline text-primary">₹{product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="lg" onClick={handleToggleWishlist}>
                            <Heart className={cn("mr-2 h-5 w-5", isInWishlist(product.id) ? 'fill-red-500 text-red-500' : '')} />
                            Wishlist
                        </Button>
                        <Button size="lg" onClick={handleAddToCart}>
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
