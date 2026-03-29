"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X, ArrowRight, Stamp, Undo2, Users, Clock, Zap, MessageSquare, Phone, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";

// --- 满血版 20 个社团数据池 (死图全部修复) ---
const clubsData = [
  { id: '1', name: '极客工作室', tags: ['硬核', '代码'], heroImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80', bar: '需选拔', time: '每周 10h+', dna: 0.8, stats: { gender: 85, crossMajor: 20, senior: 40 }, 
    summary: '把想法变成能跑的 App。', 
    detail: '【我们是谁】校园顶尖的开发者联盟。【创建了多久】2018年成立。【你能获得】从零到一的独立开发能力，大厂内推机会。【在这里有怎样的体验】你将体验无数个被红牛和代码填满的深夜，看着自己的产品在应用商店上架，享受极致的创造者成就感。',
    letters: { success: "温小美，你的代码里有很珍贵的灵气。欢迎加入我们，实验室的工位已经给你打扫干净了，期待周五见。", pending: "信件已阅。你的想法很棒，但我们需要再聊聊你的技术栈，明天下午来喝杯咖啡吧？", fail: "很遗憾，目前的坑位已满。但你的热情我们收到了，建议关注我们的开源仓库，明年再战！" } },
  { id: '2', name: '山野探险社', tags: ['e人', '户外'], heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', bar: '零基础', time: '周末全天', dna: 0.1, stats: { gender: 45, crossMajor: 90, senior: 20 }, 
    summary: '去没有天花板的地方找回呼吸的节奏。', 
    detail: '【我们是谁】一群热爱自然、拒绝内卷的户外狂热分子。【创建了多久】2015年成立。【你能获得】专业的野外生存技能，强健的体魄，以及同甘共苦的生死之交。【在这里有怎样的体验】用脚步丈量未知的山峰，在星空下围炉夜话，感受脱离城市的绝对自由。',
    letters: { success: "收拾好行囊，温小美！本周末我们要去灵山看日出，记得带上厚外套，你的帐篷我们包了。", pending: "进山需要一些基础体力，周四操场见，陪我们跑完3公里你就入队了。", fail: "今年报名的同学实在太多了，出于安全装备的配比考虑，这次只能遗憾错过。" } },
  { id: '3', name: '黑胶回声', tags: ['i人', '审美'], heroImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80', bar: '随缘', time: '每周 2h', dna: 0.3, stats: { gender: 50, crossMajor: 70, senior: 30 }, 
    summary: '在数字时代，一起听见物理的摩擦。', 
    detail: '【我们是谁】数字时代的逆行者，实体音乐的守护人。【创建了多久】2020年成立。【你能获得】海量黑胶唱片借阅权，音频设备知识，以及高品质的音乐审美。【在这里有怎样的体验】只需一杯咖啡，将唱针轻轻放下，伴随着特有的底噪，享受纯粹的沉浸时光。',
    letters: { success: "欢迎来到模拟时代的避风港。带上你最喜欢的那张唱片，周三晚上的试听会，我们留了最好的位置给你。", pending: "能分享一份你的网易云年度歌单吗？我们想先通过音乐了解你的性格。", fail: "频率暂时没对上，但音乐永不打烊。祝你在大学找到属于你的心灵共振。" } },
  { id: '4', name: '不插电音乐社', tags: ['情绪', '弹唱'], heroImage: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80', bar: '简单面试', time: '每周 4h', dna: 0.4, stats: { gender: 40, crossMajor: 80, senior: 25 }, 
    summary: '一把吉他，一个下午，一种自由。', 
    detail: '【我们是谁】用原声乐器传递情绪的街头艺术家。【创建了多久】2017年成立。【你能获得】和声技巧、乐器编配能力，以及随时随地开演唱会的胆量。【在这里有怎样的体验】没有复杂的电声设备，只有木吉他、卡宏鼓和纯粹的嗓音，在草坪上分享真实的故事。',
    letters: { success: "你的和弦很干净，声音里有故事。主唱位置给你留好了，周五琴房见！", pending: "文字不足以感受你的节奏，可以发一段你弹唱的 Demo 过来听听吗？", fail: "感谢你的热情，但今年吉他手有点超编了，期待未来在草坪上听到你的歌声。" } },
  { id: '5', name: '赛博逻辑部', tags: ['逻辑', '辩论'], heroImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80', bar: '笔试', time: '每周 8h', dna: 0.9, stats: { gender: 70, crossMajor: 40, senior: 60 }, 
    summary: '研究一切协议、逻辑与规则。', 
    detail: '【我们是谁】沉迷于推演、辩论与思想实验的极客。【创建了多久】2019年成立。【你能获得】降维打击般的批判性思维，极强的演说与反驳能力。【在这里有怎样的体验】每一次讨论都是一场脑力风暴，我们在悖论中寻找真理，在语言的交锋中重塑世界观。',
    letters: { success: "你的逻辑推演毫无破绽，非常精彩。下周一的辩论赛你来做三辩，好好准备吧。", pending: "第一题的推导有点小瑕疵，能来面谈解释一下你的思路吗？我们很期待。", fail: "你的思维很跳跃，但我们目前的课题更需要严谨的论证体系，祝顺利。" } },
  { id: '6', name: '光影叙事组', tags: ['视觉', '影像'], heroImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80', bar: '需作品集', time: '不固定', dna: 0.2, stats: { gender: 55, crossMajor: 85, senior: 35 }, 
    summary: '用镜头捕捉那些被时间遗忘的微光。', 
    detail: '【我们是谁】用镜头切片时间、用光影讲故事的视觉团队。【创建了多久】2016年成立。【你能获得】专业的摄像技术，从前期的分镜策划到后期的达芬奇调色。【在这里有怎样的体验】你将学会如何在一秒钟内抓住情绪，把平凡的校园日常拍成电影质感。',
    letters: { success: "你的样片很有灵气，审美在线。周一领设备，咱们准备拍今年的招新宣传片了。", pending: "风格很特别，但我们需要看你更多的原片，请将完整的作品集发至邮箱。", fail: "光影的缘分很妙，虽然这次没能同行，但请保持创作，保持你对生活的观察。" } },
  { id: '7', name: '深蓝潜水协会', tags: ['小众', '感官'], heroImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80', bar: '体检要求', time: '寒暑假', dna: 0.1, stats: { gender: 60, crossMajor: 90, senior: 50 }, 
    summary: '去地球的另一面，体验失重与静谧。', 
    detail: '【我们是谁】探索地球71%未知区域的深海行者。【创建了多久】2021年成立。【你能获得】AOW及以上潜水考证培训，海洋学基础知识，以及极限环境下的镇定心智。【在这里有怎样的体验】你将体验无重力状态下的终极冥想，聆听自己沉稳的呼吸声。',
    letters: { success: "体检通过！深海欢迎你。本周日泳池先进行平水训练，不见不散。", pending: "我们需要先确认你是否有深水恐惧症，找个时间面谈确认一下吧。", fail: "基于最严格的安全评估，你的体质测试未能达标，健康永远是第一位的。" } },
  { id: '8', name: '深夜食堂', tags: ['治愈', '吃货'], heroImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', bar: '会洗菜', time: '周五晚', dna: 0.3, stats: { gender: 30, crossMajor: 100, senior: 10 }, 
    summary: '食物是借口，交流才是正餐。', 
    detail: '【我们是谁】相信碳水能治愈一切的校园大厨与美食品鉴家。【创建了多久】2018年成立。【你能获得】八大菜系的烹饪技巧，关于食材的冷知识，以及永远不会饿肚子的底气。【在这里有怎样的体验】厨房不仅是做饭的地方，更是交换八卦、倾诉心事的庇护所。',
    letters: { success: "带上你最拿手的那道菜谱，本周五晚大活厨房见，大家都很期待你的手艺！", pending: "你会做川菜吗？我们目前的菜单里正缺一个能吃辣的灵魂人物。", fail: "抱歉，今年后厨的容量已经彻底饱和了，期待你以后作为食客来品尝。" } },
  { id: '9', name: '模拟联合国', tags: ['职场', '表达'], heroImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80', bar: '英语 80+', time: '每周 6h', dna: 0.7, stats: { gender: 45, crossMajor: 50, senior: 70 }, 
    summary: '在复杂的规则下，寻找多方利益的平衡点。', 
    detail: '【我们是谁】西装革履、胸怀世界的青年外交官。【创建了多久】2010年成立。【你能获得】流利的英文谈判技巧，宏观的国际关系视野，以及撰写专业决议草案的能力。【在这里有怎样的体验】代表不同的国家利益，在合纵连横中体验真实的国际博弈与交锋。',
    letters: { success: "恭喜加入，你的国家分配结果已出，请查收邮件并准备好这周末的破冰局。", pending: "文字功底不错，但我们需要进行一轮简单的英文全真模拟面试来听听你的发音。", fail: "感谢投递，今年政经类的申请者实在太多了，竞争非常激烈，祝你一切顺利。" } },
  { id: '10', name: '弈林围棋社', tags: ['传统', '定力'], heroImage: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80', bar: '无门槛', time: '每周 3h', dna: 0.6, stats: { gender: 80, crossMajor: 30, senior: 40 }, 
    summary: '方寸之间，自有天地。', 
    detail: '【我们是谁】在黑白子之间推演宇宙的求道者。【创建了多久】2005年成立。【你能获得】超凡的专注力，大局观与局部算力的双重提升，以及面对得失的平常心。【在这里有怎样的体验】一局棋就是一生，我们在寂静的活动室里听着落子声，感受千古无同局的魅力。',
    letters: { success: "期待与你手谈一局。周四下午活动室，茶已泡好，不见不散。", pending: "可以先来体验一局吗？我们想直观地看看你的棋风和思考方式。", fail: "社团活动室目前座位有限，很遗憾无法吸纳更多社员，期待你明年再来。" } },
  { id: '11', name: '涂鸦艺术阵线', tags: ['叛逆', '色彩'], heroImage: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80', bar: '敢动手', time: '随机', dna: 0.15, stats: { gender: 40, crossMajor: 85, senior: 15 }, 
    summary: '校园里的白墙，都是尚未完成的草稿。', 
    detail: '【我们是谁】用色彩宣泄情绪、重构空间的街头艺术家。【创建了多久】2019年成立。【你能获得】罐装喷漆的熟练控制，大型墙绘的构图能力，以及打破常规的视角。【在这里有怎样的体验】合法的涂鸦墙是我们的画布，戴上防毒面具，创造属于你的视觉图腾。',
    letters: { success: "准备好喷漆了吗？后街那块巨大的白墙在等你，来挥洒你的灵感吧。", pending: "周六来看看我们出工吗？亲自感受一下喷漆的氛围再决定也不迟。", fail: "你的风格很独特，但我们近期的墙绘主题更倾向于写实方向，抱歉。" } },
  { id: '12', name: 'AI 实验室', tags: ['前沿', '算法'], heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80', bar: '微积分优秀', time: '每周 15h', dna: 0.95, stats: { gender: 85, crossMajor: 10, senior: 60 }, 
    summary: '探索人类智力的最后一块拼图。', 
    detail: '【我们是谁】走在时代最前沿的算法推演者与模型炼丹师。【创建了多久】2020年成立。【你能获得】深度学习框架的实战经验，顶会论文复现能力，参与企业级项目。【在这里有怎样的体验】让机器理解世界是我们的日常，看着Loss曲线下降是最大的多巴胺来源。',
    letters: { success: "你的数学功底很扎实，算力资源已经给你配好了，明天直接来组里报到。", pending: "能发一下你的 GitHub 主页链接吗？我们需要综合评估一下实战能力。", fail: "理论基础还需夯实，推荐先上完吴恩达的课，打好基础后再来找我们。" } },
  { id: '13', name: '复古游戏部', tags: ['怀旧', '红白机'], heroImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80', bar: '无门槛', time: '每周 4h', dna: 0.4, stats: { gender: 70, crossMajor: 90, senior: 30 }, 
    summary: '8-bit 的世界里，快乐没有延迟。', 
    detail: '【我们是谁】拒绝电子阳痿、重返8-bit时代的怀旧玩家。【创建了多久】2022年成立。【你能获得】上千款中古游戏的游玩体验，CRT显像管电视维修知识，以及游戏史认知。【在这里有怎样的体验】没有氪金抽卡，只有最纯粹的跳跃和背板，找回童年的单纯快乐。',
    letters: { success: "手柄给你留好了！我们周末的《魂斗罗》速通赛正缺一个可靠的 2P。", pending: "你最喜欢的 FC/SFC 游戏是什么？找个时间我们坐下来好好聊聊。", fail: "抱歉，目前由于复古机位确实太少了，暂不开放新社员招募了。" } },
  { id: '14', name: '流浪猫救助站', tags: ['爱心', '琐碎'], heroImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80', bar: '责任心', time: '排班制', dna: 0.6, stats: { gender: 15, crossMajor: 100, senior: 25 }, 
    summary: '用温柔去缝补校园里的小小裂缝。', 
    detail: '【我们是谁】校园毛孩子们的守护神与专职铲屎官。【创建了多久】2015年成立。【你能获得】科学的宠物医疗与绝育知识，动物行为心理学，以及满满的治愈感。【在这里有怎样的体验】虽然打扫猫砂很辛苦，但当流浪猫向你翻开肚皮打呼噜时，一切都值得。',
    letters: { success: "太好了，欢迎加入大家庭！排班表已经排好，这周二早上去喂大橘吧。", pending: "救助是很辛苦且琐碎的，你能保证每周四的早起排班吗？", fail: "今年报名的人数远超预期，感谢你的爱心，你可以作为编外志愿者继续关注。" } },
  { id: '15', name: '天文观测站', tags: ['浪漫', '熬夜'], heroImage: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&q=80', bar: '能负重', time: '看天吃饭', dna: 0.2, stats: { gender: 50, crossMajor: 60, senior: 30 }, 
    summary: '既然脚踏实地，不妨仰望星空。', 
    detail: '【我们是谁】在寒夜里守望星空、追逐宇宙浪漫的守夜人。【创建了多久】2012年成立。【你能获得】星图识别能力，赤道仪与深空摄影的操作技术，以及宇宙学知识。【在这里有怎样的体验】忍受漫长的寒冷，只为捕捉到那一抹绚丽的星云和亿万光年外的光芒。',
    letters: { success: "今晚有双子座流星雨的极小期，带上你的相机，咱们天台见。", pending: "器材操作比较复杂，你会使用赤道仪吗？找个晚上来考核一下基础。", fail: "社团共用器材有限，目前为了保证体验，只接受有摄影基础的同学加入了。" } },
  { id: '16', name: '剧本创作社', tags: ['脑洞', '叙事'], heroImage: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=800&q=80', bar: '阅片量高', time: '每周 5h', dna: 0.35, stats: { gender: 48, crossMajor: 80, senior: 45 }, 
    summary: '你手握所有人命运的草稿。', 
    detail: '【我们是谁】编织梦境、操控悲欢离合的幕后黑手。【创建了多久】2020年成立。【你能获得】极强的逻辑推演与伏笔设计能力，剧本杀主持(DM)技巧，以及版税收入的可能。【在这里有怎样的体验】脑洞会被无限放大，看着玩家在你的剧本里流泪或惊呼，是终极浪漫。',
    letters: { success: "剧本大纲我看过了，结构很精巧。角色卡发给你了，你的身份是——我们的新主笔。", pending: "先来玩一局我们新写的本子吧，顺便当面测测你的推理能力。", fail: "感谢你的投稿，文笔不错，但悬疑感稍弱，这次名额有限只能割爱。" } },
  { id: '17', name: '极限滑板', tags: ['摔跤', '街头'], heroImage: 'https://images.unsplash.com/photo-1564982752979-3f7bc974d29a?w=800&q=80', bar: '抗摔', time: '每晚', dna: 0.1, stats: { gender: 60, crossMajor: 70, senior: 20 }, 
    summary: '重力的规则，就是用来被挑战的。', 
    detail: '【我们是谁】用伤疤换取肾上腺素的街头飞行员。【创建了多久】2016年成立。【你能获得】极佳的身体平衡力，各种翻板技巧，以及绝对不服输的坚韧意志。【在这里有怎样的体验】每一次摔倒都是为了下一次完美的落地，台阶和扶手就是我们的终极游乐场。',
    letters: { success: "胆子够大！带上板子，今晚操场台阶处见，我们教你飞。", pending: "发来的文字很热情，但先拍个 Ollie 的短视频发过来看看基础吧。", fail: "出于安全考量，我们建议你先在平地把基础练扎实了再考虑加社团。" } },
  { id: '18', name: '手作陶艺坊', tags: ['耐心', '触感'], heroImage: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80', bar: '不怕脏', time: '每周 3h', dna: 0.5, stats: { gender: 20, crossMajor: 90, senior: 10 }, 
    summary: '指尖的温度决定了泥土的形状。', 
    detail: '【我们是谁】与泥土和火焰直接对话的匠人。【创建了多久】2018年成立。【你能获得】拉胚、修胚的绝对专注力，釉色配比的化学知识，以及亲手打造生活器物的能力。【在这里有怎样的体验】洗去浮躁，在转盘的匀速旋转中，感受柔软的泥巴在指尖慢慢成型的静谧。',
    letters: { success: "你的拉胚机器已经安排好了，明天下午换套不怕脏的衣服，来玩泥巴。", pending: "有自己尝试设计过造型吗？如果有的话，带几张草图来看看。", fail: "社团窑炉的烧制容量有限，为了保证大家的出窑体验，这学期名额满了。" } },
  { id: '19', name: '格斗训练营', tags: ['暴汗', '抗压'], heroImage: 'https://images.unsplash.com/photo-1552072805-2a9039d00e57?w=800&q=80', bar: '基础体能', time: '每周 6h', dna: 0.85, stats: { gender: 85, crossMajor: 40, senior: 50 }, 
    summary: '在擂台上直面恐惧、用拳头说话。', 
    detail: '【我们是谁】拒绝文弱、崇尚对抗的硬汉与女武神。【创建了多久】2017年成立。【你能获得】实战防身术，爆发性体能的跃升，以及被重拳击中后依然能站起来的抗压能力。【在这里有怎样的体验】我们在安全的规则下释放原始本能，重塑钢铁般的意志。',
    letters: { success: "态度很端正！带好护齿和拳套，明天的实战对抗训练算你一个。", pending: "文字体现不出实力，周三先来做个体能摸底测试，看看你的爆发力。", fail: "安全第一，教练评估你的关节可能有隐患，不建议加入高强度的实战组。" } },
  { id: '20', name: '花艺美学社', tags: ['柔和', '减压'], heroImage: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80', bar: '无门槛', time: '每周 2h', dna: 0.45, stats: { gender: 10, crossMajor: 85, senior: 20 }, 
    summary: '一朵花的绽放，就是整场春天。', 
    detail: '【我们是谁】用植物的生命周期演绎空间美学的生活家。【创建了多久】2021年成立。【你能获得】色彩搭配的敏锐直觉，不同花材的养护知识，以及插花的流派技法。【在这里有怎样的体验】剪去内心的焦虑，在花香弥漫的午后，体验慢节奏的精致生活。',
    letters: { success: "我们新订的春季花材到了，周四下午一起来插花吧，期待你的作品。", pending: "你最喜欢的花语是什么？我们想听听你对植物的理解。", fail: "因为花材的预算是固定的，本学期的体验名额已经被早早抢光了哦。" } }
];

// --- 环形图组件 ---
const DonutChart = ({ percent, label, colorClass }: { percent: number, label: string, colorClass: string }) => {
  const dash = `${percent}, 100`;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 36 36" className="w-14 h-14 drop-shadow-sm">
        <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-100" strokeWidth="3" />
        <motion.circle 
          cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="3"
          strokeDasharray={dash} strokeLinecap="round" transform="rotate(-90 18 18)"
          className={colorClass}
          initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: dash }} transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <text x="18" y="22" textAnchor="middle" className="text-[10px] font-black fill-gray-800">{percent}%</text>
      </svg>
      <span className="text-[10px] font-bold text-gray-500 tracking-widest">{label}</span>
    </div>
  );
};

// --- 段落滑块组件 (物理3格块，左黄右紫) ---
const SegmentedControl = ({ value, onChange, leftText, rightText, labels }: { value: number, onChange: (val: number) => void, leftText: string, rightText: string, labels: string[] }) => {
  return (
    <div className="w-full mb-8">
      {/* 恢复两端文字指示 */}
      <div className="flex justify-between text-[11px] font-bold mb-4 px-2 tracking-widest">
        <span className={value === 0 ? "text-yellow-600" : "text-gray-400"}>{leftText}</span>
        <span className={value === 2 ? "text-purple-600" : "text-gray-400"}>{rightText}</span>
      </div>
      <div className="relative flex w-full h-14 bg-gray-100/80 rounded-2xl p-1.5 shadow-inner">
        <motion.div 
          className={`absolute top-1.5 bottom-1.5 w-[calc(33.33%-4px)] rounded-xl shadow-md border ${value === 0 ? 'bg-yellow-400 border-yellow-300' : value === 2 ? 'bg-purple-500 border-purple-400' : 'bg-white border-gray-200'}`}
          animate={{ left: `calc(${ value * 33.33 }% + 6px)` }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
        <button onClick={() => onChange(0)} className={`flex-1 relative z-10 font-bold text-xs transition-colors ${value === 0 ? 'text-black' : 'text-gray-400'}`}>{labels[0]}</button>
        <button onClick={() => onChange(1)} className={`flex-1 relative z-10 font-bold text-xs transition-colors ${value === 1 ? 'text-black' : 'text-gray-400'}`}>{labels[1]}</button>
        <button onClick={() => onChange(2)} className={`flex-1 relative z-10 font-bold text-xs transition-colors ${value === 2 ? 'text-white' : 'text-gray-400'}`}>{labels[2]}</button>
      </div>
    </div>
  );
};

// --- 模拟 SSO 获取的用户个人信息 ---
const ssoUserProfile = {
  name: "温小美",
  college: "经济与贸易学院",
  major: "国际经济与贸易",
  grade: "2024级 本科",
  birthDate: "2006年12月19日",
  gender: "女",
  hometown: "广东省深圳市",
  studentId: "2024027852"
};

export default function ClubHubDemo() {
  const [step, setStep] = useState(0);
  const [prefs, setPrefs] = useState({ social: 1, energy: 1, time: 1 });
  const [tags, setTags] = useState<string[]>([]);
  
  // 匹配状态逻辑
  const [isMatching, setIsMatching] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [matchedClubs, setMatchedClubs] = useState<{top: any[], others: any[]}>({top: [], others: []});

  const [selectedClub, setSelectedClub] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [envelopeState, setEnvelopeState] = useState<"idle" | "writing" | "folding" | "sent" | "confirming">("idle");
  const [commitMsg, setCommitMsg] = useState("");
  
  // 修改 history 类型，增加 read: boolean 状态
  const [history, setHistory] = useState<{club: any, status: string, result: string, msg: string, read: boolean}[]>([]);
  const [feedbackToast, setFeedbackToast] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [readingLetter, setReadingLetter] = useState<any>(null);

  // 1. 辅助函数：获取申请状态
  const getApplicationStatus = (id: string) => {
    const record = history.find(h => h.club.id === id);
    return record ? record.status : null;
  };

  // 2. 计算是否有未读消息
  const hasUnread = history.some(h => !h.read);

  // 恢复 Tag 联动逻辑
  useEffect(() => {
    const newTags = [];
    if (prefs.social === 2) newTags.push({ text: "我是大佬", color: "purple" });
    if (prefs.social === 0) newTags.push({ text: "重在参与", color: "yellow" });
    if (prefs.energy === 2) newTags.push({ text: "全场焦点", color: "purple" });
    if (prefs.energy === 0) newTags.push({ text: "默默潜水", color: "yellow" });
    if (prefs.time === 2) newTags.push({ text: "燃烧青春", color: "purple" });
    if (prefs.time === 0) newTags.push({ text: "佛系打卡", color: "yellow" });
    setTags(newTags.map(t => t.text)); // 为简化只传文字
  }, [prefs]);

  const handleLogin = () => {
    setStep(1);
    setTimeout(() => setStep(2), 2000);
  };

  // 3秒拟真匹配计算
  const startMatching = () => {
    setIsMatching(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        clearInterval(interval);
        setLoadingProgress(100);
        
        // 简单的伪算法打乱并截取
        const shuffled = [...clubsData].sort(() => 0.5 - Math.random());
        setMatchedClubs({
          top: shuffled.slice(0, 6),
          others: shuffled.slice(6)
        });

        setTimeout(() => {
          setIsMatching(false);
          setStep(3);
        }, 400);
      } else {
        setLoadingProgress(progress);
      }
    }, 300);
  };

  // 全局强制关闭模态框
  const handleCloseModal = () => {
    setSelectedClub(null);
    setEnvelopeState("idle");
    setIsExpanded(false);
  };

  const handleStamp = () => {
    setEnvelopeState("sent");
  };

  // 处理动画完成后的逻辑
  const handleAnimationComplete = () => {
    if (envelopeState === "sent") {
      setEnvelopeState("confirming");
      
      const resultTypes = ["success", "pending", "fail"];
      const randomResult = resultTypes[Math.floor(Math.random() * 3)];
      
      // 新增记录时，默认 read: false
      const newRecord = { 
        club: selectedClub, 
        status: "已寄出", 
        result: randomResult, 
        msg: commitMsg, 
        read: false 
      };
      
      setHistory([...history, newRecord]);

      // 1.5秒后关闭整个弹窗
      setTimeout(() => {
        handleCloseModal();
        setCommitMsg("");
        
        // 模拟收到回执
        setTimeout(() => {
          let statusText = randomResult === "success" ? "已录取" : randomResult === "pending" ? "待面谈" : "遗憾落选";
          
          // 更新状态，保持 read: false (因为是新消息)
          setHistory(prev => prev.map(h => h.club.id === selectedClub.id ? { ...h, status: statusText, read: false } : h));
          
          // Toast 现在携带 clubId 信息，方便点击时定位
          setFeedbackToast({ clubName: selectedClub.name, status: statusText, clubId: selectedClub.id });
          setTimeout(() => setFeedbackToast(null), 8000);
        }, 5000);

      }, 1500);
    }
  };

  // 3. 点击 Toast 处理函数
  const handleToastClick = () => {
    if (feedbackToast) {
      setFeedbackToast(null);
      setDrawerOpen(true);
      // (可选增强) 这里可以通过 state 记录要高亮的 ID，在抽屉里做一个闪烁效果
    }
  };

  // 4. 打开抽屉时标记所有为已读
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
    // 标记所有为已读
    setHistory(prev => prev.map(h => ({ ...h, read: true })));
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1D1D1F] selection:bg-purple-100 font-sans relative overflow-x-hidden">
      
      {/* 步骤 0 & 1: 登录与动画 */}
      <AnimatePresence>
        {step < 2 && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
            {step === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center w-full max-w-md px-8"
              >
                {/* 背景装饰： subtle gradient */}
                <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#FDFCFB] via-[#F5F3EF] to-[#FDFCFB]" />
                
                {/* 内容卡片 */}
                <div className="w-full bg-white/60 backdrop-blur-xl border border-white/50 rounded-[32px] p-10 shadow-2xl flex flex-col items-center">
                  
                  {/* 顶部小 Logo */}
                  <div className="w-12 h-12 mb-8 rounded-2xl bg-[#FFC107] text-black text-black flex items-center justify-center text-lg font-black shadow-lg tracking-tighter">
                    MTU
                  </div>

                  {/* 标题区 */}
                  <div className="text-center mb-10 space-y-3">
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-tight">
                      美团大学社团<br/>智能匹配平台
                    </h1>
                    <p className="text-sm font-medium text-gray-400 tracking-wide">
                      找到属于你的频率
                    </p>
                  </div>

                  {/* 登录按钮 */}
                  <button 
                    onClick={handleLogin} 
                    className="w-full py-4 bg-black text-white rounded-xl font-bold text-sm hover:bg-zinc-800 transition-all shadow-xl hover:shadow-2xl active:scale-[0.98]"
                  >
                    通过校园门户授权登录
                  </button>
                </div>

                <div className="mt-4 text-[14px] text-dark-gray-300 font-medium text-center">
                登录即同意同步学籍信息用于社团招新
                </div>

                {/* 底部版权小字 */}
                <div className="mt-8 text-[10px] font-bold text-grey-300 tracking-widest uppercase">
                  Meituan University · Student Association
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col items-center gap-6">
                <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-sm font-bold text-gray-500 tracking-widest">欢迎回来，温小美。正在同步基础信息...</div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 步骤 2: 气场拨盘 */}
      <AnimatePresence>
        {step === 2 && !isMatching && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center min-h-screen max-w-lg mx-auto px-6">
            <h2 className="text-3xl font-black mb-16 tracking-tight">标定你的气场</h2>
            
            <SegmentedControl value={prefs.social} onChange={(v) => setPrefs({...prefs, social: v})} leftText="轻松交友" rightText="硬核本领" labels={["重在参与", "随遇而安", "我是大佬"]} />
            <SegmentedControl value={prefs.energy} onChange={(v) => setPrefs({...prefs, energy: v})} leftText="i人舒适区" rightText="e人蹦迪场" labels={["默默潜水", "偶尔冒泡", "全场焦点"]} />
            <SegmentedControl value={prefs.time} onChange={(v) => setPrefs({...prefs, time: v})} leftText="课余打发时间" rightText="全情投入" labels={["佛系打卡", "劳逸结合", "燃烧青春"]} />

            {/* Tag 联动区 */}
            <div className="flex flex-wrap justify-center gap-3 mt-6 h-10">
              {tags.map((tag) => (
                <motion.span key={tag} layout initial={{ scale: 0 }} animate={{ scale: 1 }} className={`px-4 py-2 text-[10px] font-black rounded-full border uppercase tracking-widest ${tag === '我是大佬' || tag === '全场焦点' || tag === '燃烧青春' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-yellow-50 text-yellow-600 border-yellow-100'}`}>
                  #{tag}
                </motion.span>
              ))}
            </div>

            <button onClick={startMatching} className="mt-12 px-12 py-5 bg-black text-white rounded-2xl flex items-center gap-3 group shadow-2xl font-bold hover:bg-zinc-800 transition-colors">
              <span>开始寻找社团</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 步骤 2.5: 拟真加载 */}
      <AnimatePresence>
        {isMatching && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[#FDFCFB]">
             <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
               <motion.div className="h-full bg-purple-500" animate={{ width: `${loadingProgress}%` }} transition={{ duration: 0.2 }} />
             </div>
             <div className="text-sm font-bold text-gray-400 tracking-widest">{loadingProgress}% · 正在根据你的情况匹配推荐社团...</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 步骤 3: 探索大厅 (分层展示) */}
      {step === 3 && (
        <div className="max-w-7xl mx-auto px-8 pt-20 pb-40">
          
          {/* Top 6 精选区 */}
          <header className="mb-12">
            <h2 className="text-4xl font-black mb-4 tracking-tighter">为你找到的频率</h2>
            <div className="flex gap-2 text-sm text-gray-400 font-medium">可能最感兴趣 · <span className="text-purple-500 font-bold">高匹配度精选</span></div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            {matchedClubs.top.map((club) => {
              const exploreRatio = (1 - club.dna) * 100;
              const deliveryRatio = club.dna * 100;
              const status = getApplicationStatus(club.id); // 获取动态状态
              
              return (
                <motion.div key={club.id} layoutId={`card-${club.id}`} onClick={() => setSelectedClub(club)} className="group relative h-[500px] rounded-[32px] overflow-hidden cursor-pointer bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <img src={club.heroImage} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                    {status && (
                      <div className={`absolute top-6 left-6 px-4 py-1.5 backdrop-blur-md rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm 
                        ${status === '已录取' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 
                          status === '待面谈' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' : 
                          status === '遗憾落选' ? 'bg-gray-500/20 text-gray-300 border border-gray-500/30' : 
                          'bg-white/20 text-white border border-white/30'}`}>
                        {status}
                      </div>
                    )}
                    <h3 className="text-3xl font-black mb-3 tracking-tight">{club.name}</h3>
                    <p className="text-sm text-white/70 mb-8 line-clamp-2 font-medium">{club.summary}</p>
                    
                    <div className="mb-8 p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                      <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] mb-3">
                        <span className={club.dna < 0.5 ? "text-yellow-400 font-black drop-shadow-md" : "text-white/30 font-bold"}>探索型</span>
                        <span className={club.dna >= 0.5 ? "text-purple-300 font-black drop-shadow-md" : "text-white/30 font-bold"}>交付型</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full flex overflow-hidden">
                         <div className="h-full bg-yellow-400" style={{ width: `${exploreRatio}%` }} />
                         <div className="h-full bg-purple-500" style={{ width: `${deliveryRatio}%` }} />
                      </div>
                    </div>
                    
                    <div className="flex gap-6 text-[11px] font-black text-white/50 tracking-widest uppercase">
                      <span className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-yellow-400"/>{club.bar}</span>
                      <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-purple-400"/>{club.time}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* 分割线 */}
          <div className="relative w-full h-px bg-gray-200 mb-16">
            <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-[#FDFCFB] px-6 text-sm font-bold text-gray-400 tracking-widest">更多社团探索</span>
          </div>

          {/* 剩余社团区 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 opacity-90 hover:opacity-100 transition-opacity duration-500">
            {matchedClubs.others.map((club) => {
              const exploreRatio = (1 - club.dna) * 100;
              const deliveryRatio = club.dna * 100;
              const status = getApplicationStatus(club.id); // 同样获取动态状态
              
              return (
                <motion.div key={club.id} layoutId={`card-${club.id}`} onClick={() => setSelectedClub(club)} className="group relative h-[450px] rounded-[32px] overflow-hidden cursor-pointer bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <img src={club.heroImage} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                     {status && (
                      <div className={`absolute top-5 left-5 px-3 py-1 backdrop-blur-md rounded-full text-[9px] font-black tracking-widest uppercase shadow-sm 
                        ${status === '已录取' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 
                          status === '待面谈' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' : 
                          status === '遗憾落选' ? 'bg-gray-500/20 text-gray-300 border border-gray-500/30' : 
                          'bg-white/20 text-white border border-white/30'}`}>
                        {status}
                      </div>
                    )}
                    <h3 className="text-2xl font-black mb-2 tracking-tight">{club.name}</h3>
                    <p className="text-xs text-white/70 mb-6 line-clamp-2 font-medium">{club.summary}</p>
                    
                    <div className="mb-6 p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                      <div className="flex justify-between text-[9px] uppercase tracking-[0.2em] mb-2">
                        <span className={club.dna < 0.5 ? "text-yellow-400 font-black drop-shadow-md" : "text-white/30 font-bold"}>探索型</span>
                        <span className={club.dna >= 0.5 ? "text-purple-300 font-black drop-shadow-md" : "text-white/30 font-bold"}>交付型</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full flex overflow-hidden">
                         <div className="h-full bg-yellow-400" style={{ width: `${exploreRatio}%` }} />
                         <div className="h-full bg-purple-500" style={{ width: `${deliveryRatio}%` }} />
                      </div>
                    </div>
                    
                    <div className="flex gap-4 text-[10px] font-black text-white/50 tracking-widest uppercase">
                      <span className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-yellow-400"/>{club.bar}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-purple-400"/>{club.time}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      )}

      {/* 模态框 */}
      <AnimatePresence>
        {selectedClub && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-lg">
            <motion.div 
              className="relative w-full max-w-2xl"
              animate={{ 
                y: envelopeState === "sent" ? -1000 : 0, 
                scale: envelopeState === "sent" ? 0.8 : 1, 
                opacity: (envelopeState === "sent" || envelopeState === "confirming") ? 0 : 1 
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              onAnimationComplete={handleAnimationComplete}
            >
              <motion.div layoutId={`card-${selectedClub.id}`} className="w-full h-[750px] bg-white rounded-[40px] shadow-2xl flex flex-col overflow-hidden relative">
                
                <button onClick={handleCloseModal} className="absolute top-6 right-6 z-[120] p-3 bg-black/20 backdrop-blur-xl text-white rounded-full hover:bg-black/40 transition-colors">
                  <X className="w-5 h-5"/>
                </button>

                <AnimatePresence mode="wait">
                  {envelopeState === "idle" && (
                    <motion.div key="details" exit={{ opacity: 0, x: -50 }} className="flex flex-col h-full">
                      <div className="relative h-64 shrink-0">
                        <img src={selectedClub.heroImage} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                      </div>
                      
                      <div className="px-10 pb-10 flex-1 overflow-y-auto pt-2">
                        <h2 className="text-4xl font-black tracking-tight mb-8 pr-12">{selectedClub.name}</h2>
                        
                        <div className="bg-gray-50 rounded-3xl p-6 mb-8 border border-gray-100 flex justify-around shrink-0">
                           <DonutChart percent={selectedClub.stats.gender} label="男生占比" colorClass="stroke-blue-400" />
                           <DonutChart percent={selectedClub.stats.crossMajor} label="跨学科率" colorClass="stroke-purple-400" />
                           <DonutChart percent={selectedClub.stats.senior} label="高年级同学" colorClass="stroke-yellow-400" />
                        </div>

                        <div className="mb-8">
                          <p className={`text-gray-600 leading-relaxed text-sm font-medium ${!isExpanded ? 'line-clamp-2' : ''}`}>
                            {selectedClub.detail}
                          </p>
                          <button onClick={() => setIsExpanded(!isExpanded)} className="mt-3 text-purple-600 text-xs font-bold flex items-center gap-1 hover:text-purple-800">
                            {isExpanded ? <><ChevronUp className="w-3 h-3"/> 收起详情</> : <><ChevronDown className="w-3 h-3"/> 展开全部详情</>}
                          </button>
                        </div>
                        
                        <div className="pt-4 mt-auto">
                          {getApplicationStatus(selectedClub.id) ? (
                            <div className="w-full py-5 bg-gray-100 text-gray-400 rounded-2xl text-center font-bold tracking-widest uppercase">查看信箱了解详情</div>
                          ) : (
                            <button onClick={() => setEnvelopeState("writing")} className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-xl flex items-center justify-center gap-2">
                              我要申请投递 <ArrowRight className="w-5 h-5"/>
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {envelopeState === "writing" && (
                    <motion.div key="writing" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="p-10 h-full flex flex-col pt-14">
                      <h3 className="text-2xl font-black tracking-tight mb-6">起草投递信</h3>
                      
                      <label className="block text-sm font-bold text-gray-500 mb-3 tracking-wide">
                        温小美，其实我们很想听听你想在这里获得什么？
                      </label>
                      
                      <div className="flex-none h-32 bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-4 relative">
                        <textarea 
                          value={commitMsg} onChange={(e) => setCommitMsg(e.target.value)}
                          placeholder={`致 ${selectedClub.name}：\n\n（选填）写下你的想法...`}
                          className="w-full h-full bg-transparent resize-none outline-none text-gray-800 leading-relaxed placeholder:text-gray-300 font-medium text-sm"
                        />
                      </div>
                      
                      <button onClick={() => setEnvelopeState("folding")} className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 mb-6 shrink-0">
                        折叠信件并预览
                      </button>

                      <div className="h-px bg-gray-100 w-full mb-6" />

                      <div className="flex-1 overflow-y-auto">
                        <div className="flex items-start gap-2 mb-4 p-3 bg-amber-50 rounded-xl border border-amber-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                          <p className="text-[11px] text-amber-800 leading-relaxed">
                            通过校园 SSO 授权，你的<strong>基本学籍信息</strong>将随此信一同提供给社团审核方，以确保招新流程的高效匹配。
                          </p>
                        </div>

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
                    </motion.div>
                  )}

                  {envelopeState === "folding" && (
                    <motion.div key="envelope" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-full flex flex-col items-center justify-center p-12 bg-[#FFFDF9] relative">
                      <div className="relative w-full max-w-sm aspect-[3/2] bg-white border border-gray-200 shadow-2xl rounded-sm overflow-hidden flex flex-col items-center justify-center mb-8 shrink-0">
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

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
        )}
      </AnimatePresence>

      {/* 反馈通知弹窗 (修改为可点击) */}
      <AnimatePresence>
        {feedbackToast && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ y: 50, opacity: 0 }} 
            onClick={handleToastClick}
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

      {/* 右下角信箱抽屉入口 (修改红点逻辑) */}
      {step === 3 && (
        <button onClick={handleDrawerOpen} className="fixed bottom-10 right-10 w-16 h-16 bg-black shadow-2xl rounded-full flex items-center justify-center z-40 hover:scale-105 transition-transform">
          <Mail className="w-6 h-6 text-white" />
          {hasUnread && <span className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full border-2 border-black animate-pulse" />}
        </button>
      )}

      {/* 信箱抽屉 */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawerOpen(false)} className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-[70]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }} className="fixed top-0 right-0 h-full w-[420px] bg-white shadow-2xl z-[80] flex flex-col">
              <div className="p-10 pb-6 flex justify-between items-center border-b border-gray-100">
                <h3 className="text-2xl font-black tracking-tight">我的信箱</h3>
                <button onClick={() => setDrawerOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X className="w-4 h-4"/></button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-10 space-y-4 bg-gray-50/50">
                {history.length === 0 ? (
                  <div className="py-20 text-center text-gray-300 font-bold tracking-widest uppercase">暂无信件</div>
                ) : (
                  history.map((h, i) => (
                    <div key={i} onClick={() => h.status !== "已寄出" && setReadingLetter(h)} className={`p-6 rounded-[24px] bg-white border flex justify-between items-center group transition-shadow ${h.status !== "已寄出" ? "cursor-pointer hover:shadow-xl border-purple-100" : "border-gray-100"}`}>
                      <div className="relative">
                        {/* 列表里的小圆点指示未读 */}
                        {!h.read && <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full" />}
                        <div className="font-bold text-base mb-1">{h.club.name}</div>
                        <div className={`text-[10px] font-black uppercase tracking-widest ${h.status === '已录取' ? 'text-green-500' : h.status === '待面谈' ? 'text-orange-500' : h.status === '遗憾落选' ? 'text-gray-400' : 'text-purple-500'}`}>
                          {h.status}
                        </div>
                      </div>
                      {h.status === "已寄出" ? (
                        <button onClick={(e) => { e.stopPropagation(); setHistory(history.filter((_, idx) => idx !== i)); }} className="text-[10px] text-red-500 font-bold px-4 py-2 bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">撤回</button>
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

      {/* 充满温度的阅读信件 Modal */}
      <AnimatePresence>
        {readingLetter && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-md bg-[#FFFDF9] rounded-3xl p-10 shadow-2xl relative border border-gray-200">
               <button onClick={() => setReadingLetter(null)} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black"><X/></button>
               <div className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-8 border-b border-gray-200 pb-4">From: {readingLetter.club.name}</div>
               
               <p className="text-gray-800 leading-relaxed font-medium mb-10 text-lg">
                 {readingLetter.club.letters[readingLetter.result]}
               </p>
               
               {(readingLetter.result === "success" || readingLetter.result === "pending") && (
                 <div className="p-5 bg-green-50/80 text-green-800 rounded-2xl text-sm font-medium border border-green-100 leading-relaxed">
                   <div className="flex items-center gap-2 mb-2 font-bold"><Phone className="w-4 h-4"/> 录取联络档案已生成</div>
                   <div>社团招新专员：138-0000-0000</div>
                   <div className="text-gray-500 mt-2 text-xs">通知将同时发送至校园门户预留手机号：(+86) 155****9927</div>
                 </div>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}