import type { MbtiType } from "@/lib/mbti";

export type ContentInput = {
  audience: string;
  mbtiType?: MbtiType;
  tone: "温柔共鸣" | "轻松俏皮" | "理性分析";
};

export type ContentDraft = {
  titles: string[];
  body: string;
  coverCopy: string[];
  topics: string[];
  complianceNote: string;
};

const topicPool = [
  "为什么你总被同一种恋爱模式吸引",
  "16 型人格在暧昧期最容易心动的瞬间",
  "不同 MBTI 的安全感来源",
  "适合慢热人格的恋爱节奏",
  "你在关系里真正想被理解的部分",
  "从聊天习惯看你的恋爱人格",
  "让人舒服的 MBTI 相处方式",
  "约会安排里藏着的性格偏好"
];

export function generateXiaohongshuContent(input: ContentInput): ContentDraft {
  const audience = input.audience.trim() || "正在认真恋爱或想了解自己恋爱模式的人";
  const typeText = input.mbtiType ? `${input.mbtiType} ` : "";
  const toneLead =
    input.tone === "理性分析"
      ? "用一个轻量测试拆开看"
      : input.tone === "轻松俏皮"
        ? "这题真的有点准但别太上头"
        : "也许你不是难懂，只是需要被更温柔地读懂";

  return {
    titles: [
      `${typeText}恋爱人格测试：你适合被怎样的人喜欢？`,
      `测完才发现，我在恋爱里最需要的是这个`,
      `不是玄学，是一次关于相处偏好的自我观察`,
      `MBTI 恋爱匹配：谁更容易接住你的情绪？`,
      `暧昧期别急着上头，先看看你们的相处节奏`
    ],
    body: [
      `${toneLead}。`,
      "",
      `这份 MBTI 恋爱小测试适合${audience}。它不会替你决定一段关系，但可以帮你看见：你更需要热烈回应，还是稳定陪伴；你更在意现实行动，还是精神共鸣。`,
      "",
      "测完会得到：",
      "1. 你的恋爱人格倾向",
      "2. 2-3 个更容易产生舒适互动的 MBTI 类型",
      "3. 一段适合发给朋友一起讨论的恋爱提示",
      "",
      "把它当成一次轻松的自我了解就好。真正重要的，永远是现实里的尊重、沟通和边界感。"
    ].join("\n"),
    coverCopy: [
      "你适合和哪种 MBTI 谈恋爱？",
      "测测你的恋爱人格底色",
      "暧昧前先看相处节奏",
      "不是答案，是更懂自己的入口"
    ],
    topics: topicPool,
    complianceNote: "以上内容为原创文案结构，不复制真实平台内容；MBTI 仅作为娱乐和自我观察参考。"
  };
}
