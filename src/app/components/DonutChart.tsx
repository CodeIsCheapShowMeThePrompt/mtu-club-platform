"use client";
import { motion } from "framer-motion";

interface DonutChartProps {
  percent: number;
  label: string;
  colorClass: string;
}

export const DonutChart = ({ percent, label, colorClass }: DonutChartProps) => {
  const dash = `${percent}, 100`;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 36 36" className="w-14 h-14 drop-shadow-sm">
        <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-100" strokeWidth="3" />
        <motion.circle 
          cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="3"
          strokeDasharray={dash} strokeLinecap="round" transform="rotate(-90 18 18)"
          className={colorClass}
          initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: dash }} transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <text x="18" y="22" textAnchor="middle" className="text-[10px] font-black fill-gray-800">{percent}%</text>
      </svg>
      <span className="text-[10px] font-bold text-gray-500 tracking-widest">{label}</span>
    </div>
  );
};