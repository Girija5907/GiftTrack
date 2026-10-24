import React, { useState, useEffect } from 'react';
import { GiftRecord, ActiveTab } from './types';
import { getStoredGifts, saveStoredGifts, initialSampleGifts } from './utils/storage';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { AddGiftForm } from './components/AddGiftForm';
import { GiftList } from './components/GiftList';
import { ThankYouModal } from './components/ThankYouModal';
import { Heart, RotateCcw, Plus } from 'lucide-react';

export default function App() {
  const [gifts, setGifts] = useState<GiftRecord[]>(() => getStoredGifts());
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [thankYouGift, setThankYouGift] = useState<GiftRecord | null>(null);

  // Sync to local storage whenever gifts array updates
  useEffect(() => {
    saveStoredGifts(gifts);
  }, [gifts]);

  const handleAddGift = (newGift: GiftRecord) => {
    setGifts((prev) => [newGift, ...prev]);
  };

  const handleDeleteGift = (id: string) => {
    setGifts((prev) => prev.filter((g) => g.id !== id));
  };

  const handleResetToSampleData = () => {
    if (window.confirm('Reset data to initial sample family function gifts?')) {
      setGifts(initialSampleGifts);
      saveStoredGifts(initialSampleGifts);
    }
  };

  const handleClearAllGifts = () => {
    if (window.confirm('Are you sure you want to clear all gift records? This cannot be undone.')) {
      setGifts([]);
      saveStoredGifts([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-20 md:pb-12">
      {/* Navbar Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} giftCount={gifts.length} />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            gifts={gifts}
            setActiveTab={setActiveTab}
            onOpenThankYou={(gift) => setThankYouGift(gift)}
          />
        )}

        {activeTab === 'add' && (
          <AddGiftForm
            onAddGift={handleAddGift}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'list' && (
          <GiftList
            gifts={gifts}
            onDeleteGift={handleDeleteGift}
            onOpenThankYou={(gift) => setThankYouGift(gift)}
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      {/* Thank You Message Modal */}
      <ThankYouModal gift={thankYouGift} onClose={() => setThankYouGift(null)} />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/60 bg-white/60 py-6 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-medium">
            <span>GiftTrack</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for family celebrations
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleResetToSampleData}
              className="text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors cursor-pointer"
              title="Reload sample gifts"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Load Sample Data
            </button>

            {gifts.length > 0 && (
              <button
                onClick={handleClearAllGifts}
                className="text-rose-500 hover:text-rose-700 transition-colors cursor-pointer font-medium"
              >
                Clear All Data
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
