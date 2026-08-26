"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const options: { label: string; value: string | null }[] = [
  { label: "All", value: null },
  { label: "Articles", value: "article" },
  { label: "Videos", value: "video" },
  { label: "Audio", value: "audio" },
];

export function FilterBar() {
  const params = useSearchParams();
  const active = params.get("type");

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
      {options.map((opt) => {
        const isActive = (opt.value ?? null) === (active ?? null);
        const href = opt.value ? `/words?type=${opt.value}` : "/words";
        return (
          <Link
            key={opt.label}
            href={href}
            className={`rounded-full border px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
              isActive
                ? "border-[var(--gold-mid)] bg-[var(--gold-mid)] text-[var(--dark-bg)]"
                : "border-[var(--bone)]/15 text-[var(--bone)]/70 hover:border-[var(--gold-mid)]/50 hover:text-[var(--gold-mid)]"
            }`}
          >
            {opt.label}
          </Link>
        );
      })}
    </div>
  );
}
