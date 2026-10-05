import React from 'react';
import {
  Sparkles,
  Flame,
  Zap,
  MessageSquare,
  Bot,
  Heart,
  Menu,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    dailyPlan,
    setIsRealLifeModalOpen,
    setIsAIChatOpen,
    setActiveTab,
    activeTab,
    habits
  } = useApp();

  const totalStreaks = habits.reduce((acc, h) => acc + h.streak, 0);

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-cream-200/80 px-4 sm:px-6 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Mobile Brand & Current View Title */}
        <div className="flex items-center gap-3">
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setActiveTab('landing')}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-sage-500 to-sage-700 flex items-center justify-center text-white shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-emerald-100" />
            </button>
            <span className="font-display font-bold text-lg text-slate-900 tracking-tight">LifeFlow</span>
          </div>

          <div className="hidden sm:block">
            <span className="text-xs font-semibold uppercase tracking-wider text-sage-700 bg-sage-50 px-2.5 py-0.5 rounded-full border border-sage-200/60">
              {dailyPlan.date}
            </span>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak Indicator */}
          <div
            onClick={() => setActiveTab('habits')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-semibold cursor-pointer hover:bg-amber-100/70 transition-colors shadow-sm"
            title="Active habit streak"
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span>5d Streak</span>
          </div>

          {/* Real-Life Mode Trigger Button */}
          <button
            onClick={() => setIsRealLifeModalOpen(true)}
            className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm ${
              dailyPlan.realLifeModeActive
                ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-amber-500/20'
                : 'bg-cream-200 hover:bg-cream-300 text-slate-800 hover:border-slate-300 border border-cream-300/80'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden md:inline">
              {dailyPlan.realLifeModeActive ? 'Real-Life Mode: On' : "Today isn't going as planned?"}
            </span>
            <span className="md:hidden">
              {dailyPlan.realLifeModeActive ? 'Adaptive' : 'Adjust Plan'}
            </span>
          </button>

          {/* AI Coach Floating/Header Button */}
          <button
            onClick={() => setIsAIChatOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sage-600 to-sage-700 hover:from-sage-700 hover:to-sage-800 text-white text-xs font-semibold shadow-md shadow-sage-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Bot className="w-4 h-4 text-emerald-200" />
            <span className="hidden sm:inline">LifeFlow Coach</span>
            <span className="sm:hidden">AI Coach</span>
          </button>

          {/* Login / Switch Account Button */}
          <button
            onClick={() => setActiveTab('login')}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white hover:bg-cream-100 text-slate-700 border border-cream-300 text-xs font-semibold transition-colors shadow-xs"
            title="Sign in or switch profile"
          >
            <span className="hidden sm:inline">Sign In / Switch</span>
            <span className="sm:hidden">Login</span>
          </button>
        </div>
      </div>
    </header>
  );
};
