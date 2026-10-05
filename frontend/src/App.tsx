import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { BottomNavigation } from './components/layout/BottomNavigation';
import { DisclaimerBanner } from './components/layout/DisclaimerBanner';
import { ToastContainer } from './components/layout/Toast';

import { MetricsBar } from './components/dashboard/MetricsBar';
import { TodayPlanCard } from './components/dashboard/TodayPlanCard';
import { QuickActionCards } from './components/dashboard/QuickActionCards';
import { DailyQuote } from './components/dashboard/DailyQuote';
import { RealLifeModeModal } from './components/dashboard/RealLifeModeModal';

import { AIChatDrawer } from './components/ai-coach/AIChatDrawer';
import { TodaysMeals } from './components/food/TodaysMeals';
import { FridgeToRecipe } from './components/food/FridgeToRecipe';
import { GroceryList } from './components/food/GroceryList';
import { EatingOutGuide } from './components/food/EatingOutGuide';

import { MoveYourWay } from './components/fitness/MoveYourWay';
import { EnergyAdaptiveWorkout } from './components/fitness/EnergyAdaptiveWorkout';
import { InteractiveWorkoutPlayer } from './components/fitness/InteractiveWorkoutPlayer';

import { HabitTracker } from './components/habits/HabitTracker';
import { SleepStats } from './components/sleep-mind/SleepStats';
import { WindDownRoutine } from './components/sleep-mind/WindDownRoutine';
import { MoodCheckIn } from './components/sleep-mind/MoodCheckIn';
import { BreathingExercise } from './components/sleep-mind/BreathingExercise';

import { WeeklyOverview } from './components/progress/WeeklyOverview';
import { WeeklyReflection } from './components/progress/WeeklyReflection';
import { FamilyDashboard } from './components/family/FamilyDashboard';
import { SettingsPage } from './components/settings/SettingsPage';
import { LandingPage } from './components/landing/LandingPage';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { LoginPage } from './components/auth/LoginPage';

export const App: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // If user selected Login Page tab, render the full auth experience
  if (activeTab === 'login') {
    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        <DisclaimerBanner />
        <LoginPage onNavigateHome={() => setActiveTab('landing')} />
        <ToastContainer />
      </div>
    );
  }

  // If user selected Landing Page tab, render the full landing showcase
  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        <DisclaimerBanner />
        <LandingPage onStartOnboarding={() => setIsOnboardingOpen(true)} />
        <OnboardingWizard
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
        />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 flex flex-col antialiased selection:bg-sage-200">
      {/* Top Disclaimer Banner */}
      <DisclaimerBanner />

      <div className="flex flex-1 min-h-screen">
        {/* Desktop Sidebar Navigation */}
        <Sidebar />

        {/* Main Application Area */}
        <div className="flex-1 flex flex-col min-w-0 pb-24 lg:pb-10">
          {/* Top Navbar */}
          <Navbar />

          {/* Dynamic Page Views */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
            {/* 1. DASHBOARD VIEW */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6 animate-fadeIn">
                <MetricsBar />
                <TodayPlanCard />
                <QuickActionCards />
                <DailyQuote />
              </div>
            )}

            {/* 2. MY PLAN VIEW */}
            {activeTab === 'plan' && (
              <div className="space-y-6 animate-fadeIn">
                <TodayPlanCard />
                <DailyQuote />
              </div>
            )}

            {/* 3. FOOD VIEW */}
            {activeTab === 'food' && (
              <div className="space-y-8 animate-fadeIn">
                <TodaysMeals />
                <FridgeToRecipe />
                <EatingOutGuide />
                <GroceryList />
              </div>
            )}

            {/* 4. FITNESS VIEW */}
            {activeTab === 'fitness' && (
              <div className="space-y-8 animate-fadeIn">
                <EnergyAdaptiveWorkout />
                <MoveYourWay />
              </div>
            )}

            {/* 5. HABITS VIEW */}
            {activeTab === 'habits' && (
              <div className="space-y-6 animate-fadeIn">
                <HabitTracker />
              </div>
            )}

            {/* 6. SLEEP & MIND VIEW */}
            {activeTab === 'sleep' && (
              <div className="space-y-8 animate-fadeIn">
                <MoodCheckIn />
                <SleepStats />
                <WindDownRoutine />
              </div>
            )}

            {/* 7. PROGRESS VIEW */}
            {activeTab === 'progress' && (
              <div className="space-y-8 animate-fadeIn">
                <WeeklyOverview />
                <WeeklyReflection />
              </div>
            )}

            {/* 8. FAMILY & GROUPS VIEW */}
            {activeTab === 'family' && (
              <div className="space-y-6 animate-fadeIn">
                <FamilyDashboard />
              </div>
            )}

            {/* 9. SETTINGS VIEW */}
            {activeTab === 'settings' && (
              <div className="space-y-6 animate-fadeIn">
                <SettingsPage />
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />

      {/* Global Modals & Drawers */}
      <RealLifeModeModal />
      <AIChatDrawer />
      <InteractiveWorkoutPlayer />
      <BreathingExercise />
      <OnboardingWizard
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
      />

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};
