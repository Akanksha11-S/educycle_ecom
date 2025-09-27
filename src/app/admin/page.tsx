
"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useDataContext } from '@/contexts/DataContext';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Users, IndianRupee, Package, CheckCircle, Eye, ShoppingBag } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { format } from 'date-fns';

const AdminReports = () => {
  const { users } = useAuth();
  const { products } = useDataContext();

  const revenueData = [
    { name: "Jan", total: 192000 }, { name: "Feb", total: 111840 },
    { name: "Mar", total: 784000 }, { name: "Apr", total: 312640 },
    { name: "May", total: 384000 }, { name: "Jun", total: 304000 },
  ];
  
  const totalRevenue = revenueData.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString('en-IN')}</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month (mock data)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">+2 since last hour (mock data)</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">Live on platform</p>
            </CardContent>
          </Card>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Mock revenue data for the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <RechartsBarChart data={revenueData}>
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`}/>
                        <Tooltip cursor={{fill: 'hsl(var(--accent))'}} contentStyle={{backgroundColor: 'hsl(var(--background))'}} formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}/>
                        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    </div>
  )
}

const AdminUserManagement = () => {
    const { users, deleteUser } = useAuth();
    const { toast } = useToast();
    
    const handleDelete = (userId: string, userName: string) => {
        if(window.confirm(`Are you sure you want to delete user ${userName}? This action cannot be undone.`)) {
            deleteUser(userId);
            toast({title: "User Deleted", description: `${userName} has been removed from the platform.`});
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage all users on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell className="flex items-center gap-2 font-medium">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    {user.name}
                                    {user.isVerified && <CheckCircle className="h-4 w-4 text-green-500" />}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className="capitalize">{user.role}</TableCell>
                                <TableCell>
                                    {user.isVerified ? (
                                        <Badge variant="default" className="bg-green-100 text-green-800">Verified</Badge>
                                    ) : (
                                        <Badge variant="secondary">Not Verified</Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    {user.role !== 'admin' && (
                                        <>
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/dashboard?userId=${user.id}`}><Eye className="mr-1 h-4 w-4"/>View Dashboard</Link>
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id, user.name)}>Delete</Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

const AdminUserVerification = () => {
    const { users, toggleUserVerification } = useAuth();
    const { toast } = useToast();

    const handleVerificationChange = (userId: string, userName: string, isVerified: boolean) => {
        toggleUserVerification(userId);
        toast({ title: 'User Verification Updated', description: `${userName} is now ${isVerified ? 'verified' : 'unverified'}.` });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>User Verification</CardTitle>
                <CardDescription>Toggle verification status for users.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Verification Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell className="capitalize">{user.role}</TableCell>
                                <TableCell className="text-right">
                                    {user.role !== 'admin' ? (
                                      <div className='flex items-center justify-end gap-2'>
                                        <Label htmlFor={`verify-${user.id}`} className='text-sm font-normal'>
                                          {user.isVerified ? 'Verified' : 'Not Verified'}
                                        </Label>
                                        <Switch
                                            id={`verify-${user.id}`}
                                            checked={!!user.isVerified}
                                            onCheckedChange={(checked) => handleVerificationChange(user.id, user.name, checked)}
                                        />
                                      </div>
                                    ) : (
                                      <Badge>Always Verified</Badge>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

const AdminSalesHistory = () => {
    const { sales } = useDataContext();
    const { users } = useAuth();

    const getSellerName = (sellerId: string) => users.find(u => u.id === sellerId)?.name || 'N/A';
    const getBuyerName = (buyerId: string) => users.find(u => u.id === buyerId)?.name || 'N/A';

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sales History</CardTitle>
                <CardDescription>A complete log of all transactions on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Seller</TableHead>
                            <TableHead>Buyer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sales.length > 0 ? sales.map(sale => (
                            <TableRow key={sale.id}>
                                <TableCell className="font-medium">{sale.productName}</TableCell>
                                <TableCell>{getSellerName(sale.sellerId)}</TableCell>
                                <TableCell>{getBuyerName(sale.buyerId)}</TableCell>
                                <TableCell>{format(new Date(sale.saleDate), "PP")}</TableCell>
                                <TableCell className="text-right">₹{sale.price.toFixed(2)}</TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24">No sales have been made yet.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default function AdminPage() {
  const { currentUser } = useAuth();
  const router = useRouter();
  
  if (!currentUser || currentUser.role !== 'admin') {
    router.push('/');
    return null;
  }

  return (
    <div className="space-y-8">
      <h1 className="font-headline text-4xl">Admin Panel</h1>
      <Tabs defaultValue="reports">
        <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
            <TabsTrigger value="sales"><ShoppingBag className="mr-2 h-4 w-4"/>Sales History</TabsTrigger>
        </TabsList>
        <TabsContent value="reports" className="mt-6">
            <AdminReports />
        </TabsContent>
        <TabsContent value="users" className="mt-6">
            <AdminUserManagement />
        </TabsContent>
        <TabsContent value="verification" className="mt-6">
            <AdminUserVerification />
        </TabsContent>
        <TabsContent value="sales" className="mt-6">
            <AdminSalesHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
