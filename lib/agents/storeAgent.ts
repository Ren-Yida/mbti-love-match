import type { MbtiType } from "@/lib/mbti";

export type StoreInput = {
  productName: string;
  targetUser: string;
  mbtiType?: MbtiType;
};

export type StoreCopy = {
  title: string;
  sellingPoints: string[];
  painPoints: string[];
  detailCopy: string;
  cta: string;
  faq: Array<{ question: string; answer: string }>;
};

export function generateStoreCopy(input: StoreInput): StoreCopy {
  const productName = input.productName.trim() || "MBTI 恋爱匹配深度报告";
  const targetUser = input.targetUser.trim() || "想更了解自己恋爱模式的用户";
  const typePrefix = input.mbtiType ? `${input.mbtiType} 专属版` : "轻量入门版";

  return {
    title: `${typePrefix}｜${productName}`,
    sellingPoints: [
      "基于测试答案整理你的恋爱表达、情绪需求和相处偏好",
      "提供 2-3 个更容易形成舒适互动的 MBTI 类型作为参考",
      "给出适合发起沟通的温柔提示，帮助你更清楚地表达自己",
      "适合测完后收藏、复盘，也适合和朋友一起讨论"
    ],
    painPoints: [
      "总是喜欢上相处节奏不一致的人",
      "不知道自己在关系里真正需要什么",
      "聊天很上头，进入关系后却容易误会",
      "想要一个轻松但有启发的恋爱自我了解工具"
    ],
    detailCopy: `${productName}面向${targetUser}。它不是专业心理诊断，也不会替你判断谁一定适合你，而是把测试结果转化为更容易理解的恋爱沟通语言：你如何靠近、如何确认安全感、如何处理冲突，以及哪些类型可能更容易与你形成舒服的互动节奏。`,
    cta: "解锁我的恋爱匹配报告",
    faq: [
      {
        question: "这个报告能保证找到对象吗？",
        answer: "不能。它只提供娱乐和自我了解参考，不承诺脱单、复合或关系结果。"
      },
      {
        question: "MBTI 匹配是科学结论吗？",
        answer: "不是确定性科学结论。这里把 MBTI 当作性格偏好语言，帮助你开启关系观察和沟通。"
      },
      {
        question: "适合什么场景使用？",
        answer: "适合恋爱前自我了解、暧昧期讨论、朋友分享和内容转化场景。"
      }
    ]
  };
}
