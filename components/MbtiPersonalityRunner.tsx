"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { ChallengeButton } from "@/components/ChallengeButton";
import { ChallengeFrame } from "@/components/ChallengeFrame";
import { type MbtiAnswerValue, type PersonalityTest, scoreMbtiQuestions } from "@/lib/mbti";
import Link from "next/link";

type MbtiPersonalityRunnerProps = {
  test: PersonalityTest;
};

const axisLabel: Record<string, string> = {
  EI: "能量来源",
  SN: "信息偏好",
  TF: "决策方式",
  JP: "生活节奏"
};

export function MbtiPersonalityRunner({ test }: MbtiPersonalityRunnerProps) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, MbtiAnswerValue>>({});
  const answeredCount = Object.keys(answers).length;
  const progress = useMemo(() => Math.round((answeredCount / test.questions.length) * 100), [answeredCount, test.questions.length]);
  const currentQuestion = test.questions[answeredCount] ?? test.questions[test.questions.length - 1];
  const canSubmit = answeredCount === test.questions.length;

  async function submitTest() {
    if (!canSubmit) return;

    const result = scoreMbtiQuestions(test.questions, answers);
    const params = new URLSearchParams({
      mode: test.id,
      type: result.type,
      E: String(result.scores.E),
      I: String(result.scores.I),
      S: String(result.scores.S),
      N: String(result.scores.N),
      T: String(result.scores.T),
      F: String(result.scores.F),
      J: String(result.scores.J),
      P: String(result.scores.P)
    });

    try {
      await fetch("/api/submit-result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          test_type: test.id,
          answers,
          result: result.type,
          score_detail: result.scores,
          referrer: document.referrer || window.location.href
        })
      });
    } catch (error) {
      console.warn("Failed to save MBTI result", error);
    }

    router.push(`${test.resultPath}?${params.toString()}`);
  }

  return (
    <ChallengeFrame className="my-10">
      <Link
        href="/"
        className="mb-5 inline-grid h-11 w-11 place-items-center rounded-full border border-[#b7c7df]/70 bg-white/52 text-[#34465f] hover:text-[#147f95]"
        aria-label="返回首页"
      >
        <ArrowLeft size={20} />
      </Link>

      <div className="mb-6">
        <p className="text-sm font-bold text-[#147f95]">{test.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-black leading-tight">{test.title}</h1>
        <p className="mt-3 text-sm leading-7 text-[#4a5d75]">{test.description}</p>
      </div>

      <div className="mb-6 rounded-[24px] border border-[#b7c7df]/70 bg-white/52 p-4">
        <div className="mb-3 flex items-center justify-between text-sm">
          <p className="font-bold text-[#147f95]">
            第 {Math.min(answeredCount + 1, test.questions.length)}/{test.questions.length} 题
          </p>
          <p className="text-[#5d6f86]">{axisLabel[currentQuestion.axis]}</p>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[#c8d6ea]">
          <div className="h-full rounded-full bg-gradient-to-r from-[#147f95] to-[#927ce6] transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <section className="rounded-[26px] border border-[#b7c7df]/70 bg-white/62 p-5 shadow-[0_18px_45px_rgba(64,78,113,0.12)]">
        <p className="text-sm font-bold text-[#147f95]">请选择更接近你的选项</p>
        <h2 className="mt-4 text-2xl font-black leading-tight">{currentQuestion.text}</h2>

        <div className="mt-5 grid gap-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={`${currentQuestion.id}-${index}`}
              type="button"
              onClick={() => setAnswers((current) => ({ ...current, [currentQuestion.id]: option.value ?? "X" }))}
              className="flex min-h-16 items-center gap-4 rounded-[20px] border border-[#b7c7df]/70 bg-white/65 p-4 text-left text-sm leading-6 text-[#26374d] transition hover:-translate-y-0.5 hover:border-[#147f95]/45 hover:bg-white/90"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e4f4f6] font-black text-[#147f95]">
                {String.fromCharCode(65 + index)}
              </span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-3">
        <ChallengeButton onClick={submitTest} disabled={!canSubmit}>
          {canSubmit ? "查看 MBTI 测试结果" : `继续测试 ${answeredCount}/${test.questions.length}`}
        </ChallengeButton>
        <button
          type="button"
          onClick={() => setAnswers({})}
          className="inline-flex items-center justify-center gap-2 text-sm font-bold text-[#4a5d75] hover:text-[#147f95]"
        >
          <RotateCcw size={16} />
          重新开始
        </button>
      </div>
    </ChallengeFrame>
  );
}
