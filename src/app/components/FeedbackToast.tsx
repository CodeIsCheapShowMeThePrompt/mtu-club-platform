"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

interface FeedbackToastProps {
  feedbackToast: { clubName: string; status: string; clubId: string } | null;
  onClick: () => void;
}

export const FeedbackToast = ({ feedbackToast, onClick }: FeedbackToastProps) => {
  return (
    <AnimatePresence>
      {feedbackToast && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          exit={{ y: 50, opacity: 0 }} 
          onClick={onClick}
          className="fixed bottom-32 right-8 z-[60] p-5 rounded-2xl border border-gray-100 shadow-2xl flex items-center gap-4 bg-white/95 backdrop-blur-xl w-[340px] cursor-pointer hover:bg-white hover:shadow-3xl transition-all"
        >
           <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white shrink-0"><Mail className="w-5 h-5" /></div>
           <div className="flex-1">
             <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">社团回执已送达</div>
             <div className="text-sm font-bold text-gray-800 line-clamp-1">{feedbackToast.clubName} <span className={feedbackToast.status === '已录取' ? 'text-green-500' : 'text-purple-600'}>{feedbackToast.status}</span></div>
           </div>
           <div className="text-gray-300 hover:text-black"><ArrowRight className="w-4 h-4"/></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};