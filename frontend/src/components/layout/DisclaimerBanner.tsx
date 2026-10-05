import React, { useState } from 'react';
import { AlertCircle, X, ShieldCheck } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="bg-sage-50/90 border-b border-sage-200/60 px-4 py-2 text-xs text-sage-800 backdrop-blur-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          <ShieldCheck className="w-4 h-4 text-sage-600 shrink-0" />
          <p className="leading-tight">
            <span className="font-semibold text-sage-900">Lifestyle Guidance Only:</span> LifeFlow is designed to support healthy habits and is not a substitute for professional medical diagnosis or treatment.
          </p>
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="text-sage-500 hover:text-sage-800 p-0.5 rounded-full hover:bg-sage-200/50 transition-colors"
          title="Dismiss notice"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
