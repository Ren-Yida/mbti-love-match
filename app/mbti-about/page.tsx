import { ChallengeButton } from "@/components/ChallengeButton";
import { ChallengeFrame } from "@/components/ChallengeFrame";
import { ArrowLeft, BookOpen, HeartHandshake } from "lucide-react";
import Link from "next/link";

const dimensions = [
  {
    code: "E / I",
    title: "能量来源",
    text: "更倾向从外部互动中获得能量，还是从独处、沉浸和内部整理中恢复状态。"
  },
  {
    code: "S / N",
    title: "信息偏好",
    text: "更关注现实细节、经验和可执行信息，还是更关注可能性、抽象概念和整体意义。"
  },
  {
    code: "T / F",
    title: "决策方式",
    text: "更习惯用逻辑、原则和效率做判断，还是更重视感受、关系和价值影响。"
  },
  {
    code: "J / P",
    title: "生活节奏",
    text: "更喜欢计划、确定和有序推进，还是更喜欢弹性、开放和边走边调整。"
  }
];

export default function MbtiAboutPage() {
  return (
    <ChallengeFrame className="my-10">
      <Link
        href="/"
        className="mb-5 inline-grid h-11 w-11 place-items-center rounded-full border border-[#b7c7df]/70 bg-white/52 text-[#34465f] hover:text-[#147f95]"
        aria-label="返回首页"
      >
        <ArrowLeft size={20} />
      </Link>

      <div className="mb-6 grid h-16 w-16 place-items-center rounded-full border border-[#147f95]/20 bg-[#147f95]/8 text-[#147f95]">
        <BookOpen size={28} />
      </div>

      <p className="text-sm font-bold text-[#147f95]">MBTI说明</p>
      <h1 className="mt-3 text-4xl font-black leading-tight">MBTI 结果应该怎么看？</h1>
      <p className="mt-4 text-base leading-7 text-[#4a5d75]">
        MBTI 会把人的偏好组合成 16 种类型。它适合用来帮助你描述沟通方式、关系需求和日常偏好，但不应该被当成绝对标签。
      </p>

      <div className="mt-6 grid gap-3">
        {dimensions.map((item) => (
          <section key={item.code} className="rounded-[22px] border border-[#b7c7df]/70 bg-white/56 p-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-black text-[#122033]">{item.title}</h2>
              <span className="rounded-full bg-[#e4f4f6] px-3 py-1 text-xs font-black text-[#147f95]">{item.code}</span>
            </div>
            <p className="mt-2 text-sm leading-7 text-[#4a5d75]">{item.text}</p>
          </section>
        ))}
      </div>

      <p className="mt-6 rounded-[18px] border border-[#b7c7df]/70 bg-white/45 p-4 text-xs leading-6 text-[#5d6f86]">
        本网站测试仅供娱乐和自我了解参考，不构成专业心理测评、关系建议或人格诊断。现实关系仍取决于沟通、尊重、边界和共同经营。
      </p>

      <div className="mt-6">
        <ChallengeButton href="/">
          <HeartHandshake className="mr-2" size={18} />
          返回选择测试
        </ChallengeButton>
      </div>
    </ChallengeFrame>
  );
}
