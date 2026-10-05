import React, { useState } from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  Utensils,
  Dumbbell,
  CheckSquare,
  MoreHorizontal,
  Moon,
  TrendingUp,
  Users,
  Settings,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BottomNavigation: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const mainTabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'plan', label: 'My Plan', icon: CalendarCheck },
    { id: 'food', label: 'Food', icon: Utensils },
    { id: 'fitness', label: 'Fitness', icon: Dumbbell },
    { id: 'habits', label: 'Habits', icon: CheckSquare },
  ];

  const moreTabs = [
    { id: 'sleep', label: 'Sleep & Mind', icon: Moon, desc: 'Wind-down routines & breathing' },
    { id: 'progress', label: 'Weekly Progress', icon: TrendingUp, desc: 'Overview & reflections' },
    { id: 'family', label: 'Family & Groups', icon: Users, desc: 'Gentle shared challenges' },
    { id: 'settings', label: 'Profile & Settings', icon: Settings, desc: 'Diet, schedule & preferences' },
  ];

  return (
    <>
      {/* More Menu Bottom Drawer */}
      {showMoreMenu && (
        <div
          className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 animate-fadeIn"
          onClick={() => setShowMoreMenu(false)}
        >
          <div
            className="absolute bottom-16 inset-x-0 bg-white rounded-t-3xl p-5 border-t border-cream-200 shadow-2xl space-y-3"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-cream-100">
              <span className="font-display font-semibold text-slate-900 text-sm">More Lifestyle Spaces</span>
              <button
                onClick={() => setShowMoreMenu(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {moreTabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setShowMoreMenu(false);
                    }}
                    className={`p-3 rounded-2xl text-left border transition-all flex flex-col gap-1.5 ${
                      isActive
                        ? 'bg-sage-50 border-sage-400 text-sage-900'
                        : 'bg-cream-50 border-cream-200 text-slate-700 hover:bg-cream-100'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-sage-700' : 'text-slate-500'}`} />
                    <p className="text-xs font-bold leading-tight">{tab.label}</p>
                    <p className="text-[10px] text-slate-400 leading-tight">{tab.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-lg border-t border-cream-200/80 z-40 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-around">
          {mainTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowMoreMenu(false);
                }}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                  isActive ? 'text-sage-700 font-semibold' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-sage-600' : ''}`} />
                <span className="text-[10px] mt-0.5">{tab.label}</span>
                {isActive && <span className="w-1 h-1 rounded-full bg-sage-600 mt-0.5" />}
              </button>
            );
          })}

          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
              showMoreMenu || moreTabs.some(t => t.id === activeTab)
                ? 'text-sage-700 font-semibold'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <MoreHorizontal className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">More</span>
          </button>
        </div>
      </nav>
    </>
  );
};
