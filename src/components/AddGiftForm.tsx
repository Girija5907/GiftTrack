import React, { useState } from 'react';
import { GiftRecord, GiftType, ActiveTab } from '../types';
import { IndianRupee, Package, Calendar, MessageSquareQuote, Check, AlertCircle, Sparkles } from 'lucide-react';

interface AddGiftFormProps {
  onAddGift: (newGift: GiftRecord) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

const COMMON_EMOJIS = ['🎁', '💰', '🪙', '✨', '💖', '🎉', '💐', '👑', '🙏', '💍', '🌸', '🪔', '🏆', '⭐'];

const COMMON_FUNCTIONS = ['Wedding', 'Housewarming', 'Birthday', 'Baby Shower', 'Engagement', 'Anniversary', 'General'];

export const AddGiftForm: React.FC<AddGiftFormProps> = ({ onAddGift, setActiveTab }) => {
  const [contributorName, setContributorName] = useState('');
  const [giftType, setGiftType] = useState<GiftType>('amount');
  const [amount, setAmount] = useState<string>('');
  const [itemDescription, setItemDescription] = useState('');
  const [date, setDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [wishNote, setWishNote] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🎁');
  const [functionName, setFunctionName] = useState('Wedding');

  // Validation State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!contributorName.trim()) {
      newErrors.contributorName = 'Please enter the contributor or family name.';
    }

    if (giftType === 'amount') {
      const parsedAmount = parseFloat(amount);
      if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
        newErrors.amount = 'Please enter a valid gift amount (e.g. ₹501, ₹1001, ₹5000).';
      }
    } else {
      if (!itemDescription.trim()) {
        newErrors.itemDescription = 'Please enter the gift item name or description.';
      }
    }

    if (!date) {
      newErrors.date = 'Please select a date.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const record: GiftRecord = {
      id: 'gift_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      contributorName: contributorName.trim(),
      giftType,
      amount: giftType === 'amount' ? parseFloat(amount) : 0,
      itemDescription: giftType === 'item' ? itemDescription.trim() : '',
      date,
      wishNote: wishNote.trim(),
      emoji: selectedEmoji,
      functionName,
      createdAt: Date.now(),
    };

    onAddGift(record);
    setIsSuccess(true);

    // Reset Form
    setTimeout(() => {
      setContributorName('');
      setAmount('');
      setItemDescription('');
      setWishNote('');
      setIsSuccess(false);
      setActiveTab('list');
    }, 900);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        
        {/* Header */}
        <div className="border-b border-slate-100 pb-5 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            Quick Entry Form
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Record a New Gift
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Fill in the details of the contribution received from your guest.
          </p>
        </div>

        {/* Success Alert */}
        {isSuccess && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Gift recorded successfully!</p>
              <p className="text-xs text-emerald-600">Navigating to Gift List...</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contributor Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Contributor / Family Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Ramesh & Savitri Kaka"
              value={contributorName}
              onChange={(e) => {
                setContributorName(e.target.value);
                if (errors.contributorName) setErrors({ ...errors, contributorName: '' });
              }}
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
                errors.contributorName
                  ? 'border-rose-300 bg-rose-50/30 focus:ring-rose-200'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
              }`}
            />
            {errors.contributorName && (
              <p className="text-xs text-rose-500 flex items-center gap-1 font-medium mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.contributorName}
              </p>
            )}
          </div>

          {/* Gift Type Selector (Pills) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Gift Type <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 rounded-2xl border border-slate-200/60">
              <button
                type="button"
                onClick={() => {
                  setGiftType('amount');
                  setErrors({ ...errors, amount: '', itemDescription: '' });
                }}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  giftType === 'amount'
                    ? 'bg-white text-emerald-700 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <IndianRupee className="w-4 h-4 text-emerald-600" />
                Gift Amount (₹ Cash)
              </button>

              <button
                type="button"
                onClick={() => {
                  setGiftType('item');
                  setErrors({ ...errors, amount: '', itemDescription: '' });
                }}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  giftType === 'item'
                    ? 'bg-white text-purple-700 shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Package className="w-4 h-4 text-purple-600" />
                Gift Item / Present
              </button>
            </div>
          </div>

          {/* Conditional Input based on Gift Type */}
          {giftType === 'amount' ? (
            <div className="space-y-1.5 animate-fade-in">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Gift Amount (₹) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-sm">
                  ₹
                </div>
                <input
                  type="number"
                  placeholder="501, 1001, 5001..."
                  min="1"
                  step="1"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    if (errors.amount) setErrors({ ...errors, amount: '' });
                  }}
                  className={`w-full pl-9 pr-4 py-3 rounded-xl border text-sm font-semibold transition-colors focus:outline-none focus:ring-2 ${
                    errors.amount
                      ? 'border-rose-300 bg-rose-50/30 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-100'
                  }`}
                />
              </div>
              {errors.amount && (
                <p className="text-xs text-rose-500 flex items-center gap-1 font-medium mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.amount}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-1.5 animate-fade-in">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Gift Item Name / Description <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Silver Laxmi Ganesha Idol, Gold Chain, Kitchen Appliance Set"
                value={itemDescription}
                onChange={(e) => {
                  setItemDescription(e.target.value);
                  if (errors.itemDescription) setErrors({ ...errors, itemDescription: '' });
                }}
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
                  errors.itemDescription
                    ? 'border-rose-300 bg-rose-50/30 focus:ring-rose-200'
                    : 'border-slate-200 focus:border-purple-500 focus:ring-purple-100'
                }`}
              />
              {errors.itemDescription && (
                <p className="text-xs text-rose-500 flex items-center gap-1 font-medium mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.itemDescription}
                </p>
              )}
            </div>
          )}

          {/* Grid for Function Tag & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Function Category */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Function Name
              </label>
              <select
                value={functionName}
                onChange={(e) => setFunctionName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                {COMMON_FUNCTIONS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Date <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>
          </div>

          {/* Emoji Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Select Emoji Badge
            </label>
            <div className="flex flex-wrap gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-200/60">
              {COMMON_EMOJIS.map((emoji) => (
                <button
                  type="button"
                  key={emoji}
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`w-9 h-9 text-lg rounded-xl flex items-center justify-center transition-transform hover:scale-110 cursor-pointer ${
                    selectedEmoji === emoji
                      ? 'bg-white shadow-sm ring-2 ring-indigo-500 scale-110'
                      : 'hover:bg-white/60'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Wish Note */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Wish Note / Message (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Heartiest congratulations to the happy couple! God bless."
              value={wishNote}
              onChange={(e) => setWishNote(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className="px-5 py-3 rounded-xl text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSuccess}
              className="px-7 py-3.5 rounded-2xl text-sm font-black bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer disabled:opacity-50 inline-flex items-center gap-2"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              Save Gift Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
