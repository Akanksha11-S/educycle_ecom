
"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, List, BarChart } from 'lucide-react';
import type { Product } from '@/lib/types';
import { useDataContext } from '@/contexts/DataContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { useState, useEffect } from 'react';
import type { User } from '@/lib/types';

const SellerDashboard = ({ displayedUser }: { displayedUser: User }) => {
    const { products, deleteProduct } = useDataContext();
    const { toast } = useToast();
    const sellerProducts = products.filter((p: Product) => p.sellerId === displayedUser?.id);
    const [salesData, setSalesData] = useState<any[]>([]);

    useEffect(() => {
        setSalesData([
            { name: "Jan", total: Math.floor(Math.random() * 400000) + 80000 },
            { name: "Feb", total: Math.floor(Math.random() * 400000) + 80000 },
            { name: "Mar", total: Math.floor(Math.random() * 400000) + 80000 },
            { name: "Apr", total: Math.floor(Math.random() * 400000) + 80000 },
            { name: "May", total: Math.floor(Math.random() * 400000) + 80000 },
            { name: "Jun", total: Math.floor(Math.random() * 400000) + 80000 },
        ]);
    }, []);

    const handleDelete = (productId: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(productId);
            toast({ title: 'Product Deleted' });
        }
    };

    return (
        <Tabs defaultValue="listings">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="listings"><List className="mr-2 h-4 w-4" />Your Listings</TabsTrigger>
                <TabsTrigger value="analytics"><BarChart className="mr-2 h-4 w-4" />Sales Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="listings">
                <Card>
                    <CardHeader>
                        <CardTitle>Manage Your Listings</CardTitle>
                        <CardDescription>Here are the items you have for sale.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Condition</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sellerProducts.length > 0 ? sellerProducts.map(p => (
                                    <TableRow key={p.id}>
                                        <TableCell className="font-medium">{p.name}</TableCell>
                                        <TableCell>₹{p.price.toFixed(2)}</TableCell>
                                        <TableCell className="capitalize">{p.condition}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" onClick={() => alert('Edit feature coming soon!')}>Edit</Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(p.id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">You have no products listed.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="analytics">
                <Card>
                    <CardHeader>
                        <CardTitle>Your Sales</CardTitle>
                        <CardDescription>Overview of your sales in the last 6 months.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        {salesData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={350}>
                                <RechartsBarChart data={salesData}>
                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`}/>
                                    <Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}/>
                                    <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex justify-center items-center h-[350px]">
                                <p>Loading analytics...</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
};

const BuyerDashboard = () => {
    // Mock data for purchase history
    const purchaseHistory = [
        { id: 1, product: 'University Physics Vol. 1', date: '2023-05-20', price: 3600.00 },
        { id: 2, product: 'Used 2018 MacBook Air', date: '2023-04-12', price: 36000.00 },
    ];
    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Purchase History</CardTitle>
                <CardDescription>A record of all items you've purchased.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {purchaseHistory.map(item => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.product}</TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell className="text-right">₹{item.price.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};


export default function DashboardPage() {
  const { currentUser, users } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  if (!currentUser) {
    router.push('/login');
    return null; // Or a loading spinner
  }

  let displayedUser = currentUser;

  // If an admin is viewing another user's dashboard
  if (currentUser.role === 'admin' && userId) {
      const foundUser = users.find(u => u.id === userId);
      if(foundUser) {
          displayedUser = foundUser;
      }
  }

  const isSeller = displayedUser.role === 'seller';
  const isAdminViewing = currentUser.role === 'admin' && currentUser.id !== displayedUser.id;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
            <AvatarImage src={displayedUser.avatarUrl} />
            <AvatarFallback>{displayedUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
            <h1 className="font-headline text-4xl">
                {isAdminViewing ? `${displayedUser.name}'s Dashboard` : `Welcome, ${displayedUser.name}`}
            </h1>
            <p className="text-muted-foreground">
                {isAdminViewing ? `You are viewing this page as an administrator.` : `Here is your dashboard overview.`}
            </p>
        </div>
      </div>
      
      {isSeller ? <SellerDashboard displayedUser={displayedUser}/> : <BuyerDashboard />}
    </div>
  );
}

    