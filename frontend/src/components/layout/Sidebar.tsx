import React from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  Utensils,
  Dumbbell,
  CheckSquare,
  Moon,
  TrendingUp,
  Users,
  Settings,
  Sparkles,
  HeartHandshake,
  Compass,
  Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, setIsRealLifeModalOpen, dailyPlan, userProfile } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'plan', label: 'My Plan', icon: CalendarCheck, badge: '4 Actions' },
    { id: 'food', label: 'Food & Nutrition', icon: Utensils },
    { id: 'fitness', label: 'Fitness & Movement', icon: Dumbbell },
    { id: 'habits', label: 'Habits', icon: CheckSquare, badge: '🔥 5d' },
    { id: 'sleep', label: 'Sleep & Mind', icon: Moon },
    { id: 'progress', label: 'Weekly Progress', icon: TrendingUp },
    { id: 'family', label: 'Family & Groups', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white/95 border-r border-cream-300 h-screen sticky top-0 shrink-0 select-none z-30 shadow-[2px_0_12px_-4px_rgba(0,0,0,0.03)]">
      {/* Brand Logo Header */}
      <div className="p-5 pb-4 border-b border-cream-200/80">
        <button
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-2.5 text-left group w-full"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sage-500 to-sage-700 flex items-center justify-center text-white shadow-md shadow-sage-600/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-emerald-100 animate-pulse-subtle" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-xl text-slate-900 tracking-tight">LifeFlow</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-sage-100 text-sage-800 uppercase tracking-wider">AI</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Daily Lifestyle Rhythm</p>
          </div>
        </button>
      </div>

      {/* Real-Life Mode Quick Trigger Pill */}
      <div className="px-4 pt-4 pb-2">
        <button
          onClick={() => setIsRealLifeModalOpen(true)}
          className={`w-full text-left p-3 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
            dailyPlan.realLifeModeActive
              ? 'bg-amber-50/90 border-amber-300 shadow-sm'
              : 'bg-gradient-to-r from-sage-50 to-emerald-50/50 border-sage-200/80 hover:border-sage-400 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              dailyPlan.realLifeModeActive ? 'bg-amber-100 text-amber-700' : 'bg-sage-100 text-sage-700'
            }`}>
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 leading-tight">
                {dailyPlan.realLifeModeActive ? 'Real-Life Active' : "Today off track?"}
              </p>
              <p className="text-[10px] text-slate-500 font-medium">
                {dailyPlan.realLifeModeActive ? 'Gentle pace loaded' : 'Tap to adjust plan'}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-sage-600 group-hover:translate-x-0.5 transition-transform">→</span>
        </button>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <p className="px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Lifestyle Rhythm
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-sage-600 text-white shadow-sm shadow-sage-600/30'
                  : 'text-slate-600 hover:bg-cream-200/60 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-sage-100 text-sage-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-3 pb-1 border-t border-cream-200 mt-3 space-y-1">
          <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Account & Showcase
          </p>
          <button
            onClick={() => setActiveTab('login')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'login'
                ? 'bg-sage-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-cream-200/60 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-slate-500" />
            <span>Login / Switch Account</span>
          </button>
          <button
            onClick={() => setActiveTab('landing')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'landing'
                ? 'bg-sage-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-cream-200/60 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4 text-slate-500" />
            <span>Product Landing Page</span>
          </button>
        </div>
      </div>

      {/* User Profile Mini Badge & Brand Tagline */}
      <div className="p-4 border-t border-cream-200/80 bg-cream-50/50">
        <div className="flex items-center justify-between gap-2">
          <div
            onClick={() => setActiveTab('login')}
            className="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer hover:opacity-80 transition-opacity"
            title="Click to switch account"
          >
            <div className="w-9 h-9 rounded-full bg-sage-200 border border-sage-300 flex items-center justify-center font-bold text-sage-800 text-xs shrink-0">
              {userProfile.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">{userProfile.name}</p>
              <p className="text-[10px] text-slate-500 truncate capitalize">{userProfile.dietaryPreference}</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('login')}
            className="px-2 py-1 rounded-lg bg-cream-200 hover:bg-cream-300 text-slate-700 text-[10px] font-bold transition-colors shrink-0"
            title="Switch user account"
          >
            Switch
          </button>
        </div>
        <p className="mt-2 text-[10px] text-slate-400 italic text-center font-medium">
          “Build a life you can actually live.”
        </p>
      </div>
    </aside>
  );
};
