import type { ReactNode } from "react";

type PageShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function PageShell({ eyebrow, title, description, children }: PageShellProps) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <section className="mb-8 max-w-3xl">
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-petal">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-3xl font-bold leading-tight text-ink md:text-5xl">{title}</h1>
        {description ? (
          <p className="mt-4 text-base leading-8 text-ink/68 md:text-lg">{description}</p>
        ) : null}
      </section>
      {children}
    </main>
  );
}
