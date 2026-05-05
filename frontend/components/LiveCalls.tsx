'use client';

import { useState, useEffect } from 'react';

const initialCalls = [
  { name: 'Ravi Kumar', company: 'TechNova Pvt', time: 252, phase: 'Handling objection — Price', type: 'active' },
  { name: 'Sneha Reddy', company: 'HomePlus RE', time: 98, phase: 'Discovery questions', type: 'active' },
  { name: 'Manoj Tiwari', company: 'FastPay Fin', time: 23, phase: 'Ringing…', type: 'ringing' },
  { name: 'Divya Shah', company: 'HealthFirst', time: 424, phase: 'Scheduling follow-up', type: 'completed' },
];

export default function LiveCalls() {
  const [calls, setCalls] = useState(initialCalls);

  useEffect(() => {
    const interval = setInterval(() => {
      setCalls(prev => prev.map(c => ({
        ...c,
        time: c.type !== 'ringing' ? c.time + 1 : c.time
      })));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="p-4">
      {calls.map((call, i) => (
        <div
          key={i}
          className={`p-3.5 bg-[#131a24] border border-[rgba(255,255,255,0.06)] rounded-lg mb-2.5 cursor-pointer hover:border-[rgba(0,212,255,0.3)] transition-colors relative overflow-hidden`}
        >
          <div
            className={`absolute top-0 left-0 w-[3px] h-full rounded-r-sm ${
              call.type === 'ringing' ? 'bg-[#ffc107]' : call.type === 'completed' ? 'bg-[#00e5a0]' : 'bg-[#00d4ff]'
            }`}
          />
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-xs font-bold">{call.name}</div>
              <div className="text-[10px] text-[#6b7a8d]">{call.company}</div>
            </div>
            <div className="text-[11px] font-mono text-[#00d4ff]">{formatTime(call.time)}</div>
          </div>
          <div className="text-[10px] text-[#6b7a8d] flex items-center gap-1.5 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
            {call.phase}
          </div>
          {call.type === 'active' && (
            <div className="flex items-center gap-0.5 h-6">
              {Array.from({ length: 16 }, (_, i) => (
                <div
                  key={i}
                  className="w-[3px] bg-[#00d4ff] rounded-sm opacity-60"
                  style={{
                    animation: `wave 0.8s ease-in-out infinite`,
                    animationDelay: `${i * 0.05}s`,
                    height: `${Math.random() * 16 + 4}px`
                  }}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
