"use client";

import { useState, useMemo } from 'react';
import { useDataContext } from '@/contexts/DataContext';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import type { Product } from '@/lib/types';

export default function Home() {
  const { products } = useDataContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    price: [0, 1000],
    condition: 'all',
  });
  const [sortOrder, setSortOrder] = useState('name-asc');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products
      .filter((p: Product) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((p: Product) => filters.category === 'all' || p.category === filters.category)
      .filter((p: Product) => p.price >= filters.price[0] && p.price <= filters.price[1])
      .filter((p: Product) => filters.condition === 'all' || p.condition === filters.condition);

    switch (sortOrder) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return filtered;
  }, [products, searchTerm, filters, sortOrder]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-1/4 lg:w-1/5">
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
            products={products}
          />
        </div>
      </aside>
      <section className="w-full md:w-3/4 lg:w-4/5">
        <h1 className="font-headline text-4xl mb-6">For Sale</h1>
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
  );
}
