import type { User } from '@/lib/types';

export const initialUsers: User[] = [
  {
    id: 'user-1',
    name: 'AkankshaS',
    email: 'akanksha158@gmail.com',
    password: 'password123',
    role: 'admin',
    isVerified: true,
  },
  {
    id: 'user-2',
    name: 'Bob',
    email: 'bob@example.com',
    password: 'password123',
    role: 'seller',
    isVerified: true,
  },
  {
    id: 'user-3',
    name: 'Charlie',
    email: 'charlie@example.com',
    password: 'password123',
    role: 'seller',
    isVerified: false,
  },
  {
    id: 'user-4',
    name: 'Diana',
    email: 'diana@example.com',
    password: 'password123',
    role: 'buyer',
    isVerified: true,
  },
];
