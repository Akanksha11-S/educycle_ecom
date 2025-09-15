
"use client";

import { useDataContext } from '@/contexts/DataContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import type { WtbRequest } from '@/lib/types';
import Link from 'next/link';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { PlusCircle, Mail } from 'lucide-react';

const WtbForm = () => {
    const { addWtbRequest } = useDataContext();
    const { currentUser } = useAuth();
    const { toast } = useToast();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) return;
        addWtbRequest({ title, description, budget }, currentUser.id);
        toast({ title: 'WTB Request Posted!' });
        setTitle('');
        setDescription('');
        setBudget(0);
        setIsOpen(false);
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Post a WTB Request
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='font-headline'>What are you looking for?</DialogTitle>
                    <DialogDescription>
                        Create a 'Want to Buy' post and let sellers find you.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">Title</Label>
                            <Input id="title" value={title} onChange={e => setTitle(e.target.value)} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">Description</Label>
                            <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="budget" className="text-right">Budget (₹)</Label>
                            <Input id="budget" type="number" value={budget} onChange={e => setBudget(Number(e.target.value))} className="col-span-3" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                        <Button type="submit">Post Request</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default function WTBPage() {
  const { wtbRequests } = useDataContext();
  const { currentUser, users } = useAuth();
  const getPosterEmail = (userId: string) => users.find(u => u.id === userId)?.email || '';

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline text-4xl">Want to Buy Board</h1>
        {currentUser && <WtbForm />}
      </div>
      
      {wtbRequests.length > 0 ? (
        <div className="space-y-6">
            {wtbRequests.map((req: WtbRequest) => (
            <Card key={req.id}>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">{req.title}</CardTitle>
                    <CardDescription>
                         Posted {formatDistanceToNow(new Date(req.createdAt), { addSuffix: true })}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{req.description}</p>
                </CardContent>
                <CardFooter className='flex justify-between items-center'>
                    <p className="font-bold text-primary">Budget: ₹{req.budget.toFixed(2)}</p>
                    <div className="text-right text-sm">
                        <p className='font-semibold'>{req.userName}</p>
                        <a href={`mailto:${getPosterEmail(req.userId)}`} className="text-muted-foreground hover:underline flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {getPosterEmail(req.userId)}
                        </a>
                    </div>
                </CardFooter>
            </Card>
            ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-card rounded-lg">
            <h3 className="font-headline text-2xl">The board is empty.</h3>
            <p className="text-muted-foreground mt-2">Be the first to post a 'Want to Buy' request!</p>
        </div>
      )}
    </div>
  );
}
