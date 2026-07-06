import type { ReactNode } from "react";

type ChallengeFrameProps = {
  children: ReactNode;
  className?: string;
};

export function ChallengeFrame({ children, className = "" }: ChallengeFrameProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#cdd9ec] text-[#122033]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(139,219,216,0.3),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(187,169,244,0.32),transparent_30%),linear-gradient(180deg,#f2f7ff_0%,#d7e3f3_52%,#ddd5f3_100%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-35 [background-image:radial-gradient(circle,rgba(58,79,112,0.32)_1px,transparent_1px)] [background-size:74px_92px]" />
      <section className="relative mx-auto flex min-h-screen w-full max-w-[520px] items-center px-4 py-6">
        <div
          className={`relative w-full rounded-[32px] border border-white/75 bg-white/62 p-5 shadow-[0_30px_90px_rgba(64,78,113,0.2)] backdrop-blur-xl md:p-6 ${className}`}
        >
          {children}
        </div>
      </section>
    </main>
  );
}
