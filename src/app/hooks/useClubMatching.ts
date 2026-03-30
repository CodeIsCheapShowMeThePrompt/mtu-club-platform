import { useState, useMemo } from "react";
import { Club, Preferences } from "@/types";
import { clubsData } from "@/data";

export const useClubMatching = () => {
  const [prefs, setPrefs] = useState<Preferences>({ social: 1, energy: 1, time: 1 });
  const [isMatching, setIsMatching] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [matchedClubs, setMatchedClubs] = useState<{ top: Club[], others: Club[] }>({ top: [], others: [] });

  const tags = useMemo(() => {
    const newTags = [];
    if (prefs.social === 2) newTags.push("我是大佬");
    if (prefs.social === 0) newTags.push("重在参与");
    if (prefs.energy === 2) newTags.push("全场焦点");
    if (prefs.energy === 0) newTags.push("默默潜水");
    if (prefs.time === 2) newTags.push("燃烧青春");
    if (prefs.time === 0) newTags.push("佛系打卡");
    return newTags;
  }, [prefs]);

  const startMatching = () => {
    // 重置状态
    setLoadingProgress(0);
    setIsMatching(true);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        clearInterval(interval);
        setLoadingProgress(100);
        
        // 生成数据
        const shuffled = [...clubsData].sort(() => 0.5 - Math.random());
        setMatchedClubs({
          top: shuffled.slice(0, 6),
          others: shuffled.slice(6)
        });

        // 400ms 后关闭加载
        setTimeout(() => {
          setIsMatching(false);
        }, 400);
      } else {
        setLoadingProgress(progress);
      }
    }, 300);
  };

  return {
    prefs,
    setPrefs,
    tags,
    isMatching,
    loadingProgress,
    matchedClubs,
    startMatching
  };
};