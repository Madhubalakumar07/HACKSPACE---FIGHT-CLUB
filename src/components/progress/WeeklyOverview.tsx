import React from 'react';
import { TrendingUp, Utensils, Dumbbell, CheckSquare, Moon, Smile, Footprints } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const WeeklyOverview: React.FC = () => {
  const weeklyActivityData = [
    { day: 'Mon', steps: 6200, habitsDone: 3, mealsLogged: 3 },
    { day: 'Tue', steps: 5400, habitsDone: 2, mealsLogged: 3 },
    { day: 'Wed', steps: 7100, habitsDone: 3, mealsLogged: 4 },
    { day: 'Thu', habitsDone: 3, steps: 6800, mealsLogged: 4 },
    { day: 'Fri', habitsDone: 3, steps: 4230, mealsLogged: 2 },
    { day: 'Sat', habitsDone: 2, steps: 5900, mealsLogged: 3 },
    { day: 'Sun', habitsDone: 3, steps: 6400, mealsLogged: 3 },
  ];

  return (
    <div className="space-y-6">
      {/* 6 Key Stat Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-cream-200 shadow-soft">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-semibold">Meals Logged</span>
            <Utensils className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <p className="font-display font-extrabold text-xl text-slate-900">22 / 28</p>
          <span className="text-[10px] text-emerald-600 font-bold">78% consistent</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-cream-200 shadow-soft">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-semibold">Workouts</span>
            <Dumbbell className="w-3.5 h-3.5 text-sage-600" />
          </div>
          <p className="font-display font-extrabold text-xl text-slate-900">5 Days</p>
          <span className="text-[10px] text-sage-700 font-bold">Short & regular</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-cream-200 shadow-soft">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-semibold">Habits</span>
            <CheckSquare className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <p className="font-display font-extrabold text-xl text-slate-900">19 / 21</p>
          <span className="text-[10px] text-amber-600 font-bold">90% target</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-cream-200 shadow-soft">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-semibold">Avg Sleep</span>
            <Moon className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <p className="font-display font-extrabold text-xl text-slate-900">7.2 hrs</p>
          <span className="text-[10px] text-indigo-600 font-bold">Optimal curve</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-cream-200 shadow-soft">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-semibold">Mood Trend</span>
            <Smile className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <p className="font-display font-extrabold text-xl text-slate-900">😊 85%</p>
          <span className="text-[10px] text-emerald-600 font-bold">Calm & positive</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-cream-200 shadow-soft">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-semibold">Total Steps</span>
            <Footprints className="w-3.5 h-3.5 text-sky-500" />
          </div>
          <p className="font-display font-extrabold text-xl text-slate-900">42,030</p>
          <span className="text-[10px] text-sky-600 font-bold">~6k / day avg</span>
        </div>
      </div>

      {/* Recharts Bar Chart: Daily Steps & Activity */}
      <div className="bg-white rounded-3xl border border-cream-200 shadow-soft p-5 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sage-600" />
              <span>Weekly Movement & Step Activity</span>
            </h3>
            <p className="text-xs text-slate-500">
              Daily steps tracked without rigid quotas or stressful penalties.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-sage-800">
              <span className="w-3 h-3 rounded-md bg-sage-600" /> Daily Steps
            </span>
          </div>
        </div>

        <div className="h-60 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyActivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1EFE9" />
              <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="steps" fill="#4E8C6D" radius={[6, 6, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
