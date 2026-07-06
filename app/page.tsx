import { ChallengeButton } from "@/components/ChallengeButton";
import { ChallengeFrame } from "@/components/ChallengeFrame";
import { ArrowRight, HeartHandshake, Sparkles, Timer } from "lucide-react";
import Link from "next/link";

const testModules = [
  {
    href: "/mbti-28",
    icon: Timer,
    eyebrow: "快速测试",
    title: "MBTI快速测试",
    description: "用更轻量的恋爱场景题，快速了解你在亲密关系中的人格倾向。",
    cta: "开始快速测试",
    tone: "bg-[#e2fbfb] text-[#147f95]"
  },
  {
    href: "/mbti-93",
    icon: Sparkles,
    eyebrow: "93题",
    title: "MBTI 完整测试",
    description: "从社交能量、信息偏好、决策方式和生活节奏，更完整地判断 MBTI。",
    cta: "开始完整测试",
    tone: "bg-[#ece7ff] text-[#7460d9]"
  },
  {
    href: "/test",
    icon: HeartHandshake,
    eyebrow: "官配测试",
    title: "MBTI中的官配是否真的适合你",
    description: "已经知道自己的 MBTI？看看现阶段更适合你心境的伴侣 MBTI。",
    cta: "测试我的官配",
    tone: "bg-[#fff0f5] text-[#c65d82]"
  }
];

export default function HomePage() {
  return (
    <ChallengeFrame className="my-10">
      <div className="pt-8">
        <section className="mx-auto max-w-[430px] text-center">
          <p className="mx-auto w-fit rounded-full border border-[#147f95]/20 bg-[#147f95]/8 px-4 py-2 text-sm font-bold text-[#147f95]">
            MBTI 测试中心
          </p>
          <h1 className="mx-auto mt-4 text-[2.15rem] font-black leading-[1.12] tracking-normal md:text-[2.55rem]">
            从这里开始了解你的 MBTI
          </h1>
          <p className="mx-auto mt-5 max-w-[390px] text-base leading-8 text-[#34465f]/78">
            第一次认识自己，重新确认类型，现阶段的官配关系；
            <br />
            都可以从一个更贴近当下状态的测试开始。
          </p>
        </section>

        <div className="mt-8 grid gap-4">
          {testModules.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[26px] border border-[#b7c7df]/70 bg-white/58 p-5 shadow-[0_18px_45px_rgba(64,78,113,0.12)] transition hover:-translate-y-0.5 hover:border-[#147f95]/45 hover:bg-white/82"
              >
                <div className="flex items-start gap-4">
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-[18px] ${item.tone}`}>
                    <Icon size={22} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-[#147f95]">{item.eyebrow}</p>
                    <h2 className="mt-1 text-xl font-black leading-snug text-[#122033]">{item.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-[#4a5d75]">{item.description}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#147f95]">
                      {item.cta}
                      <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mx-auto mt-8 max-w-[390px]">
          <ChallengeButton href="/mbti-28">不知道自己 MBTI？先做 28 题快速测试</ChallengeButton>
        </div>
      </div>
    </ChallengeFrame>
  );
}
