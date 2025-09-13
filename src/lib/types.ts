export type UserRole = 'buyer' | 'seller' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string; // Should not be stored in frontend state in a real app
  role: UserRole;
  avatarUrl: string;
  isVerified?: boolean;
};

export type ProductCondition = 'new' | 'used' | 'refurbished';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  condition: ProductCondition;
  imageUrls: string[];
  imageHint: string;
  sellerId: string;
  sellerName?: string; // Denormalized for convenience
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type WishlistItem = {
  productId: string;
};

export type WtbRequest = {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  budget: number;
  createdAt: string;
};

export type Sale = {
  id: string;
  productId: string;
  productName: string;
  buyerId: string;
  saleDate: string;
  price: number;
};