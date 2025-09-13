"use client";

import { useDataContext } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { HeartCrack } from 'lucide-react';
import type { Product } from '@/lib/types';

export default function WishlistPage() {
  const { wishlist, products } = useDataContext();
  const { currentUser } = useAuth();
  const router = useRouter();

  if (!currentUser) {
    router.push('/login');
    return null;
  }

  const wishlistProducts = wishlist.map(item => {
    return products.find((p: Product) => p.id === item.productId);
  }).filter((p): p is Product => p !== undefined);

  if (wishlistProducts.length === 0) {
    return (
      <div className="text-center py-20">
        <HeartCrack className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="mt-4 font-headline text-3xl">Your Wishlist is Empty</h1>
        <p className="mt-2 text-muted-foreground">Browse products and add your favorites.</p>
        <Button asChild className="mt-6">
          <Link href="/">Find Items to Love</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-headline text-4xl mb-8">Your Wishlist</h1>
      <div className="flex flex-col gap-6">
        {wishlistProducts.map(product => (
          <ProductCard key={product.id} product={product} layout="horizontal" />
        ))}
      </div>
    </div>
  );
}
