'use client';

export default function DonutChart() {
  const segments = [
    { color: '#00e5a0', dash: '75.8 162.7', offset: 0, label: 'Converted', value: '407' },
    { color: '#00d4ff', dash: '40.5 162.7', offset: -78.8, label: 'Interested', value: '218' },
    { color: '#ff4757', dash: '24.4 162.7', offset: -121.5, label: 'Not Interested', value: '314' },
    { color: '#7b5ea7', dash: '21.9 162.7', offset: -148.1, label: 'Voicemail', value: '281' },
  ];

  return (
    <div className="flex items-center gap-5">
      <svg width="100" height="100" viewBox="0 0 100 100" className="flex-shrink-0">
        <circle cx="50" cy="50" r="38" fill="none" stroke="#1a2332" strokeWidth="14" />
        {segments.map((s, i) => (
          <circle
            key={i}
            cx="50" cy="50" r="38"
            fill="none" stroke={s.color} strokeWidth="14"
            strokeDasharray={s.dash}
            strokeDashoffset={s.offset}
            strokeLinecap="round"
          />
        ))}
        <text x="50" y="47" textAnchor="middle" fill="#e8edf5" fontFamily="Syne, sans-serif" fontSize="12" fontWeight="800">31.7%</text>
        <text x="50" y="58" textAnchor="middle" fill="#6b7a8d" fontFamily="JetBrains Mono, monospace" fontSize="7">convert</text>
      </svg>
      <div className="flex-1">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: s.color }} />
            <span className="text-[11px] text-[#6b7a8d] flex-1">{s.label}</span>
            <span className="text-[11px] font-bold font-mono" style={{ color: s.color }}>{s.value}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-sm flex-shrink-0 bg-[#3d4f63]" />
          <span className="text-[11px] text-[#6b7a8d] flex-1">No Answer</span>
          <span className="text-[11px] font-bold font-mono text-[#6b7a8d]">64</span>
        </div>
      </div>
    </div>
  );
}
