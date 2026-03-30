"use client";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";

// Hooks
import { useClubMatching } from "@/hooks/useClubMatching";
import { useApplication } from "@/hooks/useApplication";

// Components
import { LoginScreen } from "@/components/LoginScreen";
import { PrefsScreen } from "@/components/PrefsScreen";
import { MatchingLoader } from "@/components/MatchingLoader";
import { ExploreHall } from "@/components/ExploreHall";
import { ApplicationModal } from "@/components/ApplicationModal";
import { MailboxDrawer } from "@/components/MailboxDrawer";
import { LetterReader } from "@/components/LetterReader";
import { FeedbackToast } from "@/components/FeedbackToast";

export default function ClubHubDemo() {
  const [step, setStep] = useState(0);
  const matching = useClubMatching();
  const application = useApplication();

  const handleLogin = () => {
    setStep(1);
    setTimeout(() => setStep(2), 2000);
  };

  const handleStartMatching = () => {
    matching.startMatching();
  };

  // 核心逻辑：监听 isMatching 从 true 变 false，自动切页
  useEffect(() => {
    if (step === 2 && !matching.isMatching && matching.matchedClubs.top.length > 0) {
      setStep(3);
    }
  }, [matching.isMatching, step, matching.matchedClubs.top.length]);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1D1D1F] selection:bg-purple-100 font-sans relative overflow-x-hidden">
      {/* 步骤 0 & 1: 登录 */}
      <AnimatePresence>
        {step < 2 && (
          <LoginScreen step={step} onLogin={handleLogin} />
        )}
      </AnimatePresence>

      {/* 步骤 2: 气场拨盘 */}
      <AnimatePresence>
        {step === 2 && !matching.isMatching && (
          <PrefsScreen 
            prefs={matching.prefs}
            setPrefs={matching.setPrefs}
            tags={matching.tags}
            onStartMatching={handleStartMatching}
          />
        )}
      </AnimatePresence>

      {/* 步骤 2.5: 匹配加载 */}
      <AnimatePresence>
        {matching.isMatching && (
          <MatchingLoader progress={matching.loadingProgress} />
        )}
      </AnimatePresence>

      {/* 步骤 3: 探索大厅 */}
      {step === 3 && (
        <ExploreHall 
          matchedClubs={matching.matchedClubs}
          getApplicationStatus={application.getApplicationStatus}
          onSelectClub={application.setSelectedClub}
        />
      )}

      {/* 申请模态框 */}
      <ApplicationModal 
        selectedClub={application.selectedClub}
        envelopeState={application.envelopeState}
        isExpanded={application.isExpanded}
        commitMsg={application.commitMsg}
        setEnvelopeState={application.setEnvelopeState}
        setIsExpanded={application.setIsExpanded}
        setCommitMsg={application.setCommitMsg}
        getApplicationStatus={application.getApplicationStatus}
        handleCloseModal={application.handleCloseModal}
        handleStamp={application.handleStamp}
        handleAnimationComplete={application.handleAnimationComplete}
      />

      {/* 反馈 Toast */}
      <FeedbackToast 
        feedbackToast={application.feedbackToast}
        onClick={application.handleToastClick}
      />

      {/* 右下角信箱入口 */}
      {step === 3 && (
        <button 
          onClick={application.handleDrawerOpen} 
          className="fixed bottom-10 right-10 w-16 h-16 bg-[#FFC107]/80 backdrop-blur-xl shadow-2xl rounded-full flex items-center justify-center z-40 hover:scale-105 transition-transform border border-[#FFC107]/30"
        >
          <Mail className="w-6 h-6 text-black" />
          {application.hasUnread && <span className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full border-2 border-[#FFC107]" />}
        </button>
      )}

      {/* 信箱抽屉 */}
      <MailboxDrawer 
        isOpen={application.drawerOpen}
        onClose={() => application.setDrawerOpen(false)}
        history={application.history}
        onReadLetter={application.setReadingLetter}
        onWithdraw={(index: number) => application.setHistory(application.history.filter((_, idx: number) => idx !== index))}
      />

      {/* 阅读信件模态框 */}
      <LetterReader 
        letter={application.readingLetter}
        onClose={() => application.setReadingLetter(null)}
      />
    </div>
  );
}