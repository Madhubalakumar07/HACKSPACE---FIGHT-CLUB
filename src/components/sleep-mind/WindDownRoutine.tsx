import React, { useState } from 'react';
import { Moon, CheckSquare, Square, Sparkles, Smartphone, Lightbulb, GlassWater, Wind, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WindDownRoutine: React.FC = () => {
  const { setBreathingSessionActive, showToast } = useApp();

  const [checklist, setChecklist] = useState([
    { id: 'wd-1', text: 'Put phone screen away (30 min before sleep)', icon: Smartphone, done: true },
    { id: 'wd-2', text: 'Dim bedroom lights to warm amber tone', icon: Lightbulb, done: true },
    { id: 'wd-3', text: 'Drink half glass of room temp water', icon: GlassWater, done: false },
    { id: 'wd-4', text: '2-Minute soothing breathing reset', icon: Wind, done: false, isBreathingAction: true },
    { id: 'wd-5', text: 'Prepare simple clothes & schedule for tomorrow', icon: Calendar, done: false }
  ]);

  const toggleItem = (id: string) => {
    setChecklist(prev =>
      prev.map(item => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const completedCount = checklist.filter(i => i.done).length;

  return (
    <div className="bg-white rounded-3xl border border-cream-200 shadow-soft p-5 sm:p-7 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-cream-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 uppercase tracking-wider">
              Evening Wind-Down
            </span>
          </div>
          <h3 className="font-display font-bold text-xl text-slate-900 mt-1 flex items-center gap-2">
            <Moon className="w-5 h-5 text-indigo-600" />
            <span>Evening Routine Checklist</span>
          </h3>
          <p className="text-xs text-slate-500">
            Signal to your nervous system that the work day is finished.
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200 shrink-0 self-start sm:self-auto">
          {completedCount} / {checklist.length} Prepared
        </span>
      </div>

      {/* Routine Items */}
      <div className="space-y-2.5">
        {checklist.map(item => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                item.done
                  ? 'bg-indigo-50/40 border-indigo-200/80 text-slate-500'
                  : 'bg-white border-cream-200 text-slate-800 hover:border-indigo-300 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.done ? (
                  <CheckSquare className="w-5 h-5 text-indigo-600 shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-slate-300 shrink-0" />
                )}
                <div className="w-8 h-8 rounded-xl bg-cream-100 flex items-center justify-center text-slate-600 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-xs sm:text-sm font-medium ${item.done ? 'line-through text-slate-400' : ''}`}>
                  {item.text}
                </span>
              </div>

              {item.isBreathingAction && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setBreathingSessionActive(true);
                  }}
                  className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold shadow-xs shrink-0 transition-colors"
                >
                  Start Breathing
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
