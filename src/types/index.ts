export interface UserProfile {
  name: string;
  ageRange: string;
  language: string;
  dailySchedule: 'busy' | 'moderate' | 'relaxed' | 'student' | 'shift_work';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very_active';
  goals: string[];
  dietaryPreference: 'vegetarian' | 'non_vegetarian' | 'vegan' | 'eggetarian';
  allergies: string[];
  cuisines: string[];
  foodsAvoid: string[];
  foodBudget: 'budget' | 'moderate' | 'flexible';
  workoutTime: 5 | 10 | 20 | 30;
  workoutLocation: 'home' | 'gym' | 'outdoors';
  equipment: string[];
  sleepTime: string;
  wakeTime: string;
  averageSleepHours: number;
  onboardingCompleted: boolean;
}

export interface PlanItem {
  id: string;
  type: 'eat' | 'move' | 'habit' | 'sleep';
  icon: string;
  title: string;
  description: string;
  timeEstimate: string;
  difficulty: 'Very Easy' | 'Easy' | 'Moderate';
  completed: boolean;
  categoryName: string;
  originalDescription?: string;
  isSimplified?: boolean;
}

export interface DailyPlan {
  date: string;
  greeting: string;
  subGreeting: string;
  sleepHours: string;
  energyLevel: 'Great' | 'Good' | 'Okay' | 'Low' | 'Tired';
  mood: string;
  steps: number;
  stepsGoal: number;
  items: PlanItem[];
  realLifeModeActive: boolean;
  realLifeMood?: string;
  realLifeReason?: string;
}

export interface Meal {
  id: string;
  type: 'Breakfast' | 'Lunch' | 'Snack' | 'Dinner';
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: string;
  cost: number; // in INR
  image: string;
  isLogged: boolean;
  tags: string[];
}

export interface Recipe {
  id: string;
  title: string;
  prepTime: string;
  cost: number;
  calories: number;
  protein: number;
  ingredients: string[];
  steps: string[];
  difficulty: string;
  image: string;
}

export interface GroceryItem {
  id: string;
  name: string;
  category: 'Vegetables' | 'Fruits' | 'Protein' | 'Grains' | 'Dairy' | 'Other';
  quantity: string;
  checked: boolean;
}

export interface WorkoutExercise {
  name: string;
  duration: number; // in seconds
  reps?: string;
  instructions: string;
  targetArea: string;
  iconName?: string;
}

export interface Workout {
  id: string;
  title: string;
  duration: number; // minutes
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  caloriesBurn: number;
  location: 'Home' | 'Gym' | 'Anywhere';
  equipment: string;
  category: '5min' | '10min' | '20min' | '30min' | 'stretch';
  image: string;
  description: string;
  exercises: WorkoutExercise[];
}

export interface Habit {
  id: string;
  title: string;
  category: string;
  icon: string;
  streak: number;
  bestStreak: number;
  completedToday: boolean;
  history: { date: string; completed: boolean }[];
  streakFreezeUsed: boolean;
  streakFreezesRemaining: number;
}

export interface FamilyMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  stepsToday: number;
  habitsCompleted: number;
  challengeProgress: number; // e.g. 5 out of 7 days
  encouragementSentToday: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  quickReplies?: string[];
  cardData?: {
    type: 'meal' | 'workout' | 'habit' | 'recipe';
    title: string;
    details: string;
  };
}
