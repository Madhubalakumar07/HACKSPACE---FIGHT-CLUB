import React from 'react';
import { Moon, Bed, Sunrise, Sparkles, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const SleepStats: React.FC = () => {
  const sleepTrendData = [
    { day: 'Mon', hours: 7.2, quality: 'Good' },
    { day: 'Tue', hours: 6.8, quality: 'Fair' },
    { day: 'Wed', hours: 7.5, quality: 'Great' },
    { day: 'Thu', hours: 7.1, quality: 'Good' },
    { day: 'Fri', hours: 7.3, quality: 'Good' },
    { day: 'Sat', hours: 8.0, quality: 'Deep' },
    { day: 'Sun', hours: 7.2, quality: 'Good' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-cream-200 shadow-soft p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-cream-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 uppercase tracking-wider">
              Rest & Recovery
            </span>
          </div>
          <h3 className="font-display font-bold text-xl text-slate-900 mt-1 flex items-center gap-2">
            <Moon className="w-5 h-5 text-indigo-600" />
            <span>Sleep & Nightly Rhythm</span>
          </h3>
          <p className="text-xs text-slate-500">
            Consistent sleep times rejuvenate hormones, metabolism, and mood.
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200 shrink-0 self-start sm:self-auto">
          7.2h Weekly Average
        </span>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 space-y-1">
          <div className="flex items-center justify-between text-indigo-900">
            <span className="text-xs font-semibold">Sleep Duration</span>
            <Moon className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="font-display font-black text-2xl text-indigo-950">7h 10m</p>
          <span className="text-[10px] text-indigo-600 font-medium">Optimal target met (7-8h)</span>
        </div>

        <div className="bg-cream-100/80 p-4 rounded-2xl border border-cream-300 space-y-1">
          <div className="flex items-center justify-between text-slate-700">
            <span className="text-xs font-semibold">Bedtime</span>
            <Bed className="w-4 h-4 text-slate-600" />
          </div>
          <p className="font-display font-bold text-2xl text-slate-900">10:45 PM</p>
          <span className="text-[10px] text-slate-500 font-medium">Within 15m variance</span>
        </div>

        <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 space-y-1">
          <div className="flex items-center justify-between text-amber-900">
            <span className="text-xs font-semibold">Wake-up Time</span>
            <Sunrise className="w-4 h-4 text-amber-600" />
          </div>
          <p className="font-display font-bold text-2xl text-slate-900">5:55 AM</p>
          <span className="text-[10px] text-amber-700 font-medium">Natural sunlight exposure</span>
        </div>
      </div>

      {/* Sleep Trend Recharts Area */}
      <div className="space-y-2 pt-2">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          7-Day Sleep Duration Trend (Hours):
        </span>
        <div className="h-44 w-full bg-cream-50/50 p-2 rounded-2xl border border-cream-200">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sleepTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="sleepGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818CF8" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#818CF8" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} domain={[5, 9]} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  fontSize: '12px'
                }}
              />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="#6366F1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#sleepGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
