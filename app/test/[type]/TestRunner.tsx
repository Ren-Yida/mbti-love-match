"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChallengeButton } from "@/components/ChallengeButton";
import { scoreCompatibilityTest, type CompatibilityTest, type MbtiType } from "@/lib/mbti";
import { RotateCcw } from "lucide-react";

type TestRunnerProps = {
  test: CompatibilityTest;
};

export function TestRunner({ test }: TestRunnerProps) {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, MbtiType>>({});
  const answeredCount = Object.keys(answers).length;
  const progress = useMemo(() => Math.round((answeredCount / test.questions.length) * 100), [answeredCount, test.questions.length]);
  const canSubmit = answeredCount === test.questions.length;
  const currentQuestion = test.questions[answeredCount] ?? test.questions[test.questions.length - 1];

  async function submitTest() {
    if (!canSubmit) return;

    const result = scoreCompatibilityTest(test.selfType, answers);
    const params = new URLSearchParams({
      self: test.selfType,
      match: result.match
    });

    for (const candidate of result.candidates) {
      params.set(candidate, String(result.scores[candidate]));
    }

    try {
      await fetch("/api/submit-result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          test_type: "compatibility",
          self_type: test.selfType,
          answers,
          result: result.match,
          score_detail: {
            scores: result.scores,
            candidates: result.candidates
          },
          referrer: document.referrer || window.location.href
        })
      });
    } catch (error) {
      console.warn("Failed to save compatibility result", error);
    }

    router.push(`/result?${params.toString()}`);
  }

  if (!started) {
    return (
      <div className="pt-6">
        <div className="mb-8 space-y-3">
          <div className="w-fit rounded-[18px] border border-[#b7c7df]/70 bg-white/72 px-4 py-3 text-[#122033]">
            <p className="text-xs font-semibold text-[#5d6f86]">对方</p>
            <p className="mt-1 text-lg">所以你的官配到底是谁？</p>
          </div>
          <div className="ml-auto w-fit rounded-[18px] border border-[#8bcfd4]/70 bg-[#d9fbff]/72 px-4 py-3 text-[#122033]">
            <p className="text-xs font-semibold text-[#147f95]">我</p>
            <p className="mt-1 text-lg">等我测完这 15 题。</p>
          </div>
        </div>
        <p className="text-sm font-bold text-[#147f95]">官配测试</p>
        <h1 className="mt-3 text-5xl font-black leading-tight">{test.selfType} 官配测试</h1>
        <p className="mt-4 text-base leading-7 text-[#4a5d75]">{test.hook}</p>
        <div className="mt-6 grid grid-cols-2 gap-3 rounded-[24px] border border-[#b7c7df]/70 bg-white/52 p-3">
          {test.candidates.map((candidate) => (
            <div key={candidate} className="rounded-[18px] bg-[#eef7ff]/70 p-3">
              <p className="text-lg font-black">{candidate}</p>
              <p className="mt-1 text-xs text-[#5d6f86]">候选官配</p>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <ChallengeButton onClick={() => setStarted(true)}>开始测试</ChallengeButton>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-4 pt-5">
        <div>
          <p className="text-sm font-bold text-[#147f95]">第 {Math.min(answeredCount + 1, test.questions.length)}/{test.questions.length} 题</p>
          <h1 className="mt-2 text-3xl font-black">{test.selfType} 官配测试</h1>
        </div>
        <button
          type="button"
          onClick={() => {
            setAnswers({});
            setStarted(false);
          }}
          className="grid h-11 w-11 place-items-center rounded-full border border-[#b7c7df]/70 bg-white/52 text-[#34465f] hover:text-[#147f95]"
          aria-label="重新开始"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      <div className="mb-6 h-2 overflow-hidden rounded-full bg-[#c8d6ea]">
        <div className="h-full rounded-full bg-gradient-to-r from-[#147f95] to-[#927ce6] transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="rounded-[24px] border border-[#b7c7df]/70 bg-white/58 p-5">
        <p className="text-sm font-bold text-[#147f95]">真实恋爱场景</p>
        <h2 className="mt-4 text-2xl font-black leading-tight">{currentQuestion.text}</h2>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm">
        <p className="font-bold text-[#147f95]">你会怎么选</p>
        <p className="text-[#5d6f86]">选择一个反应</p>
      </div>

      <div className="mt-3 grid gap-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setAnswers((current) => ({ ...current, [currentQuestion.id]: option.value }))}
            className="flex min-h-16 items-center gap-4 rounded-[20px] border border-[#b7c7df]/70 bg-white/58 p-4 text-left text-sm leading-6 text-[#26374d] transition hover:-translate-y-0.5 hover:border-[#147f95]/45 hover:bg-white/85"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e4f4f6] font-black text-[#147f95]">
              {String.fromCharCode(65 + index)}
            </span>
            <span>{option.label.replace(`${option.value}：`, "")}</span>
          </button>
        ))}
      </div>

      <div className="mt-6">
        <ChallengeButton onClick={submitTest} disabled={!canSubmit}>
          {canSubmit ? "查看测试结果" : `继续测试 ${answeredCount}/${test.questions.length}`}
        </ChallengeButton>
      </div>
    </>
  );
}
