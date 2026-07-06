import { describe, expect, it } from "vitest";
import { reviewOutput } from "../lib/agents/reviewAgent";

describe("review agent", () => {
  it("passes complete and compliant MVP output", () => {
    const report = reviewOutput({
      testPageComplete: true,
      hasDisclaimer: true,
      contentCopy:
        "原创 MBTI 恋爱测试文案，包含目标人群、情绪共鸣、测试入口、结果分享和互动讨论，不复制真实平台内容。文案会提示用户把测试当成自我观察入口，而不是确定答案，并用温柔问题引导用户留言分享自己的恋爱节奏。",
      storeCopy:
        "商品页包含卖点、痛点、FAQ、报告详情和解锁报告 CTA，并说明不承诺具体关系结果。卖点聚焦自我了解，痛点聚焦暧昧误会，FAQ 回答适用场景。"
    });

    expect(report.passed).toBe(true);
  });

  it("flags absolute promises", () => {
    const report = reviewOutput({
      testPageComplete: true,
      hasDisclaimer: true,
      contentCopy: "原创 MBTI 恋爱测试文案，适合正在了解自己的人。",
      storeCopy: "购买后保证脱单，百分百匹配。"
    });

    expect(report.passed).toBe(false);
    expect(report.items.find((item) => item.label === "避免过度承诺")?.passed).toBe(false);
  });
});
