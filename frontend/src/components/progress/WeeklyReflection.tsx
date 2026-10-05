import React, { useState } from 'react';
import { Sparkles, Check, Heart, RefreshCw, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { triggerCelebration } from '../../utils/confetti';

export const WeeklyReflection: React.FC = () => {
  const { showToast } = useApp();

  const [workedOptions, setWorkedOptions] = useState<string[]>([
    'Short 10-min workouts',
    'Simple regional meals'
  ]);
  const [changeOptions, setChangeOptions] = useState<string[]>([
    'More quick snack ideas'
  ]);
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  const workedList = [
    'Short 10-min workouts',
    'Simple regional meals',
    'Better sleep routine',
    'Family support & walks',
    'Gentle daily reminders'
  ];

  const changeList = [
    'Faster dinner prep time',
    'Earlier sleep wind-down alerts',
    'More quick snack ideas',
    'More desk stretching',
    'Lighter weekend meals'
  ];

  const toggleWorked = (item: string) => {
    setWorkedOptions(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const toggleChange = (item: string) => {
    setChangeOptions(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = () => {
    setReflectionSubmitted(true);
    triggerCelebration();
    showToast('Reflection Saved! 🌟', 'LifeFlow AI has recalibrated next week’s meal & workout recommendations.');
  };

  return (
    <div className="bg-white rounded-3xl border border-cream-200 shadow-soft p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sage-100 text-sage-800 uppercase tracking-wider">
            Continuous Improvement
          </span>
        </div>
        <h3 className="font-display font-bold text-xl text-slate-900 mt-1 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-sage-600" />
          <span>Weekly AI Reflection & Tuning</span>
        </h3>
        <p className="text-xs text-slate-500">
          Tell us what felt easy and what felt hard. The AI uses this feedback to optimize next week’s plan.
        </p>
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* What worked this week? */}
        <div className="space-y-3 p-5 rounded-2xl bg-cream-50/70 border border-cream-200">
          <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
            1. What made your week feel easier?
          </label>
          <div className="space-y-2">
            {workedList.map(item => {
              const isSelected = workedOptions.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => toggleWorked(item)}
                  className={`w-full p-2.5 rounded-xl text-xs font-semibold text-left border flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-sage-600 border-sage-600 text-white shadow-xs'
                      : 'bg-white border-cream-300 text-slate-700 hover:bg-cream-100'
                  }`}
                >
                  <span>{item}</span>
                  {isSelected && <Check className="w-4 h-4" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* What should we change next week? */}
        <div className="space-y-3 p-5 rounded-2xl bg-cream-50/70 border border-cream-200">
          <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
            2. What should we change next week?
          </label>
          <div className="space-y-2">
            {changeList.map(item => {
              const isSelected = changeOptions.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => toggleChange(item)}
                  className={`w-full p-2.5 rounded-xl text-xs font-semibold text-left border flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-amber-600 border-amber-600 text-white shadow-xs'
                      : 'bg-white border-cream-300 text-slate-700 hover:bg-cream-100'
                  }`}
                >
                  <span>{item}</span>
                  {isSelected && <Check className="w-4 h-4" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Submit / Calibration Confirmation */}
      {reflectionSubmitted ? (
        <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200 text-xs text-sage-900 flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-sage-600 fill-sage-600" />
            <div>
              <span className="font-bold block">Next Week's Rhythm Calibrated!</span>
              <span className="text-slate-600">Prioritizing 10-min routines and lighter dinners based on your reflection.</span>
            </div>
          </div>
          <button
            onClick={() => setReflectionSubmitted(false)}
            className="px-3 py-1.5 rounded-xl bg-white border border-sage-300 text-sage-800 text-[11px] font-bold"
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-end">
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold shadow-md shadow-sage-600/20 flex items-center gap-2 transition-all hover:scale-102"
          >
            <span>Calibrate Next Week’s Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
