import React from 'react';
import { Check, Clock, Sparkles, AlertCircle, RefreshCw, Zap, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TodayPlanCard: React.FC = () => {
  const { dailyPlan, togglePlanItem, resetRealLifeMode, setIsRealLifeModalOpen, setActiveTab } = useApp();

  const completedCount = dailyPlan.items.filter(i => i.completed).length;
  const totalCount = dailyPlan.items.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  // SVG Circular progress math
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-3xl border border-cream-300 shadow-soft-lg overflow-hidden transition-all duration-300">
      {/* Top Banner & Progress Ring Header */}
      <div className="p-6 sm:p-7 bg-gradient-to-br from-cream-50 via-white to-sage-50/50 border-b border-cream-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-sage-100 text-sage-800 text-[11px] font-bold uppercase tracking-wider">
                Daily Focus
              </span>
              {dailyPlan.realLifeModeActive && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-600" />
                  Real-Life Mode
                </span>
              )}
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              TODAY'S PLAN
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              Just {totalCount} gentle actions that actually matter today.
            </p>
          </div>

          {/* Progress Circular Ring */}
          <div className="flex items-center gap-4 bg-white/90 p-3.5 rounded-2xl border border-cream-300 shadow-sm self-start sm:self-auto">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  className="text-cream-200"
                  strokeWidth="7"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  className="text-sage-600 transition-all duration-700 ease-out"
                  strokeWidth="7"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-display font-extrabold text-slate-900 text-base leading-none">
                  {completedCount}/{totalCount}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold mt-0.5">done</span>
              </div>
            </div>

            <div className="text-left">
              <p className="text-xs font-bold text-slate-900">
                {percentage === 100 ? 'Rhythm Complete! 🌟' : `${percentage}% In Flow`}
              </p>
              <p className="text-[11px] text-slate-500 max-w-[130px] leading-tight mt-0.5">
                {percentage === 100
                  ? 'Great job keeping healthy routines steady today.'
                  : 'Take one action at a time at your own pace.'}
              </p>
            </div>
          </div>
        </div>

        {/* Real-Life Mode Active Toast Alert */}
        {dailyPlan.realLifeModeActive && (
          <div className="mt-4 p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/90 flex items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-amber-900">
                  “No guilt. No restarting. Just adjust and continue.”
                </p>
                <p className="text-[11px] text-amber-700">
                  Plan adapted to {dailyPlan.realLifeMood || 'low'} energy levels.
                </p>
              </div>
            </div>
            <button
              onClick={resetRealLifeMode}
              className="px-3 py-1 text-xs font-semibold text-amber-900 hover:text-amber-950 bg-white/80 hover:bg-white rounded-lg border border-amber-300 transition-colors shadow-xs shrink-0 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        )}
      </div>

      {/* 4 Action Cards List */}
      <div className="p-5 sm:p-7 space-y-3.5 bg-cream-50/30">
        {dailyPlan.items.map((item, index) => {
          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                item.completed
                  ? 'bg-sage-50/50 border-sage-200/80 opacity-85'
                  : 'bg-white border-cream-200/90 shadow-sm hover:border-sage-400 hover:shadow-soft'
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1">
                {/* Checkbox Trigger */}
                <button
                  onClick={() => togglePlanItem(item.id)}
                  className={`mt-0.5 w-6 h-6 rounded-xl border flex items-center justify-center transition-all shrink-0 ${
                    item.completed
                      ? 'bg-sage-600 border-sage-600 text-white shadow-sm'
                      : 'border-slate-300 hover:border-sage-500 bg-white'
                  }`}
                  title={item.completed ? 'Mark incomplete' : 'Mark complete'}
                >
                  {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>

                {/* Content */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base">{item.icon}</span>
                    <span className="font-display font-bold text-slate-900 text-sm">
                      {index + 1}. {item.title}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cream-200 text-slate-600">
                      {item.categoryName}
                    </span>
                    {item.isSimplified && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        Adapted
                      </span>
                    )}
                  </div>

                  <p className={`text-xs sm:text-sm ${
                    item.completed ? 'text-slate-500 line-through' : 'text-slate-700'
                  }`}>
                    “{item.description}”
                  </p>

                  <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {item.timeEstimate}
                    </span>
                    <span>•</span>
                    <span className={`font-semibold ${
                      item.difficulty === 'Very Easy' ? 'text-emerald-600' : 'text-slate-600'
                    }`}>
                      {item.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={() => togglePlanItem(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    item.completed
                      ? 'bg-sage-100 text-sage-800 hover:bg-sage-200/80'
                      : 'bg-sage-600 hover:bg-sage-700 text-white shadow-sm shadow-sage-600/20'
                  }`}
                >
                  {item.completed ? 'Completed ✓' : 'Complete Action'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Encouragement */}
      <div className="p-4 px-6 bg-cream-100/60 border-t border-cream-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sage-600 shrink-0" />
          <span className="italic">“Small steps done consistently create effortless lifelong habits.”</span>
        </div>
        <button
          onClick={() => setActiveTab('habits')}
          className="font-semibold text-sage-700 hover:text-sage-900 flex items-center gap-1"
        >
          <span>View Habit Streaks</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
