import React from 'react';
import { Moon, BatteryCharging, Smile, Footprints, CheckCircle, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MetricsBar: React.FC = () => {
  const { dailyPlan, userProfile, setActiveTab, setIsRealLifeModalOpen } = useApp();

  const completedItems = dailyPlan.items.filter(i => i.completed).length;
  const totalItems = dailyPlan.items.length;
  const planProgressPct = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="space-y-4">
      {/* Friendly Personalized Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-cream-100 via-white to-sage-50/70 p-5 sm:p-6 rounded-3xl border border-cream-300/80 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
              Good Morning, {userProfile.name} 👋
            </h1>
            {dailyPlan.realLifeModeActive && (
              <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-200">
                Gentle Pace
              </span>
            )}
          </div>
          <p className="text-slate-600 text-sm mt-1 font-medium">
            {dailyPlan.subGreeting}
          </p>
        </div>

        {/* Real-Life Mode Callout Button */}
        <button
          onClick={() => setIsRealLifeModalOpen(true)}
          className="self-start sm:self-center px-4 py-2 rounded-2xl bg-white hover:bg-cream-50 border border-cream-300 text-xs font-semibold text-slate-700 shadow-sm hover:border-sage-400 transition-all flex items-center gap-2 group"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Need to adapt today?</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* 5 Compact Key Daily Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {/* Sleep Metric */}
        <div
          onClick={() => setActiveTab('sleep')}
          className="bg-white p-3.5 rounded-2xl border border-cream-200 shadow-soft hover:border-sage-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Sleep</span>
            <Moon className="w-3.5 h-3.5 text-indigo-500 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-lg font-bold font-display text-slate-900">{dailyPlan.sleepHours}</p>
          <span className="text-[10px] text-emerald-600 font-semibold">Restful & Steady</span>
        </div>

        {/* Energy Metric */}
        <div
          onClick={() => setIsRealLifeModalOpen(true)}
          className="bg-white p-3.5 rounded-2xl border border-cream-200 shadow-soft hover:border-sage-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Energy</span>
            <BatteryCharging className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-lg font-bold font-display text-slate-900">
            {dailyPlan.realLifeMood || dailyPlan.energyLevel}
          </p>
          <span className="text-[10px] text-slate-500 font-medium">Auto-calibrated</span>
        </div>

        {/* Mood Metric */}
        <div
          onClick={() => setActiveTab('sleep')}
          className="bg-white p-3.5 rounded-2xl border border-cream-200 shadow-soft hover:border-sage-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Mood</span>
            <Smile className="w-3.5 h-3.5 text-emerald-500 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-lg font-bold font-display text-slate-900 flex items-center gap-1">
            <span>{dailyPlan.mood}</span>
            <span className="text-sm font-normal text-slate-600">Calm</span>
          </p>
          <span className="text-[10px] text-slate-500 font-medium">Check-in ready</span>
        </div>

        {/* Steps Metric */}
        <div
          onClick={() => setActiveTab('fitness')}
          className="bg-white p-3.5 rounded-2xl border border-cream-200 shadow-soft hover:border-sage-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Steps</span>
            <Footprints className="w-3.5 h-3.5 text-sky-500 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-lg font-bold font-display text-slate-900">
            {dailyPlan.steps.toLocaleString()}
          </p>
          <span className="text-[10px] text-sky-600 font-semibold">
            {Math.round((dailyPlan.steps / dailyPlan.stepsGoal) * 100)}% of 7k
          </span>
        </div>

        {/* Daily Plan Progress */}
        <div
          onClick={() => setActiveTab('plan')}
          className="col-span-2 sm:col-span-1 bg-sage-50/70 p-3.5 rounded-2xl border border-sage-200 shadow-soft hover:border-sage-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-sage-800 mb-1">
            <span className="text-xs font-semibold">Daily Flow</span>
            <CheckCircle className="w-3.5 h-3.5 text-sage-700" />
          </div>
          <p className="text-lg font-bold font-display text-sage-900">
            {completedItems} / {totalItems} Done
          </p>
          <div className="w-full bg-sage-200 rounded-full h-1.5 mt-1.5 overflow-hidden">
            <div
              className="bg-sage-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${planProgressPct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
