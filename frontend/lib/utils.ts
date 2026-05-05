import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    converted: 'bg-[rgba(0,229,160,0.12)] text-[#00e5a0]',
    calling: 'bg-[rgba(0,212,255,0.12)] text-[#00d4ff]',
    failed: 'bg-[rgba(255,71,87,0.12)] text-[#ff4757]',
    pending: 'bg-[rgba(255,193,7,0.1)] text-[#ffc107]',
    voicemail: 'bg-[rgba(123,94,167,0.15)] text-[#a87dd4]',
    new: 'bg-[rgba(107,122,141,0.1)] text-[#6b7a8d]',
  };
  return colors[status] || colors.new;
}
