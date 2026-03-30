"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SegmentedControl } from "./SegmentedControl";
import { Preferences } from "@/types";

interface PrefsScreenProps {
  prefs: Preferences;
  setPrefs: (prefs: Preferences) => void;
  tags: string[];
  onStartMatching: () => void;
}

export const PrefsScreen = ({ prefs, setPrefs, tags, onStartMatching }: PrefsScreenProps) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center min-h-screen max-w-lg mx-auto px-6">
      <h2 className="text-3xl font-black mb-16 tracking-tight">标定你的气场</h2>
      
      <SegmentedControl 
        value={prefs.social} 
        onChange={(v) => setPrefs({...prefs, social: v})} 
        leftText="轻松交友" 
        rightText="硬核本领" 
        labels={["重在参与", "随遇而安", "我是大佬"]} 
      />
      <SegmentedControl 
        value={prefs.energy} 
        onChange={(v) => setPrefs({...prefs, energy: v})} 
        leftText="i人舒适区" 
        rightText="e人蹦迪场" 
        labels={["默默潜水", "偶尔冒泡", "全场焦点"]} 
      />
      <SegmentedControl 
        value={prefs.time} 
        onChange={(v) => setPrefs({...prefs, time: v})} 
        leftText="课余打发时间" 
        rightText="全情投入" 
        labels={["佛系打卡", "劳逸结合", "燃烧青春"]} 
      />

      {/* Tag 联动区 */}
      <div className="flex flex-wrap justify-center gap-3 mt-6 h-10">
        {tags.map((tag) => (
          <motion.span key={tag} layout initial={{ scale: 0 }} animate={{ scale: 1 }} className={`px-4 py-2 text-[10px] font-black rounded-full border uppercase tracking-widest ${tag === '我是大佬' || tag === '全场焦点' || tag === '燃烧青春' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-yellow-50 text-yellow-600 border-yellow-100'}`}>
            #{tag}
          </motion.span>
        ))}
      </div>

      <button onClick={onStartMatching} className="mt-12 px-12 py-5 bg-black text-white rounded-2xl flex items-center gap-3 group shadow-2xl font-bold hover:bg-zinc-800 transition-colors">
        <span>开始寻找社团</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
};