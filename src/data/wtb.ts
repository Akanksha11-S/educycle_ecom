import type { WtbRequest } from '@/lib/types';

export const initialWtbRequests: WtbRequest[] = [
  {
    id: 'wtb-1',
    userId: 'user-4',
    userName: 'Diana',
    title: 'Looking for a graphing calculator',
    description: 'In search of a TI-84 Plus or similar graphing calculator in good working condition. Needed for my statistics class.',
    budget: 4000,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'wtb-2',
    userId: 'user-2',
    userName: 'Bob',
    title: 'WTB: Introduction to Psychology textbook',
    description: 'Looking for the latest edition of the Intro to Psychology textbook. Open to different authors, let me know what you have!',
    budget: 3200,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
