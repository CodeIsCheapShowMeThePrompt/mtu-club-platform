"use client";
import { motion, AnimatePresence } from "framer-motion";

interface MatchingLoaderProps {
  progress: number;
}

export const MatchingLoader = ({ progress }: MatchingLoaderProps) => {
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[#FDFCFB]">
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
          <motion.div className="h-full bg-purple-500" animate={{ width: `${progress}%` }} transition={{ duration: 0.2 }} />
        </div>
        <div className="text-sm font-bold text-gray-400 tracking-widest">{progress}% · 正在根据你的情况匹配推荐社团...</div>
      </motion.div>
    </AnimatePresence>
  );
};