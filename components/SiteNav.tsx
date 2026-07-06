import Link from "next/link";
import { Sparkles } from "lucide-react";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/mbti-about", label: "MBTI说明" }
];

export function SiteNav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/60 bg-white/48 text-[#122033] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#8be9e6]/28 text-[#147f95]">
            <Sparkles size={18} />
          </span>
          <span>MBTI 测试中心</span>
        </Link>
        <div className="flex items-center gap-1 rounded-full bg-white/60 p-1 shadow-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm text-[#122033]/68 transition hover:bg-white/80 hover:text-[#122033]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
