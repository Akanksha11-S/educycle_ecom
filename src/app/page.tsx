
"use client";

import { useState, useMemo } from 'react';
import { useDataContext } from '@/contexts/DataContext';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { List } from 'lucide-react';

const HeroSection = () => (
    <div className="text-center py-16 md:py-24 px-4 bg-card rounded-xl shadow-sm mb-12">
      <h1 
        className="font-headline text-4xl md:text-6xl lg:text-7xl leading-tight mb-4 text-primary"
      >
        Built by Engineers, for Engineers.
      </h1>
       <p 
        className="text-2xl md:text-3xl font-light font-headline text-muted-foreground mb-8"
      >
        Right Here on Campus.
      </p>
      <p 
        className="max-w-3xl mx-auto text-muted-foreground mb-10"
      >
        Welcome to EduCycle, the trusted peer-to-peer platform for our college community. Connect directly with verified students to buy the tools you need or sell the gear you're done with. No shipping, no strangers—just simple, safe exchanges for everything from drawing boards to complete Engineering Graphic kits. This is our campus circular economy.
      </p>
      <div>
        <Button asChild size="lg">
          <Link href="#products">Start Browsing</Link>
        </Button>
      </div>
    </div>
);


export default function Home() {
  const { products } = useDataContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    price: [0, 20000],
    condition: 'all',
  });
  const [sortOrder, setSortOrder] = useState('name-asc');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products
      .filter((p: Product) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((p: Product) => filters.category === 'all' || p.category === filters.category)
      .filter((p: Product) => p.price >= filters.price[0] && p.price <= filters.price[1])
      .filter((p: Product) => filters.condition === 'all' || p.condition === filters.condition);

    const sorted = [...filtered]; // Create a new array to sort

    switch (sortOrder) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return sorted;
  }, [products, searchTerm, filters, sortOrder]);

  return (
    <>
      <HeroSection />
      <div className="flex flex-col md:flex-row gap-12" id="products">
        <aside className="w-full md:w-1/3 lg:w-1/4">
          <div className="sticky top-24">
            <h2 className="font-headline text-2xl mb-4">Filter & Sort</h2>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <ProductFilters
              filters={filters}
              setFilters={setFilters}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>
        </aside>
        <section className="w-full md:w-2/3 lg:w-3/4">
          <h2 className="font-headline text-4xl mb-6 flex items-center gap-3">
            <List className="h-8 w-8" />
            For Sale
          </h2>
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card rounded-lg">
              <h3 className="font-headline text-2xl">No Products Found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
