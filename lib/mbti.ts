import love28Rows from "../questions_love_28.json";
import standard93Rows from "../questions_standard_93.json";

export type MbtiAxis = "EI" | "SN" | "TF" | "JP";
export type MbtiLetter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
export type MbtiType =
  | "INTJ"
  | "INTP"
  | "ENTJ"
  | "ENTP"
  | "INFJ"
  | "INFP"
  | "ENFJ"
  | "ENFP"
  | "ISTJ"
  | "ISFJ"
  | "ESTJ"
  | "ESFJ"
  | "ISTP"
  | "ISFP"
  | "ESTP"
  | "ESFP";

export type QuestionOption = {
  label: string;
  value: MbtiLetter | null;
};

export type MbtiQuestion = {
  id: string;
  axis: MbtiAxis;
  text: string;
  options: QuestionOption[];
};

export type MbtiScores = Record<MbtiLetter, number>;
export type MbtiAnswerValue = MbtiLetter | "X";
export type PersonalityTestId = "mbti-28" | "mbti-93";
export type PersonalityTest = {
  id: PersonalityTestId;
  title: string;
  eyebrow: string;
  description: string;
  resultPath: string;
  questions: MbtiQuestion[];
};

type RawQuestionOption = {
  key: string;
  text: string;
};

type RawImportedQuestion = {
  question_id: string;
  question_text: string;
  options: RawQuestionOption[];
};
export type CompatibilityOption = {
  label: string;
  value: MbtiType;
};

export type CompatibilityQuestion = {
  id: string;
  text: string;
  options: CompatibilityOption[];
};

export type CompatibilityTest = {
  selfType: MbtiType;
  candidates: MbtiType[];
  title: string;
  hook: string;
  questions: CompatibilityQuestion[];
};

export const mbtiQuestions: MbtiQuestion[] = [
  {
    id: "q1",
    axis: "EI",
    text: "刚开始暧昧时，你更像哪一种？",
    options: [
      { label: "主动制造聊天机会，想快点确认感觉", value: "E" },
      { label: "先观察对方节奏，慢慢把心打开", value: "I" }
    ]
  },
  {
    id: "q2",
    axis: "SN",
    text: "你判断一段关系是否适合时，更看重：",
    options: [
      { label: "日常相处是否稳定、具体、可靠", value: "S" },
      { label: "彼此是否有想象空间和精神共鸣", value: "N" }
    ]
  },
  {
    id: "q3",
    axis: "TF",
    text: "伴侣情绪低落时，你通常会：",
    options: [
      { label: "帮对方梳理问题，找到可执行办法", value: "T" },
      { label: "先接住情绪，让对方感到被理解", value: "F" }
    ]
  },
  {
    id: "q4",
    axis: "JP",
    text: "约会安排临时变化，你会更倾向：",
    options: [
      { label: "希望提前说清楚，避免计划被打乱", value: "J" },
      { label: "顺着当下气氛走，也可能有惊喜", value: "P" }
    ]
  },
  {
    id: "q5",
    axis: "EI",
    text: "恋爱里的能量来源更接近：",
    options: [
      { label: "多互动、多分享，越聊越有电", value: "E" },
      { label: "保留独处空间，关系才更舒服", value: "I" }
    ]
  },
  {
    id: "q6",
    axis: "SN",
    text: "你更容易被哪种告白打动？",
    options: [
      { label: "记得细节、安排妥帖、行动很真诚", value: "S" },
      { label: "懂你的理想、隐喻和未说出口的期待", value: "N" }
    ]
  },
  {
    id: "q7",
    axis: "TF",
    text: "产生分歧时，你更希望双方：",
    options: [
      { label: "把事实和边界讲清楚", value: "T" },
      { label: "先确认彼此没有被伤害", value: "F" }
    ]
  },
  {
    id: "q8",
    axis: "JP",
    text: "你理想中的恋爱节奏是：",
    options: [
      { label: "关系阶段清晰，承诺逐步落地", value: "J" },
      { label: "自然生长，不急着给每件事命名", value: "P" }
    ]
  },
  {
    id: "q9",
    axis: "EI",
    text: "遇到喜欢的人，你比较可能：",
    options: [
      { label: "表达好感，让对方感到热度", value: "E" },
      { label: "用细微行动靠近，不太直接说破", value: "I" }
    ]
  },
  {
    id: "q10",
    axis: "SN",
    text: "你更在意伴侣带给你的：",
    options: [
      { label: "真实陪伴和可感知的安全感", value: "S" },
      { label: "灵感、成长和看世界的新角度", value: "N" }
    ]
  },
  {
    id: "q11",
    axis: "TF",
    text: "恋爱中的夸奖，你更常给出：",
    options: [
      { label: "你处理这件事真的很厉害", value: "T" },
      { label: "和你在一起我觉得很安心", value: "F" }
    ]
  },
  {
    id: "q12",
    axis: "JP",
    text: "你对纪念日和仪式感的态度是：",
    options: [
      { label: "最好提前准备，认真对待", value: "J" },
      { label: "心意到了就好，形式可以灵活", value: "P" }
    ]
  }
];

const axisPairs: Record<MbtiAxis, [MbtiLetter, MbtiLetter]> = {
  EI: ["E", "I"],
  SN: ["S", "N"],
  TF: ["T", "F"],
  JP: ["J", "P"]
};

const loveExperienceQuestionBank: Record<MbtiAxis, Array<{ text: string; left: string; right: string }>> = {
  EI: [
    { text: "一段关系刚开始变暧昧时，你更自然的反应是？", left: "主动增加互动，让关系快一点热起来", right: "先观察彼此节奏，确认舒服后再靠近" },
    { text: "和伴侣发生误会后，你通常更倾向于：", left: "尽快聊开，不喜欢把情绪憋太久", right: "先自己消化一下，再找合适时机表达" },
    { text: "恋爱中你更需要哪种能量补给？", left: "频繁分享、见面和互动带来的连接感", right: "保留独处空间后，再更稳定地投入关系" },
    { text: "面对喜欢的人，你更像是：", left: "愿意主动制造机会，让对方感到你的热度", right: "用细节慢慢靠近，不太急着把话说满" },
    { text: "约会结束后，你更可能：", left: "马上分享感受，继续把话题延伸下去", right: "安静回味，等情绪沉淀后再回应" },
    { text: "在亲密关系里，你更害怕：", left: "互动变少，像两个人慢慢失联", right: "边界被打扰，自己没有喘息空间" },
    { text: "当伴侣带你认识新朋友时，你通常：", left: "比较快进入状态，也愿意参与聊天", right: "需要一点时间适应，再慢慢打开自己" }
  ],
  SN: [
    { text: "你判断对方是否适合长期相处时，更看重：", left: "日常是否可靠，承诺能不能落到具体行动", right: "彼此是否有精神共鸣和未来想象空间" },
    { text: "你更容易被哪种浪漫打动？", left: "记得你的习惯，把照顾放在细节里", right: "懂你的隐喻、理想和没有说出口的期待" },
    { text: "关系出现问题时，你更先关注：", left: "具体发生了什么，下一步怎么处理", right: "这背后代表什么，关系模式哪里要调整" },
    { text: "伴侣描述未来时，哪种表达更吸引你？", left: "清楚说出生活安排、时间表和责任分工", right: "描绘两个人会变成怎样、一起经历什么" },
    { text: "你更相信哪一种喜欢？", left: "稳定出现、持续付出、细节一致", right: "灵魂理解、价值吸引、心照不宣" },
    { text: "在约会选择上，你更偏好：", left: "舒服熟悉、不会出错的安排", right: "有新鲜感、能打开体验的安排" },
    { text: "你回忆一段关系时，最先想起的是：", left: "一起做过的具体小事和真实片段", right: "那段关系带给你的意义和成长" }
  ],
  TF: [
    { text: "伴侣难过时，你更本能地会：", left: "帮对方分析原因，找到能解决的办法", right: "先陪着对方，让情绪被看见和接住" },
    { text: "争吵中你更希望双方做到：", left: "讲事实、讲边界，不把问题扩大", right: "照顾感受，确认彼此没有被否定" },
    { text: "当你需要做关系决定时，更依赖：", left: "逻辑、长期成本和现实可行性", right: "内心感受、在不在乎和是否安心" },
    { text: "你更喜欢伴侣怎样表达建议？", left: "直接指出问题，给出清晰判断", right: "先理解你的处境，再温和提出想法" },
    { text: "如果对方临时爽约，你更在意：", left: "原因是否合理，以及之后如何补救", right: "自己有没有被重视、被放在心上" },
    { text: "你认为成熟的关系更需要：", left: "清楚规则和理性沟通", right: "共情能力和情绪照顾" },
    { text: "面对伴侣的缺点，你更可能：", left: "直接讨论是否能调整", right: "先理解原因，再判断自己能否包容" }
  ],
  JP: [
    { text: "你更舒服的恋爱节奏是：", left: "阶段清楚，关系一步步确认下来", right: "自然发展，不急着定义每一步" },
    { text: "旅行或约会前，你更倾向于：", left: "提前安排好路线和时间，减少意外", right: "留一些弹性，看当天状态决定" },
    { text: "面对关系里的不确定，你通常会：", left: "希望尽快谈清楚，给彼此一个答案", right: "允许它先存在，边相处边确认" },
    { text: "你对纪念日和仪式感的态度更接近：", left: "认真准备，这代表关系被重视", right: "心意比形式重要，可以灵活一点" },
    { text: "长期关系中，你更需要：", left: "稳定预期、明确承诺和共同计划", right: "自由空间、临场惊喜和关系弹性" },
    { text: "如果计划被临时改变，你更容易：", left: "不太舒服，希望重新安排清楚", right: "顺势调整，也许会有新的体验" },
    { text: "你更欣赏伴侣哪一点？", left: "说到做到，重要事情有交代", right: "松弛灵活，能让日子不被计划绑死" }
  ]
};

const fullPersonalityQuestionBank: Record<MbtiAxis, Array<{ text: string; left: string; right: string }>> = {
  EI: [
    { text: "一个自由的周末，你更容易选择：", left: "约朋友见面或参加活动，让状态热起来", right: "自己待一会儿，恢复注意力和能量" },
    { text: "进入陌生团队时，你通常：", left: "先开口互动，边聊边熟悉环境", right: "先观察氛围，找到位置后再表达" },
    { text: "遇到新想法时，你更喜欢：", left: "说出来和别人碰撞，越聊越清楚", right: "先自己想完整，再选择性分享" },
    { text: "长时间社交之后，你通常会：", left: "还想继续延伸话题或安排下一场", right: "需要安静时间，把自己收回来" },
    { text: "做决定前，你更常：", left: "找人讨论，在反馈里形成判断", right: "独立整理，确认后再告诉别人" },
    { text: "你更容易被别人形容为：", left: "外放、好接近、反应快", right: "安静、稳定、有自己的节奏" },
    { text: "在课堂或会议中，你更可能：", left: "边听边回应，愿意现场发言", right: "认真听完，之后再补充想法" },
    { text: "压力大时，你更想：", left: "找人聊聊，从互动中获得支持", right: "减少外界输入，自己慢慢消化" },
    { text: "你认识一个人通常靠：", left: "多互动几次，很快建立熟悉感", right: "慢慢观察细节，逐步建立信任" },
    { text: "在群体活动里，你更自然地：", left: "带动气氛或参与多个话题", right: "专注少数人或一个具体任务" },
    { text: "表达喜欢或认可时，你更倾向：", left: "直接说出来，让对方马上感受到", right: "用行动和细节表达，不一定高调" },
    { text: "你处理复杂信息时，更喜欢：", left: "边讲边整理思路", right: "先静下来在脑中搭好结构" },
    { text: "别人突然来找你聊天，你通常：", left: "容易接住，并顺着话题展开", right: "要看当下状态，可能需要缓一缓" },
    { text: "你更喜欢的工作方式是：", left: "有沟通、有反馈、有即时互动", right: "有独立空间，少被频繁打断" },
    { text: "参加聚会时，你更在意：", left: "是否有趣、热闹、能认识人", right: "是否舒服、熟悉、能自然相处" },
    { text: "当你有情绪时，你更常：", left: "说出来后才知道自己怎么了", right: "想清楚后才知道要怎么说" },
    { text: "你更享受哪种学习方式？", left: "讨论、展示、和别人互相启发", right: "阅读、沉浸、按自己的节奏理解" },
    { text: "别人对你的第一印象更可能是：", left: "有活力，容易打开局面", right: "有距离感，但相处后很稳定" },
    { text: "面对机会时，你更容易：", left: "先参与进去，再边做边判断", right: "先评估清楚，再决定是否投入" },
    { text: "日常沟通里，你更偏向：", left: "即时回应，保持连接", right: "集中回复，保留自己的节奏" },
    { text: "你觉得最舒服的人际距离是：", left: "多联系、多分享，关系才有温度", right: "不必时时联系，但彼此心里有位置" },
    { text: "你在新环境里的适应方式是：", left: "通过行动和互动快速融入", right: "通过观察和理解慢慢适应" },
    { text: "当别人问你近况，你更可能：", left: "自然展开很多细节", right: "简要说明，除非对方很熟" },
    { text: "你更希望别人尊重你的：", left: "表达欲和参与感", right: "边界感和独处需求" }
  ],
  SN: [
    { text: "理解一个问题时，你更先看：", left: "具体事实、已有经验和现实条件", right: "整体趋势、潜在含义和未来可能" },
    { text: "学习新东西时，你更喜欢：", left: "步骤清楚，有示例可以照着练", right: "先理解概念，再自己探索变化" },
    { text: "你更信任哪种判断？", left: "经验证明有效的方法", right: "虽然新但逻辑上有潜力的想法" },
    { text: "描述一件事时，你更常：", left: "讲清时间、地点、过程和细节", right: "概括重点、联想意义和背后模式" },
    { text: "做计划时，你更关注：", left: "现在能做什么、资源够不够", right: "未来会走向哪里、有没有更大空间" },
    { text: "你更容易注意到：", left: "环境中的具体变化和实际问题", right: "人与事之间隐藏的关联" },
    { text: "你更欣赏哪类表达？", left: "准确、清楚、落地", right: "有洞察、有想象、有启发" },
    { text: "面对一项任务，你更想先知道：", left: "标准、流程和交付要求", right: "目标、意义和可创新空间" },
    { text: "你看电影或读故事时，更常关注：", left: "情节是否真实、细节是否合理", right: "主题、象征和人物命运的隐喻" },
    { text: "当别人提出大胆想法时，你通常：", left: "先问怎么落地、风险在哪里", right: "先想它可能打开什么新方向" },
    { text: "你更擅长处理：", left: "具体事务、细节执行和现实安排", right: "抽象概念、趋势判断和系统理解" },
    { text: "你选择工具或方法时，更看重：", left: "稳定好用，已经被验证", right: "有扩展性，能带来新可能" },
    { text: "你回忆过去时，更容易想起：", left: "具体场景、声音、动作和画面", right: "那段经历对你的意义" },
    { text: "你更喜欢别人给你哪种建议？", left: "具体怎么做，第一步是什么", right: "换个视角看，问题本质是什么" },
    { text: "你更容易觉得无聊的是：", left: "空泛想象太多，没有实际推进", right: "重复细节太多，没有新的可能" },
    { text: "你判断一个人可靠与否，更看：", left: "行为是否一致，细节是否靠谱", right: "价值观是否相近，方向是否一致" },
    { text: "面对复杂局面，你更倾向：", left: "拆成具体事项逐个处理", right: "先找核心模式和关键变量" },
    { text: "你更喜欢的房间或桌面是：", left: "物品顺手、功能明确、实用舒服", right: "能激发灵感、呈现个人想象" },
    { text: "你谈论未来时，更自然地：", left: "说现实安排和可执行步骤", right: "说愿景、可能性和想成为什么" },
    { text: "你对变化的态度更接近：", left: "先确认变化是否必要和可控", right: "变化可能带来新的成长机会" },
    { text: "阅读说明时，你更需要：", left: "清晰步骤和注意事项", right: "整体原理和设计思路" },
    { text: "你更容易被哪种人吸引？", left: "踏实可靠、细节稳定的人", right: "有想象力、能打开世界的人" },
    { text: "你做复盘时，更常问：", left: "哪里做得不够具体，下次怎么改", right: "这件事反映了什么规律" }
  ],
  TF: [
    { text: "做艰难决定时，你更重视：", left: "原则、公平和长期结果", right: "感受、关系和人的处境" },
    { text: "别人来找你倾诉时，你更自然地：", left: "帮对方梳理问题和解决路径", right: "先共情对方，让他觉得被理解" },
    { text: "你评价一个方案时，更先看：", left: "逻辑是否成立，效率是否高", right: "是否照顾到相关人的感受" },
    { text: "你更不喜欢哪种沟通？", left: "只讲情绪，不面对事实", right: "只讲道理，不顾及感受" },
    { text: "团队中你更常扮演：", left: "指出问题、推动判断的人", right: "协调关系、照顾氛围的人" },
    { text: "当规则和人情冲突时，你更倾向：", left: "规则要尽量一致，否则不公平", right: "具体情况具体看，人不是机器" },
    { text: "你接受批评时，更希望对方：", left: "直接指出问题和改进方向", right: "注意语气，让你知道不是否定你" },
    { text: "你表达关心时，更常：", left: "提供建议、资源或可行方案", right: "陪伴、安慰和情绪回应" },
    { text: "你判断一个人是否成熟，更看：", left: "是否理性、负责、能承担后果", right: "是否善良、体贴、能理解别人" },
    { text: "遇到冲突时，你更想先：", left: "明确分歧点，判断谁的理由更充分", right: "缓和气氛，避免彼此受伤" },
    { text: "你更容易被哪种夸奖打动？", left: "你的判断很准，能力很强", right: "你很温暖，和你相处很安心" },
    { text: "分配资源时，你更看重：", left: "标准统一，按贡献或规则来", right: "照顾差异，尽量让每个人被看见" },
    { text: "面对亲近的人犯错，你更可能：", left: "指出问题，因为逃避不会变好", right: "先理解原因，再看怎么帮助" },
    { text: "你更害怕自己显得：", left: "不够清醒，判断被情绪带偏", right: "不够体贴，让别人觉得冷漠" },
    { text: "你写反馈时，更倾向：", left: "清楚列出优缺点和建议", right: "先肯定努力，再表达调整方向" },
    { text: "当别人情绪化表达时，你通常：", left: "想帮他回到事实和问题本身", right: "先理解情绪为什么会出现" },
    { text: "你对“真诚”的理解更接近：", left: "说真实判断，即使不那么好听", right: "表达真实感受，同时照顾对方" },
    { text: "你更认可哪句话？", left: "关系好也需要讲原则", right: "原则也要服务于真实的人" },
    { text: "你做选择时，更常问自己：", left: "这样是否合理、有效、经得起推敲", right: "这样是否安心、善意、对人有温度" },
    { text: "你安慰别人时，更像：", left: "帮他找到下一步", right: "陪他把情绪走完" },
    { text: "你更不能接受：", left: "逻辑混乱却要求别人认同", right: "态度冷硬却说自己只是客观" },
    { text: "你在关系里更希望被看见的是：", left: "能力、判断和承担", right: "用心、感受和善意" },
    { text: "面对不合理要求，你更容易：", left: "直接拒绝并说明边界", right: "尽量委婉，减少对方难堪" }
  ],
  JP: [
    { text: "开始一项任务前，你更喜欢：", left: "先定计划和截止时间", right: "先动起来，过程中再调整" },
    { text: "你的日常更接近：", left: "有安排会更安心", right: "有弹性会更舒服" },
    { text: "面对临时变化，你通常：", left: "需要重新整理计划", right: "可以顺势改变方向" },
    { text: "你更喜欢哪种工作状态？", left: "目标明确，逐步完成", right: "空间开放，灵感来了就推进" },
    { text: "做决定时，你更倾向：", left: "尽快确定，减少悬而未决", right: "多留选项，避免太早锁死" },
    { text: "你的桌面或文件更可能：", left: "按类别整理，方便快速找到", right: "按使用状态摆放，自己知道在哪" },
    { text: "旅行时你更偏好：", left: "攻略清楚，重要节点提前订好", right: "只定大方向，细节现场决定" },
    { text: "你更享受的完成感来自：", left: "把清单一项项划掉", right: "在变化中找到更好的可能" },
    { text: "如果别人一直不给答复，你会：", left: "希望对方尽快明确", right: "可以等一等，看情况发展" },
    { text: "你对规则的态度更接近：", left: "规则让协作更稳定", right: "规则需要给现实留弹性" },
    { text: "面对多个选择，你更容易：", left: "比较后选定一个并执行", right: "保持开放，边试边看" },
    { text: "你安排一天时，更喜欢：", left: "知道每个时间段大概要做什么", right: "根据状态自然切换事情" },
    { text: "你更难忍受：", left: "混乱、拖延和没有交代", right: "过度控制、流程僵硬和没空间" },
    { text: "你的购物方式更像：", left: "明确需求，买完就结束", right: "边逛边看，可能发现更适合的" },
    { text: "你处理邮件或消息时，更倾向：", left: "及时清理，保持未完成事项可控", right: "集中处理，重要的自然会浮出来" },
    { text: "你对截止日期的态度是：", left: "提前推进，避免最后一刻焦虑", right: "临近时效率更高，压力会推动你" },
    { text: "你更喜欢的合作伙伴是：", left: "靠谱守时、提前同步进度", right: "灵活聪明、能随机应变" },
    { text: "做长期规划时，你更自然地：", left: "拆成阶段目标和行动计划", right: "保持方向感，给过程留变化空间" },
    { text: "你更接近哪种状态？", left: "事情定下来后心里更踏实", right: "事情太早定死会有压力" },
    { text: "当计划被打断，你更可能：", left: "先把秩序找回来", right: "看看新情况能不能顺便利用" },
    { text: "你对承诺的理解更接近：", left: "说好了就要尽量做到", right: "承诺也要根据现实变化调整" },
    { text: "你更欣赏哪种生活方式？", left: "稳定、有节奏、可持续", right: "自由、有变化、有探索感" },
    { text: "你启动一个项目时，更先做：", left: "列框架、定优先级、排时间", right: "抓住灵感先做一版再说" }
  ]
};

function buildPersonalityQuestions(
  idPrefix: string,
  questionBank: Record<MbtiAxis, Array<{ text: string; left: string; right: string }>>,
  targetCount: number
): MbtiQuestion[] {
  const axes: MbtiAxis[] = ["EI", "SN", "TF", "JP"];
  const questions: MbtiQuestion[] = [];

  for (let index = 0; index < targetCount; index += 1) {
    const axis = axes[index % axes.length];
    const pair = axisPairs[axis];
    const source = questionBank[axis][Math.floor(index / axes.length) % questionBank[axis].length];

    questions.push({
      id: `${idPrefix}${index + 1}`,
      axis,
      text: source.text,
      options: [
        { label: source.left, value: pair[0] },
        { label: source.right, value: pair[1] }
      ]
    });
  }

  return questions;
}

const axisKeywordRules: Record<
  MbtiAxis,
  {
    left: string[];
    right: string[];
  }
> = {
  EI: {
    left: ["社交", "人际", "朋友", "外部", "互动", "广泛", "主动", "回应", "人群", "活力"],
    right: ["一个人", "静静", "私密", "沉浸", "独处", "安静", "深度", "内在", "独立"]
  },
  SN: {
    left: ["具体", "实用", "现实", "细节", "经验", "事实", "踏实", "稳定", "收藏"],
    right: ["想像", "想象", "可能", "概念", "抽象", "理论", "脑洞", "未来", "新概念", "猎奇"]
  },
  TF: {
    left: ["逻辑", "理智", "理性", "客观", "分析", "问题", "冷静", "明确", "精准", "智慧"],
    right: ["情绪", "热情", "敏感", "友善", "仁慈", "共情", "情感", "感受", "温柔"]
  },
  JP: {
    left: ["部署", "节奏", "计划", "果断", "决定", "有组织", "稳定", "踏实", "明确"],
    right: ["灵活", "松散", "惊喜", "变化", "选择困难", "适应", "弹性", "自由"]
  }
};

function countKeywordHits(text: string, keywords: string[]) {
  return keywords.reduce((total, keyword) => total + (text.includes(keyword) ? 1 : 0), 0);
}

function inferAxisAndValues(
  row: RawImportedQuestion,
  index: number
): { axis: MbtiAxis; values: [MbtiLetter, MbtiLetter] } {
  const fallbackAxes: MbtiAxis[] = ["TF", "JP", "EI", "SN"];
  const optionA = row.options[0]?.text ?? "";
  const optionB = row.options[1]?.text ?? "";
  let bestAxis = fallbackAxes[index % fallbackAxes.length];
  let bestScore = 0;

  for (const axis of Object.keys(axisKeywordRules) as MbtiAxis[]) {
    const rules = axisKeywordRules[axis];
    const score =
      countKeywordHits(optionA, rules.left) +
      countKeywordHits(optionA, rules.right) +
      countKeywordHits(optionB, rules.left) +
      countKeywordHits(optionB, rules.right);

    if (score > bestScore) {
      bestScore = score;
      bestAxis = axis;
    }
  }

  const pair = axisPairs[bestAxis];
  const rules = axisKeywordRules[bestAxis];
  const aLeftScore = countKeywordHits(optionA, rules.left);
  const aRightScore = countKeywordHits(optionA, rules.right);
  const bLeftScore = countKeywordHits(optionB, rules.left);
  const bRightScore = countKeywordHits(optionB, rules.right);
  const aLooksRight = aRightScore > aLeftScore;
  const bLooksLeft = bLeftScore > bRightScore;

  if (aLooksRight || bLooksLeft) {
    return { axis: bestAxis, values: [pair[1], pair[0]] };
  }

  return { axis: bestAxis, values: pair };
}

function buildImportedPersonalityQuestions(rows: RawImportedQuestion[]): MbtiQuestion[] {
  return rows.map((row, index) => {
    const inferred = inferAxisAndValues(row, index);

    return {
      id: row.question_id,
      axis: inferred.axis,
      text: row.question_text,
      options: row.options
        .filter((option) => option.text.trim().length > 0)
        .map((option, optionIndex) => ({
          label: option.text,
          value: optionIndex < 2 ? inferred.values[optionIndex] : null
        }))
    };
  });
}

export const personalityTests: Record<PersonalityTestId, PersonalityTest> = {
  "mbti-28": {
    id: "mbti-28",
    title: "MBTI快速测试",
    eyebrow: "快速人格测试",
    description: "用恋爱相处里的真实选择，快速判断你更接近哪一种 MBTI 倾向。",
    resultPath: "/mbti-result",
    questions: buildImportedPersonalityQuestions(love28Rows as RawImportedQuestion[])
  },
  "mbti-93": {
    id: "mbti-93",
    title: "93题 MBTI 完整测试",
    eyebrow: "完整人格测试",
    description: "从社交能量、信息偏好、决策方式和生活节奏四个维度，更完整地了解你的 MBTI 倾向。",
    resultPath: "/mbti-result",
    questions: buildImportedPersonalityQuestions(standard93Rows as RawImportedQuestion[])
  }
};

export const typeProfiles: Record<MbtiType, { title: string; loveStyle: string }> = {
  INTJ: { title: "理性规划型恋人", loveStyle: "慢热、重承诺，喜欢能一起成长的关系。" },
  INTP: { title: "灵感探索型恋人", loveStyle: "需要空间，也珍惜高质量的思想碰撞。" },
  ENTJ: { title: "目标共创型恋人", loveStyle: "行动感强，期待关系里有清晰方向。" },
  ENTP: { title: "火花辩论型恋人", loveStyle: "有趣、敏捷，喜欢新鲜感和脑力互动。" },
  INFJ: { title: "深度共鸣型恋人", loveStyle: "敏感真诚，重视灵魂理解和长期信任。" },
  INFP: { title: "浪漫理想型恋人", loveStyle: "细腻、有想象力，渴望被温柔看见。" },
  ENFJ: { title: "温暖引导型恋人", loveStyle: "擅长照顾氛围，也期待双向回应。" },
  ENFP: { title: "心动冒险型恋人", loveStyle: "热烈自由，喜欢被灵感和真诚点燃。" },
  ISTJ: { title: "稳定守护型恋人", loveStyle: "可靠踏实，用持续行动表达喜欢。" },
  ISFJ: { title: "细节照料型恋人", loveStyle: "温柔体贴，很在意彼此生活是否安稳。" },
  ESTJ: { title: "责任推进型恋人", loveStyle: "直接务实，习惯把爱落实到安排里。" },
  ESFJ: { title: "甜蜜经营型恋人", loveStyle: "重视互动和仪式感，擅长经营关系温度。" },
  ISTP: { title: "松弛行动型恋人", loveStyle: "少说多做，喜欢舒适、有边界的相处。" },
  ISFP: { title: "柔软感受型恋人", loveStyle: "审美和情绪感知强，爱得安静但认真。" },
  ESTP: { title: "即时体验型恋人", loveStyle: "有活力、会调动气氛，偏爱真实体验。" },
  ESFP: { title: "明亮陪伴型恋人", loveStyle: "表达热烈，喜欢把日子过得有声有色。" }
};

export const allMbtiTypes: MbtiType[] = [
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP"
];

const recommendationMap: Record<MbtiType, MbtiType[]> = {
  INTJ: ["ENFP", "ENTP", "INFJ", "ENTJ"],
  INTP: ["ENTJ", "ENFJ", "ENTP", "INTJ"],
  ENTJ: ["INTP", "INFP", "ENFP", "INTJ"],
  ENTP: ["INFJ", "INTJ", "ENFP", "ENTJ"],
  INFJ: ["ENTP", "ENFP", "INTJ", "ENFJ"],
  INFP: ["ENFJ", "ENTJ", "INFJ", "ENFP"],
  ENFJ: ["INFP", "INTP", "ISFP", "INFJ"],
  ENFP: ["INTJ", "INFJ", "ENTP", "INFP"],
  ISTJ: ["ESFP", "ISFJ", "ESTJ", "ISTP"],
  ISFJ: ["ESTP", "ESFJ", "ISTJ", "ISFP"],
  ESTJ: ["ISFP", "ISTJ", "ESFJ", "ENTJ"],
  ESFJ: ["ISTP", "ISFJ", "ESTJ", "ENFJ"],
  ISTP: ["ESFJ", "ESTP", "ISFP", "ISTJ"],
  ISFP: ["ESTJ", "ENFJ", "ISTP", "ISFJ"],
  ESTP: ["ISFJ", "ISTP", "ESFP", "ENTP"],
  ESFP: ["ISTJ", "ESTP", "ESFJ", "ISFP"]
};

export const emptyScores = (): MbtiScores => ({
  E: 0,
  I: 0,
  S: 0,
  N: 0,
  T: 0,
  F: 0,
  J: 0,
  P: 0
});

export function scoreMbti(answers: Record<string, MbtiAnswerValue>): MbtiType {
  return scoreMbtiQuestions(mbtiQuestions, answers).type;
}

export function scoreMbtiQuestions(
  questions: MbtiQuestion[],
  answers: Record<string, MbtiAnswerValue>
): { type: MbtiType; scores: MbtiScores } {
  const scores = emptyScores();

  for (const question of questions) {
    const answer = answers[question.id];
    if (answer && answer !== "X") {
      scores[answer] += 1;
    }
  }

  const type = [
    scores.E >= scores.I ? "E" : "I",
    scores.S >= scores.N ? "S" : "N",
    scores.T >= scores.F ? "T" : "F",
    scores.J >= scores.P ? "J" : "P"
  ].join("") as MbtiType;

  return { type, scores };
}

export function getMbtiScoreBreakdown(answers: Record<string, MbtiAnswerValue>): MbtiScores {
  const scores = emptyScores();

  for (const question of mbtiQuestions) {
    const answer = answers[question.id];
    if (answer && answer !== "X") {
      scores[answer] += 1;
    }
  }

  return scores;
}

export function getRecommendations(type: MbtiType): MbtiType[] {
  return recommendationMap[type].slice(0, 4);
}

export function isMbtiType(value: string | null): value is MbtiType {
  return Boolean(value && value in typeProfiles);
}

const compatibilityQuestionTemplates = [
  {
    text: "你最容易被哪种相处瞬间打动？",
    labels: ["对方能点燃你的表达欲，聊着聊着就有新灵感", "对方热烈真诚，让关系里一直有轻盈的心动", "对方懂你的深层逻辑，也愿意和你一起规划未来", "对方能补足你当下缺少的稳定感或行动力"]
  },
  {
    text: "当你状态低落时，你更希望伴侣怎么靠近？",
    labels: ["先用幽默和新角度帮你松动情绪", "给你很多积极回应，让你重新感觉被喜欢", "安静陪你分析问题，不急着催你开心", "用具体行动陪你稳住生活节奏"]
  },
  {
    text: "你理想中的恋爱节奏更接近：",
    labels: ["有很多碰撞和探索，但彼此都不失去边界", "保持心动和新鲜感，想到什么就一起去做", "慢慢确认承诺，把喜欢落实到长期安排里", "既能有吸引力，也能把日常经营好"]
  },
  {
    text: "你更想和伴侣建立哪种默契？",
    labels: ["互相启发，很多话题都能继续深挖", "情绪和热情能互相接住，日常不无聊", "目标、边界和未来方向越来越清楚", "一边理解彼此，一边把关系落到行动里"]
  },
  {
    text: "发生分歧时，哪种处理方式最让你安心？",
    labels: ["愿意讨论不同观点，不把争论等同于不爱", "先确认感受，再用轻松方式把问题说开", "直接面对核心问题，给出稳定可执行的方案", "既不逃避问题，也不会让你觉得被压迫"]
  },
  {
    text: "你最受不了哪种恋爱状态？",
    labels: ["关系太平淡，没有思想和表达上的火花", "气氛太沉重，总像在完成任务", "没有计划和边界，重要事情总悬着不落地", "只有感觉没有行动，或者只有行动没有温度"]
  },
  {
    text: "约会中你更容易觉得“这个人很适合我”的原因是：",
    labels: ["对方能把普通话题聊出惊喜", "对方让你自然放松，也愿意表达喜欢", "对方细致可靠，让你感到未来可期待", "对方既能理解你，也能主动推进关系"]
  },
  {
    text: "如果你们进入长期关系，你最看重：",
    labels: ["彼此仍能不断更新对世界的理解", "关系里保留玩心、分享欲和自由感", "共同经营生活，有稳定承诺和清晰分工", "热度、责任和个人空间能保持平衡"]
  },
  {
    text: "你希望伴侣如何回应你的敏感或犹豫？",
    labels: ["帮你换个视角，不让你困在一个结论里", "用热情和行动告诉你：你值得被喜欢", "给你确定性，不让你反复猜测关系位置", "温和但明确地告诉你下一步可以怎么走"]
  },
  {
    text: "哪种聊天体验最让你上头？",
    labels: ["越聊越有脑洞，彼此都接得住隐藏梗", "轻松、真诚、回应快，像有天然默契", "内容有深度，也能聊到现实计划和选择", "既能聊感受，也能聊具体生活怎么配合"]
  },
  {
    text: "你更期待伴侣补足你哪一面？",
    labels: ["带你跳出惯性，看到更多可能性", "带来明亮能量，让你更敢表达自己", "帮你稳住方向，把想法变成现实步骤", "在情绪和现实之间帮你找到平衡点"]
  },
  {
    text: "关系进入暧昧期，你更吃哪一套？",
    labels: ["若即若离但很有趣，每次互动都有火花", "明显偏爱你，愿意主动制造见面机会", "不急不躁，但每一步都认真可靠", "表达克制但持续，让你感觉关系在前进"]
  },
  {
    text: "面对未来规划，你更希望对方：",
    labels: ["先打开可能性，再一起筛选真正想要的生活", "别太早把关系框死，边体验边确认", "认真讨论时间表、边界、责任和承诺", "愿意一起试错，也愿意为关系做实际调整"]
  },
  {
    text: "你觉得最理想的亲密关系像什么？",
    labels: ["两个人一起探索世界，也探索彼此", "日常有很多快乐瞬间，爱意表达很自然", "彼此信任、目标一致，能安稳走很远", "既有心动，也有能一起生活的踏实感"]
  },
  {
    text: "最后直觉选择：你现在最想遇到哪种伴侣？",
    labels: ["聪明有趣，能让你重新兴奋起来的人", "热烈明亮，能把喜欢说出来也做出来的人", "深沉稳定，愿意认真理解和守护关系的人", "成熟可靠，同时保留温度和弹性的人"]
  }
];

export function getCompatibilityTest(selfType: MbtiType): CompatibilityTest {
  const candidates = getRecommendations(selfType);

  return {
    selfType,
    candidates,
    title: `${selfType} 到底适不适合你的官配？`,
    hook: `你的常见官配候选包括 ${candidates.join(" / ")}。完成 15 道题，看看哪一种 MBTI 更像适合你的伴侣。`,
    questions: compatibilityQuestionTemplates.map((template, index) => ({
      id: `cq${index + 1}`,
      text: template.text,
      options: rotateCompatibilityOptions(
        candidates.map((candidate, candidateIndex) => ({
          value: candidate,
          label: `${candidate}：${template.labels[candidateIndex]}`
        })),
        index
      )
    }))
  };
}

function rotateCompatibilityOptions(options: CompatibilityOption[], questionIndex: number): CompatibilityOption[] {
  const offsetPattern = [0, 2, 1, 3];
  const offset = offsetPattern[questionIndex % offsetPattern.length];

  return [...options.slice(offset), ...options.slice(0, offset)];
}

export function scoreCompatibilityTest(
  selfType: MbtiType,
  answers: Record<string, MbtiType>
): { match: MbtiType; scores: Record<MbtiType, number>; candidates: MbtiType[] } {
  const candidates = getRecommendations(selfType);
  const scores = Object.fromEntries(candidates.map((candidate) => [candidate, 0])) as Record<MbtiType, number>;

  for (const answer of Object.values(answers)) {
    if (candidates.includes(answer)) {
      scores[answer] += 1;
    }
  }

  const match = candidates.reduce((best, candidate) => (scores[candidate] > scores[best] ? candidate : best), candidates[0]);

  return { match, scores, candidates };
}
