import React, { useState, useEffect } from 'react';
import { Wind, X, Sparkles, CheckCircle2, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { triggerSubtleSparkle } from '../../utils/confetti';

export const BreathingExercise: React.FC = () => {
  const { breathingSessionActive, setBreathingSessionActive, showToast } = useApp();

  const [phase, setPhase] = useState<'Inhale' | 'Hold (Full)' | 'Exhale' | 'Hold (Empty)'>('Inhale');
  const [phaseSeconds, setPhaseSeconds] = useState(4);
  const [totalSecondsLeft, setTotalSecondsLeft] = useState(120); // 2 minutes

  useEffect(() => {
    if (!breathingSessionActive) {
      setTotalSecondsLeft(120);
      setPhase('Inhale');
      setPhaseSeconds(4);
      return;
    }

    const interval = setInterval(() => {
      setTotalSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setBreathingSessionActive(false);
          triggerSubtleSparkle();
          showToast('Breathing Complete 🌿', 'Your nervous system is recalibrated and calm.');
          return 0;
        }
        return prev - 1;
      });

      setPhaseSeconds(ps => {
        if (ps <= 1) {
          setPhase(curr => {
            if (curr === 'Inhale') return 'Hold (Full)';
            if (curr === 'Hold (Full)') return 'Exhale';
            if (curr === 'Exhale') return 'Hold (Empty)';
            return 'Inhale';
          });
          return 4;
        }
        return ps - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [breathingSessionActive, setBreathingSessionActive, showToast]);

  if (!breathingSessionActive) return null;

  const getSphereScale = () => {
    if (phase === 'Inhale') return 'scale-125 duration-4000 bg-sage-400/30';
    if (phase === 'Hold (Full)') return 'scale-125 duration-1000 bg-emerald-400/40';
    if (phase === 'Exhale') return 'scale-90 duration-4000 bg-teal-400/20';
    return 'scale-90 duration-1000 bg-slate-300/20';
  };

  const minutes = Math.floor(totalSecondsLeft / 60);
  const seconds = totalSecondsLeft % 60;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="bg-gradient-to-b from-slate-900 via-slate-900 to-sage-950 text-white rounded-3xl max-w-lg w-full border border-white/10 shadow-2xl overflow-hidden p-6 sm:p-8 flex flex-col items-center justify-between text-center min-h-[460px]"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400">
            <Wind className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">2-Minute Box Breathing</span>
          </div>

          <button
            onClick={() => setBreathingSessionActive(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Central Breathing Sphere */}
        <div className="my-auto relative flex items-center justify-center py-6">
          {/* Animated Glow Halo */}
          <div
            className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full transition-all ease-in-out border-2 border-emerald-400/40 flex items-center justify-center shadow-[0_0_50px_rgba(52,211,153,0.25)] ${getSphereScale()}`}
          >
            <div className="w-32 h-32 rounded-full bg-emerald-500/20 border border-emerald-300/50 flex flex-col items-center justify-center">
              <span className="font-display font-black text-3xl sm:text-4xl text-white">
                {phaseSeconds}s
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-300 mt-0.5">
                {phase}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Prompts & Timer */}
        <div className="w-full space-y-3">
          <p className="text-xs sm:text-sm text-slate-300 font-medium">
            {phase === 'Inhale' && 'Slowly fill your lungs through your nose...'}
            {phase === 'Hold (Full)' && 'Hold gently with relaxed shoulders...'}
            {phase === 'Exhale' && 'Slowly release through your mouth...'}
            {phase === 'Hold (Empty)' && 'Rest in the natural stillness...'}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-slate-400 font-semibold">
            <span>Session Remaining:</span>
            <span className="font-display font-bold text-white text-sm">
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
