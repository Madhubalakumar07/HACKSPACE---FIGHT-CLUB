import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-xl border backdrop-blur-md flex items-start gap-3 transform transition-all animate-bounce-short ${
              isSuccess
                ? 'bg-white/95 border-emerald-200 text-slate-800'
                : isInfo
                ? 'bg-white/95 border-amber-200 text-slate-800'
                : 'bg-white/95 border-blue-200 text-slate-800'
            }`}
          >
            <div className={`mt-0.5 rounded-full p-1 shrink-0 ${
              isSuccess ? 'bg-emerald-100 text-emerald-600' : isInfo ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
            }`}>
              {isSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Info className="w-4 h-4" />}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 leading-tight">{toast.title}</p>
              <p className="text-xs text-slate-600 mt-0.5 leading-snug">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
