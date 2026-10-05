import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, Plus, Sparkles, Clock, IndianRupee, Flame, Utensils } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Meal } from '../../types';
import { MealLoggerModal } from './MealLoggerModal';

export const TodaysMeals: React.FC = () => {
  const { meals, replaceMeal, logMeal } = useApp();
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  const totalCalories = meals.reduce((acc, m) => acc + (m.isLogged ? m.calories : 0), 0);
  const plannedCalories = meals.reduce((acc, m) => acc + m.calories, 0);
  const totalProtein = meals.reduce((acc, m) => acc + (m.isLogged ? m.protein : 0), 0);
  const plannedProtein = meals.reduce((acc, m) => acc + m.protein, 0);
  const totalCost = meals.reduce((acc, m) => acc + m.cost, 0);

  return (
    <div className="space-y-6">
      {/* Header & Quick Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-cream-200 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
              Nourishment
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-slate-900 mt-1">
            Today's Wholesome Meals
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Balanced Indian & regional meal ideas tailored to your budget & taste.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Nutrition Summary Pill */}
          <div className="bg-cream-100 px-4 py-2 rounded-2xl border border-cream-300 text-xs flex items-center gap-4">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block">Total Estimated</span>
              <span className="font-bold text-slate-900">{plannedCalories} kcal</span>
            </div>
            <div className="w-px h-6 bg-cream-300" />
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block">Protein</span>
              <span className="font-bold text-emerald-700">{plannedProtein}g</span>
            </div>
            <div className="w-px h-6 bg-cream-300" />
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block">Est. Cost</span>
              <span className="font-bold text-slate-900">₹{totalCost}</span>
            </div>
          </div>

          <button
            onClick={() => setIsLogModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold shadow-md shadow-sage-600/20 flex items-center gap-1.5 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Log Custom Meal</span>
          </button>
        </div>
      </div>

      {/* 4 Meal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {meals.map(meal => {
          return (
            <div
              key={meal.id}
              className={`rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                meal.isLogged
                  ? 'bg-emerald-50/30 border-emerald-200/80 shadow-soft'
                  : 'bg-white border-cream-200 shadow-soft hover:shadow-soft-lg hover:border-sage-300'
              }`}
            >
              {/* Image & Type Header */}
              <div className="relative h-40 overflow-hidden group">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />

                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold shadow-xs">
                    {meal.type}
                  </span>
                  {meal.isLogged && (
                    <span className="px-2 py-1 rounded-xl bg-emerald-500 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                      <CheckCircle2 className="w-3 h-3" />
                      Logged
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-semibold">
                    ₹{meal.cost}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-display font-bold text-base leading-tight drop-shadow-sm">
                    {meal.name}
                  </h3>
                </div>
              </div>

              {/* Meal Details & Macros */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {meal.description}
                </p>

                {/* Macro Pills */}
                <div className="grid grid-cols-3 gap-2 py-2 border-y border-cream-100 text-center">
                  <div className="bg-cream-100/70 p-1.5 rounded-xl">
                    <span className="text-[10px] text-slate-400 block font-medium">Calories</span>
                    <span className="text-xs font-bold text-slate-800">~{meal.calories} kcal</span>
                  </div>
                  <div className="bg-emerald-50 p-1.5 rounded-xl">
                    <span className="text-[10px] text-emerald-600 block font-medium">Protein</span>
                    <span className="text-xs font-bold text-emerald-800">{meal.protein}g</span>
                  </div>
                  <div className="bg-cream-100/70 p-1.5 rounded-xl">
                    <span className="text-[10px] text-slate-400 block font-medium">Prep Time</span>
                    <span className="text-xs font-bold text-slate-800">{meal.prepTime}</span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => replaceMeal(meal.type)}
                    className="flex-1 py-2 px-3 rounded-xl border border-cream-300 hover:bg-cream-100 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                    <span>Replace Meal</span>
                  </button>

                  <button
                    onClick={() => logMeal(meal.id)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      meal.isLogged
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-sage-600 hover:bg-sage-700 text-white shadow-xs'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{meal.isLogged ? 'Logged ✓' : 'Log Meal'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isLogModalOpen && (
        <MealLoggerModal onClose={() => setIsLogModalOpen(false)} />
      )}
    </div>
  );
};
