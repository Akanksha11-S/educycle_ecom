"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDataContext } from '@/contexts/DataContext';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { ProductCondition } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function NewProductPage() {
  const { currentUser } = useAuth();
  const { addProduct } = useDataContext();
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState<ProductCondition>('used');
  const [imageUrl, setImageUrl] = useState('https://picsum.photos/seed/newitem/400/300');
  const [imageHint, setImageHint] = useState('new item');
  const [isLoading, setIsLoading] = useState(false);

  if (!currentUser || currentUser.role !== 'seller') {
    toast({ title: "Access Denied", description: "You must be a seller to list products.", variant: "destructive" });
    router.push('/');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        addProduct({ name, description, price, category, condition, imageUrl, imageHint }, currentUser.id);
        toast({ title: "Product Listed!", description: `${name} is now for sale.` });
        router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">List a New Product</CardTitle>
          <CardDescription>Fill out the details below to put your item up for sale.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" required value={description} onChange={(e) => setDescription(e.target.value)} disabled={isLoading} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input id="price" type="number" required value={price} onChange={(e) => setPrice(Number(e.target.value))} disabled={isLoading} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" required value={category} onChange={(e) => setCategory(e.target.value)} disabled={isLoading} />
                </div>
            </div>
             <div className="space-y-2">
                <Label>Condition</Label>
                <RadioGroup value={condition} onValueChange={(value: ProductCondition) => setCondition(value)} className="flex gap-4 pt-2" disabled={isLoading}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="new" id="r-new" />
                        <Label htmlFor="r-new" className="font-normal">New</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="used" id="r-used" />
                        <Label htmlFor="r-used" className="font-normal">Used</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="refurbished" id="r-refurbished" />
                        <Label htmlFor="r-refurbished" className="font-normal">Refurbished</Label>
                    </div>
                </RadioGroup>
            </div>
            <div className="text-sm text-muted-foreground">
                Note: Image upload is not implemented in this demo. A placeholder image will be used.
            </div>
          </CardContent>
          <CardContent className="flex justify-end gap-4">
            <Button type="submit" size="lg" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                List Product
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
