import React, { useRef, useState } from 'react';
import { Activity, FileUp, HeartPulse, Loader2, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HealthSummaryCard: React.FC = () => {
  const { healthAnalysis, analyzeHealthDocument } = useApp();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const metric = (name: string) =>
    healthAnalysis?.metrics.find(item => item.name.toLowerCase() === name.toLowerCase());

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setIsUploading(true);
    await analyzeHealthDocument(file);
    setIsUploading(false);
  };

  const score = healthAnalysis?.score ?? null;

  return (
    <section className="bg-white rounded-3xl border border-cream-300 shadow-soft-lg overflow-hidden">
      <div className="p-5 sm:p-6 bg-gradient-to-r from-sage-50 via-white to-emerald-50/60 border-b border-cream-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sage-800">
              <HeartPulse className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Health snapshot</span>
            </div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 mt-1">
              Your current health conditions
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Upload a recent report to calculate an educational wellness score.
            </p>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className="shrink-0 inline-flex items-center gap-2 rounded-2xl bg-sage-700 hover:bg-sage-800 disabled:opacity-60 text-white text-xs font-bold px-3.5 py-2.5 transition-colors"
          >
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileUp className="w-4 h-4" />}
            <span className="hidden sm:inline">{isUploading ? 'Analyzing...' : 'Upload report'}</span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx,.txt,.md"
            onChange={handleUpload}
            className="hidden"
          />
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3">
            <p className="text-[11px] font-semibold text-slate-500">BMI</p>
            <p className="text-lg font-display font-bold text-slate-900 mt-1">{metric('BMI')?.value ?? '—'}</p>
            <p className="text-[10px] text-slate-500">{metric('BMI')?.status ?? 'Upload report'}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3">
            <p className="text-[11px] font-semibold text-slate-500">Blood pressure</p>
            <p className="text-lg font-display font-bold text-slate-900 mt-1">{metric('Blood pressure')?.value ?? '—'}</p>
            <p className="text-[10px] text-slate-500">{metric('Blood pressure')?.status ?? 'Upload report'}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3">
            <p className="text-[11px] font-semibold text-slate-500">Sugar / glucose</p>
            <p className="text-lg font-display font-bold text-slate-900 mt-1">{metric('Glucose')?.value ?? '—'}</p>
            <p className="text-[10px] text-slate-500">{metric('Glucose')?.status ?? 'Upload report'}</p>
          </div>
          <div className="rounded-2xl bg-sage-50 border border-sage-200 p-3">
            <p className="text-[11px] font-semibold text-sage-700">Wellness score</p>
            <p className="text-lg font-display font-bold text-sage-900 mt-1">{score === null ? '—' : `${score}/100`}</p>
            <p className="text-[10px] text-sage-700">{healthAnalysis?.score_label ?? 'Awaiting report'}</p>
          </div>
        </div>

        {healthAnalysis ? (
          <div className="mt-4 flex items-start gap-2 text-xs text-slate-600">
            <Activity className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
            <p>{healthAnalysis.summary}</p>
          </div>
        ) : (
          <div className="mt-4 flex items-start gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p>No report analyzed yet. Upload a text-based PDF, DOCX, TXT, or Markdown report to populate this snapshot.</p>
          </div>
        )}
      </div>
    </section>
  );
};
