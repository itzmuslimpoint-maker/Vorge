'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, BarChart3, Zap, FileText, Users, UserPlus, 
  PhoneCall, History, Settings, Mic, Puzzle 
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { section: 'Overview', items: [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  ]},
  { section: 'Campaigns', items: [
    { icon: Zap, label: 'Campaigns', href: '/campaigns', badge: '3' },
    { icon: FileText, label: 'Script Builder', href: '/builder' },
  ]},
  { section: 'Leads', items: [
    { icon: Users, label: 'Lead Manager', href: '/leads' },
    { icon: UserPlus, label: 'Lead Generator', href: '/leads' },
  ]},
  { section: 'Calls', items: [
    { icon: PhoneCall, label: 'Live Monitor', href: '/calls', badge: '4' },
    { icon: History, label: 'Call History', href: '/calls' },
  ]},
  { section: 'Settings', items: [
    { icon: Mic, label: 'AI Voice Setup', href: '/setup' },
    { icon: Puzzle, label: 'Integrations', href: '#' },
  ]},
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] bg-[#0d1117] border-r border-[rgba(255,255,255,0.06)] flex flex-col flex-shrink-0">
      <div className="px-5 py-6 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2.5">
        <div className="w-8 h-8 bg-gradient-to-br from-[#00d4ff] to-[#7b5ea7] rounded-lg flex items-center justify-center text-sm">🎙️</div>
        <span className="text-sm font-bold tracking-wider">Voice<span className="text-[#00d4ff]">Forge</span></span>
      </div>

      <nav className="p-3 flex-1 overflow-y-auto">
        {navItems.map((section, si) => (
          <div key={si}>
            <div className="text-[9px] tracking-[0.15em] text-[#3d4f63] font-mono uppercase px-2 mt-4 mb-1.5">
              {section.section}
            </div>
            {section.items.map((item, ii) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={ii}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all relative",
                    isActive 
                      ? "bg-[rgba(0,212,255,0.08)] text-[#00d4ff]" 
                      : "text-[#6b7a8d] hover:bg-[#131a24] hover:text-[#e8edf5]"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-[60%] bg-[#00d4ff] rounded-r-sm" />
                  )}
                  <Icon size={14} className="w-[18px]" />
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto text-[9px] bg-[#ff6b35] text-white rounded px-1.5 font-mono">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#131a24] cursor-pointer">
          <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-[#7b5ea7] to-[#00d4ff] flex items-center justify-center text-[11px] font-bold">RK</div>
          <div className="flex-1">
            <div className="text-xs font-semibold">Rahul K.</div>
            <div className="text-[10px] text-[#6b7a8d]">Pro · 2,400 credits</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
