import React, { useState } from 'react';
import { Flame, Shield, Check, Plus, Sparkles, HeartHandshake, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HabitTracker: React.FC = () => {
  const { habits, toggleHabitToday, useStreakFreeze, addHabit } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Hydration');
  const [newIcon, setNewIcon] = useState('💧');

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addHabit(newTitle.trim(), newCategory, newIcon);
    setNewTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-cream-200 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold uppercase tracking-wider">
              Micro-Habits
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-slate-900 mt-1">
            Small habits. Big changes.
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Focused on just 1–3 daily micro-actions so you never feel overwhelmed.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold shadow-md shadow-sage-600/20 flex items-center gap-1.5 transition-all shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Micro-Habit</span>
        </button>
      </div>

      {/* Streak Freeze Guarantee Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-50 via-cream-100 to-amber-50/80 border border-amber-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display font-bold text-sm text-slate-900">
              LifeFlow Streak Freeze Active 🛡️
            </h4>
            <p className="text-xs text-slate-600 font-medium">
              If you miss one busy day, your streak will not reset. Real consistency allows for life happening.
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-amber-800 bg-white/80 px-3 py-1.5 rounded-xl border border-amber-200 shrink-0">
          2 Freezes Available
        </span>
      </div>

      {/* Habits List Grid */}
      <div className="space-y-4">
        {habits.map(habit => {
          return (
            <div
              key={habit.id}
              className={`p-5 sm:p-6 rounded-3xl border transition-all duration-300 ${
                habit.completedToday
                  ? 'bg-sage-50/60 border-sage-200 shadow-soft'
                  : 'bg-white border-cream-200 shadow-soft hover:shadow-soft-lg hover:border-sage-300'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left info & icon */}
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-cream-100 border border-cream-200 flex items-center justify-center text-2xl shrink-0 shadow-xs">
                    {habit.icon}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cream-200 text-slate-600">
                        {habit.category}
                      </span>
                      <span className="text-xs font-bold text-amber-700 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                        <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                        {habit.streak}-day streak
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base text-slate-900">
                      {habit.title}
                    </h3>
                  </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-2.5 self-end md:self-center">
                  <button
                    onClick={() => useStreakFreeze(habit.id)}
                    disabled={habit.streakFreezeUsed || habit.streakFreezesRemaining <= 0}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-cream-100 hover:bg-cream-200 border border-cream-300 disabled:opacity-40 transition-colors flex items-center gap-1.5"
                    title="Protect streak on busy days"
                  >
                    <Shield className="w-3.5 h-3.5 text-amber-600" />
                    <span>{habit.streakFreezeUsed ? 'Freeze Used' : 'Use Freeze'}</span>
                  </button>

                  <button
                    onClick={() => toggleHabitToday(habit.id)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      habit.completedToday
                        ? 'bg-sage-600 text-white shadow-sm'
                        : 'bg-cream-200 hover:bg-sage-600 hover:text-white text-slate-800'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>{habit.completedToday ? 'Completed Today ✓' : 'Mark Done'}</span>
                  </button>
                </div>
              </div>

              {/* Weekly History Dots Grid */}
              <div className="mt-5 pt-4 border-t border-cream-200/80 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  This Week:
                </span>
                <div className="flex items-center gap-2 sm:gap-3">
                  {habit.history.map((day, idx) => {
                    const isToday = day.date === 'Fri'; // simulated today
                    const isDone = isToday ? habit.completedToday : day.completed;

                    return (
                      <div key={idx} className="flex flex-col items-center gap-1">
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-[10px] font-bold transition-all ${
                            isDone
                              ? 'bg-sage-600 text-white shadow-xs'
                              : 'bg-cream-200 text-slate-400 border border-cream-300'
                          } ${isToday ? 'ring-2 ring-sage-400 ring-offset-1' : ''}`}
                        >
                          {isDone ? '✓' : ''}
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">{day.date}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Habit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div
            className="bg-white rounded-3xl max-w-md w-full border border-cream-200 shadow-2xl p-6 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-display font-bold text-xl text-slate-900">
              Create a Simple Micro-Habit
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Keep it simple and actionable in under 2 minutes.
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Habit Name:</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. 5 deep breaths before opening laptop"
                  className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-sage-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category:</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-hidden"
                  >
                    <option value="Hydration">Hydration</option>
                    <option value="Movement">Movement</option>
                    <option value="Sleep & Mind">Sleep & Mind</option>
                    <option value="Nutrition">Nutrition</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Icon:</label>
                  <select
                    value={newIcon}
                    onChange={e => setNewIcon(e.target.value)}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-hidden text-center text-base"
                  >
                    <option value="💧">💧 Water</option>
                    <option value="🚶">🚶 Walk</option>
                    <option value="🌙">🌙 Sleep</option>
                    <option value="🥗">🥗 Veggies</option>
                    <option value="🧘">🧘 Mindfulness</option>
                    <option value="☀️">☀️ Sunshine</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  Save Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
