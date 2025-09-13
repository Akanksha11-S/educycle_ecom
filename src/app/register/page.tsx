
"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import { UserRole } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('buyer');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        if (register(name, email, password, role)) {
            toast({ title: "Registration Successful", description: "Your account has been created." });
            router.push('/dashboard');
        } else {
            toast({ title: "Registration Failed", description: "An account with this email already exists.", variant: "destructive" });
            setIsLoading(false);
        }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Create an Account</CardTitle>
          <CardDescription>Join our community of learners and educators</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
            </div>
             <div className="space-y-2">
                <Label>I am a...</Label>
                <RadioGroup defaultValue="buyer" value={role} onValueChange={(value: UserRole) => setRole(value)} className="flex gap-4 pt-2" disabled={isLoading}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="buyer" id="r-buyer" />
                        <Label htmlFor="r-buyer" className="font-normal">Buyer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="seller" id="r-seller" />
                        <Label htmlFor="r-seller" className="font-normal">Seller</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="admin" id="r-admin" />
                        <Label htmlFor="r-admin" className="font-normal">Admin</Label>
                    </div>
                </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Button variant="link" asChild className="p-0 h-auto">
                <Link href="/login">Login here</Link>
              </Button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
