import React, { useState } from 'react';
import { Utensils, Heart, CheckCircle2, AlertCircle, Sparkles, Coffee } from 'lucide-react';
import { mockEatingOutGuides } from '../../data/mockData';

export const EatingOutGuide: React.FC = () => {
  const [selectedCuisineIdx, setSelectedCuisineIdx] = useState(0);
  const activeGuide = mockEatingOutGuides[selectedCuisineIdx];

  return (
    <div className="bg-white rounded-3xl border border-cream-200 shadow-soft p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-cream-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 uppercase tracking-wider">
              Social & Dining Out
            </span>
          </div>
          <h3 className="font-display font-bold text-xl text-slate-900 mt-1 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-rose-600" />
            <span>Eating Out Today?</span>
          </h3>
          <p className="text-xs text-slate-500">
            Enjoy eating out with friends and family without stress, guilt, or rigid diet anxiety.
          </p>
        </div>

        {/* Guilt-Free Reminder Pill */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-2xl text-xs font-semibold text-emerald-900 self-start sm:self-auto">
          <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
          <span>Zero Guilt Guidance</span>
        </div>
      </div>

      {/* Cuisine Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {mockEatingOutGuides.map((guide, idx) => {
          const isSelected = selectedCuisineIdx === idx;
          return (
            <button
              key={guide.cuisine}
              onClick={() => setSelectedCuisineIdx(idx)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all border ${
                isSelected
                  ? 'bg-sage-600 text-white border-sage-600 shadow-sm'
                  : 'bg-cream-100 text-slate-700 border-cream-300 hover:bg-cream-200'
              }`}
            >
              <span>{guide.icon}</span>
              <span>{guide.cuisine}</span>
            </button>
          );
        })}
      </div>

      {/* 3 Tier Recommendations: Better, Okay, Occasional */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Tier 1: Better Choice */}
        <div className="p-4 sm:p-5 rounded-3xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Better Choices
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800">
              High Energy
            </span>
          </div>
          <p className="text-[11px] text-emerald-800/80 font-medium">
            Wholesome, gentle on digestion, nutrient-dense staples.
          </p>
          <div className="space-y-2">
            {activeGuide.better.map((item, i) => (
              <div key={i} className="p-3 bg-white rounded-2xl border border-emerald-100 shadow-xs space-y-0.5">
                <p className="text-xs font-bold text-slate-900">{item.name}</p>
                <p className="text-[11px] text-slate-500">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 2: Okay Choice */}
        <div className="p-4 sm:p-5 rounded-3xl bg-amber-50/60 border border-amber-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Okay Choices
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-800">
              Balanced
            </span>
          </div>
          <p className="text-[11px] text-amber-800/80 font-medium">
            Great everyday options with moderate fats or carbs.
          </p>
          <div className="space-y-2">
            {activeGuide.okay.map((item, i) => (
              <div key={i} className="p-3 bg-white rounded-2xl border border-amber-100 shadow-xs space-y-0.5">
                <p className="text-xs font-bold text-slate-900">{item.name}</p>
                <p className="text-[11px] text-slate-500">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 3: Occasional Choice */}
        <div className="p-4 sm:p-5 rounded-3xl bg-cream-100 border border-cream-300 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Coffee className="w-4 h-4 text-slate-600" />
              Occasional Choices
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cream-300 text-slate-700">
              Celebration
            </span>
          </div>
          <p className="text-[11px] text-slate-600 font-medium">
            Enjoy mindfully on special outings without feeling guilty afterwards.
          </p>
          <div className="space-y-2">
            {activeGuide.occasional.map((item, i) => (
              <div key={i} className="p-3 bg-white rounded-2xl border border-cream-200 shadow-xs space-y-0.5">
                <p className="text-xs font-bold text-slate-900">{item.name}</p>
                <p className="text-[11px] text-slate-500">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
