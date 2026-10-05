import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Zap,
  CheckCircle2,
  Utensils,
  Dumbbell,
  Moon,
  Users,
  ShieldCheck,
  Play,
  Heart,
  Flame,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingPage: React.FC<{ onStartOnboarding: () => void }> = ({ onStartOnboarding }) => {
  const { setActiveTab } = useApp();

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 selection:bg-sage-200">
      {/* Navigation Header */}
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-cream-200/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sage-500 to-sage-700 flex items-center justify-center text-white shadow-md shadow-sage-600/20">
              <Sparkles className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <span className="font-display font-extrabold text-xl text-slate-900 tracking-tight">LifeFlow</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-sage-100 text-sage-800 ml-1.5 uppercase">AI</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-cream-200/60 transition-colors"
            >
              Open Live App
            </button>
            <button
              onClick={onStartOnboarding}
              className="px-5 py-2.5 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold shadow-md shadow-sage-600/20 hover:scale-102 active:scale-98 transition-all"
            >
              Build My Daily Plan
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-8 pt-12 sm:pt-20 pb-16 max-w-7xl mx-auto overflow-hidden">
        {/* Glow ambient spots */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sage-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100/80 border border-sage-200 text-sage-900 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-sage-600 animate-pulse" />
              <span>Real-Life Adaptive Lifestyle Assistant</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.12]">
              Your Healthy Life, <br />
              <span className="text-gradient-sage">One Simple Day</span> at a Time.
            </h1>

            <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              An AI-powered lifestyle planner that adapts to your food, fitness, sleep, mood, budget, and real life.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={onStartOnboarding}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white text-sm font-bold shadow-xl shadow-sage-600/25 flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98"
              >
                <span>Build My Daily Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('dashboard')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-cream-50 border border-cream-300 text-slate-800 text-sm font-bold shadow-soft flex items-center justify-center gap-2 transition-all"
              >
                <span>See How It Works</span>
              </button>
            </div>

            {/* Micro proof badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Zero Food Guilt
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                5–10 Min Workouts
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Regional Indian Cuisines
              </span>
            </div>
          </div>

          {/* Hero Right Dashboard Preview Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md bg-white rounded-3xl border border-cream-300 shadow-2xl p-5 sm:p-6 space-y-4 transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
              {/* Top Card Preview Header */}
              <div className="flex items-center justify-between pb-3 border-b border-cream-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="font-display font-bold text-xs text-slate-800 ml-2">Today's Focus Preview</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sage-100 text-sage-800">
                  2/4 Complete
                </span>
              </div>

              {/* Today Card Items */}
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-2xl bg-sage-50/70 border border-sage-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🍳</span>
                    <div>
                      <span className="font-bold text-slate-900 block">Eat: Dosa + Sambar + 2 Eggs</span>
                      <span className="text-[10px] text-slate-500">~420 kcal • 20g Protein • ₹45</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-sage-700 bg-white px-2 py-0.5 rounded-lg">Done ✓</span>
                </div>

                <div className="p-3 rounded-2xl bg-sage-50/70 border border-sage-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🚶</span>
                    <div>
                      <span className="font-bold text-slate-900 block">Move: 10-Min Post-Lunch Walk</span>
                      <span className="text-[10px] text-slate-500">Boost digestion & focus</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-sage-700 bg-white px-2 py-0.5 rounded-lg">Done ✓</span>
                </div>

                <div className="p-3 rounded-2xl bg-cream-50 border border-cream-300 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">💧</span>
                    <div>
                      <span className="font-bold text-slate-900 block">Habit: Glass of Water Before Tea</span>
                      <span className="text-[10px] text-slate-500">1-min micro win</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-lg border border-cream-200">Next</span>
                </div>

                <div className="p-3 rounded-2xl bg-cream-50 border border-cream-300 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🌙</span>
                    <div>
                      <span className="font-bold text-slate-900 block">Sleep: Wind-down at 10:30 PM</span>
                      <span className="text-[10px] text-slate-500">Dim lights & phone away</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-lg border border-cream-200">Tonight</span>
                </div>
              </div>

              {/* Floating Real-Life Mode Tag */}
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs text-amber-900">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-bold">Real-Life Mode Built-In:</span>
                </div>
                <span className="text-[11px] font-semibold text-amber-800">Adapts without judging</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Sections Grid */}
      <section className="px-4 sm:px-8 py-16 max-w-7xl mx-auto border-t border-cream-200">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="px-3 py-1 rounded-full bg-cream-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            Built for Real Humans
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900">
            Why LifeFlow Feels Different
          </h2>
          <p className="text-slate-600 text-sm">
            Most fitness apps are rigid spreadsheets that make you feel guilty. LifeFlow is your supportive lifestyle companion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1: Real-Life Mode */}
          <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft space-y-3 hover:shadow-soft-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl">
              ⚡
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">Real-Life Mode</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              “Bad day? Your plan adapts instead of judging you.” Had a stressful meeting or slept poorly? One tap simplifies your day to 5-min gentle movement and effortless meals.
            </p>
          </div>

          {/* Feature 2: One Daily Card */}
          <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft space-y-3 hover:shadow-soft-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl">
              🎯
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">One Daily Card</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              “Just 3–5 actions that actually matter today.” No endless 20-item to-do lists. Wake up, know your 4 core rhythms (Eat, Move, Habit, Sleep), and move on with your day.
            </p>
          </div>

          {/* Feature 3: Food That Fits You */}
          <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft space-y-3 hover:shadow-soft-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xl">
              🥘
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">Food That Fits You</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              “Recipes and meal ideas based on your fridge, culture, preferences, and budget.” Enjoy South Indian, Tamil, North Indian, or regional staples at ₹30–₹70 per meal.
            </p>
          </div>

          {/* Feature 4: Move Your Way */}
          <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft space-y-3 hover:shadow-soft-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xl">
              🏃
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">Move Your Way</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              “5, 10, or 20-minute workouts based on your energy.” No intimidating gym equipment needed. Live timer with step-by-step guidance for busy workdays.
            </p>
          </div>

          {/* Feature 5: Better Sleep & Mind */}
          <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft space-y-3 hover:shadow-soft-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xl">
              🌙
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">Better Sleep & Mind</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              “Simple wind-down routines, mood check-ins, and stress-relief activities.” Interactive 2-minute box breathing sessions that bring your nervous system back to peace.
            </p>
          </div>

          {/* Feature 6: Family & Friends */}
          <div className="p-6 rounded-3xl bg-white border border-cream-200 shadow-soft space-y-3 hover:shadow-soft-lg transition-all">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xl">
              👨‍👩‍👧
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900">Family & Friends</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              “Build healthy routines together.” Share a 7-day gentle walking challenge with Mom, Dad, and friends with supportive high-fives instead of toxic leaderboards.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Mantra Banner */}
      <section className="px-4 sm:px-8 py-12 max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-sage-900 via-slate-900 to-sage-950 text-white p-8 sm:p-12 rounded-3xl text-center space-y-5 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-3 max-w-2xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-300">
              The Core LifeFlow Promise
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-cream-100 leading-tight">
              “Don't build a perfect life. Build a life you can actually live.”
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Start today without diets, without exhausting workouts, and without guilt.
            </p>

            <div className="pt-3">
              <button
                onClick={onStartOnboarding}
                className="px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-sm font-extrabold shadow-lg shadow-emerald-500/25 transition-all hover:scale-103 active:scale-98"
              >
                Start Your Healthier Routine →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-8 py-8 border-t border-cream-300 text-center space-y-3 text-xs text-slate-500 max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-sage-600" />
          <p className="max-w-xl leading-relaxed text-[11px]">
            <strong>Disclaimer:</strong> LifeFlow is for general healthy lifestyle guidance only and is not a medical diagnosis or treatment device. Always consult your healthcare provider for clinical medical conditions.
          </p>
        </div>
        <p className="text-[10px] text-slate-400">© 2026 LifeFlow AI • Built for Health & AI Hackathon Showcase</p>
      </footer>
    </div>
  );
};
