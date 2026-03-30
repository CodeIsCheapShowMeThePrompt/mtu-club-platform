import { useState } from "react";
import { Club, ApplicationRecord } from "@/types";

export const useApplication = () => {
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [envelopeState, setEnvelopeState] = useState<"idle" | "writing" | "folding" | "sent" | "confirming">("idle");
  const [commitMsg, setCommitMsg] = useState("");
  const [history, setHistory] = useState<ApplicationRecord[]>([]);
  const [feedbackToast, setFeedbackToast] = useState<{ clubName: string; status: string; clubId: string } | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [readingLetter, setReadingLetter] = useState<ApplicationRecord | null>(null);

  // 获取申请状态
  const getApplicationStatus = (id: string) => {
    const record = history.find(h => h.club.id === id);
    return record ? record.status : null;
  };

  // 计算是否有未读消息
  const hasUnread = history.some(h => !h.read && h.status !== "已寄出");

  // 全局强制关闭模态框
  const handleCloseModal = () => {
    setSelectedClub(null);
    setEnvelopeState("idle");
    setIsExpanded(false);
  };

  // 处理盖章
  const handleStamp = () => {
    setEnvelopeState("sent");
  };

  // 处理动画完成后的逻辑
  const handleAnimationComplete = () => {
    if (envelopeState === "sent" && selectedClub) {
      setEnvelopeState("confirming");
      
      const resultTypes: ("success" | "pending" | "fail")[] = ["success", "pending", "fail"];
      const randomResult = resultTypes[Math.floor(Math.random() * 3)];
      
      // 新增记录
      const newRecord: ApplicationRecord = { 
        club: selectedClub, 
        status: "已寄出", 
        result: randomResult, 
        msg: commitMsg, 
        read: true 
      };
      
      setHistory([...history, newRecord]);

      // 1.5秒后关闭整个弹窗
      setTimeout(() => {
        handleCloseModal();
        setCommitMsg("");
        
        // 模拟收到回执
        setTimeout(() => {
          const statusText = randomResult === "success" ? "已录取" : randomResult === "pending" ? "待面谈" : "遗憾落选";
          
          // 更新状态
          setHistory(prev => prev.map(h => h.club.id === selectedClub.id ? { ...h, status: statusText, read: false } : h));
          
          setFeedbackToast({ clubName: selectedClub.name, status: statusText, clubId: selectedClub.id });
          setTimeout(() => setFeedbackToast(null), 8000);
        }, 5000);

      }, 1500);
    }
  };

  // 点击 Toast
  const handleToastClick = () => {
    if (feedbackToast) {
      setFeedbackToast(null);
      setDrawerOpen(true);
    }
  };

  // 打开抽屉
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
    // 标记所有为已读
    setHistory(prev => prev.map(h => ({ ...h, read: true })));
  };

  return {
    selectedClub,
    setSelectedClub,
    isExpanded,
    setIsExpanded,
    envelopeState,
    setEnvelopeState,
    commitMsg,
    setCommitMsg,
    history,
    setHistory, // 核心修改：必须有这一行
    feedbackToast,
    drawerOpen,
    setDrawerOpen,
    readingLetter,
    setReadingLetter,
    getApplicationStatus,
    hasUnread,
    handleCloseModal,
    handleStamp,
    handleAnimationComplete,
    handleToastClick,
    handleDrawerOpen
  };
};