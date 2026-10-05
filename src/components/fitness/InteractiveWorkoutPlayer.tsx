import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, CheckCircle, X, Dumbbell, Sparkles, Flame, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Workout, WorkoutExercise } from '../../types';

export const InteractiveWorkoutPlayer: React.FC = () => {
  const { activeWorkout, finishWorkout, cancelWorkout } = useApp();

  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(45);
  const [isPlaying, setIsPlaying] = useState(true);

  const exercises = activeWorkout?.exercises || [];
  const currentExercise: WorkoutExercise | undefined = exercises[currentExerciseIdx];
  const totalExercises = exercises.length;

  useEffect(() => {
    if (currentExercise) {
      setSecondsRemaining(currentExercise.duration);
    }
  }, [currentExerciseIdx, activeWorkout]);

  // Live Timer Countdown Effect
  useEffect(() => {
    if (!isPlaying || !activeWorkout) return;

    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          // Auto advance or complete
          if (currentExerciseIdx < totalExercises - 1) {
            setCurrentExerciseIdx(i => i + 1);
            return exercises[currentExerciseIdx + 1]?.duration || 45;
          } else {
            clearInterval(interval);
            finishWorkout();
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentExerciseIdx, totalExercises, activeWorkout, exercises, finishWorkout]);

  if (!activeWorkout || !currentExercise) return null;

  const handleNext = () => {
    if (currentExerciseIdx < totalExercises - 1) {
      setCurrentExerciseIdx(i => i + 1);
    } else {
      finishWorkout();
    }
  };

  const progressPct = Math.round(((currentExerciseIdx + 1) / totalExercises) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="bg-white rounded-3xl max-w-xl w-full border border-cream-200 shadow-2xl overflow-hidden flex flex-col justify-between my-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-sage-800 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white">{activeWorkout.title}</h3>
              <p className="text-[11px] text-slate-300">
                Exercise {currentExerciseIdx + 1} of {totalExercises}
              </p>
            </div>
          </div>

          <button
            onClick={cancelWorkout}
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Quit workout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-cream-200 h-1.5">
          <div
            className="bg-sage-600 h-1.5 transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Central Exercise Animation & Timer */}
        <div className="p-6 sm:p-8 space-y-6 text-center">
          {/* Animated Visual Motion Sphere */}
          <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-sage-100 border border-sage-200 animate-pulse-subtle" />
            <div className="relative z-10 space-y-0.5">
              <span className="font-display font-black text-5xl sm:text-6xl text-slate-900 tracking-tight">
                {secondsRemaining}
              </span>
              <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">
                Seconds Left
              </span>
            </div>
          </div>

          {/* Exercise Info */}
          <div className="space-y-2 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2">
              <span className="px-3 py-1 rounded-full bg-sage-100 text-sage-900 text-xs font-bold">
                {currentExercise.targetArea}
              </span>
            </div>

            <h4 className="font-display font-extrabold text-2xl text-slate-900">
              {currentExercise.name}
            </h4>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium bg-cream-50 p-3 rounded-2xl border border-cream-200">
              💡 {currentExercise.instructions}
            </p>
          </div>

          {/* Next Exercise Preview */}
          {currentExerciseIdx < totalExercises - 1 && (
            <p className="text-[11px] text-slate-400 font-semibold">
              Up Next: <span className="text-slate-700">{exercises[currentExerciseIdx + 1]?.name}</span>
            </p>
          )}
        </div>

        {/* Controls Footer */}
        <div className="p-4 sm:p-5 bg-cream-100/80 border-t border-cream-200 flex items-center justify-between gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-5 py-2.5 rounded-2xl bg-white border border-cream-300 hover:bg-cream-200 text-slate-800 text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4 text-amber-600" /> : <Play className="w-4 h-4 text-emerald-600 fill-emerald-600" />}
            <span>{isPlaying ? 'Pause' : 'Resume'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNext}
              className="px-4 py-2.5 rounded-2xl bg-white border border-cream-300 hover:bg-cream-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <SkipForward className="w-4 h-4 text-slate-500" />
              <span>Skip</span>
            </button>

            <button
              onClick={finishWorkout}
              className="px-5 py-2.5 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold shadow-md shadow-sage-600/20 flex items-center gap-1.5 transition-all"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Finish Workout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
