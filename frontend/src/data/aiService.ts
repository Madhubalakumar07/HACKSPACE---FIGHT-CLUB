import { DailyPlan, PlanItem, Recipe, UserProfile } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export interface BackendChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface HealthAnalysis {
  filename: string;
  score: number;
  score_label: string;
  summary: string;
  metrics: { name: string; value: string; status: string; note: string }[];
  plan: string;
  model?: string;
  disclaimer: string;
}

async function readApiError(response: Response): Promise<Error> {
  const body = await response.json().catch(() => null);
  return new Error(body?.detail || `AI service request failed (${response.status}).`);
}

export async function askQwen(
  message: string,
  history: BackendChatMessage[] = []
): Promise<{ answer: string; sources?: string[]; model?: string }> {
  const response = await fetch(`${API_BASE_URL}/chat/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });
  if (!response.ok) throw await readApiError(response);
  return response.json();
}

export async function analyzeHealthDocument(file: File): Promise<HealthAnalysis> {
  const formData = new FormData();
  formData.append('document', file);
  const response = await fetch(`${API_BASE_URL}/chat/analyze-document`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw await readApiError(response);
  return response.json();
}

export interface AIResponse {
  message: string;
  quickReplies?: string[];
  suggestedAction?: {
    type: 'meal' | 'workout' | 'habit';
    title: string;
    details: string;
  };
}

export class AIService {
  // Dynamic Real-Life Mode Adapter
  static adaptPlanForRealLife(
    currentPlan: DailyPlan,
    moodState: 'Great' | 'Good' | 'Okay' | 'Low' | 'Tired',
    reason?: string
  ): DailyPlan {
    const isTiredOrLow = moodState === 'Low' || moodState === 'Tired';
    const isOkay = moodState === 'Okay';

    const adaptedItems: PlanItem[] = currentPlan.items.map(item => {
      if (item.type === 'move') {
        if (isTiredOrLow) {
          return {
            ...item,
            title: 'Gentle Rest & Stretch',
            description: 'Just 5 minutes of gentle neck and shoulder stretching. No pressure to sweat.',
            timeEstimate: '5 mins',
            difficulty: 'Very Easy',
            isSimplified: true,
            originalDescription: item.originalDescription || item.description
          };
        } else if (isOkay) {
          return {
            ...item,
            title: 'Casual Stroll',
            description: '8-minute easy walk while listening to your favorite podcast or song.',
            timeEstimate: '8 mins',
            difficulty: 'Easy',
            isSimplified: true,
            originalDescription: item.originalDescription || item.description
          };
        }
      }

      if (item.type === 'eat') {
        if (isTiredOrLow) {
          return {
            ...item,
            title: 'Effortless Comfort Meal',
            description: 'Choose a warm simple meal: Curd rice / Khichdi or light takeout with extra veggies.',
            timeEstimate: '5 mins',
            difficulty: 'Very Easy',
            isSimplified: true,
            originalDescription: item.originalDescription || item.description
          };
        }
      }

      if (item.type === 'sleep') {
        if (isTiredOrLow) {
          return {
            ...item,
            title: 'Early Sleep Window',
            description: 'Hop into bed 20 minutes earlier tonight. Put the phone on Do Not Disturb.',
            timeEstimate: 'Immediate',
            difficulty: 'Very Easy',
            isSimplified: true,
            originalDescription: item.originalDescription || item.description
          };
        }
      }

      return item;
    });

    return {
      ...currentPlan,
      realLifeModeActive: true,
      realLifeMood: moodState,
      realLifeReason: reason || 'Energy adaptation active',
      subGreeting: isTiredOrLow
        ? '🌱 Gentle mode active: No guilt. No restarting. Just adjust and continue.'
        : '✨ Adjusted to your vibe today. Steady progress over perfection.',
      items: adaptedItems
    };
  }

  // Restore Plan back to standard
  static resetRealLifeMode(currentPlan: DailyPlan): DailyPlan {
    const originalItems: PlanItem[] = currentPlan.items.map(item => ({
      ...item,
      title: item.type === 'eat' ? 'Eat' : item.type === 'move' ? 'Move' : item.type === 'habit' ? 'Habit' : 'Sleep',
      description: item.originalDescription || item.description,
      timeEstimate: item.type === 'move' ? '10 mins' : item.type === 'eat' ? '15 mins' : item.type === 'habit' ? '1 min' : '15 mins',
      difficulty: 'Easy',
      isSimplified: false
    }));

    return {
      ...currentPlan,
      realLifeModeActive: false,
      realLifeMood: undefined,
      realLifeReason: undefined,
      subGreeting: 'Let’s make today a little healthier. No perfection needed.',
      items: originalItems
    };
  }

  // Fridge-to-Recipe Generator based on input ingredients or photo
  static generateRecipesFromIngredients(ingredients: string[]): Recipe[] {
    const lower = ingredients.map(i => i.toLowerCase()).join(' ');

    const hasEggs = lower.includes('egg');
    const hasRice = lower.includes('rice');
    const hasVeggies = lower.includes('veg') || lower.includes('carrot') || lower.includes('beans') || lower.includes('spinach') || lower.includes('onion') || lower.includes('tomato');
    const hasPaneer = lower.includes('paneer') || lower.includes('curd') || lower.includes('milk') || lower.includes('dairy');

    const recipes: Recipe[] = [];

    if (hasEggs || hasVeggies || hasRice) {
      recipes.push({
        id: 'rec-1',
        title: 'Quick Masala Egg & Veggie Stir-Fry Rice',
        prepTime: '12 mins',
        cost: 45,
        calories: 390,
        protein: 18,
        difficulty: 'Easy',
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&auto=format&fit=crop&q=80',
        ingredients: [
          '1 cup Cooked Rice (leftover is perfect)',
          '2 Eggs beaten with pinch of turmeric & pepper',
          '1 cup Finely chopped vegetables (onions, carrots, beans)',
          '1 tsp Mustard seeds & curry leaves',
          '1 tsp Cooking oil or ghee'
        ],
        steps: [
          'Heat 1 tsp oil in a pan, add mustard seeds and curry leaves until they crackle.',
          'Sauté chopped veggies on medium heat for 3 minutes until tender-crisp.',
          'Pour beaten eggs, scramble gently into soft curds.',
          'Fold in cooked rice, sprinkle salt and black pepper. Toss for 2 minutes and serve hot!'
        ]
      });
    }

    if (hasEggs) {
      recipes.push({
        id: 'rec-2',
        title: 'Fluffy South-Indian Masala Omelette',
        prepTime: '6 mins',
        cost: 30,
        calories: 220,
        protein: 14,
        difficulty: 'Very Easy',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80',
        ingredients: [
          '2 Fresh Eggs',
          '2 tbsp Finely minced red onion & green chili',
          '1 tbsp Fresh coriander leaves',
          'Pinch of turmeric, cumin powder & salt',
          '1/2 tsp Ghee or coconut oil'
        ],
        steps: [
          'Whisk eggs thoroughly with chopped onion, chili, turmeric and salt in a bowl.',
          'Warm ghee in a shallow pan on medium heat.',
          'Pour mixture, tilt pan evenly, cook for 2 minutes until base is golden.',
          'Flip gently for 45 seconds. Enjoy with a slice of whole wheat toast or as is!'
        ]
      });
    }

    recipes.push({
      id: 'rec-3',
      title: 'Comforting 10-Minute Curd Rice with Mustard Tadka',
      prepTime: '8 mins',
      cost: 25,
      calories: 310,
      protein: 10,
      difficulty: 'Super Easy',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
      ingredients: [
        '1 cup Cooked soft rice (slightly mashed)',
        '3/4 cup Fresh thick curd (dahi)',
        '1/4 cup Milk (to prevent sourness)',
        '1/2 tsp Mustard seeds, hing (asafoetida) & ginger',
        'Optional: pomegranate arils or grated cucumber'
      ],
      steps: [
        'Mix warm/cool mashed rice with curd, milk, and salt until creamy.',
        'In a small tadka ladle, heat 1/2 tsp oil with mustard seeds, curry leaves, and grated ginger.',
        'Pour aromatic tadka over the curd rice and stir gently.',
        'Top with pomegranate seeds for a crunchy, sweet contrast.'
      ]
    });

    recipes.push({
      id: 'rec-4',
      title: 'Spiced Roasted Chickpeas & Tomato Chaat',
      prepTime: '7 mins',
      cost: 35,
      calories: 240,
      protein: 12,
      difficulty: 'Easy',
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80',
      ingredients: [
        '1 cup Boiled chickpeas / sundal',
        '1/2 cup Diced tomatoes, cucumber & onions',
        '1/2 tsp Chaat masala & roasted cumin powder',
        '1 tbsp Fresh lime juice & chopped mint'
      ],
      steps: [
        'Toss boiled chickpeas in a bowl with diced vegetables.',
        'Sprinkle chaat masala, rock salt, and squeeze fresh lime juice.',
        'Garnish with mint leaves. High in fiber, low fat and very filling.'
      ]
    });

    return recipes;
  }

  // AI Meal Nutrition Estimator
  static estimateMealNutrition(mealDescription: string): {
    detectedFood: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    confidence: string;
    healthyTip: string;
  } {
    const lower = mealDescription.toLowerCase();

    if (lower.includes('dosa') || lower.includes('idli') || lower.includes('sambar')) {
      return {
        detectedFood: 'South Indian Tiffin (Idli/Dosa with Sambar)',
        calories: 380,
        protein: 14,
        carbs: 62,
        fat: 8,
        confidence: '94% Match',
        healthyTip: 'Steamed idlis and lentil sambar give great fiber. Pair with a boiled egg or paneer to boost protein absorption.'
      };
    }

    if (lower.includes('biryani') || lower.includes('pulao')) {
      return {
        detectedFood: 'Aromatic Rice Dish (Biryani / Pulao)',
        calories: 560,
        protein: 21,
        carbs: 68,
        fat: 22,
        confidence: '91% Match',
        healthyTip: 'Enjoy mindfully! Having a bowl of cucumber raita or salad first helps moderate blood glucose response.'
      };
    }

    if (lower.includes('salad') || lower.includes('fruit') || lower.includes('sprout')) {
      return {
        detectedFood: 'Fresh Green Veggie & Sprout Bowl',
        calories: 220,
        protein: 11,
        carbs: 32,
        fat: 5,
        confidence: '96% Match',
        healthyTip: 'Excellent source of micronutrients and hydration. Add roasted seeds or curd for satiety.'
      };
    }

    if (lower.includes('roti') || lower.includes('chapati') || lower.includes('dal') || lower.includes('paneer')) {
      return {
        detectedFood: 'Whole Wheat Phulkas with Dal & Curry',
        calories: 430,
        protein: 19,
        carbs: 56,
        fat: 12,
        confidence: '93% Match',
        healthyTip: 'Whole grain goodness with balanced plant protein. Great staple for sustained afternoon focus.'
      };
    }

    return {
      detectedFood: mealDescription || 'Balanced Mixed Meal Plate',
      calories: 410,
      protein: 16,
      carbs: 54,
      fat: 13,
      confidence: '88% Estimated',
      healthyTip: 'Nutrient estimate calculated. Aim for half plate veggies, quarter plate protein, and quarter plate grains.'
    };
  }

  // AI LifeFlow Coach Q&A logic
  static getCoachResponse(userQuery: string, userProfile?: UserProfile): AIResponse {
    const q = userQuery.toLowerCase();

    if (q.includes('dinner') || q.includes('what should i eat')) {
      return {
        message: "For dinner tonight, let's keep it gentle on your digestive system so you sleep deeply! 🍲\n\nHow about **Moong Dal Khichdi** with a side of warm spiced curd (~390 kcal, 16g protein), or **2 Phulkas with Paneer Bhurji**? Both take under 20 minutes and cost under ₹60.",
        quickReplies: ['Show recipe for Khichdi', 'I want something lighter', 'What if I order outside?'],
        suggestedAction: {
          type: 'meal',
          title: 'Comfort Khichdi or Phulkas',
          details: 'Prep time: 18m • Protein: 16g • Sleep-friendly'
        }
      };
    }

    if (q.includes('only have eggs') || q.includes('eggs, rice') || q.includes('fridge')) {
      return {
        message: "That's more than enough for a fantastic 10-minute meal! 🍳🍚\n\nMake a quick **Masala Egg Scramble Tossed with Rice**:\n1. Heat 1 tsp ghee with mustard seeds and pinch of turmeric.\n2. Scramble 2 eggs softly.\n3. Fold in your rice with salt and black pepper.\n\nReady in 8 minutes, costs just ₹35, and packs ~18g of wholesome protein!",
        quickReplies: ['Save this recipe', 'I also have onions', 'Any veg alternatives?'],
        suggestedAction: {
          type: 'meal',
          title: 'Quick Masala Egg Rice',
          details: '8 mins • ₹35 • 18g Protein'
        }
      };
    }

    if (q.includes('10 minutes') || q.includes('only have 10 min') || q.includes('busy')) {
      return {
        message: "10 minutes is plenty to make a real difference today! ⏱️\n\nInstead of stressing over a long routine, choose one simple micro-win:\n• **10-minute full body reset** (Squats, wall push-ups, child's pose)\n• Or **a 10-minute post-meal walk** outside.\n\nRemember: 10 minutes done is infinitely better than an hour skipped!",
        quickReplies: ['Start 10-min workout', 'Log a 10-min walk', 'Suggest a 10-min quick meal'],
        suggestedAction: {
          type: 'workout',
          title: '10-Min Beginner Reset',
          details: '6 bodyweight exercises • No equipment needed'
        }
      };
    }

    if (q.includes('slept badly') || q.includes('tired') || q.includes('exhausted')) {
      return {
        message: "I hear you, and that is completely okay! On low-sleep days, your body needs grace, not punishment. 🛌✨\n\nToday's adjusted strategy:\n1. Skip heavy workouts—do 5 minutes of gentle neck & shoulder rolls.\n2. Hydrate with warm water and lemon or spiced buttermilk.\n3. Have an easy-to-digest lunch like curd rice or warm soup.\n4. Aim for lights out 30 minutes earlier tonight.",
        quickReplies: ['Activate Real-Life Mode', '5-Min Stretches', 'Set wind-down reminder'],
        suggestedAction: {
          type: 'habit',
          title: 'Real-Life Low Energy Adaptation',
          details: 'Plan simplified automatically to avoid burnout'
        }
      };
    }

    if (q.includes('outside') || q.includes('restaurant') || q.includes('eating out')) {
      return {
        message: "Enjoy your meal out! Food is meant to be enjoyed with family and friends. 🥘✨\n\nQuick mindful tips:\n• **South Indian:** Idli + Sambar or Rava Dosa with less chutney.\n• **North Indian:** Tandoori Roti with Dal Tadka or Paneer Tikka.\n• Drink a glass of water before eating, and enjoy every bite without guilt!",
        quickReplies: ['View Eating-Out Guide', 'Check Tamil Menu Choices', 'Check Cafe Choices']
      };
    }

    if (q.includes('cheap') || q.includes('budget') || q.includes('save money')) {
      return {
        message: "Healthy eating doesn't need fancy supplements or superfoods! Indian kitchen staples are nutritional powerhouses: 🌿\n\n• **Sprouts / Sundal:** ₹15 per serving, 12g protein.\n• **Eggs & Sambar:** ₹25 per meal, 14g protein.\n• **Roasted Makhana / Peanuts:** ₹20 healthy snack.\n• **Seasonal Green Poriyal & Curd:** ₹25 high fiber & probiotics.",
        quickReplies: ['Show budget grocery list', 'Cheap high protein ideas', 'Meal prep tips']
      };
    }

    // Default supportive response
    return {
      message: `I'm here to support your daily rhythm! Whether you need a quick recipe with whatever is in your kitchen, a gentle 5-minute stretch, or an adjustment because life got busy, just let me know. 💚\n\n*Note: LifeFlow offers lifestyle wellness guidance and is not medical advice.*`,
      quickReplies: ['What should I eat for dinner?', 'I only have 10 minutes', 'I ate outside today', 'Suggest a cheap healthy meal']
    };
  }
}
