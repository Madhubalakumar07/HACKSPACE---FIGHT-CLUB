import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, DailyPlan, Meal, Workout, Habit, FamilyMember, GroceryItem, ChatMessage, Recipe } from '../types';
import { initialUserProfile, initialDailyPlan, mockMeals, mockHabits, mockFamilyMembers, mockGroceries, mockWorkouts, mockAlternativeMeals } from '../data/mockData';
import { AIService } from '../data/aiService';
import { triggerCelebration, triggerSubtleSparkle } from '../utils/confetti';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'reminder';
  title: string;
  message: string;
}

interface AppContextType {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  
  dailyPlan: DailyPlan;
  togglePlanItem: (id: string) => void;
  activateRealLifeMode: (moodState: 'Great' | 'Good' | 'Okay' | 'Low' | 'Tired', reason?: string) => void;
  resetRealLifeMode: () => void;
  
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  meals: Meal[];
  replaceMeal: (type: 'Breakfast' | 'Lunch' | 'Snack' | 'Dinner') => void;
  logMeal: (id: string) => void;
  addNewLoggedMeal: (meal: Omit<Meal, 'id' | 'isLogged'>) => void;
  
  groceries: GroceryItem[];
  toggleGroceryItem: (id: string) => void;
  addGroceryItem: (name: string, category: GroceryItem['category'], quantity: string) => void;
  
  habits: Habit[];
  toggleHabitToday: (id: string) => void;
  useStreakFreeze: (id: string) => void;
  addHabit: (title: string, category: string, icon: string) => void;
  
  familyMembers: FamilyMember[];
  sendFamilyEncouragement: (id: string) => void;
  
  isAIChatOpen: boolean;
  setIsAIChatOpen: (open: boolean) => void;
  chatMessages: ChatMessage[];
  sendUserMessage: (text: string) => void;
  
  isRealLifeModalOpen: boolean;
  setIsRealLifeModalOpen: (open: boolean) => void;
  
  activeWorkout: Workout | null;
  startWorkout: (workout: Workout) => void;
  finishWorkout: () => void;
  cancelWorkout: () => void;
  
  energySliderValue: number;
  setEnergySliderValue: (val: number) => void;
  
  breathingSessionActive: boolean;
  setBreathingSessionActive: (active: boolean) => void;
  
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'reminder') => void;
  removeToast: (id: string) => void;
  
  fridgeRecipes: Recipe[];
  generateFridgeRecipes: (ingredients: string[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('lifeflow_user_profile');
    return saved ? JSON.parse(saved) : initialUserProfile;
  });

  const [dailyPlan, setDailyPlan] = useState<DailyPlan>(() => {
    const saved = localStorage.getItem('lifeflow_daily_plan');
    return saved ? JSON.parse(saved) : initialDailyPlan;
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [meals, setMeals] = useState<Meal[]>(mockMeals);
  const [groceries, setGroceries] = useState<GroceryItem[]>(mockGroceries);
  const [habits, setHabits] = useState<Habit[]>(mockHabits);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(mockFamilyMembers);
  const [isAIChatOpen, setIsAIChatOpen] = useState<boolean>(false);
  const [isRealLifeModalOpen, setIsRealLifeModalOpen] = useState<boolean>(false);
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const [energySliderValue, setEnergySliderValue] = useState<number>(65);
  const [breathingSessionActive, setBreathingSessionActive] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [fridgeRecipes, setFridgeRecipes] = useState<Recipe[]>(() =>
    AIService.generateRecipesFromIngredients(['eggs', 'rice', 'onions', 'vegetables'])
  );

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: "Hi Suriya! 👋 I'm your **LifeFlow Coach**. How are you feeling today? Ask me for easy meal ideas with what's in your fridge, quick workouts for your energy level, or tips to wind down tonight.",
      timestamp: '10:00 AM',
      quickReplies: ['What should I eat for dinner?', 'I only have 10 minutes today', 'Suggest a cheap healthy meal', 'I am eating outside today']
    }
  ]);

  // Persist user profile and daily plan
  useEffect(() => {
    localStorage.setItem('lifeflow_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('lifeflow_daily_plan', JSON.stringify(dailyPlan));
  }, [dailyPlan]);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'reminder' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
    showToast('Preferences Saved', 'Your personalized lifestyle settings have been updated.');
  };

  const togglePlanItem = (id: string) => {
    setDailyPlan(prev => {
      const newItems = prev.items.map(item => {
        if (item.id === id) {
          const nextCompleted = !item.completed;
          if (nextCompleted) {
            triggerSubtleSparkle();
          }
          return { ...item, completed: nextCompleted };
        }
        return item;
      });

      const completedCount = newItems.filter(i => i.completed).length;
      if (completedCount === newItems.length) {
        triggerCelebration();
        showToast('All Daily Actions Complete! 🎉', 'You crushed today’s essential rhythm without stress.');
      }

      return {
        ...prev,
        items: newItems
      };
    });
  };

  const activateRealLifeMode = (moodState: 'Great' | 'Good' | 'Okay' | 'Low' | 'Tired', reason?: string) => {
    const adapted = AIService.adaptPlanForRealLife(dailyPlan, moodState, reason);
    setDailyPlan(adapted);
    setIsRealLifeModalOpen(false);
    triggerSubtleSparkle();
    showToast('Real-Life Mode Active 🌿', 'No guilt. No restarting. Just adjusted to keep you moving forward effortlessly.', 'info');
  };

  const resetRealLifeMode = () => {
    const reset = AIService.resetRealLifeMode(dailyPlan);
    setDailyPlan(reset);
    showToast('Standard Plan Restored', 'Your default daily actions are back in rhythm.');
  };

  const replaceMeal = (type: 'Breakfast' | 'Lunch' | 'Snack' | 'Dinner') => {
    const alts = mockAlternativeMeals[type] || [];
    if (alts.length === 0) return;

    const currentMeal = meals.find(m => m.type === type);
    const available = alts.filter(a => a.id !== currentMeal?.id);
    const replacement = available.length > 0 ? available[0] : alts[0];

    setMeals(prev => prev.map(m => m.type === type ? replacement : m));
    showToast('Meal Replaced 🥗', `Swapped to ${replacement.name}`, 'info');
  };

  const logMeal = (id: string) => {
    setMeals(prev => prev.map(m => {
      if (m.id === id) {
        triggerSubtleSparkle();
        showToast('Meal Logged', `${m.name} added to today's log.`);
        return { ...m, isLogged: true };
      }
      return m;
    }));
  };

  const addNewLoggedMeal = (newMealData: Omit<Meal, 'id' | 'isLogged'>) => {
    const newMeal: Meal = {
      ...newMealData,
      id: `custom-meal-${Date.now()}`,
      isLogged: true
    };
    setMeals(prev => [newMeal, ...prev]);
    triggerCelebration();
    showToast('Meal Added', `${newMeal.name} successfully logged!`);
  };

  const toggleGroceryItem = (id: string) => {
    setGroceries(prev => prev.map(g => g.id === id ? { ...g, checked: !g.checked } : g));
  };

  const addGroceryItem = (name: string, category: GroceryItem['category'], quantity: string) => {
    const newItem: GroceryItem = {
      id: `grocery-${Date.now()}`,
      name,
      category,
      quantity,
      checked: false
    };
    setGroceries(prev => [newItem, ...prev]);
    showToast('Item Added', `${name} added to your weekly grocery checklist.`);
  };

  const toggleHabitToday = (id: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        const nextCompleted = !h.completedToday;
        const newStreak = nextCompleted ? h.streak + 1 : Math.max(0, h.streak - 1);
        if (nextCompleted) {
          triggerCelebration();
          showToast('Habit Checked! 🔥', `Keep it going! Current streak: ${newStreak} days.`);
        }
        return {
          ...h,
          completedToday: nextCompleted,
          streak: newStreak,
          bestStreak: Math.max(h.bestStreak, newStreak)
        };
      }
      return h;
    }));
  };

  const useStreakFreeze = (id: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id === id && h.streakFreezesRemaining > 0 && !h.streakFreezeUsed) {
        showToast('Streak Freeze Activated 🛡️', 'Your streak is protected for today! No progress lost.', 'info');
        return {
          ...h,
          streakFreezeUsed: true,
          streakFreezesRemaining: h.streakFreezesRemaining - 1
        };
      }
      return h;
    }));
  };

  const addHabit = (title: string, category: string, icon: string) => {
    if (habits.length >= 4) {
      showToast('Focus Limit Reached', 'We recommend keeping 1–3 micro habits active to ensure lasting consistency without overwhelm.', 'reminder');
      return;
    }
    const newHabit: Habit = {
      id: `hab-${Date.now()}`,
      title,
      category,
      icon: icon || '✨',
      streak: 1,
      bestStreak: 1,
      completedToday: true,
      streakFreezeUsed: false,
      streakFreezesRemaining: 2,
      history: [
        { date: 'Mon', completed: false },
        { date: 'Tue', completed: false },
        { date: 'Wed', completed: false },
        { date: 'Thu', completed: false },
        { date: 'Fri', completed: true },
        { date: 'Sat', completed: false },
        { date: 'Sun', completed: false }
      ]
    };
    setHabits(prev => [...prev, newHabit]);
    triggerCelebration();
    showToast('New Habit Created', `"${title}" is now part of your daily rhythm.`);
  };

  const sendFamilyEncouragement = (id: string) => {
    setFamilyMembers(prev => prev.map(m => {
      if (m.id === id) {
        triggerSubtleSparkle();
        showToast('High-Five Sent! 🙌', `Encouraged ${m.name} on their daily journey.`);
        return { ...m, encouragementSentToday: true };
      }
      return m;
    }));
  };

  const sendUserMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);

    // Simulated AI response
    setTimeout(() => {
      const response = AIService.getCoachResponse(text, userProfile);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: response.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: response.quickReplies,
        cardData: response.suggestedAction
      };
      setChatMessages(prev => [...prev, aiMsg]);
    }, 650);
  };

  const startWorkout = (workout: Workout) => {
    setActiveWorkout(workout);
  };

  const finishWorkout = () => {
    if (activeWorkout) {
      triggerCelebration();
      showToast('Workout Completed! 💪', `Awesome job finishing ${activeWorkout.title}!`);
      // check off move action in daily plan
      setDailyPlan(prev => ({
        ...prev,
        items: prev.items.map(i => i.type === 'move' ? { ...i, completed: true } : i)
      }));
    }
    setActiveWorkout(null);
  };

  const cancelWorkout = () => {
    setActiveWorkout(null);
  };

  const generateFridgeRecipes = (ingredients: string[]) => {
    const generated = AIService.generateRecipesFromIngredients(ingredients);
    setFridgeRecipes(generated);
    showToast('Recipes Generated 🍳', `Found ${generated.length} delicious, budget-friendly ideas!`);
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        setUserProfile,
        updateUserProfile,
        dailyPlan,
        togglePlanItem,
        activateRealLifeMode,
        resetRealLifeMode,
        activeTab,
        setActiveTab,
        meals,
        replaceMeal,
        logMeal,
        addNewLoggedMeal,
        groceries,
        toggleGroceryItem,
        addGroceryItem,
        habits,
        toggleHabitToday,
        useStreakFreeze,
        addHabit,
        familyMembers,
        sendFamilyEncouragement,
        isAIChatOpen,
        setIsAIChatOpen,
        chatMessages,
        sendUserMessage,
        isRealLifeModalOpen,
        setIsRealLifeModalOpen,
        activeWorkout,
        startWorkout,
        finishWorkout,
        cancelWorkout,
        energySliderValue,
        setEnergySliderValue,
        breathingSessionActive,
        setBreathingSessionActive,
        toasts,
        showToast,
        removeToast,
        fridgeRecipes,
        generateFridgeRecipes
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
