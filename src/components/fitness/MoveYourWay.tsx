import React, { useState } from 'react';
import { Dumbbell, Clock, Flame, MapPin, Sparkles, Filter, Play, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockWorkouts } from '../../data/mockData';
import { Workout } from '../../types';

export const MoveYourWay: React.FC = () => {
  const { startWorkout } = useApp();
  const [selectedDurationFilter, setSelectedDurationFilter] = useState<'all' | '5min' | '10min' | '20min'>('all');
  const [selectedTagFilter, setSelectedTagFilter] = useState<string>('all');

  const durationFilters: { id: 'all' | '5min' | '10min' | '20min'; label: string }[] = [
    { id: 'all', label: 'All Durations' },
    { id: '5min', label: '5 MIN (Quick Boost)' },
    { id: '10min', label: '10 MIN (Beginner Reset)' },
    { id: '20min', label: '20 MIN (Complete Flow)' },
  ];

  const tagFilters = ['all', 'Beginner', 'No equipment', 'Home', 'Low energy'];

  const filteredWorkouts = mockWorkouts.filter(w => {
    if (selectedDurationFilter !== 'all' && w.category !== selectedDurationFilter) {
      return false;
    }
    if (selectedTagFilter !== 'all') {
      if (selectedTagFilter === 'Beginner' && w.level !== 'Beginner') return false;
      if (selectedTagFilter === 'No equipment' && !w.equipment.toLowerCase().includes('none')) return false;
      if (selectedTagFilter === 'Low energy' && w.duration > 5) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 sm:p-6 rounded-3xl border border-cream-200 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
              Movement
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-slate-900 mt-1">
            Move Your Way
          </h2>
          <p className="text-xs text-slate-500">
            Gentle, zero-pressure workouts designed for busy days and varying energy levels.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 bg-cream-100 px-3 py-1.5 rounded-xl border border-cream-200">
            {filteredWorkouts.length} Workouts Available
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center gap-2">
          {durationFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedDurationFilter(filter.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all border ${
                selectedDurationFilter === filter.id
                  ? 'bg-sage-600 text-white border-sage-600 shadow-sm'
                  : 'bg-white text-slate-700 border-cream-300 hover:bg-cream-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filters:
          </span>
          {tagFilters.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTagFilter(tag)}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold border transition-all ${
                selectedTagFilter === tag
                  ? 'bg-cream-300 border-cream-400 text-slate-900 font-bold'
                  : 'bg-white border-cream-200 text-slate-500 hover:bg-cream-50'
              }`}
            >
              {tag === 'all' ? 'All Tags' : tag}
            </button>
          ))}
        </div>
      </div>

      {/* Workout Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredWorkouts.map(workout => {
          return (
            <div
              key={workout.id}
              className="bg-white rounded-3xl border border-cream-200 shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              {/* Image & Header */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={workout.image}
                  alt={workout.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />

                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold shadow-xs flex items-center gap-1">
                    <Clock className="w-3 h-3 text-sage-600" />
                    {workout.duration} Mins
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                    {workout.level}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-display font-bold text-base leading-tight">
                    {workout.title}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {workout.description}
                </p>

                {/* Details Pills */}
                <div className="grid grid-cols-2 gap-2 bg-cream-50 p-2.5 rounded-2xl border border-cream-200 text-xs text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>~{workout.caloriesBurn} kcal</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-sage-600" />
                    <span>{workout.equipment}</span>
                  </div>
                </div>

                {/* Exercises Preview */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Exercises ({workout.exercises.length}):
                  </span>
                  <ul className="text-xs text-slate-500 space-y-0.5">
                    {workout.exercises.slice(0, 3).map((ex, i) => (
                      <li key={i} className="truncate">• {ex.name} ({ex.duration}s)</li>
                    ))}
                    {workout.exercises.length > 3 && (
                      <li className="text-[10px] text-slate-400 italic">
                        + {workout.exercises.length - 3} more movements
                      </li>
                    )}
                  </ul>
                </div>

                {/* Start Workout Button */}
                <button
                  onClick={() => startWorkout(workout)}
                  className="w-full py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold shadow-md shadow-sage-600/20 flex items-center justify-center gap-2 transition-all hover:scale-101 active:scale-99"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Workout ({workout.duration}m)</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
