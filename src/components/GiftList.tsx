import React, { useState } from 'react';
import { GiftRecord, ActiveTab } from '../types';
import { formatINR, formatDate } from '../utils/storage';
import { IndianRupee, HeartHandshake, Trash2, Search, Filter, PlusCircle, Gift, AlertCircle } from 'lucide-react';

interface GiftListProps {
  gifts: GiftRecord[];
  onDeleteGift: (id: string) => void;
  onOpenThankYou: (gift: GiftRecord) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const GiftList: React.FC<GiftListProps> = ({
  gifts,
  onDeleteGift,
  onOpenThankYou,
  setActiveTab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'amount' | 'item'>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Filtered list
  const filteredGifts = gifts.filter((gift) => {
    const matchesSearch =
      gift.contributorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gift.itemDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gift.wishNote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (gift.functionName && gift.functionName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType =
      filterType === 'all'
        ? true
        : filterType === 'amount'
        ? gift.giftType === 'amount'
        : gift.giftType === 'item';

    return matchesSearch && matchesType;
  });

  // Total Amount Calculation for visible/all gifts
  const totalAmount = gifts.reduce((sum, item) => sum + (item.amount || 0), 0);
  const totalGiftCount = gifts.length;

  const handleDeleteConfirm = (id: string) => {
    onDeleteGift(id);
    setDeletingId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Total Amount & Summary Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white rounded-3xl p-6 border border-slate-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
            <Gift className="w-3.5 h-3.5 text-amber-400 inline" />
            Recorded Gift Registry Summary
          </span>
          <div className="flex items-baseline gap-3">
            <h2 className="text-3xl font-black text-white tracking-tight">
              {formatINR(totalAmount)}
            </h2>
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-white/10 text-emerald-300 border border-white/15 backdrop-blur-sm">
              {totalGiftCount} Total Gifts
            </span>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('add')}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-black bg-gradient-to-r from-amber-400 via-rose-400 to-pink-500 hover:from-amber-300 hover:to-pink-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:scale-95 shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4.5 h-4.5 text-slate-950 stroke-[2.5]" />
          Add New Gift
        </button>
      </div>

      {/* Controls Bar (Search & Filter) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by contributor name, item, or wish note..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              filterType === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({gifts.length})
          </button>
          <button
            onClick={() => setFilterType('amount')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              filterType === 'amount'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            Cash Envelopes ({gifts.filter((g) => g.giftType === 'amount').length})
          </button>
          <button
            onClick={() => setFilterType('item')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              filterType === 'item'
                ? 'bg-purple-600 text-white'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
            }`}
          >
            Gift Items ({gifts.filter((g) => g.giftType === 'item').length})
          </button>
        </div>
      </div>

      {/* Main Content: Desktop Table & Mobile Cards */}
      {filteredGifts.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center mx-auto border border-slate-100">
            <Gift className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-800">
              {searchQuery || filterType !== 'all' ? 'No gifts found matching criteria' : 'No recorded gifts yet'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchQuery || filterType !== 'all'
                ? 'Try clearing your search query or changing filter options.'
                : 'Keep your function gift details safe and accessible by adding your first gift record.'}
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterType('all');
              if (gifts.length === 0) setActiveTab('add');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {gifts.length === 0 ? 'Add First Gift' : 'Reset Search Filters'}
          </button>
        </div>
      ) : (
        <>
          {/* DESKTOP & TABLET VIEW: Elegant Table */}
          <div className="hidden md:block bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Contributor Name</th>
                    <th className="py-4 px-6">Gift Received</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6">Wish Note</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredGifts.map((gift) => (
                    <tr key={gift.id} className="hover:bg-slate-50/50 transition-colors group">
                      {/* Name */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg shrink-0">{gift.emoji || '🎁'}</span>
                          <div>
                            <span className="font-bold text-slate-900 block leading-snug">
                              {gift.contributorName}
                            </span>
                            {gift.functionName && (
                              <span className="text-[10px] text-slate-400 font-medium">
                                {gift.functionName}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Gift Value/Item */}
                      <td className="py-4 px-6">
                        {gift.giftType === 'amount' ? (
                          <span className="inline-flex items-center gap-1 font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-100 text-sm">
                            <IndianRupee className="w-3.5 h-3.5" />
                            {formatINR(gift.amount)}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-xl border border-purple-100 text-xs">
                            📦 {gift.itemDescription || 'Gift Item'}
                          </span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-xs text-slate-500 font-medium whitespace-nowrap">
                        {formatDate(gift.date)}
                      </td>

                      {/* Wish Note */}
                      <td className="py-4 px-6">
                        {gift.wishNote ? (
                          <p className="text-xs text-slate-600 italic line-clamp-2 max-w-xs">
                            "{gift.wishNote}"
                          </p>
                        ) : (
                          <span className="text-xs text-slate-300 font-light">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onOpenThankYou(gift)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100 transition-colors cursor-pointer"
                            title="Generate & Copy Digital Thank You Note"
                          >
                            <HeartHandshake className="w-3.5 h-3.5" />
                            Thank You
                          </button>

                          {deletingId === gift.id ? (
                            <div className="inline-flex items-center gap-1 bg-rose-50 border border-rose-200 p-1 rounded-xl">
                              <button
                                onClick={() => handleDeleteConfirm(gift.id)}
                                className="px-2 py-0.5 text-[10px] font-bold bg-rose-600 text-white rounded-lg hover:bg-rose-700 cursor-pointer"
                              >
                                Confirm Delete
                              </button>
                              <button
                                onClick={() => setDeletingId(null)}
                                className="px-2 py-0.5 text-[10px] font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeletingId(gift.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* MOBILE VIEW: Stacked Clean Cards */}
          <div className="md:hidden space-y-3">
            {filteredGifts.map((gift) => (
              <div
                key={gift.id}
                className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3"
              >
                {/* Header: Name + Date */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{gift.emoji || '🎁'}</span>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm leading-tight">
                        {gift.contributorName}
                      </h3>
                      {gift.functionName && (
                        <span className="text-[10px] text-slate-400 font-medium">
                          {gift.functionName}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                    {formatDate(gift.date)}
                  </span>
                </div>

                {/* Gift Value Badge */}
                <div>
                  {gift.giftType === 'amount' ? (
                    <div className="inline-flex items-center gap-1 text-base font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-100">
                      <IndianRupee className="w-4 h-4" />
                      {formatINR(gift.amount)}
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-100">
                      📦 {gift.itemDescription || 'Gift Item'}
                    </div>
                  )}
                </div>

                {/* Wish note */}
                {gift.wishNote && (
                  <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    "{gift.wishNote}"
                  </p>
                )}

                {/* Action Row */}
                <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
                  <button
                    onClick={() => onOpenThankYou(gift)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 active:scale-95 transition-transform cursor-pointer"
                  >
                    <HeartHandshake className="w-4 h-4" />
                    Thank You Message
                  </button>

                  {deletingId === gift.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDeleteConfirm(gift.id)}
                        className="py-2 px-2.5 bg-rose-600 text-white text-[11px] font-bold rounded-xl cursor-pointer"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setDeletingId(null)}
                        className="py-2 px-2.5 text-slate-600 text-[11px] font-medium cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeletingId(gift.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 bg-slate-50 rounded-xl cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
