import React, { useState } from 'react';
import { Camera, Sparkles, ChefHat, Plus, X, Clock, IndianRupee, Flame, Check, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FridgeToRecipe: React.FC = () => {
  const { fridgeRecipes, generateFridgeRecipes } = useApp();

  const [availableIngredients, setAvailableIngredients] = useState<string[]>([
    'Eggs',
    'Cooked Rice',
    'Onions',
    'Tomatoes',
    'Green Chili',
    'Curd / Yogurt'
  ]);
  const [newIngredient, setNewIngredient] = useState('');
  const [isPhotoScanning, setIsPhotoScanning] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);

  const handleAddIngredient = () => {
    if (!newIngredient.trim()) return;
    if (!availableIngredients.includes(newIngredient.trim())) {
      const updated = [...availableIngredients, newIngredient.trim()];
      setAvailableIngredients(updated);
      generateFridgeRecipes(updated);
    }
    setNewIngredient('');
  };

  const handleRemoveIngredient = (ing: string) => {
    const updated = availableIngredients.filter(i => i !== ing);
    setAvailableIngredients(updated);
    generateFridgeRecipes(updated);
  };

  const handleSimulatePhotoUpload = () => {
    setIsPhotoScanning(true);
    setTimeout(() => {
      const detected = ['Fresh Eggs', 'Boiled Chickpeas', 'Spinach', 'Onions', 'Curd'];
      setAvailableIngredients(detected);
      generateFridgeRecipes(detected);
      setIsPhotoScanning(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Smart Fridge Banner */}
      <div className="bg-gradient-to-br from-amber-50 via-cream-100 to-sage-50/70 p-6 sm:p-7 rounded-3xl border border-amber-200/80 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-200/70 text-amber-900 text-[11px] font-bold uppercase tracking-wider">
                Fridge-to-Recipe AI
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
              What’s in your fridge today?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Don't let ingredients go to waste. Tell us what you have or upload a picture, and our AI will suggest instant healthy recipes.
            </p>
          </div>

          <button
            onClick={handleSimulatePhotoUpload}
            disabled={isPhotoScanning}
            className="px-5 py-3 rounded-2xl bg-white hover:bg-cream-50 border border-amber-300 text-amber-900 text-xs font-bold shadow-sm flex items-center gap-2 transition-all hover:scale-102 active:scale-98 shrink-0 self-start md:self-center"
          >
            <Camera className="w-4 h-4 text-amber-600" />
            <span>{isPhotoScanning ? 'Scanning Fridge Photo...' : 'Scan Fridge Photo'}</span>
          </button>
        </div>

        {/* Tag Input & Pills */}
        <div className="mt-5 pt-4 border-t border-amber-200/60 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Available Ingredients:</span>
            {availableIngredients.map((ing) => (
              <span
                key={ing}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-cream-300 text-slate-800 text-xs font-semibold shadow-xs"
              >
                <span>{ing}</span>
                <button
                  onClick={() => handleRemoveIngredient(ing)}
                  className="hover:text-rose-500 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          {/* Quick Input Bar */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleAddIngredient();
            }}
            className="flex items-center gap-2 max-w-md"
          >
            <input
              type="text"
              value={newIngredient}
              onChange={e => setNewIngredient(e.target.value)}
              placeholder="Type ingredient (e.g., spinach, paneer, carrots)..."
              className="flex-1 bg-white px-3.5 py-2 rounded-xl text-xs border border-cream-300 focus:outline-hidden focus:border-sage-500 shadow-xs"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </form>
        </div>
      </div>

      {/* Suggested Recipes Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>AI Suggested Healthy Recipes</span>
          </h3>
          <p className="text-xs text-slate-500">Quick, low-cost options using your listed ingredients.</p>
        </div>
        <span className="text-xs font-semibold text-sage-700 bg-sage-50 px-2.5 py-1 rounded-full border border-sage-200">
          {fridgeRecipes.length} Recipes Ready
        </span>
      </div>

      {/* Recipes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fridgeRecipes.map(recipe => {
          const isExpanded = selectedRecipe === recipe.id;

          return (
            <div
              key={recipe.id}
              className="bg-white rounded-3xl border border-cream-200 shadow-soft hover:shadow-soft-lg transition-all overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold shadow-xs">
                    {recipe.difficulty}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-xl bg-emerald-500/90 text-white text-xs font-bold shadow-xs">
                    ₹{recipe.cost} Est.
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="font-display font-bold text-base leading-tight">
                    {recipe.title}
                  </h4>
                </div>
              </div>

              <div className="p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-cream-100">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {recipe.prepTime}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    ~{recipe.calories} kcal
                  </span>
                  <span className="font-bold text-emerald-700">
                    {recipe.protein}g Protein
                  </span>
                </div>

                {/* Recipe Ingredients & Steps Drawer */}
                {isExpanded ? (
                  <div className="space-y-3 pt-2 text-xs text-slate-700 animate-fadeIn">
                    <div>
                      <span className="font-bold text-slate-900 block mb-1">Key Ingredients:</span>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                        {recipe.ingredients.map((ing, i) => (
                          <li key={i}>{ing}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="font-bold text-slate-900 block mb-1">Simple Steps:</span>
                      <ol className="list-decimal list-inside space-y-1 text-slate-600">
                        {recipe.steps.map((st, i) => (
                          <li key={i} className="leading-normal">{st}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {recipe.ingredients.join(', ')}
                  </p>
                )}

                <button
                  onClick={() => setSelectedRecipe(isExpanded ? null : recipe.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                    isExpanded
                      ? 'bg-cream-200 text-slate-800 hover:bg-cream-300'
                      : 'bg-sage-600 hover:bg-sage-700 text-white shadow-xs'
                  }`}
                >
                  <ChefHat className="w-4 h-4" />
                  <span>{isExpanded ? 'Hide Steps' : 'View Cooking Steps'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
