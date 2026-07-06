import Link from "next/link";
import type { ReactNode } from "react";

type PrimaryButtonProps = {
  href?: string;
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  variant?: "dark" | "light";
};

export function PrimaryButton({
  href,
  children,
  type = "button",
  onClick,
  variant = "dark"
}: PrimaryButtonProps) {
  const className =
    variant === "dark"
      ? "inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-ink/15 transition hover:-translate-y-0.5"
      : "inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink shadow-sm ring-1 ring-ink/8 transition hover:-translate-y-0.5";

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
