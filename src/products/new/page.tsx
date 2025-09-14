
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
import { Loader2, Upload } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';

const productCategories = ["Textbooks", "Calculators", "Engineering Graphic Materials", "Notebooks", "Other Accessories"];

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
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageHint, setImageHint] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!currentUser || currentUser.role !== 'seller') {
    if (typeof window !== 'undefined') {
        router.push('/');
    }
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImageUrls: string[] = [];
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (readEvent) => {
          if (readEvent.target?.result) {
            newImageUrls.push(readEvent.target.result as string);
            // For simplicity, we'll just show the last image selected in the preview
            if (newImageUrls.length === files.length) {
              setImageUrls(newImageUrls);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) {
        toast({ title: "Category is required", variant: "destructive" });
        return;
    }
     if (imageUrls.length === 0) {
      toast({ title: "Image is required", description: "Please upload at least one image.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        addProduct({ name, description, price, category, condition, imageUrls, imageHint }, currentUser.id);
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
                <Label htmlFor="image-upload">Product Image</Label>
                <div className="flex items-center gap-4">
                  <div className="w-1/3 h-32 border-dashed border-2 rounded-lg flex items-center justify-center bg-muted">
                    {imageUrls.length > 0 ? (
                      <Image src={imageUrls[0]} alt="preview" width={128} height={128} className="object-contain rounded-lg h-full w-full" />
                    ) : (
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <div className="w-2/3">
                    <Input id="image-upload" type="file" onChange={handleImageChange} disabled={isLoading} accept="image/*" />
                    <p className="text-xs text-muted-foreground mt-2">Upload a clear picture of your item. First image will be the main one.</p>
                  </div>
                </div>
              </div>
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
                  <Select onValueChange={setCategory} value={category} disabled={isLoading}>
                    <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {productCategories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
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
