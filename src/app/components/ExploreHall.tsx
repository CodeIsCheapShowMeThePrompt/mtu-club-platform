"use client";
import { ClubCard } from "./ClubCard";
import { Club } from "@/types";

interface ExploreHallProps {
  matchedClubs: { top: Club[], others: Club[] };
  getApplicationStatus: (id: string) => string | null;
  onSelectClub: (club: Club) => void;
}

export const ExploreHall = ({ matchedClubs, getApplicationStatus, onSelectClub }: ExploreHallProps) => {
  return (
    <div className="max-w-7xl mx-auto px-8 pt-20 pb-40">
      {/* Top 6 精选区 */}
      <header className="mb-12">
        <h2 className="text-4xl font-black mb-4 tracking-tighter">为你找到的频率</h2>
        <div className="flex gap-2 text-sm text-gray-400 font-medium">可能最感兴趣 · <span className="text-purple-500 font-bold">高匹配度精选</span></div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
        {matchedClubs.top.map((club) => (
          <ClubCard 
            key={club.id} 
            club={club} 
            status={getApplicationStatus(club.id)} 
            isTop={true}
            onClick={() => onSelectClub(club)} 
          />
        ))}
      </div>

      {/* 分割线 */}
      <div className="relative w-full h-px bg-gray-200 mb-16">
        <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-[#FDFCFB] px-6 text-sm font-bold text-gray-400 tracking-widest">更多社团探索</span>
      </div>

      {/* 剩余社团区 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 opacity-90 hover:opacity-100 transition-opacity duration-500">
        {matchedClubs.others.map((club) => (
          <ClubCard 
            key={club.id} 
            club={club} 
            status={getApplicationStatus(club.id)} 
            isTop={false}
            onClick={() => onSelectClub(club)} 
          />
        ))}
      </div>
    </div>
  );
};