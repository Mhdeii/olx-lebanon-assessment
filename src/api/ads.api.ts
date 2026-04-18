import client from './client';
import { AdResponse, Ad } from '../types/ad.types';
import { FilterState } from '../types/filter.types';

const dummyAds: Ad[] = Array.from({ length: 30 }).map((_, i) => ({
  id: `mock-ad-${i}`,
  title: i % 3 === 0 ? `Toyota Corolla 202${i % 4} - Perfect Condition` : i % 3 === 1 ? `iPhone 1${i % 5 + 1} Pro Max 256GB` : `Apartment for Rent in Beirut`,
  description: 'This is a great description for a great item. Contact for more details. Urgent sale!',
  price: {
    value: 5000 + i * 150,
    currency: 'USD',
    formatted: `$ ${(5000 + i * 150).toLocaleString()}`
  },
  location: {
    name: i % 3 === 0 ? 'Beirut' : 'Tripoli',
    externalID: 'loc-1'
  },
  category: {
    name: i % 3 === 0 ? 'Vehicles' : i % 3 === 1 ? 'Mobiles' : 'Properties',
    externalID: i % 3 === 0 ? '1' : i % 3 === 1 ? '3' : '2'
  },
  images: [
    {
      url: i % 3 === 0
        ? 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1000&auto=format&fit=crop'
        : i % 3 === 1
          ? 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop'
          : 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop'
    }
  ],
  timestamp: new Date().toISOString(),
  user: {
    name: 'John Doe'
  }
}));

export const fetchAds = async (
  filters: FilterState,
  from: number = 0,
  size: number = 12
): Promise<Ad[]> => {
  // Simulate network delay to test loading states
  await new Promise(resolve => setTimeout(resolve, 600));

  let filtered = dummyAds;

  if (filters.categoryId) {
    filtered = filtered.filter(a => a.category.externalID === filters.categoryId);
  }

  if (filters.query) {
    filtered = filtered.filter(a => a.title.toLowerCase().includes(filters.query!.toLowerCase()));
  }

  // Basic pagination
  return filtered.slice(from, from + size);
};
