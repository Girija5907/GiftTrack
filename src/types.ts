export type GiftType = 'amount' | 'item';

export interface GiftRecord {
  id: string;
  contributorName: string;
  giftType: GiftType;
  amount: number; // 0 if giftType is 'item' and no cash amount
  itemDescription: string; // empty string if giftType is 'amount'
  date: string; // ISO YYYY-MM-DD
  wishNote: string;
  emoji: string;
  functionName?: string; // e.g. "Wedding", "Housewarming", "Birthday", "General"
  createdAt: number;
}

export type ActiveTab = 'dashboard' | 'add' | 'list';
