import { SoftCard } from "@/components/SoftCard";

type GeneratorResultProps = {
  title: string;
  children: React.ReactNode;
};

export function GeneratorResult({ title, children }: GeneratorResultProps) {
  return (
    <SoftCard>
      <h2 className="mb-4 text-xl font-bold text-ink">{title}</h2>
      <div className="space-y-4 text-sm leading-7 text-ink/74">{children}</div>
    </SoftCard>
  );
}
