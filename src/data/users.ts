import type { User } from '@/lib/types';

export const initialUsers: User[] = [
  {
    id: 'user-1',
    name: 'Akanksha',
    email: 'akanksha123@gmail.com',
    password: 'password123',
    role: 'admin',
    avatarUrl: 'https://picsum.photos/seed/akanksha/100/100',
  },
  {
    id: 'user-2',
    name: 'Bob',
    email: 'bob@example.com',
    password: 'password123',
    role: 'seller',
    avatarUrl: 'https://picsum.photos/seed/bob/100/100',
  },
  {
    id: 'user-3',
    name: 'Charlie',
    email: 'charlie@example.com',
    password: 'password123',
    role: 'seller',
    avatarUrl: 'https://picsum.photos/seed/charlie/100/100',
  },
  {
    id: 'user-4',
    name: 'Diana',
    email: 'diana@example.com',
    password: 'password123',
    role: 'buyer',
    avatarUrl: 'https://picsum.photos/seed/diana/100/100',
  },
];
