'use client';

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  changeType: 'up' | 'down';
  accent: string;
  icon: string;
}

export default function StatCard({ label, value, change, changeType, accent, icon }: StatCardProps) {
  return (
    <div
      className="bg-[#0d1117] border border-[rgba(255,255,255,0.06)] rounded-xl p-[18px] relative overflow-hidden hover:border-[rgba(255,255,255,0.12)] transition-colors"
      style={{ '--card-accent': accent } as React.CSSProperties}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-60"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />
      <div className="absolute top-4 right-4 text-xl opacity-30">{icon}</div>
      <div className="text-[10px] text-[#6b7a8d] uppercase tracking-[0.1em] font-mono mb-2.5">{label}</div>
      <div className="text-[28px] font-extrabold leading-none mb-1.5" style={{ color: accent }}>{value}</div>
      <div className={`text-[10px] font-mono flex items-center gap-1 ${changeType === 'up' ? 'text-[#00e5a0]' : 'text-[#ff4757]'}`}>
        {change}
      </div>
    </div>
  );
}
