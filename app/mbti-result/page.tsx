import Link from "next/link";
import { ArrowLeft, Heart, Sparkles } from "lucide-react";
import { ChallengeButton } from "@/components/ChallengeButton";
import { ChallengeFrame } from "@/components/ChallengeFrame";
import { isMbtiType, personalityTests, type MbtiLetter, type PersonalityTestId, typeProfiles } from "@/lib/mbti";

type MbtiResultPageProps = {
  searchParams: Promise<Record<string, string | undefined>>;
};

const axisRows: Array<{
  label: string;
  left: MbtiLetter;
  right: MbtiLetter;
  leftText: string;
  rightText: string;
}> = [
  { label: "能量来源", left: "E", right: "I", leftText: "外向互动", rightText: "内向沉浸" },
  { label: "信息偏好", left: "S", right: "N", leftText: "现实细节", rightText: "直觉想象" },
  { label: "决策方式", left: "T", right: "F", leftText: "理性逻辑", rightText: "情感价值" },
  { label: "生活节奏", left: "J", right: "P", leftText: "计划确定", rightText: "灵活开放" }
];

function getScore(params: Record<string, string | undefined>, key: MbtiLetter) {
  return Number(params[key] ?? 0);
}

function getMode(value: string | undefined): PersonalityTestId {
  return value === "mbti-93" ? "mbti-93" : "mbti-28";
}

export default async function MbtiResultPage({ searchParams }: MbtiResultPageProps) {
  const params = await searchParams;
  const mode = getMode(params.mode);
  const test = personalityTests[mode];
  const requestedType = params.type ?? null;
  const type = isMbtiType(requestedType) ? requestedType : "INFJ";
  const profile = typeProfiles[type];

  return (
    <ChallengeFrame className="my-10">
      <Link
        href={`/${mode}`}
        className="mb-5 inline-grid h-11 w-11 place-items-center rounded-full border border-[#b7c7df]/70 bg-white/52 text-[#34465f] hover:text-[#147f95]"
        aria-label="返回测试"
      >
        <ArrowLeft size={20} />
      </Link>

      <div className="mb-6 grid h-16 w-16 place-items-center rounded-full border border-[#147f95]/20 bg-[#147f95]/8 text-[#147f95]">
        <Sparkles size={28} />
      </div>

      <p className="text-sm font-bold text-[#147f95]">{test.eyebrow}结果</p>
      <h1 className="mt-3 text-5xl font-black leading-tight">你的 MBTI 倾向是 {type}</h1>
      <p className="mt-4 text-base leading-7 text-[#4a5d75]">
        {profile.title}：{profile.loveStyle}
      </p>

      <div className="mt-6 space-y-3">
        {axisRows.map((axis) => {
          const leftScore = getScore(params, axis.left);
          const rightScore = getScore(params, axis.right);
          const total = Math.max(leftScore + rightScore, 1);
          const leftPercent = Math.round((leftScore / total) * 100);
          const winner = leftScore >= rightScore ? axis.left : axis.right;

          return (
            <div key={axis.label} className="rounded-[20px] border border-[#b7c7df]/70 bg-white/55 p-4">
              <div className="flex items-center justify-between gap-3 text-sm">
                <p className="font-bold text-[#122033]">{axis.label}</p>
                <p className="font-black text-[#147f95]">{winner}</p>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#d5e0ef]">
                <div className="h-full rounded-full bg-gradient-to-r from-[#147f95] to-[#927ce6]" style={{ width: `${leftPercent}%` }} />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-[#5d6f86]">
                <span>
                  {axis.left} {axis.leftText} {leftScore}
                </span>
                <span>
                  {axis.right} {axis.rightText} {rightScore}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-3">
        <ChallengeButton href={`/${type.toLowerCase()}`}>
          <Heart className="mr-2" size={18} />
          继续测我的官配
        </ChallengeButton>
        <Link href="/" className="block text-center text-sm text-[#4a5d75] hover:text-[#147f95]">
          返回首页选择其他测试
        </Link>
      </div>

      <p className="mt-6 rounded-[18px] border border-[#b7c7df]/70 bg-white/45 p-4 text-xs leading-6 text-[#5d6f86]">
        本测试仅供娱乐和自我了解参考，不构成专业心理测评或关系建议。MBTI 结果代表当下回答倾向，不应作为判断个人能力、关系成败或重要决策的唯一依据。
      </p>
    </ChallengeFrame>
  );
}
