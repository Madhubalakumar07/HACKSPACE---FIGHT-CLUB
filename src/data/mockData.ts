import { UserProfile, DailyPlan, Meal, Workout, Habit, FamilyMember, GroceryItem } from '../types';

export const initialUserProfile: UserProfile = {
  name: 'Suriya',
  ageRange: '25-34',
  language: 'English',
  dailySchedule: 'busy',
  activityLevel: 'light',
  goals: ['Eat healthier', 'Become more active', 'Improve sleep', 'Maintain consistency'],
  dietaryPreference: 'eggetarian',
  allergies: [],
  cuisines: ['South Indian', 'Tamil cuisine', 'Kerala', 'North Indian'],
  foodsAvoid: ['Ultra-processed fast food', 'Excess deep-fried snacks'],
  foodBudget: 'budget',
  workoutTime: 10,
  workoutLocation: 'home',
  equipment: ['None (Bodyweight only)', 'Yoga mat'],
  sleepTime: '22:45',
  wakeTime: '06:00',
  averageSleepHours: 7.2,
  onboardingCompleted: true,
};

export const initialDailyPlan: DailyPlan = {
  date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
  greeting: 'Good Morning, Suriya 👋',
  subGreeting: 'Let’s make today a little healthier. No perfection needed.',
  sleepHours: '7h 10m',
  energyLevel: 'Good',
  mood: '😊',
  steps: 4230,
  stepsGoal: 7000,
  realLifeModeActive: false,
  items: [
    {
      id: 'plan-1',
      type: 'eat',
      icon: '🍳',
      title: 'Eat',
      description: 'Have a protein-rich breakfast with dosa + sambar + 2 boiled eggs.',
      timeEstimate: '15 mins',
      difficulty: 'Easy',
      completed: true,
      categoryName: 'Nutrition'
    },
    {
      id: 'plan-2',
      type: 'move',
      icon: '🚶',
      title: 'Move',
      description: 'Take a brisk 10-minute walk after lunch or do simple desk mobility.',
      timeEstimate: '10 mins',
      difficulty: 'Easy',
      completed: true,
      categoryName: 'Activity'
    },
    {
      id: 'plan-3',
      type: 'habit',
      icon: '💧',
      title: 'Habit',
      description: 'Drink one tall glass of water before your evening snack or tea.',
      timeEstimate: '1 min',
      difficulty: 'Very Easy',
      completed: false,
      categoryName: 'Mindful Micro-Habit'
    },
    {
      id: 'plan-4',
      type: 'sleep',
      icon: '🌙',
      title: 'Sleep',
      description: 'Start your wind-down routine at 10:30 PM. Dim bedroom lights.',
      timeEstimate: '15 mins',
      difficulty: 'Easy',
      completed: false,
      categoryName: 'Rest & Recovery'
    }
  ]
};

export const mockMeals: Meal[] = [
  {
    id: 'meal-1',
    type: 'Breakfast',
    name: 'Idli + Sambar + 2 Boiled Eggs',
    description: 'Steamed fluffy idlis with lentil sambar and high-protein eggs for sustained energy.',
    calories: 420,
    protein: 20,
    carbs: 58,
    fat: 9,
    prepTime: '15 mins',
    cost: 45,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    isLogged: true,
    tags: ['South Indian', 'High Protein', 'Budget-friendly']
  },
  {
    id: 'meal-2',
    type: 'Lunch',
    name: 'Millet Rice + Spinach Dal + Cucumber Salad',
    description: 'Wholesome barnyard millet with protein-rich spinach toor dal and cooling cucumber slices.',
    calories: 490,
    protein: 18,
    carbs: 72,
    fat: 11,
    prepTime: '25 mins',
    cost: 65,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    isLogged: false,
    tags: ['Wholesome', 'High Fiber', 'Traditional']
  },
  {
    id: 'meal-3',
    type: 'Snack',
    name: 'Roasted Masala Makhana + Spiced Buttermilk',
    description: 'Crunchy fox nuts lightly roasted in ghee with herbs, paired with probiotic spiced chaas.',
    calories: 140,
    protein: 6,
    carbs: 18,
    fat: 4,
    prepTime: '5 mins',
    cost: 25,
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80',
    isLogged: false,
    tags: ['Low Calorie', 'Gut Healthy', 'Quick']
  },
  {
    id: 'meal-4',
    type: 'Dinner',
    name: 'Soft Phulkas + Paneer Veg Bhurji',
    description: 'Whole wheat flatbreads with spiced crumbled cottage cheese and bell peppers.',
    calories: 460,
    protein: 22,
    carbs: 52,
    fat: 16,
    prepTime: '20 mins',
    cost: 75,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80',
    isLogged: false,
    tags: ['Balanced', 'Comforting', 'Vegetarian']
  }
];

export const mockAlternativeMeals: Record<string, Meal[]> = {
  Breakfast: [
    {
      id: 'alt-b1',
      type: 'Breakfast',
      name: 'Rava Upma with Mixed Veggies + Roasted Peanuts',
      description: 'Savory semolina porridge tempered with mustard, curry leaves, ginger, and crunchy peanuts.',
      calories: 360,
      protein: 11,
      carbs: 54,
      fat: 10,
      prepTime: '12 mins',
      cost: 35,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
      isLogged: false,
      tags: ['Quick Prep', 'Fiber Rich']
    },
    {
      id: 'alt-b2',
      type: 'Breakfast',
      name: 'Poha with Sprouts & Fresh Lime',
      description: 'Flattened rice tossed with green mung bean sprouts, onions, and turmeric.',
      calories: 330,
      protein: 13,
      carbs: 50,
      fat: 7,
      prepTime: '10 mins',
      cost: 30,
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
      isLogged: false,
      tags: ['Light & Easy', 'Easy Digest']
    }
  ],
  Lunch: [
    {
      id: 'alt-l1',
      type: 'Lunch',
      name: 'Curd Rice with Pomegranate + Stir-fried Beans Poriyal',
      description: 'Cooling probiotic curd rice tempered with mustard seeds, paired with fresh green beans.',
      calories: 410,
      protein: 14,
      carbs: 64,
      fat: 10,
      prepTime: '15 mins',
      cost: 40,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
      isLogged: false,
      tags: ['Gut Healing', 'Simple']
    }
  ],
  Snack: [
    {
      id: 'alt-s1',
      type: 'Snack',
      name: 'Sundal (Boiled Chickpea Stir-fry) + Black Tea',
      description: 'Boiled chickpeas with grated coconut, mustard seeds, and fresh curry leaves.',
      calories: 160,
      protein: 8,
      carbs: 22,
      fat: 3,
      prepTime: '5 mins',
      cost: 20,
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80',
      isLogged: false,
      tags: ['Plant Protein', 'No Sugar']
    }
  ],
  Dinner: [
    {
      id: 'alt-d1',
      type: 'Dinner',
      name: 'Moong Dal Khichdi + Roasted Papad + Curd',
      description: 'Gentle golden khichdi made with yellow lentils and rice, easy on the stomach before bed.',
      calories: 390,
      protein: 16,
      carbs: 60,
      fat: 7,
      prepTime: '18 mins',
      cost: 45,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80',
      isLogged: false,
      tags: ['Easy Digestion', 'Sleep Friendly']
    }
  ]
};

export const mockWorkouts: Workout[] = [
  {
    id: 'wo-5min',
    title: '5-Min Quick Energy Boost',
    duration: 5,
    level: 'Beginner',
    caloriesBurn: 35,
    location: 'Anywhere',
    equipment: 'None',
    category: '5min',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
    description: 'A swift, revitalizing routine designed to wake up stiff joints and boost blood circulation without breaking a heavy sweat.',
    exercises: [
      { name: 'Neck & Shoulder Rolls', duration: 45, instructions: 'Gentle circular motions clockwise and counter-clockwise to relieve desk stiffness.', targetArea: 'Neck & Shoulders' },
      { name: 'Torso Twists with Reach', duration: 45, instructions: 'Stand with feet shoulder-width, gently rotate torso from left to right.', targetArea: 'Spine & Core' },
      { name: 'Standing Knee-to-Elbow', duration: 60, instructions: 'Lift knee upwards while driving opposite elbow across body.', targetArea: 'Core & Hip Flexors' },
      { name: 'Calf Raises & Arm Circles', duration: 60, instructions: 'Elevate on tiptoes while making wide backward circles with arms.', targetArea: 'Calves & Posture' },
      { name: 'Deep Overhead Inhale Stretches', duration: 60, instructions: 'Reach tall toward the ceiling, interlace fingers, deep breaths.', targetArea: 'Full Body Reset' }
    ]
  },
  {
    id: 'wo-10min',
    title: '10-Min Full Body Beginner Reset',
    duration: 10,
    level: 'Beginner',
    caloriesBurn: 75,
    location: 'Home',
    equipment: 'None (Bodyweight)',
    category: '10min',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
    description: 'Simple functional bodyweight movements to build everyday strength, balance, and stamina at an approachable pace.',
    exercises: [
      { name: 'Gentle Bodyweight Squats', duration: 60, instructions: 'Sit back as if sitting on an imaginary chair, keep chest up.', targetArea: 'Quads & Glutes' },
      { name: 'Wall or Incline Push-ups', duration: 60, instructions: 'Hands against the wall/countertop, control body descent smoothly.', targetArea: 'Chest & Arms' },
      { name: 'Glute Bridges on Mat', duration: 60, instructions: 'Lie on back, press through heels, squeeze glutes at the top.', targetArea: 'Lower Back & Glutes' },
      { name: 'Bird-Dog Stability', duration: 60, instructions: 'On all fours, reach opposite arm and leg straight out.', targetArea: 'Core & Spine Stability' },
      { name: 'March in Place with High Knees', duration: 60, instructions: 'Rhythmic pumping of arms and knees.', targetArea: 'Cardio Boost' },
      { name: 'Child’s Pose to Cobra Flow', duration: 60, instructions: 'Smooth restorative transitions for back mobility.', targetArea: 'Flexibility' }
    ]
  },
  {
    id: 'wo-20min',
    title: '20-Min Complete Home Flow & Strength',
    duration: 20,
    level: 'Intermediate',
    caloriesBurn: 155,
    location: 'Home',
    equipment: 'Yoga Mat',
    category: '20min',
    image: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=600&auto=format&fit=crop&q=80',
    description: 'A balanced blend of strength intervals, core work, and active recovery to feel accomplished without burnout.',
    exercises: [
      { name: 'Dynamic Warm-up & Arm Swings', duration: 90, instructions: 'Warm up major joints with rhythmic arm swings and side lunges.', targetArea: 'Full Body' },
      { name: 'Reverse Lunges with Balance', duration: 75, instructions: 'Step back into lunges, alternating legs smoothly.', targetArea: 'Legs & Balance' },
      { name: 'Floor Push-ups / Knee Push-ups', duration: 60, instructions: 'Maintain straight plank line, touch chest gently toward mat.', targetArea: 'Chest & Triceps' },
      { name: 'Plank Hold with Tap', duration: 60, instructions: 'Forearm plank, alternate light shoulder taps without shifting hips.', targetArea: 'Core Stability' },
      { name: 'Squat to Calf Raise Pulse', duration: 75, instructions: 'Deep squat with smooth calf extension at peak.', targetArea: 'Lower Body' },
      { name: 'Superman Hold & Pulse', duration: 60, instructions: 'Lie face down, lift chest and thighs slightly off floor.', targetArea: 'Posterior Chain' },
      { name: 'Cooling Hamstring & Hip Stretch', duration: 120, instructions: 'Relaxing stretches to bring heart rate down calmly.', targetArea: 'Recovery' }
    ]
  }
];

export const mockHabits: Habit[] = [
  {
    id: 'hab-1',
    title: 'Drink water before morning tea / breakfast',
    category: 'Hydration',
    icon: '💧',
    streak: 5,
    bestStreak: 12,
    completedToday: true,
    streakFreezeUsed: false,
    streakFreezesRemaining: 2,
    history: [
      { date: 'Mon', completed: true },
      { date: 'Tue', completed: true },
      { date: 'Wed', completed: true },
      { date: 'Thu', completed: true },
      { date: 'Fri', completed: true },
      { date: 'Sat', completed: false },
      { date: 'Sun', completed: false }
    ]
  },
  {
    id: 'hab-2',
    title: '10-Minute post-lunch walk',
    category: 'Movement',
    icon: '🚶',
    streak: 3,
    bestStreak: 7,
    completedToday: true,
    streakFreezeUsed: false,
    streakFreezesRemaining: 2,
    history: [
      { date: 'Mon', completed: false },
      { date: 'Tue', completed: false },
      { date: 'Wed', completed: true },
      { date: 'Thu', completed: true },
      { date: 'Fri', completed: true },
      { date: 'Sat', completed: false },
      { date: 'Sun', completed: false }
    ]
  },
  {
    id: 'hab-3',
    title: 'No phone screen 30 mins before sleep',
    category: 'Sleep & Mind',
    icon: '🌙',
    streak: 4,
    bestStreak: 9,
    completedToday: false,
    streakFreezeUsed: false,
    streakFreezesRemaining: 2,
    history: [
      { date: 'Mon', completed: true },
      { date: 'Tue', completed: true },
      { date: 'Wed', completed: true },
      { date: 'Thu', completed: true },
      { date: 'Fri', completed: false },
      { date: 'Sat', completed: false },
      { date: 'Sun', completed: false }
    ]
  }
];

export const mockFamilyMembers: FamilyMember[] = [
  {
    id: 'fam-1',
    name: 'You (Suriya)',
    role: 'You',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    stepsToday: 4230,
    habitsCompleted: 2,
    challengeProgress: 6, // 6/7 days
    encouragementSentToday: true
  },
  {
    id: 'fam-2',
    name: 'Mom (Radha)',
    role: 'Mother',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    stepsToday: 5120,
    habitsCompleted: 3,
    challengeProgress: 5, // 5/7 days
    encouragementSentToday: false
  },
  {
    id: 'fam-3',
    name: 'Dad (Kannan)',
    role: 'Father',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    stepsToday: 3890,
    habitsCompleted: 2,
    challengeProgress: 4, // 4/7 days
    encouragementSentToday: false
  },
  {
    id: 'fam-4',
    name: 'Pooja',
    role: 'Sister',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    stepsToday: 6450,
    habitsCompleted: 3,
    challengeProgress: 6,
    encouragementSentToday: true
  }
];

export const mockGroceries: GroceryItem[] = [
  { id: 'g-1', name: 'Spinach / Palak', category: 'Vegetables', quantity: '1 bunch', checked: false },
  { id: 'g-2', name: 'Cucumbers', category: 'Vegetables', quantity: '500g', checked: true },
  { id: 'g-3', name: 'Tomatoes & Onions', category: 'Vegetables', quantity: '1 kg each', checked: true },
  { id: 'g-4', name: 'Green Bell Peppers', category: 'Vegetables', quantity: '2 pcs', checked: false },
  { id: 'g-5', name: 'Bananas', category: 'Fruits', quantity: '6 pcs', checked: true },
  { id: 'g-6', name: 'Pomegranates', category: 'Fruits', quantity: '2 pcs', checked: false },
  { id: 'g-7', name: 'Fresh Farm Eggs', category: 'Protein', quantity: '12 pack', checked: true },
  { id: 'g-8', name: 'Paneer (Cottage Cheese)', category: 'Protein', quantity: '200g', checked: false },
  { id: 'g-9', name: 'Toor Dal / Yellow Lentils', category: 'Protein', quantity: '500g', checked: true },
  { id: 'g-10', name: 'Barnyard Millet / Foxtail', category: 'Grains', quantity: '1 kg', checked: false },
  { id: 'g-11', name: 'Whole Wheat Atta', category: 'Grains', quantity: '2 kg', checked: true },
  { id: 'g-12', name: 'Fresh Curd / Yogurt', category: 'Dairy', quantity: '500ml', checked: false },
  { id: 'g-13', name: 'Pure Cow Ghee', category: 'Dairy', quantity: '200ml', checked: true },
  { id: 'g-14', name: 'Roasted Fox Nuts (Makhana)', category: 'Other', quantity: '100g', checked: false }
];

export const mockEatingOutGuides = [
  {
    cuisine: 'Tamil / South Indian',
    icon: '🥘',
    description: 'Traditional tiffin & meal spots (Saravana Bhavan, local mess, Anandha Bhavan)',
    better: [
      { name: 'Plain Idli with Sambar & Tomato Chutney', reason: 'Steamed, virtually oil-free, gentle on digestion' },
      { name: 'Rava Upma with Mixed Vegetables', reason: 'High fiber and keeps blood sugar steady' },
      { name: 'Mini Meals with Extra Sambar & Rasam', reason: 'Enjoy dal and vegetable sides; ask for 1/2 rice' },
      { name: 'Spiced Neer Mor (Buttermilk)', reason: 'Refreshing natural electrolytes & gut probiotics' }
    ],
    okay: [
      { name: 'Paper Plain Dosa / Podi Dosa', reason: 'Moderate carbs; pair with sambar instead of extra coconut chutney' },
      { name: 'Pongal with Ghee', reason: 'Nourishing comfort food, slightly calorie dense' },
      { name: 'Appam with Veg Stew', reason: 'Coconut milk base is rich but wholesome' }
    ],
    occasional: [
      { name: 'Crispy Medu Vada (Deep fried)', reason: 'High calorie oil absorption; have 1 piece mindfully' },
      { name: 'Ghee Roast Dosa / Poori Masala', reason: 'High saturated fats and refined oils' },
      { name: 'Deep fried Mysore Bonda / Bajji', reason: 'Best enjoyed sparingly on celebrations' }
    ]
  },
  {
    cuisine: 'North Indian & Mughlai',
    icon: '🍛',
    description: 'Curry houses, tandoor restaurants, dhaba dining',
    better: [
      { name: 'Tandoori Roti + Yellow Dal Tadka', reason: 'Unrefined whole wheat and clean lentil protein' },
      { name: 'Tandoori Paneer Tikka / Chicken Tikka', reason: 'Char-grilled with aromatic spices, high protein, low oil' },
      { name: 'Palak Paneer with Light Gravy', reason: 'Iron & antioxidant packed spinach' },
      { name: 'Cucumber Boondi Raita', reason: 'Cooling accompaniment' }
    ],
    okay: [
      { name: 'Kadai Paneer / Mixed Veg Curry', reason: 'Onion-tomato gravy with moderate oil' },
      { name: 'Jeera Rice + Dal Fry', reason: 'Tasty combo, moderate glycemic load' }
    ],
    occasional: [
      { name: 'Butter Naan / Rumali Roti', reason: 'Refined flour (maida) and butter' },
      { name: 'Paneer Butter Masala / Dal Makhani', reason: 'Heavy cashew paste, cream and butter' },
      { name: 'Samosas & Gulab Jamun', reason: 'Deep fried sugar and carbs' }
    ]
  },
  {
    cuisine: 'Cafes & Fast Casual',
    icon: '☕',
    description: 'Modern coffee shops, quick service eateries',
    better: [
      { name: 'Grilled Paneer / Chicken Salad Bowl with Lemon Dressing', reason: 'Crisp greens, lean protein, light vinaigrette' },
      { name: 'Whole Wheat Veggie Club Sandwich', reason: 'Balanced macros, requested with less mayo' },
      { name: 'Americano / Cappuccino with Skim Milk (No Syrup)', reason: 'Clean caffeine lift without sugar crash' }
    ],
    okay: [
      { name: 'Hummus & Whole Wheat Pita Wrap', reason: 'Heart-healthy olive oil and plant chickpeas' },
      { name: 'Avocado Toast with Poached Egg', reason: 'Healthy fats, moderate calories' }
    ],
    occasional: [
      { name: 'Loaded Cheesy Fries & Burgers', reason: 'Heavy trans-fats and processed sodium' },
      { name: 'Frappes with Whipped Cream & Caramel', reason: 'Over 40g added sugar per drink' }
    ]
  }
];
