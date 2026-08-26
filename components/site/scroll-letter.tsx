"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { YinYang } from "./yin-yang";

type WordDef = {
  text: ReactNode;
  gold?: boolean;
  italic?: boolean;
  /** Adds a small extra scale-in on entry — reserve for climax words. */
  emphasis?: boolean;
};

type LineDef = {
  words: WordDef[];
  sizeClass: string;
  gap?: string;
};

const LINES: LineDef[] = [
  {
    sizeClass: "text-[clamp(2.2rem,4vw,3rem)] font-light italic",
    words: "Dear Soul,".split(" ").map((w) => ({ text: w, italic: true })),
  },
  {
    sizeClass: "text-[clamp(2rem,3.6vw,2.7rem)] font-light",
    words: "Thank you for being here.".split(" ").map((w) => ({ text: w })),
  },
  {
    sizeClass:
      "text-[clamp(2.1rem,3.8vw,2.8rem)] font-light italic text-[var(--bone)]/85",
    words: "But WHY? Why are you here?"
      .split(" ")
      .map((w) => ({ text: w, italic: true })),
    gap: "mt-10 md:mt-16",
  },
  {
    sizeClass:
      "text-[clamp(2.2rem,4vw,3rem)] font-light italic text-[var(--bone)]/85",
    words: "Well one thing’s clear:"
      .split(" ")
      .map((w) => ({ text: w, italic: true })),
    gap: "mt-10 md:mt-16",
  },
  {
    sizeClass:
      "text-[clamp(4rem,8.5vw,6rem)] font-semibold uppercase tracking-[0.08em]",
    words: "YOU ARE HERE."
      .split(" ")
      .map((w) => ({ text: w, emphasis: true })),
    gap: "mt-10 md:mt-16",
  },
  {
    sizeClass: "text-[clamp(2.6rem,5vw,3.6rem)] font-medium italic",
    words: [
      { text: "Why", italic: true },
      { text: "Are", italic: true },
      { text: "YOU", italic: true, gold: true, emphasis: true },
      { text: "Here?", italic: true },
    ],
    gap: "mt-10 md:mt-16",
  },
  {
    sizeClass:
      "text-[clamp(2.2rem,4vw,3rem)] font-light italic text-[var(--bone)]/80",
    words: "Here’s What I Believe…"
      .split(" ")
      .map((w) => ({ text: w, italic: true })),
    gap: "mt-10 md:mt-16",
  },
  {
    sizeClass:
      "text-[clamp(3rem,5.8vw,4.2rem)] font-medium uppercase tracking-[0.1em]",
    words: [
      { text: "YOU" },
      { text: "ARE" },
      { text: "HERE…" },
      { text: "TO" },
      { text: "BE" },
      { text: "YOU.", gold: true, emphasis: true },
    ],
    gap: "mt-14 md:mt-24",
  },
  {
    sizeClass:
      "text-[clamp(4.6rem,10vw,7.2rem)] font-bold uppercase tracking-[0.06em]",
    words: "TO FULLY. EXPRESS."
      .split(" ")
      .map((w) => ({ text: w, emphasis: true })),
    gap: "mt-6 md:mt-10",
  },
  {
    sizeClass:
      "text-[clamp(6rem,13vw,10rem)] font-black uppercase tracking-[0.03em] leading-[1.02]",
    words: [
      { text: "YOUR", gold: true, emphasis: true },
      {
        text: (
          <span className="inline-flex items-baseline">
            <span>S</span>
            <YinYang className="mx-[0.02em] inline-block h-[0.82em] w-[0.82em] translate-y-[0.08em]" />
            <span>UL.</span>
          </span>
        ),
        gold: true,
        emphasis: true,
      },
    ],
  },
  // Final punchline — three cinematic beats, softer italic voice.
  {
    sizeClass: "text-[clamp(3rem,6vw,4.5rem)] font-normal italic",
    words: "You Are Here To"
      .split(" ")
      .map((w) => ({ text: w, italic: true })),
    gap: "mt-20 md:mt-32",
  },
  {
    sizeClass: "text-[clamp(3.6rem,7.2vw,5.2rem)] font-normal italic",
    words: [{ text: "Beautifully", italic: true }],
    gap: "mt-4 md:mt-8",
  },
  {
    sizeClass: "text-[clamp(4rem,8vw,5.8rem)] font-normal italic leading-[1.05]",
    words: [
      { text: "Express", italic: true },
      { text: "Your", italic: true, gold: true, emphasis: true },
      {
        text: (
          <span className="inline-flex items-baseline">
            <span>S</span>
            <YinYang className="mx-[0.02em] inline-block h-[0.72em] w-[0.72em] translate-y-[0.08em]" />
            <span>ul.</span>
          </span>
        ),
        italic: true,
        gold: true,
        emphasis: true,
      },
    ],
    gap: "mt-4 md:mt-8",
  },
];

// Flatten so each word has a stable global index for scroll pacing.
type WordAtom = {
  key: string;
  text: ReactNode;
  className: string;
  lineIdx: number;
};

const WORDS: WordAtom[] = (() => {
  const out: WordAtom[] = [];
  LINES.forEach((line, li) => {
    line.words.forEach((word, wi) => {
      const cls = [
        line.sizeClass,
        word.italic ? "italic" : "",
        word.gold ? "gold-text" : "text-[var(--bone)]",
      ]
        .filter(Boolean)
        .join(" ");
      out.push({
        key: `${li}-${wi}`,
        text: word.text,
        className: cls,
        lineIdx: li,
      });
    });
  });
  return out;
})();

const TOTAL = WORDS.length;
const REVEAL_START = 0.08;
const REVEAL_END = 0.88;
const STEP = (REVEAL_END - REVEAL_START) / TOTAL;
// Each word reveal window is slightly larger than STEP so consecutive words
// overlap, producing a flowing "unspooling" feel rather than a hard march.
const WINDOW = STEP * 1.6;

function Word({
  children,
  progress,
  index,
  emphasis,
  className,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  index: number;
  emphasis?: boolean;
  className?: string;
}) {
  const start = REVEAL_START + index * STEP;
  const end = Math.min(start + WINDOW, 1);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [emphasis ? 28 : 18, 0]);
  const scale = useTransform(
    progress,
    [start, end],
    [emphasis ? 0.72 : 0.92, 1],
  );
  const blurPx = useTransform(progress, [start, end], [emphasis ? 4 : 3, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  return (
    <motion.span
      style={{
        opacity,
        y,
        scale,
        filter,
        willChange: "opacity, transform, filter",
      }}
      className={`inline-block ${className ?? ""}`}
    >
      {children}
    </motion.span>
  );
}

export function ScrollLetter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Pre-map every word to its global index so render stays declarative.
  let cursor = 0;
  const linesWithIdx = LINES.map((line, li) => ({
    li,
    line,
    entries: line.words.map((word) => {
      const cls = [
        line.sizeClass,
        word.italic ? "italic" : "",
        word.gold ? "gold-text" : "text-[var(--bone)]",
      ]
        .filter(Boolean)
        .join(" ");
      return {
        word,
        className: cls,
        index: cursor++,
        emphasis: Boolean(word.emphasis),
      };
    }),
  }));

  // Content translates upward as user scrolls so every line gets its moment
  // near vertical center of the viewport (like film credits). Start: first
  // line sits around 45vh (near center). End: last line sits around 45vh.
  const contentY = useTransform(scrollYProgress, [0, 1], ["50vh", "-155vh"]);

  return (
    <div ref={ref} className="relative h-[800vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_031045_0e1165dd-ab48-46e3-ad3d-5fe77f217647.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/85 via-[var(--dark-bg)]/70 to-[var(--dark-bg)]/90" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(203,142,68,0.08)_0%,transparent_60%)]" />

        <motion.div
          style={{ y: contentY, willChange: "transform" }}
          className="absolute inset-x-0 top-0 z-10 flex flex-col items-center px-6 text-center"
        >
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 md:gap-6">
            <span className="eyebrow text-[0.9rem] tracking-[0.4em]">
              A Letter To You
            </span>
            {linesWithIdx.map(({ li, line, entries }) => (
              <div
                key={li}
                className={`flex flex-wrap items-baseline justify-center gap-x-[0.35em] gap-y-1 leading-[1.05] ${line.sizeClass} ${line.gap ?? ""}`}
              >
                {entries.map((entry, wi) => (
                  <Word
                    key={wi}
                    progress={scrollYProgress}
                    index={entry.index}
                    emphasis={entry.emphasis}
                    className={entry.className}
                  >
                    {entry.word.text}
                  </Word>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Silence unused-warning on the flattened list (kept for downstream reuse).
export const __wordCount = WORDS.length;
