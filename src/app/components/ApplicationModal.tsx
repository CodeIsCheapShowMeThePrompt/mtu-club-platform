"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ArrowRight, Stamp, Undo2, ChevronDown, ChevronUp, CheckCircle2, Bell, BellOff, ExternalLink, Check, Phone } from "lucide-react";
import Image from "next/image";
import { DonutChart } from "./DonutChart";
import { Club, UserProfile } from "@/types";
import { ssoUserProfile } from "@/data";

// ====================== 工具函数（生产版原样保留） ======================
const ARTICLE_TEMPLATES = [
  {
    title: "2026春季招新宣讲会时间定啦！",
    coverSeed: "recruit-1",
    summary: "3月25日晚19:00，我们将在学生活动中心举办招新宣讲会，现场有学长学姐分享经验，还有限量社团周边发放，欢迎所有感兴趣的同学前来参加...",
    content: "完整推文内容：本次宣讲会我们会详细介绍社团的部门架构、日常活动、招新流程和笔试面试注意事项，现场还有互动抽奖环节，一等奖是价值599元的专业设备一套！",
    baseDate: "2026-03-10"
  },
  {
    title: "{{clubName}}寒假活动营圆满结束，看看大家的成果！",
    coverSeed: "camp-2",
    summary: "为期21天的寒假活动营圆满落幕，共有32位同学完成了全部打卡任务，产出超多优秀作品，其中5部作品已经获得校级比赛参赛资格...",
    content: "完整推文内容：本次寒假营我们设置了基础入门、进阶提升、实战创作三个阶段，邀请业内前辈线上分享，同学们进步显著，期待新学期带来更多惊喜！",
    baseDate: "2026-02-28"
  },
  {
    title: "恭喜{{clubName}}在省级比赛中斩获金奖！",
    coverSeed: "award-3",
    summary: "在刚刚结束的全省大学生社团联赛中，我们的参赛队伍从87支队伍中脱颖而出，拿下金奖和最佳创意奖！",
    content: "完整推文内容：本次比赛我们准备了近3个月，从选题、创作到答辩，每一步都凝聚心血，感谢队员、学校和指导老师的支持！",
    baseDate: "2026-03-20"
  },
];
const hashString = (str: string) => { let hash = 0; for (let i = 0; i < str.length; i++) { hash = ((hash << 5) - hash) + str.charCodeAt(i); hash |= 0; } return Math.abs(hash); };
const seededRandom = (seed: number, min: number, max: number) => { const x = Math.sin(seed) * 10000; return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min; };
const shiftDate = (baseDate: string, seed: number) => { const date = new Date(baseDate); date.setDate(date.getDate() + seededRandom(seed, -3, 3)); return date.toISOString().split('T')[0]; };
const generateClubArticles = (club: Club) => {
  if (!club) return []; const seed = hashString(club.id); return ARTICLE_TEMPLATES.map((t, i) => ({
    id: i, title: t.title.replaceAll("{{clubName}}", club.name), cover: `https://picsum.photos/seed/${t.coverSeed}-${club.id}/800/400`,
    publishTime: shiftDate(t.baseDate, seed), summary: t.summary, content: t.content
  }));
};

// ====================== 子组件1：Idle视差页面（生产版功能+原版视觉100%还原） ======================
const ModalIdleContent = ({ selectedClub, isExpanded, setIsExpanded, getApplicationStatus, setEnvelopeState }: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: scrollRef });
  const bgScale = useTransform(scrollY, [0, 300], [1, 1.3]);
  const bgY = useTransform(scrollY, [0, 300], [0, -50]);
  const bgOpacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  const [articleExpanded, setArticleExpanded] = useState(false);
  const [contactExpanded, setContactExpanded] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [activeArticle, setActiveArticle] = useState<any>(null);
  const [showSubscribeToast, setShowSubscribeToast] = useState(false);
  const clubArticles = generateClubArticles(selectedClub);

  return (
    <div className="flex flex-col h-full relative">
      {/* 原版视差背景100%还原 */}
      <motion.div className="absolute top-0 left-0 right-0 h-72 z-0 overflow-hidden" style={{ scale: bgScale, y: bgY, opacity: bgOpacity }}>
        <div className="absolute inset-0 scale-105">
          <Image src={selectedClub.heroImage} className="object-cover" alt={selectedClub.name} fill unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-black/10" />
        </div>
      </motion.div>

      {/* 原版滚动条样式100%还原 */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto relative z-10 pt-56 scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="h-8" />
        <div className="px-10 mb-8 relative z-20">
          <h2 className="text-4xl font-black tracking-tight text-gray-900 drop-shadow-sm">{selectedClub.name}</h2>
        </div>

        <div className="bg-white rounded-t-[32px] -mt-4 pt-8 px-10 pb-48">
          <div className="bg-gray-50 rounded-3xl p-6 mb-8 border border-gray-100 flex justify-around shrink-0">
            <DonutChart percent={selectedClub.stats.gender} label="男生占比" colorClass="stroke-blue-400" />
            <DonutChart percent={selectedClub.stats.crossMajor} label="跨学科率" colorClass="stroke-purple-400" />
            <DonutChart percent={selectedClub.stats.senior} label="高年级同学" colorClass="stroke-yellow-400" />
          </div>

          <div className="mb-8">
            <p className={`text-gray-600 leading-relaxed text-sm font-medium ${!isExpanded ? 'line-clamp-2' : ''}`}>{selectedClub.detail}</p>
            <button onClick={() => setIsExpanded(!isExpanded)} className="mt-3 text-purple-600 text-xs font-bold flex items-center gap-1 hover:text-purple-800">
              {isExpanded ? <><ChevronUp className="w-3 h-3"/> 收起详情</> : <><ChevronDown className="w-3 h-3"/> 展开全部详情</>}
            </button>
          </div>

          <div className="w-full h-px bg-gray-100 mb-6" />

          {/* 生产版公众号动态功能 完整保留 */}
          <div className="mb-6">
            <button onClick={() => setArticleExpanded(!articleExpanded)} className="w-full flex items-center justify-between mb-4 py-2 group">
              <h3 className="text-lg font-bold tracking-tight text-gray-900">社团日常 · 最新动态</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 group-hover:text-purple-600 transition-colors">来自公众号自动同步</span>
                {articleExpanded ? <ChevronUp className="w-4 h-4 text-gray-400"/> : <ChevronDown className="w-4 h-4 text-gray-400"/>}
              </div>
            </button>

            <AnimatePresence>
              {articleExpanded && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">共3篇动态，每周同步更新</span>
                    <button onClick={(e) => { e.stopPropagation(); !subscribed ? (setSubscribed(true), setShowSubscribeToast(true), setTimeout(()=>setShowSubscribeToast(false),1500)) : setSubscribed(false); }} className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${subscribed ? 'bg-gray-100 text-gray-600' : 'bg-purple-50 text-purple-600'}`}>
                      {subscribed ? <><BellOff className="w-3 h-3"/> 取消订阅</> : <><Bell className="w-3 h-3"/> 订阅更新</>}
                    </button>
                  </div>
                  {clubArticles.map((article) => (
                    <div key={article.id} onClick={() => setActiveArticle(article)} className="flex gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden">
                        <Image src={article.cover} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform" unoptimized />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1 group-hover:text-purple-600">{article.title}</h4>
                        <p className="text-xs text-gray-500 line-clamp-2 mb-2">{article.summary}</p>
                        <span className="text-[10px] font-bold text-gray-400">{article.publishTime}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 生产版微信群功能 完整保留 */}
          <div className="mb-8">
            <button onClick={() => setContactExpanded(!contactExpanded)} className="w-full flex items-center justify-between mb-4 py-2 group">
              <h3 className="text-lg font-bold tracking-tight text-gray-900">招新咨询 · 联系我们</h3>
              {contactExpanded ? <ChevronUp className="w-4 h-4 text-gray-400"/> : <ChevronDown className="w-4 h-4 text-gray-400"/>}
            </button>
            <AnimatePresence>
              {contactExpanded && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col md:flex-row gap-6 items-center">
                    <div className="relative w-32 h-32 shrink-0 bg-white rounded-xl overflow-hidden border border-gray-200">
                    <Image src="/resource/qr.png" alt={`${selectedClub.name}招新群二维码`} fill className="object-cover contrast-125" unoptimized />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-gray-900 mb-3">{selectedClub.name}2026春季招新咨询群</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>✅ 群内会发布宣讲会、笔试面试的最新通知</p>
                        <p>✅ 有学长学姐在线答疑，分享社团日常</p>
                        <p>📞 负责人微信：mtu_{selectedClub.id}_2026</p>
                        <p>⏰ 咨询时间：工作日 18:00-22:00</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-white via-white to-transparent pt-12 pb-0 px-10">
        {getApplicationStatus(selectedClub.id) ? (
          <div className="w-full py-5 bg-gray-100 text-gray-400 rounded-2xl text-center font-bold tracking-widest uppercase mb-6">查看信箱了解详情</div>
        ) : (
          <button onClick={() => setEnvelopeState("writing")} className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-xl flex items-center justify-center gap-2 mb-6">
            我要申请投递 <ArrowRight className="w-5 h-5"/>
          </button>
        )}
      </div>

      {/* 生产版订阅Toast 完整保留 */}
      <AnimatePresence>
        {showSubscribeToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[160] px-6 py-3 bg-black/90 backdrop-blur-xl text-white rounded-full shadow-2xl flex items-center gap-3"
          >
            <Check className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium">订阅成功，您的校园邮箱将会收到推送</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 生产版推文弹窗 完整保留 */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[130] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
            onClick={() => setActiveArticle(null)}
          >
            <div className="w-full max-w-xl max-h-[80vh] bg-white rounded-3xl overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="relative h-48 w-full">
                <Image src={activeArticle.cover} alt={activeArticle.title} fill className="object-cover" unoptimized />
                <button onClick={() => setActiveArticle(null)} className="absolute top-4 right-4 p-2 bg-black/30 backdrop-blur-md text-white rounded-full hover:bg-black/50 transition-colors">
                  <X className="w-4 h-4"/>
                </button>
              </div>
              <div className="p-8 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">{activeArticle.title}</h2>
                  <span className="text-xs font-bold text-gray-400">{activeArticle.publishTime}</span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">{activeArticle.content}</p>
                <a
                  href="#"
                  className="flex items-center gap-2 text-purple-600 text-sm font-bold hover:text-purple-800 transition-colors"
                >
                  查看原文公众号 <ExternalLink className="w-3 h-3"/>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ====================== 子组件2：写信页面（原版完整样式+学籍字段100%还原） ======================
const ModalWritingPage = ({ selectedClub, commitMsg, setCommitMsg, setEnvelopeState }: any) => (
  <div className="p-10 h-full flex flex-col pt-14">
    <h3 className="text-2xl font-black tracking-tight mb-6">起草投递信</h3>
    {/* 原版文案样式：tracking-wide 字间距还原 */}
    <label className="block text-sm font-bold text-gray-500 mb-3 tracking-wide">
      温小美，其实我们很想听听你想在这里获得什么？
    </label>
    <div className="flex-none h-32 bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-4">
      {/* 原版textarea完整样式还原 */}
      <textarea 
        value={commitMsg} 
        onChange={(e)=>setCommitMsg(e.target.value)}
        placeholder={`致 ${selectedClub.name}：\n\n（选填）写下你的想法...`}
        className="w-full h-full bg-transparent resize-none outline-none text-gray-800 leading-relaxed placeholder:text-gray-300 font-medium text-sm"
      />
    </div>
    <button onClick={()=>setEnvelopeState("folding")} className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 mb-6 shrink-0">
      折叠信件并预览
    </button>
    <div className="h-px bg-gray-100 mb-6" />
    <div className="flex-1 overflow-y-auto scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* 原版SSO提示：加粗高亮+完整文案还原 */}
      <div className="flex items-start gap-2 mb-4 p-3 bg-amber-50 rounded-xl border border-amber-100">
        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
        <p className="text-[11px] text-amber-800 leading-relaxed">
          通过校园 SSO 授权，你的<strong>基本学籍信息</strong>将随此信一同提供给社团审核方，以确保招新流程的高效匹配。
        </p>
      </div>
      {/* 原版完整学籍字段：补回 出生日期、籍贯 */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">姓名</div>
          <div className="text-sm font-bold text-gray-800">{ssoUserProfile.name}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">学号</div>
          <div className="text-sm font-bold text-gray-800">{ssoUserProfile.studentId}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">学院</div>
          <div className="text-sm font-bold text-gray-800">{ssoUserProfile.college}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">年级</div>
          <div className="text-sm font-bold text-gray-800">{ssoUserProfile.grade}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">出生日期</div>
          <div className="text-sm font-bold text-gray-800">{ssoUserProfile.birthDate}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">籍贯</div>
          <div className="text-sm font-bold text-gray-800">{ssoUserProfile.hometown}</div>
        </div>
      </div>
    </div>
  </div>
);

// ====================== 子组件3：折叠页面（原版纹理背景100%还原） ======================
const ModalFoldingPage = ({ selectedClub, handleStamp, setEnvelopeState }: any) => (
  <div className="h-full flex flex-col items-center justify-center p-12 bg-[#FFFDF9] relative">
    <div className="relative w-full max-w-sm aspect-[3/2] bg-white border border-gray-200 shadow-2xl rounded-sm overflow-hidden flex flex-col items-center justify-center mb-8 shrink-0">
      {/* 原版信封纹理水印100%还原 */}
      <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(45deg,_#000,_#000_1px,_transparent_1px,_transparent_10px)]" />
      <div className="text-center space-y-4 relative z-10 pointer-events-none">
        <div className="text-[10px] font-black tracking-[0.3em] text-gray-400 uppercase">Application Letter</div>
        <div className="text-2xl font-serif text-gray-800 underline decoration-gray-200 underline-offset-8">To: {selectedClub.name}</div>
      </div>
    </div>

    <motion.button 
      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      onClick={handleStamp}
      className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white ring-4 ring-red-100 mb-6 z-10"
    >
      <Stamp className="w-8 h-8" />
    </motion.button>
    
    <button onClick={() => setEnvelopeState("writing")} className="flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-[0.1em] pointer-events-auto z-[100]">
      <Undo2 className="w-4 h-4" /> 返回修改文字
    </button>
  </div>
);

// ====================== 主组件（原版动画+关闭按钮+确认提示100%还原） ======================
interface ApplicationModalProps {
  selectedClub: Club | null;
  envelopeState: "idle" | "writing" | "folding" | "sent" | "confirming";
  isExpanded: boolean;
  commitMsg: string;
  setEnvelopeState: any;
  setIsExpanded: any;
  setCommitMsg: any;
  getApplicationStatus: any;
  handleCloseModal: any;
  handleStamp: any;
  handleAnimationComplete: any;
}

export const ApplicationModal = (props: ApplicationModalProps) => {
  const { selectedClub, envelopeState, isExpanded, commitMsg, setEnvelopeState, setIsExpanded, setCommitMsg, getApplicationStatus, handleCloseModal, handleStamp, handleAnimationComplete } = props;
  
  useEffect(() => { envelopeState === "sent" && setTimeout(handleAnimationComplete, 600); }, [envelopeState]);
  if (!selectedClub) return null;

  return (
    <AnimatePresence>
      {/* 原版背景模糊+精细化z-index 100%还原 */}
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative w-full max-w-2xl"
        >
          {/* 🔥 原版信封飞出动画+layoutId共享动画 100%还原 */}
          <motion.div 
            suppressHydrationWarning
            initial={false}
            // 重点：仅在投递/确认时飞走，平时保持静止（无打开动画）
            animate={envelopeState === "sent" || envelopeState === "confirming" ? { y: -1000, opacity: 0 } : { opacity: 1 }}
            // 重点：仅保留飞走的动画效果
            transition={envelopeState === "sent" ? { duration: 0.6, ease: "easeInOut" } : { duration: 0 }}
            onAnimationComplete={handleAnimationComplete}
            className="w-full h-[750px] bg-white rounded-[40px] shadow-2xl flex flex-col overflow-hidden relative"
          >
            {/* 原版动画容器 mode="wait" 100%还原 */}
            <AnimatePresence mode="wait">
              {envelopeState !== "confirming" ? (
                <motion.div
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col h-full"
                >
                  {/* 🔥 原版关闭按钮+sent状态禁用+模糊样式 100%还原 */}
                  <button 
                    onClick={envelopeState === "sent" ? undefined : handleCloseModal} 
                    className="absolute top-6 right-6 z-[120] p-3 bg-black/20 backdrop-blur-xl text-white rounded-full hover:bg-black/40 transition-colors"
                  >
                    <X className="w-5 h-5"/>
                  </button>

                  {envelopeState === "idle" && <ModalIdleContent selectedClub={selectedClub} isExpanded={isExpanded} setIsExpanded={setIsExpanded} getApplicationStatus={getApplicationStatus} setEnvelopeState={setEnvelopeState} />}
                  {envelopeState === "writing" && <ModalWritingPage selectedClub={selectedClub} commitMsg={commitMsg} setCommitMsg={setCommitMsg} setEnvelopeState={setEnvelopeState} />}
                  {envelopeState === "folding" && <ModalFoldingPage selectedClub={selectedClub} handleStamp={handleStamp} setEnvelopeState={setEnvelopeState} />}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* 🔥 原版确认提示UI+模糊+无干扰 100%还原 */}
        <AnimatePresence>
          {envelopeState === "confirming" && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[150] flex items-center justify-center pointer-events-none"
            >
              <div className="px-8 py-4 bg-white/80 backdrop-blur-xl rounded-full shadow-2xl border border-green-100 flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-gray-800 tracking-wide">意向已送达，预计学长学姐将在 24 小时内拆阅</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
};