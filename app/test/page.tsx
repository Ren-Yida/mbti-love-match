import Link from "next/link";
import { ChallengeFrame } from "@/components/ChallengeFrame";
import { allMbtiTypes, getCompatibilityTest, typeProfiles } from "@/lib/mbti";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function TestOutlinePage() {
  return (
    <ChallengeFrame className="my-12">
      <Link
        href="/"
        className="mb-5 inline-grid h-11 w-11 place-items-center rounded-full border border-[#b7c7df]/70 bg-white/52 text-[#34465f] hover:text-[#147f95]"
      >
        <ArrowLeft size={20} />
      </Link>
      <p className="text-sm font-bold text-[#147f95]">选择你的 MBTI</p>
      <h1 className="mt-3 text-4xl font-black leading-tight">进入你的专属官配测试</h1>
      <p className="mt-3 text-sm leading-7 text-[#4a5d75]">
        链接逻辑已调整为直接访问类型路径，例如 INFJ 测试入口是 /infj。
      </p>

      <div className="mt-6 grid gap-3">
        {allMbtiTypes.map((type) => {
          const test = getCompatibilityTest(type);

          return (
            <Link
              key={type}
              href={`/${type.toLowerCase()}`}
              className="group rounded-[22px] border border-[#b7c7df]/70 bg-white/52 p-4 transition hover:-translate-y-0.5 hover:border-[#147f95]/45 hover:bg-white/80"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-2xl font-black">{type}</p>
                  <p className="mt-1 text-sm text-[#5d6f86]">{typeProfiles[type].title}</p>
                  <p className="mt-2 text-xs text-[#147f95]/85">官配候选：{test.candidates.join(" / ")}</p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#dceaf7] text-[#4a5d75] group-hover:bg-[#147f95] group-hover:text-white">
                  <ArrowRight size={18} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </ChallengeFrame>
  );
}
