"use client";
import { motion } from "framer-motion";
import { Zap, Clock } from "lucide-react";
import { Club } from "@/types";

interface ClubCardProps {
  club: Club;
  status: string | null;
  isTop?: boolean;
  onClick: () => void;
}

export const ClubCard = ({ club, status, isTop = true, onClick }: ClubCardProps) => {
  const exploreRatio = (1 - club.dna) * 100;
  const deliveryRatio = club.dna * 100;
  const height = isTop ? "h-[500px]" : "h-[450px]";
  const padding = isTop ? "p-8" : "p-6";
  const titleSize = isTop ? "text-3xl" : "text-2xl";
  const gap = isTop ? "gap-6" : "gap-4";
  const iconSize = isTop ? "w-3.5 h-3.5" : "w-3 h-3";
  const textSize = isTop ? "text-[11px]" : "text-[10px]";

  return (
    <motion.div 
      layoutId={`card-${club.id}`} 
      onClick={onClick} 
      className={`group relative ${height} rounded-[32px] overflow-hidden cursor-pointer bg-white shadow-xl hover:shadow-2xl`}
    >
      <img src={club.heroImage} className="absolute inset-0 w-full h-full object-cover" alt={club.name} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
      <div className={`absolute inset-0 ${padding} flex flex-col justify-end text-white`}>
        {status && (
          <div className={`absolute ${isTop ? 'top-6 left-6 px-4 py-1.5 text-[10px]' : 'top-5 left-5 px-3 py-1 text-[9px]'} backdrop-blur-md rounded-full font-black tracking-widest uppercase shadow-sm 
            ${status === '已录取' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 
              status === '待面谈' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' : 
              status === '遗憾落选' ? 'bg-gray-500/20 text-gray-300 border border-gray-500/30' : 
              'bg-white/20 text-white border border-white/30'}`}>
            {status}
          </div>
        )}
        <h3 className={`${titleSize} font-black mb-3 tracking-tight`}>{club.name}</h3>
        <p className={`text-sm text-white/70 mb-8 line-clamp-2 font-medium`}>{club.summary}</p>
        
        <div className={`mb-8 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10`}>
          <div className={`flex justify-between ${isTop ? 'text-[10px] mb-3' : 'text-[9px] mb-2'} uppercase tracking-[0.2em]`}>
            <span className={club.dna < 0.5 ? "text-yellow-400 font-black drop-shadow-md" : "text-white/30 font-bold"}>探索型</span>
            <span className={club.dna >= 0.5 ? "text-purple-300 font-black drop-shadow-md" : "text-white/30 font-bold"}>交付型</span>
          </div>
          <div className={`w-full ${isTop ? 'h-1.5' : 'h-1'} bg-white/10 rounded-full flex overflow-hidden`}>
             <div className="h-full bg-yellow-400" style={{ width: `${exploreRatio}%` }} />
             <div className="h-full bg-purple-500" style={{ width: `${deliveryRatio}%` }} />
          </div>
        </div>
        
        {/* 核心修复：className 合并，语法错误修复 */}
        <div className={`flex ${gap} ${textSize} font-black text-white/50 tracking-widest uppercase`}>
          <span className="flex items-center gap-2">
            <Zap className={`${iconSize} text-yellow-400`}/>
            {club.bar}
          </span>
          <span className="flex items-center gap-2">
            <Clock className={`${iconSize} text-purple-400`}/>
            {club.time}
          </span>
        </div>
      </div>
    </motion.div>
  );
};