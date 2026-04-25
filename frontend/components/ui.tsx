import { PropsWithChildren } from 'react';

export function Card({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-300/80">{eyebrow}</p>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
        <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">{description}</p>
      </div>
    </div>
  );
}

export function Pill({ children, tone = 'default' }: PropsWithChildren<{ tone?: 'default' | 'success' | 'danger' }>) {
  const toneClass = {
    default: 'border-white/10 bg-white/5 text-slate-200',
    success: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
    danger: 'border-rose-400/30 bg-rose-400/10 text-rose-200',
  }[tone];

  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${toneClass}`}>{children}</span>;
}
