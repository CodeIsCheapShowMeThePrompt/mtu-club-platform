"use client";
import { motion, AnimatePresence } from "framer-motion";

interface LoginScreenProps {
  step: number;
  onLogin: () => void;
}

export const LoginScreen = ({ step, onLogin }: LoginScreenProps) => {
  return (
    <AnimatePresence>
      <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white overflow-hidden">
        {step === 0 ? (
          <motion.div className="flex flex-col items-center w-full max-w-md px-8 relative z-10">
            {/* 全屏滚动大字背景 */}
            <div className="fixed inset-0 -z-1 flex flex-col justify-center gap-0 overflow-hidden pointer-events-none">
              <div className="whitespace-nowrap w-full overflow-hidden">
                <div className="text-[42vw] font-black text-[#FFC107]/90 animate-scroll inline-block !leading-none">
                  MEITUAN UNIVERSITY MEITUAN UNIVERSITY MEITUAN UNIVERSITY
                </div>
              </div>
              <div className="whitespace-nowrap w-full overflow-hidden">
                <div className="text-[28vw] font-black text-[#9F13CE]/30 animate-scroll-reverse inline-block !leading-none">
                  STUDENT CLUB ASSOCIATION STUDENT CLUB ASSOCIATION STUDENT CLUB ASSOCIATION
                </div>
              </div>
            </div>

            {/* 渐变背景 */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#FDFCFB] via-[#F5F3EF] to-[#FDFCFB]" />
            
            {/* 登录卡片 */}
            <div className="w-full bg-white/60 backdrop-blur-xl border border-white/50 rounded-[32px] p-10 shadow-2xl flex flex-col items-center">
              <div className="w-12 h-12 mb-8 rounded-2xl bg-[#FFC107] text-black flex items-center justify-center text-lg font-black shadow-lg tracking-tighter">
                MTU
              </div>
              <div className="text-center mb-10 space-y-3">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-tight">
                  美团大学社团<br/>智能匹配平台
                </h1>
                <p className="text-sm font-medium text-gray-400 tracking-wide">
                  找到属于你的频率
                </p>
              </div>
              <button 
                onClick={onLogin} 
                className="w-full py-4 bg-black text-white rounded-xl font-bold text-m hover:bg-zinc-800 transition-all shadow-xl hover:shadow-2xl active:scale-[0.98]"
              >
                通过校园门户授权登录
              </button>
              <div className="mt-4 text-sm text-gray-400 font-medium text-center">
                登录即同意同步学籍信息用于社团招新
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col items-center gap-6">
            <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-sm font-bold text-gray-500 tracking-widest">欢迎回来，温小美。正在同步基础信息...</div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};