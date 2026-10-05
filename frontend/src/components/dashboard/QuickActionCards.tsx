import React from 'react';
import { UtensilsCrossed, Dumbbell, Wind, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickActionCards: React.FC = () => {
  const { setActiveTab, setBreathingSessionActive } = useApp();

  const cards = [
    {
      id: 'fridge',
      title: "What's in your fridge?",
      desc: 'Get smart recipes from ingredients on hand',
      tag: 'Smart Cook',
      icon: UtensilsCrossed,
      color: 'from-amber-500/10 to-orange-500/10 text-amber-800 border-amber-200/80',
      iconColor: 'bg-amber-100 text-amber-700',
      onClick: () => setActiveTab('food')
    },
    {
      id: 'energy-wo',
      title: 'Move Your Way',
      desc: '5, 10, or 20 min workouts adapted to your energy',
      tag: 'Energy Fit',
      icon: Dumbbell,
      color: 'from-emerald-500/10 to-teal-500/10 text-emerald-900 border-emerald-200/80',
      iconColor: 'bg-emerald-100 text-emerald-700',
      onClick: () => setActiveTab('fitness')
    },
    {
      id: 'breathing',
      title: '2-Min Breathing Reset',
      desc: 'Inhale • Hold • Exhale to clear work stress',
      tag: 'Calm Mind',
      icon: Wind,
      color: 'from-sky-500/10 to-indigo-500/10 text-sky-900 border-sky-200/80',
      iconColor: 'bg-sky-100 text-sky-700',
      onClick: () => {
        setActiveTab('sleep');
        setBreathingSessionActive(true);
      }
    },
    {
      id: 'eating-out',
      title: 'Eating Out Today?',
      desc: 'Gentle restaurant choices without food guilt',
      tag: 'Social Meals',
      icon: MapPin,
      color: 'from-rose-500/10 to-pink-500/10 text-rose-900 border-rose-200/80',
      iconColor: 'bg-rose-100 text-rose-700',
      onClick: () => setActiveTab('food')
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      {cards.map(card => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            onClick={card.onClick}
            className={`p-4 rounded-3xl bg-gradient-to-br ${card.color} border shadow-soft hover:shadow-soft-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-2xl ${card.iconColor} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded-full border border-black/5">
                  {card.tag}
                </span>
              </div>
              <h3 className="font-display font-bold text-sm text-slate-900 leading-snug">
                {card.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-normal font-medium">
                {card.desc}
              </p>
            </div>

            <div className="pt-3 mt-2 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-slate-900">
              <span>Explore</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
