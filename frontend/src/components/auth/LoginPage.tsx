import React, { useState } from 'react';
import {
  Sparkles,
  Lock,
  Mail,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  Zap,
  Heart,
  ShieldCheck,
  ChevronRight,
  KeyRound,
  Compass,
  Smile,
  Flame,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserProfile } from '../../types';

export const LoginPage: React.FC<{ onNavigateHome?: () => void }> = ({ onNavigateHome }) => {
  const { login, register, setActiveTab, showToast } = useApp();

  const [mode, setMode] = useState<'signin' | 'signup' | 'otp'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Form states
  const [email, setEmail] = useState('suriya@lifeflow.ai');
  const [password, setPassword] = useState('lifeflow2026');
  const [name, setName] = useState('');
  const [dietaryPreference, setDietaryPreference] = useState<UserProfile['dietaryPreference']>('vegetarian');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  // 1-Click Demo Profiles for testing
  const demoProfiles = [
    {
      id: 'suriya',
      name: 'Suriya',
      email: 'suriya@lifeflow.ai',
      role: 'Eggetarian • Busy Professional',
      cuisines: ['South Indian', 'Tamil cuisine'],
      avatar: 'S',
      diet: 'eggetarian' as const,
      color: 'from-sage-600 to-emerald-700'
    },
    {
      id: 'abinaya',
      name: 'Abinaya',
      email: 'abinaya@lifeflow.ai',
      role: 'Pure Vegetarian • Student Schedule',
      cuisines: ['South Indian', 'Kerala', 'Tamil cuisine'],
      avatar: 'A',
      diet: 'vegetarian' as const,
      color: 'from-amber-600 to-orange-700'
    }
  ];

  const handleQuickDemoLogin = (profile: typeof demoProfiles[0]) => {
    setIsLoading(true);
    setTimeout(() => {
      login(profile.email, profile.name, {
        dietaryPreference: profile.diet,
        cuisines: profile.cuisines
      });
      setIsLoading(false);
    }, 450);
  };

  const handleGuestLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      login('guest@lifeflow.ai', 'Guest Member', {
        dietaryPreference: 'vegetarian'
      });
      setIsLoading(false);
    }, 400);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      showToast('Missing Fields', 'Please enter your email and password.', 'reminder');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const derivedName = email.split('@')[0];
      const capitalizedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
      login(email, capitalizedName);
      setIsLoading(false);
    }, 550);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) {
      showToast('Missing Fields', 'Please fill in your name and email address.', 'reminder');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      register({
        name,
        email,
        dietaryPreference,
        cuisines: ['South Indian', 'Tamil cuisine'],
        workoutTime: 10
      });
      setIsLoading(false);
    }, 600);
  };

  const handleSendOTP = () => {
    if (!email.trim()) {
      showToast('Enter Email/Phone', 'Please provide your email address to receive an instant login code.', 'reminder');
      return;
    }
    setOtpSent(true);
    setOtpCode('842190'); // Auto-fill demo OTP code
    showToast('OTP Code Sent 📲', 'Your demo login code is 842190 (auto-filled for you).');
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      const derivedName = email.includes('@') ? email.split('@')[0] : 'Member';
      login(email, derivedName.charAt(0).toUpperCase() + derivedName.slice(1));
      setIsLoading(false);
    }, 500);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    showToast('Password Reset Sent 📧', `Instructions have been sent to ${forgotEmail}.`);
    setIsForgotModalOpen(false);
    setForgotEmail('');
  };

  const handleSocialLogin = (provider: 'Google' | 'Apple') => {
    setIsLoading(true);
    setTimeout(() => {
      login(`user@${provider.toLowerCase()}.com`, `${provider} User`);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 flex flex-col justify-between selection:bg-sage-200">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-cream-200/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => (onNavigateHome ? onNavigateHome() : setActiveTab('landing'))}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sage-500 to-sage-700 flex items-center justify-center text-white shadow-md shadow-sage-600/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-emerald-100 animate-pulse-subtle" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xl text-slate-900 tracking-tight">LifeFlow</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-sage-100 text-sage-800 uppercase">AI</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Daily Lifestyle Rhythm</p>
            </div>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActiveTab('landing')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-cream-200/60 transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-slate-500" />
              <span>Explore Features</span>
            </button>
            <button
              onClick={handleGuestLogin}
              className="px-4 py-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-slate-800 text-xs font-bold transition-all"
            >
              Guest Demo
            </button>
          </div>
        </div>
      </header>

      {/* Main Login / Signup Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-12 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Visual Showcase & Brand Philosophy */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left hidden lg:block">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100/90 border border-sage-200 text-sage-900 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-sage-600 animate-pulse" />
              <span>Personalized AI Lifestyle Companion</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl text-slate-900 tracking-tight leading-[1.15]">
              Welcome Back to Your <br />
              <span className="text-gradient-sage">Healthier Daily Rhythm.</span>
            </h1>

            <p className="text-slate-600 text-base font-medium leading-relaxed max-w-lg">
              Sign in to access your customized 4 daily actions, fridge-to-recipe AI assistant, 5-minute adaptive workouts, and zero-guilt real-life adaptations.
            </p>

            {/* Feature Highlight Pills */}
            <div className="space-y-3 pt-2 max-w-md">
              <div className="p-4 rounded-2xl bg-white border border-cream-200 shadow-soft flex items-start gap-3.5 text-left">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-slate-900">Real-Life Mode Guarantee</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Missed a workout or ate out? The plan adjusts seamlessly without resetting your habit streak.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-cream-200 shadow-soft flex items-start gap-3.5 text-left">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-slate-900">Affordable Indian Nutrition</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Wholesome meals tailored to your budget (₹30–₹70/meal) and native ingredients.
                  </p>
                </div>
              </div>
            </div>

            {/* Philosophy Footer Pill */}
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>“Don't build a perfect life. Build a life you can actually live.”</span>
            </div>
          </div>

          {/* Right Column: Authentication Card */}
          <div className="lg:col-span-6 max-w-md w-full mx-auto">
            <div className="bg-white rounded-3xl border border-cream-300 shadow-soft-xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
              
              {/* Subtle top decorative glow */}
              <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 rounded-full bg-sage-200/40 blur-2xl pointer-events-none" />

              {/* Header Title & Switch Tabs */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display font-black text-2xl text-slate-900 tracking-tight">
                      {mode === 'signup' ? 'Create Account' : mode === 'otp' ? 'Magic Code Login' : 'Welcome Back'}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {mode === 'signup'
                        ? 'Join LifeFlow to build steady, lasting habits.'
                        : mode === 'otp'
                        ? 'Sign in securely with a one-time code.'
                        : 'Sign in to access your personalized daily plan.'}
                    </p>
                  </div>

                  <span className="w-10 h-10 rounded-2xl bg-sage-100 text-sage-700 flex items-center justify-center font-bold text-lg shadow-xs">
                    🌿
                  </span>
                </div>

                {/* Mode Selector Pill */}
                <div className="grid grid-cols-3 gap-1 bg-cream-100 p-1 rounded-2xl border border-cream-200 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className={`py-2 rounded-xl transition-all ${
                      mode === 'signin'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className={`py-2 rounded-xl transition-all ${
                      mode === 'signup'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Sign Up
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('otp')}
                    className={`py-2 rounded-xl transition-all ${
                      mode === 'otp'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    OTP Link
                  </button>
                </div>
              </div>

              {/* 1-Click Quick Demo Profiles Box */}
              <div className="p-3.5 bg-gradient-to-r from-cream-50 via-sage-50/50 to-cream-50 rounded-2xl border border-sage-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-sage-900 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-sage-600" />
                    1-Click Instant Demo Login
                  </span>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-sage-200 text-sage-700 font-bold">
                    Fast Test
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {demoProfiles.map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleQuickDemoLogin(p)}
                      disabled={isLoading}
                      className="p-2.5 rounded-xl bg-white hover:bg-sage-50 border border-cream-300 hover:border-sage-400 text-left transition-all shadow-xs flex items-center gap-2.5 group"
                    >
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${p.color} text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs`}>
                        {p.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{p.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{p.diet}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  disabled={isLoading}
                  className="py-2.5 px-3 rounded-2xl bg-white hover:bg-cream-50 border border-cream-300 text-xs font-bold text-slate-700 flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                    <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.1s.7 5.4 1.9 7.8l3.7-2.9z" />
                    <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialLogin('Apple')}
                  disabled={isLoading}
                  className="py-2.5 px-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.62-.76 1.04-1.81.92-2.87-.9.04-1.99.6-2.63 1.36-.58.67-.99 1.74-.85 2.78 1 .08 2.03-.51 2.56-1.27z" />
                  </svg>
                  <span>Apple ID</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="border-t border-cream-200 w-full" />
                <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">
                  or continue with email
                </span>
              </div>

              {/* MODE 1: Standard Sign In */}
              {mode === 'signin' && (
                <form onSubmit={handleSignInSubmit} className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full bg-cream-50 border border-cream-300 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-sage-500 focus:bg-white transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700">Password</label>
                      <button
                        type="button"
                        onClick={() => {
                          setForgotEmail(email);
                          setIsForgotModalOpen(true);
                        }}
                        className="text-[11px] font-bold text-sage-700 hover:text-sage-900"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-cream-50 border border-cream-300 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-sage-500 focus:bg-white transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={e => setRememberMe(e.target.checked)}
                        className="w-4 h-4 accent-sage-600 rounded-md cursor-pointer"
                      />
                      <span>Keep me signed in</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-2xl bg-sage-600 hover:bg-sage-700 disabled:opacity-50 text-white text-xs font-extrabold shadow-md shadow-sage-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Signing In...</span>
                      </span>
                    ) : (
                      <>
                        <span>Sign In to LifeFlow</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* MODE 2: Sign Up / New Registration */}
              {mode === 'signup' && (
                <form onSubmit={handleSignUpSubmit} className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Abinaya Kumar"
                        className="w-full bg-cream-50 border border-cream-300 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-sage-500 focus:bg-white transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="abinaya@example.com"
                        className="w-full bg-cream-50 border border-cream-300 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-sage-500 focus:bg-white transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Create Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full bg-cream-50 border border-cream-300 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-sage-500 focus:bg-white transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Dietary Preference Quick Select */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Dietary Preference</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'vegetarian', label: '🥗 Pure Vegetarian' },
                        { id: 'eggetarian', label: '🍳 Eggetarian' },
                        { id: 'non_vegetarian', label: '🍗 Non-Vegetarian' },
                        { id: 'vegan', label: '🌱 Vegan' }
                      ].map(item => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setDietaryPreference(item.id as any)}
                          className={`p-2 rounded-xl text-xs font-semibold text-left border transition-all ${
                            dietaryPreference === item.id
                              ? 'bg-sage-600 border-sage-600 text-white shadow-xs'
                              : 'bg-cream-50 border-cream-200 text-slate-700 hover:bg-cream-100'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-extrabold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Creating Your Plan...</span>
                      </span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Create My Account</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* MODE 3: One-Time Password / Magic Link */}
              {mode === 'otp' && (
                <form onSubmit={handleVerifyOTP} className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email or Mobile Number
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter email or 10-digit mobile..."
                        className="flex-1 bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-sage-500 focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleSendOTP}
                        className="px-3.5 py-2.5 rounded-xl bg-cream-200 hover:bg-cream-300 text-slate-800 text-xs font-bold shrink-0 transition-colors"
                      >
                        {otpSent ? 'Resend' : 'Send Code'}
                      </button>
                    </div>
                  </div>

                  {otpSent && (
                    <div className="space-y-2 animate-fadeIn">
                      <label className="block text-xs font-bold text-slate-700">
                        Enter 6-Digit Code
                      </label>
                      <input
                        type="text"
                        value={otpCode}
                        onChange={e => setOtpCode(e.target.value)}
                        maxLength={6}
                        placeholder="842190"
                        className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-3 text-center tracking-widest font-mono text-base font-bold text-slate-900 focus:outline-hidden focus:border-sage-500"
                        required
                      />
                      <p className="text-[11px] text-emerald-700 font-medium text-center">
                        Demo instant OTP auto-filled for fast testing!
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading || !otpCode.trim()}
                    className="w-full py-3 rounded-2xl bg-sage-600 hover:bg-sage-700 disabled:opacity-40 text-white text-xs font-extrabold shadow-md shadow-sage-600/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>Verify Code & Sign In</span>
                  </button>
                </form>
              )}

              {/* Health and Safety Micro Disclaimer */}
              <div className="pt-2 border-t border-cream-200 text-center">
                <p className="text-[10px] text-slate-400 font-medium">
                  By signing in, you agree to LifeFlow’s lifestyle terms. General wellness suggestions only; not medical advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div
            className="bg-white rounded-3xl max-w-md w-full border border-cream-200 shadow-2xl p-6 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-10 rounded-2xl bg-sage-100 text-sage-700 flex items-center justify-center shadow-xs">
              <Mail className="w-5 h-5" />
            </div>

            <h3 className="font-display font-bold text-lg text-slate-900">
              Reset Your Password
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Enter your registered email address and we'll send you an instant link to recover your account without losing your streaks.
            </p>

            <form onSubmit={handleForgotPasswordSubmit} className="space-y-3">
              <input
                type="email"
                value={forgotEmail}
                onChange={e => setForgotEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full bg-cream-50 border border-cream-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-sage-500"
                required
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold shadow-xs"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="px-4 sm:px-8 py-6 border-t border-cream-300 text-center text-xs text-slate-500 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px] text-slate-500">© 2026 LifeFlow AI • Designed for Health & AI Hackathon</p>
        <div className="flex items-center gap-4 text-[11px] text-slate-500 font-medium">
          <button onClick={() => setActiveTab('landing')} className="hover:text-slate-900">Landing Page</button>
          <button onClick={handleGuestLogin} className="hover:text-slate-900">Guest Access</button>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-sage-600" />
            <span>Secure SSL Session</span>
          </span>
        </div>
      </footer>
    </div>
  );
};
