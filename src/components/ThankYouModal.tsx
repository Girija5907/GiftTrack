import React, { useState, useEffect } from 'react';
import { GiftRecord } from '../types';
import { formatINR } from '../utils/storage';
import { X, Copy, Check, HeartHandshake, Share2, Sparkles, MessageCircle } from 'lucide-react';

interface ThankYouModalProps {
  gift: GiftRecord | null;
  onClose: () => void;
}

export const ThankYouModal: React.FC<ThankYouModalProps> = ({ gift, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [templateType, setTemplateType] = useState<'standard' | 'detailed' | 'short'>('standard');
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    if (!gift) return;

    let text = '';
    if (templateType === 'standard') {
      text = `Thank you, ${gift.contributorName}, for your arrival. Your love and blessings mean a lot to us!`;
    } else if (templateType === 'detailed') {
      const giftDetail =
        gift.giftType === 'amount'
          ? `gift of ${formatINR(gift.amount)}`
          : `thoughtful gift (${gift.itemDescription})`;
      text = `Dear ${gift.contributorName}, thank you so much for gracing our ${gift.functionName || 'family function'} with your presence and for your beautiful ${giftDetail}. Your warmth and blessings mean the world to us! 🙏✨`;
    } else {
      text = `Thank you ${gift.contributorName} for your blessings & love on our special day! 🙏❤️`;
    }

    setMessageText(text);
    setCopied(false);
  }, [gift, templateType]);

  if (!gift) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(messageText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(messageText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200/80 shadow-2xl overflow-hidden animate-scale-up">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-rose-500 to-amber-500 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/20 text-white border border-white/20 backdrop-blur-sm mb-2">
            <HeartHandshake className="w-3.5 h-3.5 text-rose-100" />
            Digital Gratitude Card
          </div>

          <h3 className="text-xl font-extrabold tracking-tight">
            Thank You Note for {gift.contributorName}
          </h3>
          <p className="text-xs text-rose-100 mt-1">
            Personalized note ready to share via message or WhatsApp
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          
          {/* Template Style Switcher */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Select Message Style
            </label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setTemplateType('standard')}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  templateType === 'standard'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Standard
              </button>
              <button
                type="button"
                onClick={() => setTemplateType('detailed')}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  templateType === 'detailed'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Warm
              </button>
              <button
                type="button"
                onClick={() => setTemplateType('short')}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  templateType === 'short'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Short
              </button>
            </div>
          </div>

          {/* Editable Message Area */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Generated Message (Editable)
              </label>
              <span className="text-[10px] text-slate-400">Feel free to personalize</span>
            </div>

            <div className="relative">
              <textarea
                rows={4}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleCopy}
              className={`w-full sm:flex-1 py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95 ${
                copied
                  ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                  : 'bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white shadow-purple-500/20'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Thank You Message
                </>
              )}
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="w-full sm:w-auto py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white transition-all cursor-pointer shadow-md shadow-emerald-500/20 active:scale-95"
              title="Share on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>GiftTrack Thank You Message</span>
          <button onClick={onClose} className="font-semibold text-slate-600 hover:text-slate-900 cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
