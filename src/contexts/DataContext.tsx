
"use client";

import React, { createContext, useContext, ReactNode, useState } from 'react';
import useLocalStorage from '@/hooks/use-local-storage';
import { Product, CartItem, WishlistItem, WtbRequest, Sale } from '@/lib/types';
import { initialProducts } from '@/data/products';
import { initialWtbRequests } from '@/data/wtb';
import { useAuth } from './AuthContext';

interface DataContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'sellerId' | 'sellerName' | 'sellerEmail'>, sellerId: string) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  cart: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  getCartTotal: () => number;
  wishlist: WishlistItem[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wtbRequests: WtbRequest[];
  addWtbRequest: (request: Omit<WtbRequest, 'id' | 'userId' | 'userName' | 'createdAt'>, userId: string) => void;
  sales: Sale[];
  addSale: (productId: string, buyerId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const enrichProductsWithSellerInfo = (products: Product[], allUsers: any[]) => {
    return products.map(product => {
        const seller = allUsers.find(u => u.id === product.sellerId);
        return { 
            ...product, 
            sellerName: seller?.name || 'Unknown',
            sellerEmail: seller?.email || 'N/A'
        };
    });
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const { users } = useAuth();
  const [products, setProducts] = useLocalStorage<Product[]>('products', enrichProductsWithSellerInfo(initialProducts, users));
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);
  const [wishlist, setWishlist] = useLocalStorage<WishlistItem[]>('wishlist', []);
  const [wtbRequests, setWtbRequests] = useLocalStorage<WtbRequest[]>('wtb-requests', initialWtbRequests.map(req => ({...req, userName: users.find(u => u.id === req.userId)?.name || 'Unknown' })));
  const [sales, setSales] = useLocalStorage<Sale[]>('sales', []);

  // Product Management
  const addProduct = (productData: Omit<Product, 'id' | 'sellerId' | 'sellerName' | 'sellerEmail'>, sellerId: string) => {
    const seller = users.find(u => u.id === sellerId);
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      sellerId,
      sellerName: seller?.name || 'Unknown',
      sellerEmail: seller?.email || 'N/A',
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };


  // Cart Management
  const addToCart = (productId: string, quantity: number = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.productId === productId);
      if (existingItem) {
        return prev.map(item =>
          item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { productId, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.productId === productId ? { ...item, quantity } : item))
    );
  };
  
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };


  // Wishlist Management
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.some(item => item.productId === productId)) {
        return prev.filter(item => item.productId !== productId);
      }
      return [...prev, { productId }];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.productId === productId);
  };
  

  // WTB Management
  const addWtbRequest = (requestData: Omit<WtbRequest, 'id' | 'userId' | 'userName' | 'createdAt'>, userId: string) => {
    const user = users.find(u => u.id === userId);
    const newRequest: WtbRequest = {
        ...requestData,
        id: `wtb-${Date.now()}`,
        userId,
        userName: user?.name || 'Unknown',
        createdAt: new Date().toISOString()
    };
    setWtbRequests(prev => [newRequest, ...prev]);
  };
  
  // Sales Management
  const addSale = (productId: string, buyerId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const newSale: Sale = {
        id: `sale-${Date.now()}`,
        productId,
        productName: product.name,
        sellerId: product.sellerId,
        buyerId,
        saleDate: new Date().toISOString(),
        price: product.price
    };
    setSales(prev => [newSale, ...prev]);
    // After sale, remove product from list
    deleteProduct(productId);
  }


  return (
    <DataContext.Provider value={{
      products, addProduct, updateProduct, deleteProduct,
      cart, addToCart, removeFromCart, updateCartQuantity, getCartTotal,
      wishlist, toggleWishlist, isInWishlist,
      wtbRequests, addWtbRequest,
      sales, addSale,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
