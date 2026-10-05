import React, { useState } from 'react';
import { Users, Heart, Sparkles, Footprints, CheckCircle2, UserPlus, Send, Flame, Trophy } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FamilyDashboard: React.FC = () => {
  const { familyMembers, sendFamilyEncouragement, showToast } = useApp();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    showToast('Invitation Sent! 💌', `Invited ${inviteEmail} to your Family Wellness Circle.`);
    setInviteEmail('');
    setShowInviteModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-cream-200 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
              Family & Friends
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-slate-900 mt-1 flex items-center gap-2">
            <Users className="w-6 h-6 text-sage-600" />
            <span>My Family Wellness Circle</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Support each other with gentle daily consistency rather than stressful competition.
          </p>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold shadow-md shadow-sage-600/20 flex items-center gap-1.5 transition-all shrink-0 self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Family Member</span>
        </button>
      </div>

      {/* Shared Active Gentle Challenge Card */}
      <div className="bg-gradient-to-br from-amber-50 via-cream-100 to-sage-50 p-6 sm:p-7 rounded-3xl border border-amber-200 shadow-soft space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Trophy className="w-3 h-3 text-amber-700" />
                Active Shared Challenge
              </span>
              <span className="text-xs text-amber-800 font-semibold">Day 6 of 7</span>
            </div>
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900">
              7-Day Family Walking Challenge 🚶‍♀️
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              Goal: Each person completes at least a 10-minute walk daily. No speed records needed!
            </p>
          </div>

          <div className="bg-white/80 p-3 rounded-2xl border border-cream-300 text-center shrink-0 self-start sm:self-auto">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Group Streak</span>
            <span className="font-display font-black text-xl text-amber-600 flex items-center justify-center gap-1">
              <Flame className="w-5 h-5 fill-amber-500 text-amber-500" /> 6 Days
            </span>
          </div>
        </div>

        {/* Member Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {familyMembers.map(member => {
            const pct = Math.round((member.challengeProgress / 7) * 100);

            return (
              <div
                key={member.id}
                className="bg-white p-4 rounded-2xl border border-cream-200 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover border border-cream-300"
                  />
                  <div>
                    <h4 className="font-display font-bold text-xs text-slate-900">{member.name}</h4>
                    <span className="text-[10px] text-slate-500 capitalize">{member.role}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-slate-700">
                    <span>{member.challengeProgress} / 7 Days</span>
                    <span className="text-sage-700">{pct}%</span>
                  </div>
                  <div className="w-full bg-cream-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-sage-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">
                    👣 {member.stepsToday.toLocaleString()} steps today
                  </span>

                  {member.role !== 'You' && (
                    <button
                      onClick={() => sendFamilyEncouragement(member.id)}
                      disabled={member.encouragementSentToday}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all ${
                        member.encouragementSentToday
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-cream-100 hover:bg-sage-100 text-slate-700 hover:text-sage-900 border border-cream-300'
                      }`}
                    >
                      <Heart className={`w-3 h-3 ${member.encouragementSentToday ? 'text-emerald-600 fill-emerald-600' : 'text-slate-400'}`} />
                      <span>{member.encouragementSentToday ? 'Cheered 🙌' : 'Cheer'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shared Habits & Recipes Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-3xl border border-cream-200 shadow-soft p-5 sm:p-6 space-y-4">
          <h4 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Shared Family Meal Goals</span>
          </h4>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-cream-50 rounded-2xl border border-cream-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Sunday Family Khichdi & Salad Night</p>
                <p className="text-[11px] text-slate-500">Mom preparing vegetable dal khichdi for everyone</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                Active
              </span>
            </div>

            <div className="p-3 bg-cream-50 rounded-2xl border border-cream-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">No Sugary Drinks on Weekday Evenings</p>
                <p className="text-[11px] text-slate-500">Swapped to fresh spiced buttermilk (neer mor)</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                5/5 days
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-cream-200 shadow-soft p-5 sm:p-6 space-y-4">
          <h4 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Family Encouragement Feed</span>
          </h4>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-sage-50/70 rounded-2xl border border-sage-200 space-y-1">
              <span className="font-bold text-slate-900">Mom (Radha) completed her evening walk!</span>
              <p className="text-slate-600">“Walked in the park with Dad for 15 minutes.”</p>
              <span className="text-[10px] text-slate-400 block pt-0.5">30 mins ago</span>
            </div>

            <div className="p-3 bg-cream-50 rounded-2xl border border-cream-200 space-y-1">
              <span className="font-bold text-slate-900">Dad (Kannan) drank 8 glasses of water</span>
              <p className="text-slate-600">“Kept the copper bottle on my desk today!”</p>
              <span className="text-[10px] text-slate-400 block pt-0.5">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div
            className="bg-white rounded-3xl max-w-md w-full border border-cream-200 shadow-2xl p-6 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-display font-bold text-xl text-slate-900">
              Invite to Family Wellness Circle
            </h3>
            <p className="text-xs text-slate-500">
              Share gentle daily goals, group walking challenges, and wholesome meal recipes.
            </p>

            <form onSubmit={handleInvite} className="space-y-3">
              <input
                type="email"
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                placeholder="Enter family member's email..."
                className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:border-sage-500"
                required
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Invite</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
