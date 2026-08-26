"use client";

export function ScrollIndicator() {
  return (
    <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
      <span className="text-[0.6rem] tracking-[0.35em] text-[var(--bone)]/60 uppercase">
        Scroll
      </span>
      <span className="relative block h-12 w-[1px] overflow-hidden bg-[var(--bone)]/15">
        <span className="absolute inset-x-0 top-0 block h-6 animate-[scrollLine_2.2s_ease-in-out_infinite] bg-[var(--gold-mid)]" />
      </span>
      <style>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          50%  { transform: translateY(50%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </div>
  );
}
