'use client';

const data = [
  [180, 54], [220, 66], [195, 60], [310, 98], [280, 90], [150, 42], [190, 65]
];

export default function BarChart() {
  const maxVal = Math.max(...data.map(d => d[0]));

  return (
    <div>
      <div className="flex items-end gap-1 h-[120px]">
        {data.map(([calls, conv], i) => (
          <div key={i} className="flex-1 flex gap-0.5 items-end">
            <div
              className="flex-1 bg-[#00d4ff] opacity-70 rounded-t-sm hover:opacity-100 cursor-pointer transition-all"
              style={{ height: `${(calls / maxVal) * 100}%`, minHeight: '4px' }}
            />
            <div
              className="flex-1 bg-[#00e5a0] opacity-90 rounded-t-sm hover:opacity-100 cursor-pointer transition-all"
              style={{ height: `${(conv / maxVal) * 100}%`, minHeight: '4px' }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-1.5 text-[9px] text-[#3d4f63] font-mono">
        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
      </div>
      <div className="flex justify-center gap-4 mt-2 text-[10px] font-mono">
        <span className="text-[#00d4ff]">■ Calls</span>
        <span className="text-[#00e5a0]">■ Converted</span>
      </div>
    </div>
  );
}
