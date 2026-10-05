import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const DailyQuote: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-sage-900 via-slate-900 to-sage-950 text-white p-6 sm:p-7 rounded-3xl shadow-soft-xl relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-sage-500/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-300">
              The LifeFlow Philosophy
            </span>
          </div>
          <p className="font-display font-bold text-lg sm:text-xl text-cream-100 tracking-tight leading-snug">
            “Don't build a perfect life. Build a life you can actually live.”
          </p>
          <p className="text-xs text-slate-300 font-normal">
            No grueling strict diets, no all-or-nothing extremes. Just 3–4 tiny, joyful habits that compound quietly over weeks and months.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400/80 animate-pulse" />
          <span className="text-xs font-semibold text-cream-100">Consistency &gt; Perfection</span>
        </div>
      </div>
    </div>
  );
};
