export type ReviewInput = {
  testPageComplete: boolean;
  contentCopy: string;
  storeCopy: string;
  hasDisclaimer: boolean;
};

export type ReviewItem = {
  label: string;
  passed: boolean;
  advice: string;
};

export type ReviewReport = {
  passed: boolean;
  items: ReviewItem[];
  summary: string;
};

const forbiddenPatterns = [
  "保证脱单",
  "百分百匹配",
  "100%匹配",
  "科学证明一定",
  "绝对适合",
  "必然复合",
  "包你脱单",
  "唯一真爱"
];

export function reviewOutput(input: ReviewInput): ReviewReport {
  const combined = `${input.contentCopy}\n${input.storeCopy}`;
  const forbiddenHits = forbiddenPatterns.filter((pattern) => combined.includes(pattern));

  const items: ReviewItem[] = [
    {
      label: "测试页面完整",
      passed: input.testPageComplete,
      advice: input.testPageComplete ? "题目、选项、提交与结果链路完整。" : "需要补齐题目、计分或跳转结果页。"
    },
    {
      label: "小红书文案有吸引力",
      passed: input.contentCopy.trim().length >= 80,
      advice:
        input.contentCopy.trim().length >= 80
          ? "文案具备标题、正文或共鸣入口。"
          : "建议增加更具体的目标人群、情绪钩子和互动引导。"
    },
    {
      label: "商品页存在转化逻辑",
      passed: /CTA|解锁|购买|报告|FAQ|卖点|痛点/.test(input.storeCopy),
      advice:
        /CTA|解锁|购买|报告|FAQ|卖点|痛点/.test(input.storeCopy)
          ? "已包含卖点、痛点、FAQ 或行动引导。"
          : "建议补充商品标题、核心卖点、FAQ 和明确但克制的 CTA。"
    },
    {
      label: "避免过度承诺",
      passed: forbiddenHits.length === 0,
      advice:
        forbiddenHits.length === 0
          ? "未发现常见绝对化或保证结果表达。"
          : `请移除或改写：${forbiddenHits.join("、")}。`
    },
    {
      label: "合规提示清晰",
      passed: input.hasDisclaimer,
      advice: input.hasDisclaimer
        ? "已提示仅供娱乐和自我了解参考。"
        : "结果页和商品页需声明不构成专业心理测评或关系建议。"
    }
  ];

  const passed = items.every((item) => item.passed);

  return {
    passed,
    items,
    summary: passed ? "Review Officer：当前流程可以进入 MVP 演示。" : "Review Officer：仍有项目需要调整后再上线。"
  };
}
