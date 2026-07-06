import { Bot } from "lucide-react";

type AgentBadgeProps = {
  name: string;
  description: string;
};

export function AgentBadge({ name, description }: AgentBadgeProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-ink/8 bg-white/70 p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-mint/18 text-ink">
        <Bot size={18} />
      </span>
      <div>
        <h3 className="font-semibold text-ink">{name}</h3>
        <p className="mt-1 text-sm leading-6 text-ink/62">{description}</p>
      </div>
    </div>
  );
}
