"use client";
import { motion } from "framer-motion";

interface SegmentedControlProps {
  value: number;
  onChange: (val: number) => void;
  leftText: string;
  rightText: string;
  labels: string[];
}

export const SegmentedControl = ({ value, onChange, leftText, rightText, labels }: SegmentedControlProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-[11px] font-bold mb-4 px-2 tracking-widest">
        <span className={value === 0 ? "text-yellow-600" : "text-gray-400"}>{leftText}</span>
        <span className={value === 2 ? "text-purple-600" : "text-gray-400"}>{rightText}</span>
      </div>
      <div className="relative flex w-full h-14 bg-gray-100/80 rounded-2xl p-1.5 shadow-inner">
        <motion.div 
          className={`absolute top-1.5 bottom-1.5 w-[calc(33.33%-4px)] rounded-xl shadow-md border ${value === 0 ? 'bg-yellow-400 border-yellow-300' : value === 2 ? 'bg-purple-500 border-purple-400' : 'bg-white border-gray-200'}`}
          animate={{ left: `calc(${ value * 33.33 }% + 6px)` }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
        <button onClick={() => onChange(0)} className={`flex-1 relative z-10 font-bold text-xs transition-colors ${value === 0 ? 'text-black' : 'text-gray-400'}`}>{labels[0]}</button>
        <button onClick={() => onChange(1)} className={`flex-1 relative z-10 font-bold text-xs transition-colors ${value === 1 ? 'text-black' : 'text-gray-400'}`}>{labels[1]}</button>
        <button onClick={() => onChange(2)} className={`flex-1 relative z-10 font-bold text-xs transition-colors ${value === 2 ? 'text-white' : 'text-gray-400'}`}>{labels[2]}</button>
      </div>
    </div>
  );
};