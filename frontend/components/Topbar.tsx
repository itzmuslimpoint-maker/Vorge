'use client';

interface TopbarProps {
  title: string;
  breadcrumb: string;
  liveCalls?: number;
}

export default function Topbar({ title, breadcrumb, liveCalls = 0 }: TopbarProps) {
  return (
    <div className="h-[60px] px-7 flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] bg-[#0d1117] flex-shrink-0">
      <div className="flex items-center gap-3">
        <h1 className="text-base font-bold">{title}</h1>
        <span className="text-[11px] text-[#6b7a8d] font-mono">{breadcrumb}</span>
      </div>
      <div className="flex items-center gap-2.5">
        {liveCalls > 0 && (
          <div className="flex items-center gap-1.5 text-[11px] text-[#00e5a0] font-mono bg-[rgba(0,229,160,0.08)] border border-[rgba(0,229,160,0.2)] px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-pulse" />
            {liveCalls} calls live
          </div>
        )}
        <button className="text-[#6b7a8d] text-xs border border-[rgba(255,255,255,0.12)] px-3.5 py-1.5 rounded-md hover:text-white transition">⟳ Sync Leads</button>
        <button className="bg-[#00d4ff] text-black text-xs px-3.5 py-1.5 rounded-md font-semibold hover:bg-[#00bcdc] transition">+ New Campaign</button>
      </div>
    </div>
  );
}
