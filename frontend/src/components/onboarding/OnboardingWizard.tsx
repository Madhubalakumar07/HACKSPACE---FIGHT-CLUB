import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  User,
  Target,
  Utensils,
  Dumbbell,
  Moon,
  CheckCircle2,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserProfile } from '../../types';
import { triggerCelebration } from '../../utils/confetti';

export const OnboardingWizard: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { userProfile, updateUserProfile, setActiveTab, showToast } = useApp();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserProfile>(userProfile);

  if (!isOpen) return null;

  const totalSteps = 6;

  const goalOptions = [
    { id: 'Eat healthier', label: '🥗 Eat Healthier', desc: 'Simple, wholesome, budget-friendly meals' },
    { id: 'Become more active', label: '🏃 Become More Active', desc: '5–10 min daily movement routines' },
    { id: 'Improve sleep', label: '🌙 Improve Sleep', desc: 'Calming wind-down & consistent rhythm' },
    { id: 'Build better habits', label: '💧 Build Micro-Habits', desc: 'Tiny consistent changes without burnout' },
    { id: 'Reduce stress', label: '🧘 Reduce Everyday Stress', desc: 'Quick 2-min breathwork & mindful resets' },
    { id: 'Maintain consistency', label: '🔥 Maintain Consistency', desc: 'No-guilt adaptation when days go wrong' },
  ];

  const cuisineOptions = [
    'South Indian',
    'Tamil cuisine',
    'Kerala',
    'Andhra',
    'Karnataka',
    'North Indian',
    'Gujarati',
    'Bengali'
  ];

  const toggleGoal = (goalId: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId]
    }));
  };

  const toggleCuisine = (cuisine: string) => {
    setFormData(prev => ({
      ...prev,
      cuisines: prev.cuisines.includes(cuisine)
        ? prev.cuisines.filter(c => c !== cuisine)
        : [...prev.cuisines, cuisine]
    }));
  };

  const handleFinish = () => {
    updateUserProfile({ ...formData, onboardingCompleted: true });
    triggerCelebration();
    showToast('Welcome to LifeFlow! 🎉', 'Your personal lifestyle plan has been generated.');
    onClose();
    setActiveTab('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full border border-cream-200 shadow-2xl overflow-hidden my-6 flex flex-col justify-between"
        onClick={e => e.stopPropagation()}
      >
        {/* Header with Step Indicator */}
        <div className="p-6 bg-gradient-to-r from-cream-100 via-white to-sage-50 border-b border-cream-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-sage-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                {step}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Step {step} of {totalSteps}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-cream-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Line */}
          <div className="w-full bg-cream-200 h-1.5 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-sage-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Body Content */}
        <div className="p-6 sm:p-8 space-y-5 flex-1 min-h-[360px]">
          {/* STEP 1: ABOUT YOU */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h3 className="font-display font-extrabold text-2xl text-slate-900">
                  Let’s start with you 👋
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Tell us a bit about your lifestyle rhythm.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">What’s your name?</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-sage-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Age Range</label>
                  <select
                    value={formData.ageRange}
                    onChange={e => setFormData({ ...formData, ageRange: e.target.value })}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-sage-500"
                  >
                    <option value="18-24">18–24 years</option>
                    <option value="25-34">25–34 years</option>
                    <option value="35-49">35–49 years</option>
                    <option value="50+">50+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Language</label>
                  <select
                    value={formData.language}
                    onChange={e => setFormData({ ...formData, language: e.target.value })}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-sage-500"
                  >
                    <option value="English">English</option>
                    <option value="Tamil">Tamil (தமிழ்)</option>
                    <option value="Hindi">Hindi (हिंदी)</option>
                    <option value="Telugu">Telugu (తెలుగు)</option>
                    <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                    <option value="Malayalam">Malayalam (മലയാളം)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Daily Schedule Type</label>
                  <select
                    value={formData.dailySchedule}
                    onChange={e => setFormData({ ...formData, dailySchedule: e.target.value as any })}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-sage-500"
                  >
                    <option value="busy">Busy & Fast-Paced (Desk / Work)</option>
                    <option value="moderate">Moderate & Balanced</option>
                    <option value="relaxed">Relaxed & Flexible</option>
                    <option value="student">Student / Academic</option>
                    <option value="shift_work">Night / Shift Work</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: LIFESTYLE GOALS */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h3 className="font-display font-extrabold text-2xl text-slate-900">
                  What are your top lifestyle goals? 🎯
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Select as many as you’d like to focus on gently.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {goalOptions.map(g => {
                  const isSelected = formData.goals.includes(g.id);
                  return (
                    <button
                      key={g.id}
                      onClick={() => toggleGoal(g.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex items-start justify-between gap-2 ${
                        isSelected
                          ? 'bg-sage-50 border-sage-500 text-slate-900 shadow-xs'
                          : 'bg-cream-50 border-cream-200 text-slate-700 hover:bg-cream-100'
                      }`}
                    >
                      <div>
                        <span className="font-display font-bold text-xs block">{g.label}</span>
                        <span className="text-[11px] text-slate-500 mt-0.5 block">{g.desc}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'bg-sage-600 border-sage-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: FOOD PREFERENCES */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h3 className="font-display font-extrabold text-2xl text-slate-900">
                  Food & Regional Preferences 🍲
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  We customize meal ideas according to your home flavors and budget.
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Diet Preference</label>
                    <select
                      value={formData.dietaryPreference}
                      onChange={e => setFormData({ ...formData, dietaryPreference: e.target.value as any })}
                      className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                    >
                      <option value="vegetarian">Pure Vegetarian</option>
                      <option value="eggetarian">Eggetarian (Eggs + Veg)</option>
                      <option value="non_vegetarian">Non-Vegetarian</option>
                      <option value="vegan">Vegan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Food Budget</label>
                    <select
                      value={formData.foodBudget}
                      onChange={e => setFormData({ ...formData, foodBudget: e.target.value as any })}
                      className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                    >
                      <option value="budget">Budget-Friendly (₹30–₹60/meal)</option>
                      <option value="moderate">Moderate (₹60–₹140/meal)</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Favorite Regional Cuisines</label>
                  <div className="flex flex-wrap gap-1.5">
                    {cuisineOptions.map(c => {
                      const isSelected = formData.cuisines.includes(c);
                      return (
                        <button
                          key={c}
                          onClick={() => toggleCuisine(c)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                            isSelected
                              ? 'bg-sage-600 border-sage-600 text-white'
                              : 'bg-cream-50 border-cream-300 text-slate-700 hover:bg-cream-100'
                          }`}
                        >
                          {c} {isSelected ? '✓' : '+'}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: FITNESS & MOVEMENT */}
          {step === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h3 className="font-display font-extrabold text-2xl text-slate-900">
                  Movement & Fitness Routine 🏃
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  How much time do you realistically have for movement?
                </p>
              </div>

              <div className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Available Daily Workout Time</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[5, 10, 20, 30].map(mins => (
                      <button
                        key={mins}
                        onClick={() => setFormData({ ...formData, workoutTime: mins as any })}
                        className={`p-3 rounded-2xl border text-center transition-all ${
                          formData.workoutTime === mins
                            ? 'bg-sage-600 border-sage-600 text-white shadow-xs'
                            : 'bg-cream-50 border-cream-200 text-slate-700 hover:bg-cream-100'
                        }`}
                      >
                        <span className="font-display font-extrabold text-lg block">{mins}m</span>
                        <span className="text-[10px] block opacity-80">
                          {mins === 5 ? 'Micro' : mins === 10 ? 'Standard' : mins === 20 ? 'Complete' : 'Deep'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Workout Location</label>
                    <select
                      value={formData.workoutLocation}
                      onChange={e => setFormData({ ...formData, workoutLocation: e.target.value as any })}
                      className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                    >
                      <option value="home">Home / Living Room</option>
                      <option value="outdoors">Outdoors / Park</option>
                      <option value="gym">Gym</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Current Activity Level</label>
                    <select
                      value={formData.activityLevel}
                      onChange={e => setFormData({ ...formData, activityLevel: e.target.value as any })}
                      className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                    >
                      <option value="sedentary">Sedentary (Desk Job)</option>
                      <option value="light">Lightly Active</option>
                      <option value="moderate">Moderately Active</option>
                      <option value="very_active">Very Active</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: SLEEP & ROUTINE */}
          {step === 5 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h3 className="font-display font-extrabold text-2xl text-slate-900">
                  Sleep & Recovery Rhythm 🌙
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Quality sleep is the foundation of all daytime energy.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Typical Bedtime</label>
                  <input
                    type="time"
                    value={formData.sleepTime}
                    onChange={e => setFormData({ ...formData, sleepTime: e.target.value })}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Typical Wake-Up Time</label>
                  <input
                    type="time"
                    value={formData.wakeTime}
                    onChange={e => setFormData({ ...formData, wakeTime: e.target.value })}
                    className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-2.5 text-xs text-indigo-950">
                <Moon className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <p>
                  LifeFlow will automatically suggest a gentle 15-minute wind-down notification 30 minutes before your bedtime.
                </p>
              </div>
            </div>
          )}

          {/* STEP 6: FINISH CELEBRATION */}
          {step === 6 && (
            <div className="text-center space-y-4 py-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-500 to-sage-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/25">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>

              <div className="space-y-1 max-w-md mx-auto">
                <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900">
                  Your Personal Lifestyle Profile is Ready! 🌿
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  We’ve calibrated your daily 4 actions around {formData.name}, your {formData.dietaryPreference} preferences, and your {formData.workoutTime}-minute workout rhythm.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-cream-100/80 border border-cream-300 max-w-sm mx-auto text-xs text-slate-700 text-left space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Configured Lifestyle Profile:</span>
                </div>
                <p>• {formData.cuisines.slice(0, 3).join(', ')} Cuisine Preferences</p>
                <p>• {formData.workoutTime}-Min Energy-Adaptive Workouts</p>
                <p>• Wind-down scheduled for {formData.sleepTime}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-5 sm:p-6 bg-cream-50 border-t border-cream-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 rounded-xl border border-cream-300 text-slate-600 text-xs font-bold hover:bg-cream-100 flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold shadow-md shadow-sage-600/20 flex items-center gap-1.5 transition-all hover:scale-102"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-xl shadow-emerald-600/25 flex items-center gap-2 transition-all hover:scale-103 active:scale-98"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate My First Daily Plan</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
