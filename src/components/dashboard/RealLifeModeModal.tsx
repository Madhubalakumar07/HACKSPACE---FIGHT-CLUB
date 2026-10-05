import React, { useState } from 'react';
import { X, Sparkles, Heart, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RealLifeModeModal: React.FC = () => {
  const {
    isRealLifeModalOpen,
    setIsRealLifeModalOpen,
    activateRealLifeMode,
    dailyPlan,
    resetRealLifeMode
  } = useApp();

  const [selectedMood, setSelectedMood] = useState<'Great' | 'Good' | 'Okay' | 'Low' | 'Tired'>('Low');
  const [reasonNote, setReasonNote] = useState<string>('Tough workday & feeling low on sleep');

  if (!isRealLifeModalOpen) return null;

  const moodOptions: { label: 'Great' | 'Good' | 'Okay' | 'Low' | 'Tired'; emoji: string; subtitle: string }[] = [
    { label: 'Great', emoji: '😄', subtitle: 'High energy & ready' },
    { label: 'Good', emoji: '🙂', subtitle: 'Normal steady day' },
    { label: 'Okay', emoji: '😐', subtitle: 'A bit busy / distracted' },
    { label: 'Low', emoji: '😓', subtitle: 'Low energy & tired' },
    { label: 'Tired', emoji: '😫', subtitle: 'Exhausted / overwhelmed' },
  ];

  const handleApply = () => {
    activateRealLifeMode(selectedMood, reasonNote);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div
        className="bg-white rounded-3xl max-w-lg w-full border border-cream-200 shadow-2xl overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header with Warm Aesthetic */}
        <div className="p-6 bg-gradient-to-br from-amber-50 via-orange-50/40 to-cream-100 border-b border-amber-100 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shadow-sm">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full">
                  Real-Life Mode
                </span>
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 mt-0.5">
                Today isn't going as planned?
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsRealLifeModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-white/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Brand Philosophy Reassurance */}
          <div className="p-4 rounded-2xl bg-sage-50/80 border border-sage-200/80 flex items-center gap-3">
            <Heart className="w-5 h-5 text-sage-600 shrink-0 fill-sage-600" />
            <p className="text-xs text-sage-900 font-semibold leading-relaxed">
              “No guilt. No restarting. Just adjust and continue. Real health is what fits into real life.”
            </p>
          </div>

          {/* Mood/Energy Selector */}
          <div>
            <label className="block font-display font-bold text-sm text-slate-900 mb-2.5">
              How is your energy & mood right now?
            </label>
            <div className="grid grid-cols-5 gap-2">
              {moodOptions.map(opt => {
                const isSelected = selectedMood === opt.label;
                return (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedMood(opt.label)}
                    className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all ${
                      isSelected
                        ? 'bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-500/20 scale-105'
                        : 'bg-cream-50 border-cream-200 text-slate-700 hover:bg-cream-100 hover:border-cream-300'
                    }`}
                  >
                    <span className="text-2xl mb-1">{opt.emoji}</span>
                    <span className="text-[11px] font-bold leading-none">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic AI Preview Comparison */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              How LifeFlow AI dynamically simplifies today:
            </span>

            <div className="space-y-2 bg-cream-50/70 p-4 rounded-2xl border border-cream-200 text-xs">
              {/* Movement Comparison */}
              <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-cream-200/80">
                <div className="space-y-0.5">
                  <span className="text-slate-400 line-through">20-minute heavy workout</span>
                  <p className="font-semibold text-slate-800 flex items-center gap-1.5 text-sage-800">
                    <Sparkles className="w-3.5 h-3.5 text-sage-600" />
                    {selectedMood === 'Tired' || selectedMood === 'Low'
                      ? 'Just 5 minutes of gentle mobility & neck stretches.'
                      : selectedMood === 'Okay'
                      ? '8-minute easy walk with your favorite music.'
                      : 'Standard active workout session.'}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-sage-100 text-sage-800 font-bold text-[10px] shrink-0">
                  {selectedMood === 'Tired' || selectedMood === 'Low' ? '5 Mins' : '8 Mins'}
                </span>
              </div>

              {/* Dinner Comparison */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="space-y-0.5">
                  <span className="text-slate-400 line-through">Cook complicated 45-min dinner</span>
                  <p className="font-semibold text-slate-800 flex items-center gap-1.5 text-amber-800">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    {selectedMood === 'Tired' || selectedMood === 'Low'
                      ? 'Simple soothing Curd rice / Khichdi or light takeout.'
                      : 'Quick 15-minute wholesome plate.'}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px] shrink-0">
                  Zero Stress
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-5 bg-cream-50 border-t border-cream-200 flex items-center justify-between gap-3">
          {dailyPlan.realLifeModeActive ? (
            <button
              onClick={() => {
                resetRealLifeMode();
                setIsRealLifeModalOpen(false);
              }}
              className="px-4 py-2.5 rounded-xl border border-cream-300 text-slate-600 text-xs font-semibold hover:bg-cream-100 transition-colors"
            >
              Reset to Standard Plan
            </button>
          ) : (
            <button
              onClick={() => setIsRealLifeModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-slate-500 text-xs font-semibold hover:text-slate-800 transition-colors"
            >
              Keep Current Plan
            </button>
          )}

          <button
            onClick={handleApply}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/25 flex items-center gap-1.5 transition-all"
          >
            <span>Apply Simplified Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
