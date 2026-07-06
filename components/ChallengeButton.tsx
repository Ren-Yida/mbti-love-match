import Link from "next/link";
import type { ReactNode } from "react";

type ChallengeButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
};

export function ChallengeButton({ children, href, onClick, disabled = false, type = "button" }: ChallengeButtonProps) {
  const className =
    "inline-flex min-h-14 w-full items-center justify-center rounded-[20px] bg-gradient-to-r from-[#7edbd8] via-[#edf9ff] to-[#bba9f4] px-5 py-3 text-sm font-black text-[#102033] shadow-[0_14px_36px_rgba(76,144,160,0.18)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50";

  if (href && !disabled) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
}
