"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone } from "lucide-react";
import { ApplicationRecord } from "@/types";

interface LetterReaderProps {
  letter: ApplicationRecord | null;
  onClose: () => void;
}

export const LetterReader = ({ letter, onClose }: LetterReaderProps) => {
  if (!letter) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
        <div className="w-full max-w-md bg-[#FFFDF9] rounded-3xl p-10 shadow-2xl relative border border-gray-200">
           <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black"><X/></button>
           <div className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-8 border-b border-gray-200 pb-4">From: {letter.club.name}</div>
           
           <p className="text-gray-800 leading-relaxed font-medium mb-10 text-lg">
             {letter.club.letters[letter.result]}
           </p>
           
           {(letter.result === "success" || letter.result === "pending") && (
             <div className="p-5 bg-green-50/80 text-green-800 rounded-2xl text-sm font-medium border border-green-100 leading-relaxed">
               <div className="flex items-center gap-2 mb-2 font-bold"><Phone className="w-4 h-4"/> 录取联络档案已生成</div>
               <div>社团招新专员：138-0000-0000</div>
               <div className="text-gray-500 mt-2 text-xs">通知将同时发送至校园门户预留手机号：(+86) 155****9927</div>
             </div>
           )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};