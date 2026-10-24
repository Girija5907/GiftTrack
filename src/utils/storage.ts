import { GiftRecord } from '../types';

const STORAGE_KEY = 'gifttrack_gifts_v2';

export const initialSampleGifts: GiftRecord[] = [
  {
    id: 'sample-1',
    contributorName: 'Ramesh & Savitri Kaka',
    giftType: 'amount',
    amount: 5001,
    itemDescription: '',
    date: new Date().toISOString().split('T')[0],
    wishNote: 'Heartiest congratulations to the family! Wishing eternal happiness.',
    emoji: '🌸',
    functionName: 'Wedding',
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'sample-2',
    contributorName: 'Priya & Rahul Sharma',
    giftType: 'item',
    amount: 0,
    itemDescription: 'Silver Laxmi Ganesha Idol',
    date: new Date().toISOString().split('T')[0],
    wishNote: 'May God bless your home with prosperity and peace!',
    emoji: '✨',
    functionName: 'Housewarming',
    createdAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'sample-3',
    contributorName: 'Suresh Mama & Mami',
    giftType: 'amount',
    amount: 11000,
    itemDescription: '',
    date: new Date().toISOString().split('T')[0],
    wishNote: 'With lots of love, blessings and best wishes for the new journey.',
    emoji: '💖',
    functionName: 'Wedding',
    createdAt: Date.now(),
  },
];

export function getStoredGifts(): GiftRecord[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      // Seed with initial sample gifts if empty
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSampleGifts));
      return initialSampleGifts;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load gifts from localStorage', error);
    return [];
  }
}

export function saveStoredGifts(gifts: GiftRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts));
  } catch (error) {
    console.error('Failed to save gifts to localStorage', error);
  }
}

export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === 0) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}
