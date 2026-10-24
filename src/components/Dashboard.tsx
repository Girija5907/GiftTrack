import React from 'react';
import { GiftRecord, ActiveTab } from '../types';
import { formatINR, formatDate } from '../utils/storage';
import { Gift, IndianRupee, PlusCircle, ArrowRight, HeartHandshake, PackageCheck, Sparkles } from 'lucide-react';

interface DashboardProps {
  gifts: GiftRecord[];
  setActiveTab: (tab: ActiveTab) => void;
  onOpenThankYou: (gift: GiftRecord) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ gifts, setActiveTab, onOpenThankYou }) => {
  const totalAmount = gifts.reduce((sum, item) => sum + (item.amount || 0), 0);
  const totalGifts = gifts.length;
  const cashGiftsCount = gifts.filter((g) => g.giftType === 'amount').length;
  const itemGiftsCount = gifts.filter((g) => g.giftType === 'item').length;

  // Recent 3 gifts
  const recentGifts = [...gifts].sort((a, b) => b.createdAt - a.createdAt).slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner - Vibrant, Festive & Effective */}
      <div className="relative rounded-3xl p-6 sm:p-10 text-white overflow-hidden shadow-xl bg-gradient-to-br from-rose-600 via-purple-700 to-indigo-900 border border-white/20">
        {/* Animated Glow Blobs */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-400/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute right-1/3 -bottom-16 w-64 h-64 bg-rose-500/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Decorative Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-white/15 text-amber-200 border border-white/25 backdrop-blur-md shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
              <span>Smart Family Registry</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300"></span>
              <span className="text-white/90">Function Special</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Keep track of your <span className="bg-gradient-to-r from-amber-200 via-rose-200 to-amber-300 bg-clip-text text-transparent">Family Function</span> gifts
            </h1>

            <p className="text-rose-100/90 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
              Easily record cash envelopes, gold & silver presents, and heartfelt wish notes from loved ones in one beautiful, organized registry.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('add')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-black bg-gradient-to-r from-amber-400 via-amber-300 to-rose-400 hover:from-amber-300 hover:to-rose-300 text-slate-950 shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
              >
                <PlusCircle className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                Add New Gift
              </button>

              <button
                onClick={() => setActiveTab('list')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-bold bg-white/15 hover:bg-white/25 text-white border border-white/25 backdrop-blur-md shadow-sm transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                View Gift Registry ({totalGifts})
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>

          {/* Festive Quick Stat Highlights Box */}
          <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-5 shrink-0 grid grid-cols-2 lg:grid-cols-1 gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 font-black flex items-center justify-center shadow-md">
                ₹
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-200">Total Money</div>
                <div className="text-lg font-black text-white">{formatINR(totalAmount)}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-rose-500 text-slate-950 font-black flex items-center justify-center shadow-md">
                🎁
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-200">Gifts Recorded</div>
                <div className="text-lg font-black text-white">{totalGifts} Entries</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Amount Metric */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all group">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Amount
            </span>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {formatINR(totalAmount)}
          </div>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
            <span className="text-emerald-600 font-bold">{cashGiftsCount}</span> cash envelope records
          </p>
        </div>

        {/* Total Gifts Metric */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all group">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Gifts
            </span>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-110 transition-transform">
              <Gift className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {totalGifts}
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Recorded contributors
          </p>
        </div>

        {/* Cash Envelopes Metric */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-rose-300 transition-all group">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Cash Envelopes
            </span>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white flex items-center justify-center shadow-md shadow-rose-500/20 group-hover:scale-110 transition-transform">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {cashGiftsCount}
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Direct monetary blessings
          </p>
        </div>

        {/* Gift Items Metric */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-purple-300 transition-all group">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Gift Items
            </span>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-amber-500 text-white flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:scale-110 transition-transform">
              <PackageCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {itemGiftsCount}
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Physical items & idols
          </p>
        </div>
      </div>

      {/* Quick Action & Recent Activity Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Gift Entries</h2>
            <p className="text-xs text-slate-500">Latest recorded contributions from friends and relatives</p>
          </div>
          {gifts.length > 0 && (
            <button
              onClick={() => setActiveTab('list')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
            >
              View Full Table <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {recentGifts.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200/80 space-y-4 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 flex items-center justify-center mx-auto border border-indigo-200/50 shadow-inner">
              <Gift className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-800">No gifts recorded yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
                Start recording monetary envelopes and physical gift presents received during your function.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('add')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20 hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              Add First Gift
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentGifts.map((gift) => (
              <div
                key={gift.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {formatDate(gift.date)}
                    </span>
                    <span className="text-xl p-1.5 bg-slate-50 rounded-xl border border-slate-100 group-hover:scale-110 transition-transform">{gift.emoji || '🎁'}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 line-clamp-1">
                    {gift.contributorName}
                  </h3>

                  <div className="pt-0.5">
                    {gift.giftType === 'amount' ? (
                      <span className="inline-flex items-center gap-1 text-base font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-100 shadow-2xs">
                        <IndianRupee className="w-4 h-4" />
                        {formatINR(gift.amount)}
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-xl border border-purple-100 shadow-2xs">
                        📦 {gift.itemDescription || 'Gift Item'}
                      </span>
                    )}
                  </div>

                  {gift.wishNote && (
                    <p className="text-xs text-slate-600 italic line-clamp-2 pt-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      "{gift.wishNote}"
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-bold bg-slate-100 px-2.5 py-0.5 rounded-md">
                    {gift.functionName || 'Family Function'}
                  </span>
                  <button
                    onClick={() => onOpenThankYou(gift)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-100 px-3 py-1.5 rounded-xl transition-all active:scale-95 cursor-pointer shadow-2xs"
                  >
                    <HeartHandshake className="w-3.5 h-3.5" />
                    Thank You
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
