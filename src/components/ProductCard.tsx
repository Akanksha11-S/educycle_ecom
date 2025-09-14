
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useDataContext } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  layout?: 'vertical' | 'horizontal';
}

export default function ProductCard({ product, layout = 'vertical' }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useDataContext();
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!currentUser) {
        toast({ title: "Please log in", description: "You must be logged in to add items to your cart.", variant: "destructive" });
        return;
    }
    addToCart(product.id);
    toast({ title: "Added to cart!", description: `${product.name} is now in your cart.` });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
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

  if (layout === 'horizontal') {
    return (
      <Link href={`/products/${product.id}`} className="group">
        <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
          <div className="flex flex-col sm:flex-row">
            <div className="relative sm:w-1/3">
              {hasImages && (
                <Image
                  src={product.imageUrls[0]}
                  alt={product.name}
                  data-ai-hint={product.imageHint}
                  width={400}
                  height={300}
                  className="w-full h-48 sm:h-full object-cover"
                />
              )}
              <Badge variant={conditionBadgeVariant(product.condition)} className="absolute top-2 right-2 capitalize">{product.condition}</Badge>
            </div>
            <div className="flex flex-col sm:w-2/3">
              <CardHeader>
                <CardTitle className="font-headline text-lg leading-tight mb-2">{product.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                 <p className="text-sm text-muted-foreground">Sold by {product.sellerName}</p>
                 <p className="text-xs text-muted-foreground">{product.sellerEmail}</p>
              </CardContent>
              <CardFooter className="p-4 flex justify-between items-center">
                <p className="text-2xl font-bold font-headline text-primary">₹{product.price.toFixed(2)}</p>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={handleToggleWishlist} className="h-9 w-9">
                      <Heart className={cn("h-5 w-5 text-muted-foreground", isInWishlist(product.id) ? 'fill-red-500 text-red-500' : '')} />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleAddToCart} className="h-9 w-9">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </div>
              </CardFooter>
            </div>
          </div>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="h-full flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
        <CardHeader className="p-0 relative">
          {hasImages ? (
            <Image
              src={product.imageUrls[0]}
              alt={product.name}
              data-ai-hint={product.imageHint}
              width={400}
              height={300}
              className="w-full h-48 object-contain"
            />
          ) : (
            <div className="w-full h-48 bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-sm">No image</span>
            </div>
          )}
          <Badge variant={conditionBadgeVariant(product.condition)} className="absolute top-2 right-2 capitalize">{product.condition}</Badge>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="font-headline text-lg leading-tight mb-2 h-10 overflow-hidden">{product.name}</CardTitle>
          <p className="text-sm text-muted-foreground">Sold by {product.sellerName}</p>
          <p className="text-xs text-muted-foreground">{product.sellerEmail}</p>
        </CardContent>
        <CardFooter className="p-4 flex justify-between items-center">
          <p className="text-xl font-bold font-headline text-primary">₹{product.price.toFixed(2)}</p>
          <div className="flex items-center gap-1">
             <Button variant="ghost" size="icon" onClick={handleToggleWishlist} className="h-9 w-9">
                <Heart className={cn("h-5 w-5 text-muted-foreground", isInWishlist(product.id) ? 'fill-red-500 text-red-500' : '')} />
             </Button>
            <Button variant="outline" size="icon" onClick={handleAddToCart} className="h-9 w-9">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
