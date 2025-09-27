
"use client";

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useDataContext } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ShoppingCart, Heart, LogOut, LayoutDashboard, User as UserIcon, LogIn, UserPlus, PackagePlus, IndianRupee } from 'lucide-react';
import Logo from './Logo';

export default function Header() {
  const { currentUser, logout } = useAuth();
  const { cart, wishlist } = useDataContext();

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-card border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-headline text-2xl font-bold hidden sm:inline">EduCycle</span>
        </Link>
        <nav className="flex items-center gap-4 md:gap-6">
          <Button variant="ghost" asChild>
            <Link href="/wtb">WTB Board</Link>
          </Button>

          {currentUser ? (
            <>
              <Link href="/wishlist" className="relative">
                <Heart className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                     <Link href="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" /><span>Dashboard</span></Link>
                  </DropdownMenuItem>
                  {currentUser.role === 'seller' && (
                     <DropdownMenuItem asChild>
                        <Link href="/products/new"><PackagePlus className="mr-2 h-4 w-4" /><span>Add Product</span></Link>
                     </DropdownMenuItem>
                  )}
                   {currentUser.role === 'admin' && (
                     <DropdownMenuItem asChild>
                       <Link href="/admin"><UserIcon className="mr-2 h-4 w-4" /><span>Admin Panel</span></Link>
                     </DropdownMenuItem>
                   )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login"><LogIn className="mr-2 h-4 w-4" /> Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register"><UserPlus className="mr-2 h-4 w-4"/> Register</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
