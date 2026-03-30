"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare } from "lucide-react";
import { ApplicationRecord } from "@/types";

interface MailboxDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: ApplicationRecord[];
  onReadLetter: (letter: ApplicationRecord) => void;
  onWithdraw: (index: number) => void;
}

export const MailboxDrawer = ({ isOpen, onClose, history, onReadLetter, onWithdraw }: MailboxDrawerProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-[70]" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }} className="fixed top-0 right-0 h-full w-[420px] bg-white shadow-2xl z-[80] flex flex-col">
            <div className="p-10 pb-6 flex justify-between items-center border-b border-gray-100">
              <h3 className="text-2xl font-black tracking-tight">我的信箱</h3>
              <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X className="w-4 h-4"/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-10 space-y-4 bg-gray-50/50">
              {history.length === 0 ? (
                <div className="py-20 text-center text-gray-300 font-bold tracking-widest uppercase">暂无信件</div>
              ) : (
                history.map((h, i) => (
                  <div key={i} onClick={() => h.status !== "已寄出" && onReadLetter(h)} className={`p-6 rounded-[24px] bg-white border flex justify-between items-center group transition-shadow ${h.status !== "已寄出" ? "cursor-pointer hover:shadow-xl border-purple-100" : "border-gray-100"}`}>
                    <div className="relative">
                      {!h.read && <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full" />}
                      <div className="font-bold text-base mb-1">{h.club.name}</div>
                      <div className={`text-[10px] font-black uppercase tracking-widest ${h.status === '已录取' ? 'text-green-500' : h.status === '待面谈' ? 'text-orange-500' : h.status === '遗憾落选' ? 'text-gray-400' : 'text-purple-500'}`}>
                        {h.status}
                      </div>
                    </div>
                    {h.status === "已寄出" ? (
                      <button onClick={(e) => { e.stopPropagation(); onWithdraw(i); }} className="text-[10px] text-red-500 font-bold px-4 py-2 bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">撤回</button>
                    ) : (
                      <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 shadow-inner"><MessageSquare className="w-4 h-4"/></div>
                    )}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};