import React, { useState } from 'react';
import { CheckSquare, Square, Plus, ShoppingBag, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GroceryItem } from '../../types';

export const GroceryList: React.FC = () => {
  const { groceries, toggleGroceryItem, addGroceryItem } = useApp();
  const [newItemName, setNewItemName] = useState('');
  const [category, setCategory] = useState<GroceryItem['category']>('Vegetables');
  const [quantity, setQuantity] = useState('1 unit');

  const categories: GroceryItem['category'][] = ['Vegetables', 'Fruits', 'Protein', 'Grains', 'Dairy', 'Other'];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    addGroceryItem(newItemName.trim(), category, quantity);
    setNewItemName('');
  };

  const totalItems = groceries.length;
  const checkedItems = groceries.filter(g => g.checked).length;

  return (
    <div className="bg-white rounded-3xl border border-cream-200 shadow-soft p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-cream-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sage-100 text-sage-800 uppercase tracking-wider">
              Smart Shopping
            </span>
          </div>
          <h3 className="font-display font-bold text-xl text-slate-900 mt-1 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-sage-600" />
            <span>Weekly Healthy Grocery List</span>
          </h3>
          <p className="text-xs text-slate-500">
            Auto-generated from your meal planner & staple pantry requirements.
          </p>
        </div>

        <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-sage-50 text-sage-800 border border-sage-200 shrink-0 self-start sm:self-auto">
          {checkedItems} / {totalItems} Items Acquired
        </div>
      </div>

      {/* Add Item Bar */}
      <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-cream-100/70 border border-cream-300">
        <input
          type="text"
          value={newItemName}
          onChange={e => setNewItemName(e.target.value)}
          placeholder="Item name (e.g. Ginger, Curry leaves)..."
          className="bg-white px-3 py-2 rounded-xl text-xs border border-cream-300 focus:outline-hidden focus:border-sage-500 sm:col-span-2"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value as any)}
          className="bg-white px-3 py-2 rounded-xl text-xs border border-cream-300 focus:outline-hidden focus:border-sage-500"
        >
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Item</span>
        </button>
      </form>

      {/* Categorized List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map(cat => {
          const itemsInCat = groceries.filter(g => g.category === cat);
          if (itemsInCat.length === 0) return null;

          return (
            <div key={cat} className="space-y-2.5 p-4 rounded-2xl bg-cream-50/60 border border-cream-200">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                {cat} ({itemsInCat.length})
              </span>

              <div className="space-y-1.5">
                {itemsInCat.map(item => (
                  <div
                    key={item.id}
                    onClick={() => toggleGroceryItem(item.id)}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer transition-all ${
                      item.checked
                        ? 'bg-sage-100/50 text-slate-400 line-through'
                        : 'bg-white text-slate-800 hover:bg-sage-50 border border-cream-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {item.checked ? (
                        <CheckSquare className="w-4 h-4 text-sage-600 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300 shrink-0" />
                      )}
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
