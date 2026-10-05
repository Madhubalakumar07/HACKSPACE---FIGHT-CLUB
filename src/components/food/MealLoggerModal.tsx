import React, { useState } from 'react';
import { Camera, Edit3, X, Sparkles, Check, Info, ShieldAlert, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AIService } from '../../data/aiService';

export const MealLoggerModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { addNewLoggedMeal } = useApp();

  const [mode, setMode] = useState<'photo' | 'manual'>('photo');
  const [mealText, setMealText] = useState('2 Idlis with Tomato Sambar and 1 Boiled Egg');
  const [mealType, setMealType] = useState<'Breakfast' | 'Lunch' | 'Snack' | 'Dinner'>('Lunch');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [estimateResult, setEstimateResult] = useState<any>(() =>
    AIService.estimateMealNutrition('2 Idlis with Tomato Sambar and 1 Boiled Egg')
  );

  const handleAnalyze = (query: string) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const res = AIService.estimateMealNutrition(query);
      setEstimateResult(res);
      setIsAnalyzing(false);
    }, 800);
  };

  const handlePhotoPreset = (foodName: string) => {
    setMealText(foodName);
    handleAnalyze(foodName);
  };

  const handleSaveMeal = () => {
    addNewLoggedMeal({
      type: mealType,
      name: estimateResult.detectedFood,
      description: `Logged via AI estimator (${mealType})`,
      calories: estimateResult.calories,
      protein: estimateResult.protein,
      carbs: estimateResult.carbs,
      fat: estimateResult.fat,
      prepTime: 'Logged Meal',
      cost: 40,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
      tags: ['Custom Log', 'AI Estimate']
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div
        className="bg-white rounded-3xl max-w-lg w-full border border-cream-200 shadow-2xl overflow-hidden my-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-cream-100 via-white to-sage-50 border-b border-cream-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sage-100 text-sage-800 uppercase tracking-wider">
                AI Vision & Logging
              </span>
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mt-0.5">
              Log Your Meal
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-cream-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Method Tabs */}
          <div className="grid grid-cols-2 gap-2 bg-cream-100 p-1.5 rounded-2xl border border-cream-200">
            <button
              onClick={() => setMode('photo')}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                mode === 'photo'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Camera className="w-4 h-4 text-emerald-600" />
              <span>Upload / Snap Photo</span>
            </button>
            <button
              onClick={() => setMode('manual')}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                mode === 'manual'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Edit3 className="w-4 h-4 text-sage-600" />
              <span>Enter Manually</span>
            </button>
          </div>

          {/* Meal Type Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Meal Time:</span>
            {(['Breakfast', 'Lunch', 'Snack', 'Dinner'] as const).map(type => (
              <button
                key={type}
                onClick={() => setMealType(type)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                  mealType === type
                    ? 'bg-sage-600 border-sage-600 text-white'
                    : 'bg-white border-cream-300 text-slate-600 hover:bg-cream-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Photo Mode Simulated Quick Snaps */}
          {mode === 'photo' ? (
            <div className="space-y-3">
              <div className="border-2 border-dashed border-sage-300 bg-sage-50/40 rounded-2xl p-5 text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-700 mx-auto flex items-center justify-center shadow-xs">
                  <Camera className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-800">
                  Select a meal sample or snap a live plate
                </p>
                <div className="flex flex-wrap justify-center gap-2 pt-1">
                  {[
                    'Idli + Sambar + Egg',
                    'Rice + Dal + Poriyal',
                    'Phulkas + Paneer Bhurji',
                    'Sprout Salad Bowl'
                  ].map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => handlePhotoPreset(preset)}
                      className="px-2.5 py-1 rounded-lg bg-white border border-sage-200 text-[11px] font-semibold text-slate-700 hover:bg-sage-100 transition-colors"
                    >
                      📷 {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Describe what you ate:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={mealText}
                  onChange={e => setMealText(e.target.value)}
                  placeholder="e.g. 2 chapatis with mixed veg curry and curd"
                  className="flex-1 bg-cream-50 border border-cream-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-sage-500"
                />
                <button
                  onClick={() => handleAnalyze(mealText)}
                  className="px-4 py-2 rounded-xl bg-sage-600 text-white text-xs font-bold hover:bg-sage-700 transition-colors"
                >
                  Analyze
                </button>
              </div>
            </div>
          )}

          {/* AI Estimate Breakdown Card */}
          {estimateResult && (
            <div className="p-4 rounded-2xl bg-cream-50 border border-cream-300/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span className="font-display font-bold text-sm text-slate-900">
                    AI Meal Estimate
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {estimateResult.confidence}
                </span>
              </div>

              <div className="text-xs font-semibold text-slate-800">
                Detected: <span className="text-emerald-800 font-bold">{estimateResult.detectedFood}</span>
              </div>

              {/* Macros Breakdown */}
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-white p-2 rounded-xl border border-cream-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Calories</span>
                  <span className="text-xs font-bold text-slate-800">~{estimateResult.calories} kcal</span>
                </div>
                <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-100">
                  <span className="text-[10px] text-emerald-700 block font-medium">Protein</span>
                  <span className="text-xs font-bold text-emerald-800">{estimateResult.protein}g</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-cream-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Carbs</span>
                  <span className="text-xs font-bold text-slate-800">{estimateResult.carbs}g</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-cream-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Fats</span>
                  <span className="text-xs font-bold text-slate-800">{estimateResult.fat}g</span>
                </div>
              </div>

              {/* Estimation Disclaimer Pill */}
              <div className="p-2 rounded-xl bg-amber-50/80 border border-amber-200/60 text-[10px] text-amber-800 flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  Nutrition values are <strong>helpful estimates</strong> for daily awareness, not strict medical measurements.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-cream-50 border-t border-cream-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveMeal}
            className="px-5 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold shadow-md shadow-sage-600/20 flex items-center gap-1.5 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Add to Today's Log</span>
          </button>
        </div>
      </div>
    </div>
  );
};
