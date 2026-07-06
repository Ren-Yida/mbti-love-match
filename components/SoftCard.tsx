import type { ReactNode } from "react";

type SoftCardProps = {
  children: ReactNode;
  className?: string;
};

export function SoftCard({ children, className = "" }: SoftCardProps) {
  return (
    <div className={`rounded-lg border border-white/80 bg-white/82 p-5 shadow-soft backdrop-blur ${className}`}>
      {children}
    </div>
  );
}
