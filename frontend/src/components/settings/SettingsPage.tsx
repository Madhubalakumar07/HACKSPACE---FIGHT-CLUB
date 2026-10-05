import React, { useState } from 'react';
import {
  Settings,
  User,
  Utensils,
  Dumbbell,
  Moon,
  Watch,
  ShieldCheck,
  Save,
  Sparkles,
  Bell,
  CheckCircle2,
  LogOut,
  KeyRound,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserProfile } from '../../types';

export const SettingsPage: React.FC = () => {
  const { userProfile, updateUserProfile, logout, setActiveTab } = useApp();

  const [formData, setFormData] = useState<UserProfile>(userProfile);
  const [wearableConnected, setWearableConnected] = useState({
    appleHealth: true,
    googleFit: false,
    fitbit: false
  });

  const cuisineOptions = [
    'South Indian',
    'Tamil cuisine',
    'Kerala',
    'Andhra',
    'Karnataka',
    'North Indian',
    'Gujarati',
    'Bengali'
  ];

  const handleCuisineToggle = (c: string) => {
    setFormData(prev => ({
      ...prev,
      cuisines: prev.cuisines.includes(c)
        ? prev.cuisines.filter(item => item !== c)
        : [...prev.cuisines, c]
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(formData);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-cream-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sage-100 text-sage-800 text-[11px] font-bold uppercase tracking-wider">
              Customization
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-slate-900 mt-1 flex items-center gap-2">
            <Settings className="w-6 h-6 text-slate-700" />
            <span>Profile & Lifestyle Settings</span>
          </h2>
          <p className="text-xs text-slate-500">
            Tune LifeFlow to adapt seamlessly around your schedule, culture, and dietary needs.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold shadow-md shadow-sage-600/20 flex items-center gap-1.5 transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Details */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-cream-200 shadow-soft space-y-4">
          <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2 pb-2 border-b border-cream-100">
            <User className="w-4 h-4 text-sage-600" />
            <span>Personal Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-sage-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Age Range</label>
              <select
                value={formData.ageRange}
                onChange={e => setFormData({ ...formData, ageRange: e.target.value })}
                className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-sage-500"
              >
                <option value="18-24">18–24 years</option>
                <option value="25-34">25–34 years</option>
                <option value="35-49">35–49 years</option>
                <option value="50+">50+ years</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Daily Schedule Type</label>
              <select
                value={formData.dailySchedule}
                onChange={e => setFormData({ ...formData, dailySchedule: e.target.value as any })}
                className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-sage-500"
              >
                <option value="busy">Busy & Fast-Paced</option>
                <option value="moderate">Moderate & Balanced</option>
                <option value="relaxed">Relaxed & Flexible</option>
                <option value="shift_work">Shift / Night Work</option>
              </select>
            </div>
          </div>
        </div>

        {/* Food & Cultural Preferences */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-cream-200 shadow-soft space-y-4">
          <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2 pb-2 border-b border-cream-100">
            <Utensils className="w-4 h-4 text-emerald-600" />
            <span>Food & Regional Cuisine Preferences</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Dietary Preference</label>
              <select
                value={formData.dietaryPreference}
                onChange={e => setFormData({ ...formData, dietaryPreference: e.target.value as any })}
                className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-sage-500"
              >
                <option value="vegetarian">Vegetarian</option>
                <option value="eggetarian">Eggetarian</option>
                <option value="non_vegetarian">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Typical Food Budget</label>
              <select
                value={formData.foodBudget}
                onChange={e => setFormData({ ...formData, foodBudget: e.target.value as any })}
                className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-sage-500"
              >
                <option value="budget">Budget-Conscious (₹30–₹70 / meal)</option>
                <option value="moderate">Moderate (₹70–₹150 / meal)</option>
                <option value="flexible">Flexible / Gourmet</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Favorite Regional Cuisines</label>
            <div className="flex flex-wrap gap-2">
              {cuisineOptions.map(c => {
                const isSelected = formData.cuisines.includes(c);
                return (
                  <button
                    type="button"
                    key={c}
                    onClick={() => handleCuisineToggle(c)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-sage-600 border-sage-600 text-white shadow-xs'
                        : 'bg-cream-50 border-cream-300 text-slate-700 hover:bg-cream-100'
                    }`}
                  >
                    {c} {isSelected ? '✓' : '+'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Fitness Preferences */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-cream-200 shadow-soft space-y-4">
          <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2 pb-2 border-b border-cream-100">
            <Dumbbell className="w-4 h-4 text-sage-600" />
            <span>Fitness & Activity Settings</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Default Available Workout Time</label>
              <select
                value={formData.workoutTime}
                onChange={e => setFormData({ ...formData, workoutTime: Number(e.target.value) as any })}
                className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-sage-500"
              >
                <option value="5">5 Minutes (Micro-boost)</option>
                <option value="10">10 Minutes (Standard Reset)</option>
                <option value="20">20 Minutes (Full Flow)</option>
                <option value="30">30 Minutes (Deep Session)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Primary Workout Spot</label>
              <select
                value={formData.workoutLocation}
                onChange={e => setFormData({ ...formData, workoutLocation: e.target.value as any })}
                className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-sage-500"
              >
                <option value="home">Home / Living Room</option>
                <option value="outdoors">Outdoors / Park</option>
                <option value="gym">Gym</option>
              </select>
            </div>
          </div>
        </div>

        {/* Connected Wearables */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-cream-200 shadow-soft space-y-4">
          <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2 pb-2 border-b border-cream-100">
            <Watch className="w-4 h-4 text-sky-600" />
            <span>Connected Wearables & Health Sync (Mock)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Apple Health</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Synced (4,230 steps)</span>
              </div>
              <input
                type="checkbox"
                checked={wearableConnected.appleHealth}
                onChange={() => setWearableConnected({ ...wearableConnected, appleHealth: !wearableConnected.appleHealth })}
                className="w-4 h-4 accent-sage-600 rounded-md"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Google Fit</span>
                <span className="text-[10px] text-slate-400">Available</span>
              </div>
              <input
                type="checkbox"
                checked={wearableConnected.googleFit}
                onChange={() => setWearableConnected({ ...wearableConnected, googleFit: !wearableConnected.googleFit })}
                className="w-4 h-4 accent-sage-600 rounded-md"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Fitbit / Garmin</span>
                <span className="text-[10px] text-slate-400">Available</span>
              </div>
              <input
                type="checkbox"
                checked={wearableConnected.fitbit}
                onChange={() => setWearableConnected({ ...wearableConnected, fitbit: !wearableConnected.fitbit })}
                className="w-4 h-4 accent-sage-600 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Account & Profile Security */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-cream-200 shadow-soft space-y-4">
          <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2 pb-2 border-b border-cream-100">
            <KeyRound className="w-4 h-4 text-slate-700" />
            <span>Account & Access</span>
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-cream-50 border border-cream-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sage-200 border border-sage-300 flex items-center justify-center font-bold text-sage-800 text-sm">
                {userProfile.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{userProfile.name}</p>
                <p className="text-[11px] text-slate-500">{userProfile.email || `${userProfile.name.toLowerCase()}@lifeflow.ai`}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="px-4 py-2 rounded-xl bg-white hover:bg-cream-100 border border-cream-300 text-slate-700 text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5 text-slate-500" />
                <span>Switch Account</span>
              </button>
              <button
                type="button"
                onClick={logout}
                className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-600" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Formal Non-Medical Disclaimer Card */}
        <div className="p-5 rounded-3xl bg-amber-50/90 border border-amber-200/90 flex items-start gap-3.5">
          <ShieldCheck className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-display font-bold text-sm text-amber-950">
              Health & Safety Disclaimer
            </h4>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              “LifeFlow provides general lifestyle guidance and is not a medical diagnosis or treatment tool. If you have a medical condition, injury, food allergy, or specific clinical health concern, always consult a qualified healthcare professional before making substantial diet or exercise changes.”
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-3 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold shadow-md shadow-sage-600/20 flex items-center gap-2 transition-all hover:scale-102"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
