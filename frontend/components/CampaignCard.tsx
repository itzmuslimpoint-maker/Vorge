'use client';

interface CampaignCardProps {
  name: string;
  status: string;
  leads: number;
  called: number;
  converted: number;
  progress: number;
}

export default function CampaignCard({ name, status, leads, called, converted, progress }: CampaignCardProps) {
  const statusColor = status === 'active' ? '#00e5a0' : '#ffc107';
  const rate = Math.round((converted / called) * 100);

  return (
    <div className="bg-[#131a24] border border-[rgba(255,255,255,0.06)] rounded-lg p-3.5 hover:border-[rgba(255,255,255,0.12)] transition-colors cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="text-xs font-bold">{name}</div>
          <div className="text-[10px] text-[#6b7a8d] font-mono mt-0.5">{leads} leads · {progress}% complete</div>
        </div>
        <span className="text-[9px] font-semibold capitalize" style={{ color: statusColor }}>● {status}</span>
      </div>
      <div className="h-1 bg-[#1a2332] rounded-sm overflow-hidden mb-2">
        <div
          className="h-full rounded-sm bg-gradient-to-r from-[#00d4ff] to-[#00e5a0] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex gap-4 mt-2">
        <div className="text-[10px]">
          <span className="font-bold text-[13px] text-[#00d4ff] block">{called}</span>
          <span className="text-[#6b7a8d]">called</span>
        </div>
        <div className="text-[10px]">
          <span className="font-bold text-[13px] text-[#00e5a0] block">{converted}</span>
          <span className="text-[#6b7a8d]">conv.</span>
        </div>
        <div className="text-[10px]">
          <span className="font-bold text-[13px] text-[#ff6b35] block">{rate}%</span>
          <span className="text-[#6b7a8d]">rate</span>
        </div>
      </div>
    </div>
  );
}
