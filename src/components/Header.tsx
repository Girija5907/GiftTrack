import React from 'react';
import { ActiveTab } from '../types';
import { LayoutDashboard, PlusCircle, Gift, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  giftCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, giftCount }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Colourful & Effective Logo */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          className="flex items-center gap-3 cursor-pointer group select-none py-1"
        >
          {/* Logo Icon Badge with Multi-color Gradient Ring & Sparkle */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-rose-500 via-amber-400 via-emerald-400 to-indigo-600 opacity-75 blur-xs group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 via-purple-600 to-indigo-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200 border border-white/30">
              <Gift className="w-6 h-6 text-white drop-shadow-xs group-hover:rotate-6 transition-transform duration-200" />
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-[9px] font-black text-amber-950 shadow-xs">
                ✦
              </div>
            </div>
          </div>

          {/* Logo Text with Multi-Tone Vibrant Styling */}
          <div className="flex flex-col">
            <div className="flex items-center text-2xl font-black tracking-tight leading-none">
              <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent">
                Gift
              </span>
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 bg-clip-text text-transparent">
                Track
              </span>
            </div>
            
            <div className="flex items-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase ml-0.5">
                Family Function Gifts
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Nav Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60 shadow-inner">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-white text-rose-600 shadow-md shadow-rose-500/10 scale-102'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-rose-500" />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              activeTab === 'add'
                ? 'bg-white text-emerald-600 shadow-md shadow-emerald-500/10 scale-102'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-emerald-500" />
            Add Gift
          </button>

          <button
            onClick={() => setActiveTab('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer relative ${
              activeTab === 'list'
                ? 'bg-white text-indigo-600 shadow-md shadow-indigo-500/10 scale-102'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Gift className="w-4 h-4 text-indigo-500" />
            Gift List
            {giftCount > 0 && (
              <span className="ml-1 px-2 py-0.5 text-[11px] font-black bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-xs">
                {giftCount}
              </span>
            )}
          </button>
        </nav>

        {/* Quick Add Button on Desktop */}
        <button
          onClick={() => setActiveTab('add')}
          className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 hover:from-rose-600 hover:via-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-500/20 hover:shadow-lg transition-all active:scale-95 cursor-pointer"
        >
          <PlusCircle className="w-4.5 h-4.5 text-amber-300" />
          Record New Gift
        </button>

      </div>

      {/* Mobile Sticky Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl text-xs font-medium transition-colors ${
            activeTab === 'dashboard' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab('add')}
          className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl text-xs font-medium transition-colors ${
            activeTab === 'add' ? 'text-emerald-600 font-bold' : 'text-slate-500'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center -mt-3 shadow-md border-2 border-white">
            <PlusCircle className="w-4 h-4" />
          </div>
          Add Gift
        </button>

        <button
          onClick={() => setActiveTab('list')}
          className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl text-xs font-medium transition-colors relative ${
            activeTab === 'list' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          <div className="relative">
            <Gift className="w-5 h-5" />
            {giftCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {giftCount > 99 ? '99+' : giftCount}
              </span>
            )}
          </div>
          Gift List
        </button>
      </div>
    </header>
  );
};
