import React, { useState } from 'react';
import { Smile, Sparkles, Wind, Heart, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MoodCheckIn: React.FC = () => {
  const { setBreathingSessionActive, showToast, setIsRealLifeModalOpen } = useApp();
  const [selectedMood, setSelectedMood] = useState<string>('🙂');

  const moods = [
    { emoji: '😄', label: 'Great', tip: 'Channel this positive surge into a mindful walk or high-five to family!' },
    { emoji: '🙂', label: 'Good', tip: 'Nice and steady! Keep your daily 4 actions flowing smoothly.' },
    { emoji: '😐', label: 'Okay', tip: 'A short hydration break and 3 deep breaths will re-center your afternoon.' },
    { emoji: '😔', label: 'Low', tip: 'Be gentle with yourself today. Try a 2-minute calming breathing exercise.' },
    { emoji: '😫', label: 'Stressed', tip: 'Work overwhelm? Let’s activate Real-Life mode to simplify today without guilt.' },
  ];

  const activeTip = moods.find(m => m.emoji === selectedMood) || moods[1];

  const handleMoodSelect = (m: typeof moods[0]) => {
    setSelectedMood(m.emoji);
    showToast('Mood Check-In Logged', `Noted feeling ${m.label}. Suggestion updated below.`);
  };

  return (
    <div className="bg-white rounded-3xl border border-cream-200 shadow-soft p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
            Daily Reflection
          </span>
        </div>
        <h3 className="font-display font-bold text-xl text-slate-900 mt-1 flex items-center gap-2">
          <Smile className="w-5 h-5 text-emerald-600" />
          <span>How are you feeling today?</span>
        </h3>
        <p className="text-xs text-slate-500">
          Check in with your mind. We never judge your feelings.
        </p>
      </div>

      {/* Mood Buttons Grid */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {moods.map(m => {
          const isSelected = selectedMood === m.emoji;
          return (
            <button
              key={m.label}
              onClick={() => handleMoodSelect(m)}
              className={`p-3.5 sm:p-4 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                isSelected
                  ? 'bg-sage-600 border-sage-600 text-white shadow-md shadow-sage-600/20 scale-105'
                  : 'bg-cream-50 border-cream-200 text-slate-700 hover:bg-cream-100 hover:border-cream-300'
              }`}
            >
              <span className="text-2xl sm:text-3xl mb-1">{m.emoji}</span>
              <span className="text-xs font-bold">{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Recommendation Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sage-50 to-emerald-50 border border-sage-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-sage-900">
            <Sparkles className="w-4 h-4 text-sage-600" />
            <span>AI Mindful Suggestion:</span>
          </div>
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            {activeTip.tip}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setBreathingSessionActive(true)}
            className="px-4 py-2 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Wind className="w-3.5 h-3.5" />
            <span>2-Min Breathing</span>
          </button>

          {(selectedMood === '😔' || selectedMood === '😫') && (
            <button
              onClick={() => setIsRealLifeModalOpen(true)}
              className="px-3 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold border border-amber-300 transition-colors"
            >
              Adjust Plan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
