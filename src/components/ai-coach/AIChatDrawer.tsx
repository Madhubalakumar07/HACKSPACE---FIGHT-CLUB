import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Bot,
  Mic,
  Camera,
  Paperclip,
  ShieldCheck,
  Zap,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AIChatDrawer: React.FC = () => {
  const {
    isAIChatOpen,
    setIsAIChatOpen,
    chatMessages,
    sendUserMessage,
    setActiveTab,
    setIsRealLifeModalOpen
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'What should I eat for dinner?',
    'I only have eggs, rice and vegetables.',
    'I have only 10 minutes today.',
    'I slept badly last night.',
    'Suggest a cheap healthy meal.',
    'I am eating outside today.',
    'What can I do instead of my workout?'
  ];

  useEffect(() => {
    if (isAIChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAIChatOpen]);

  if (!isAIChatOpen) return null;

  const handleSend = (text?: string) => {
    const msg = text || inputVal;
    if (!msg.trim()) return;
    sendUserMessage(msg.trim());
    setInputVal('');
  };

  const handleVoiceSim = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      sendUserMessage('I feel a bit stressed and only have 10 minutes for movement today.');
    }, 1800);
  };

  const handlePhotoSim = () => {
    setIsSimulatingUpload(true);
    setTimeout(() => {
      setIsSimulatingUpload(false);
      sendUserMessage('I took a photo of my fridge: I have 4 eggs, cooked rice, spinach, and onions.');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div
        className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-cream-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Chat Drawer Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-sage-700 via-sage-800 to-slate-900 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shadow-inner">
                <Bot className="w-5 h-5" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-bold text-base text-white">LifeFlow Coach</h3>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                  AI Active
                </span>
              </div>
              <p className="text-[11px] text-slate-300">Empathetic daily lifestyle guidance</p>
            </div>
          </div>

          <button
            onClick={() => setIsAIChatOpen(false)}
            className="p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-cream-50/50">
          {chatMessages.map(msg => {
            const isAI = msg.sender === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isAI ? 'justify-start' : 'justify-end'}`}
              >
                {isAI && (
                  <div className="w-7 h-7 rounded-xl bg-sage-600 flex items-center justify-center text-white shrink-0 text-xs shadow-xs mt-1">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 ${
                    isAI
                      ? 'bg-white text-slate-800 border border-cream-200/90 shadow-soft'
                      : 'bg-sage-600 text-white shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Optional Action Card */}
                  {msg.cardData && (
                    <div className="p-2.5 rounded-xl bg-sage-50 border border-sage-200/80 text-slate-800 space-y-1 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sage-700">
                          Suggested Action
                        </span>
                        <span className="text-[10px] text-sage-600 font-semibold">AI Recommendation</span>
                      </div>
                      <p className="font-bold text-xs text-slate-900">{msg.cardData.title}</p>
                      <p className="text-[11px] text-slate-600">{msg.cardData.details}</p>
                      <button
                        onClick={() => {
                          if (msg.cardData?.type === 'meal') setActiveTab('food');
                          if (msg.cardData?.type === 'workout') setActiveTab('fitness');
                          if (msg.cardData?.type === 'habit') setIsRealLifeModalOpen(true);
                          setIsAIChatOpen(false);
                        }}
                        className="w-full mt-1.5 py-1 px-2.5 rounded-lg bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                      >
                        <span>Open Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Quick reply chips under AI message */}
                  {msg.quickReplies && (
                    <div className="pt-2 flex flex-wrap gap-1.5 border-t border-cream-100">
                      {msg.quickReplies.map((qr, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(qr)}
                          className="text-[11px] font-medium bg-cream-100 hover:bg-sage-100 text-slate-700 hover:text-sage-900 px-2.5 py-1 rounded-full border border-cream-300 transition-colors"
                        >
                          {qr}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className={`block text-[9px] font-medium pt-0.5 ${isAI ? 'text-slate-400' : 'text-emerald-100 text-right'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isRecording && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs animate-pulse">
              <Mic className="w-4 h-4 text-rose-600" />
              <span>Listening to your voice... (Simulated)</span>
            </div>
          )}

          {isSimulatingUpload && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs animate-pulse">
              <Camera className="w-4 h-4 text-amber-600" />
              <span>Analyzing fridge photo with AI vision...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts Carousel */}
        <div className="px-4 py-2 border-t border-cream-200 bg-cream-50/90 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="inline-block text-[11px] font-semibold bg-white hover:bg-sage-50 text-slate-700 hover:text-sage-800 border border-cream-300 px-3 py-1.5 rounded-xl shadow-xs shrink-0 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-cream-200 space-y-2">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 bg-cream-100 rounded-2xl p-1.5 border border-cream-300/80 focus-within:border-sage-500 focus-within:bg-white transition-all shadow-inner"
          >
            <button
              type="button"
              onClick={handlePhotoSim}
              className="p-2 text-slate-500 hover:text-sage-700 rounded-xl hover:bg-cream-200 transition-colors"
              title="Upload fridge photo or food pic"
            >
              <Camera className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleVoiceSim}
              className="p-2 text-slate-500 hover:text-sage-700 rounded-xl hover:bg-cream-200 transition-colors"
              title="Speak with Coach"
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="Ask for meals, 5-min workouts, or tips..."
              className="flex-1 bg-transparent text-xs sm:text-sm text-slate-800 focus:outline-hidden px-1 placeholder:text-slate-400 font-medium"
            />

            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2 rounded-xl bg-sage-600 hover:bg-sage-700 disabled:opacity-40 disabled:hover:bg-sage-600 text-white transition-all shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Health & Safety Disclaimer Footer */}
          <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 font-medium text-center">
            <ShieldCheck className="w-3 h-3 text-slate-400 shrink-0" />
            <span>General lifestyle suggestions only • Not medical advice</span>
          </div>
        </div>
      </div>
    </div>
  );
};
