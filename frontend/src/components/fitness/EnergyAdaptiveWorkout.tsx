import React from 'react';
import { BatteryCharging, Sparkles, Dumbbell, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockWorkouts } from '../../data/mockData';

export const EnergyAdaptiveWorkout: React.FC = () => {
  const { energySliderValue, setEnergySliderValue, startWorkout } = useApp();

  let recommendedWorkout = mockWorkouts[1]; // default 10min
  let energyLabel = 'Medium Energy (Balanced)';
  let recommendationNote = '10-minute bodyweight beginner reset to keep blood flowing without burnout.';

  if (energySliderValue < 35) {
    recommendedWorkout = mockWorkouts[0]; // 5min
    energyLabel = 'Low Energy (Gentle Recovery)';
    recommendationNote = '5-minute gentle mobility & neck/shoulder stretching. No pressure to push hard.';
  } else if (energySliderValue > 70) {
    recommendedWorkout = mockWorkouts[2]; // 20min
    energyLabel = 'High Energy (Empowered)';
    recommendationNote = '20-minute complete functional home workout to build strength and endurance.';
  }

  return (
    <div className="bg-gradient-to-br from-cream-100 via-white to-sage-50 p-6 sm:p-7 rounded-3xl border border-cream-300 shadow-soft space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
              AI Adaptation
            </span>
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 mt-1 flex items-center gap-2">
            <BatteryCharging className="w-5 h-5 text-emerald-600" />
            <span>How much energy do you have today?</span>
          </h3>
          <p className="text-xs text-slate-500">
            Slide according to how your body feels. We will automatically calibrate your movement.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-2xl bg-white border border-cream-300 text-xs font-bold text-slate-800 self-start sm:self-auto shadow-xs">
          {energyLabel}
        </div>
      </div>

      {/* Energy Slider */}
      <div className="space-y-2 bg-white p-5 rounded-2xl border border-cream-200 shadow-xs">
        <div className="flex justify-between text-xs font-bold text-slate-500">
          <span className="flex items-center gap-1 text-slate-400">😴 Very Low</span>
          <span className="flex items-center gap-1 text-amber-600">⚡ Moderate</span>
          <span className="flex items-center gap-1 text-emerald-600">🔥 High</span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={energySliderValue}
          onChange={e => setEnergySliderValue(Number(e.target.value))}
          className="w-full h-3 bg-cream-200 rounded-lg appearance-none cursor-pointer accent-sage-600"
        />

        <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-sage-800 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-sage-600" />
          <span>“We adjusted your workout based on your energy.”</span>
        </div>
      </div>

      {/* Recommended Workout Result Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-sage-50/80 border border-sage-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-sage-900">{recommendedWorkout.title}</span>
            <span className="px-2 py-0.5 rounded-full bg-white text-sage-800 text-[10px] font-bold border border-sage-200">
              {recommendedWorkout.duration} Mins
            </span>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            {recommendationNote}
          </p>
        </div>

        <button
          onClick={() => startWorkout(recommendedWorkout)}
          className="px-5 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold shadow-md shadow-sage-600/20 flex items-center justify-center gap-2 transition-all shrink-0 hover:scale-102 active:scale-98"
        >
          <Dumbbell className="w-4 h-4" />
          <span>Start This Workout</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
