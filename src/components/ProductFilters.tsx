"use client";

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Product } from '@/lib/types';

interface ProductFiltersProps {
  filters: { category: string; price: number[], condition: string };
  setFilters: (filters: any) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
}

const productCategories = ["all", "Textbooks", "Calculators", "Engineering Graphic Materials", "Notebooks", "Other Accessories"];
const conditions = ['all', 'new', 'used', 'refurbished'];

export default function ProductFilters({ filters, setFilters, sortOrder, setSortOrder }: ProductFiltersProps) {
  const maxPrice = 5000;

  return (
    <div className="space-y-6">
       <div>
        <Label className="text-lg font-headline">Sort By</Label>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Sort products" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            <SelectItem value="price-asc">Price (Low to High)</SelectItem>
            <SelectItem value="price-desc">Price (High to Low)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-lg font-headline">Category</Label>
        <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {productCategories.map(cat => (
              <SelectItem key={cat} value={cat} className="capitalize">{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-lg font-headline">Price Range</Label>
        <div className="mt-4">
          <Slider
            min={0}
            max={maxPrice}
            step={100}
            value={filters.price}
            onValueChange={(value) => setFilters({ ...filters, price: value })}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>₹{filters.price[0]}</span>
            <span>₹{filters.price[1] > 2000 ? `₹${(filters.price[1]/1000).toFixed(1)}k` : `₹${filters.price[1]}`}</span>
          </div>
        </div>
      </div>
      <div>
        <Label className="text-lg font-headline">Condition</Label>
        <RadioGroup
          value={filters.condition}
          onValueChange={(value) => setFilters({ ...filters, condition: value })}
          className="mt-2 space-y-1"
        >
          {conditions.map(cond => (
            <div key={cond} className="flex items-center space-x-2">
              <RadioGroupItem value={cond} id={`cond-${cond}`} />
              <Label htmlFor={`cond-${cond}`} className="capitalize font-normal">{cond}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
