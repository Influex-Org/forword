"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
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
    sizeClass: "text-[clamp(1.6rem,4vw,3rem)] font-light italic",
    words: "Dear Soul,".split(" ").map((w) => ({ text: w, italic: true })),
  },
  {
    sizeClass: "text-[clamp(1.45rem,3.6vw,2.7rem)] font-light",
    words: "Thank you for being here.".split(" ").map((w) => ({ text: w })),
  },
  {
    sizeClass:
      "text-[clamp(1.5rem,3.8vw,2.8rem)] font-light italic text-[var(--bone)]/85",
    words: "But WHY? Why are you here?"
      .split(" ")
      .map((w) => ({ text: w, italic: true })),
    gap: "mt-10 md:mt-16",
  },
  {
    sizeClass:
      "text-[clamp(1.6rem,4vw,3rem)] font-light italic text-[var(--bone)]/85",
    words: "Well one thing’s clear:"
      .split(" ")
      .map((w) => ({ text: w, italic: true })),
    gap: "mt-10 md:mt-16",
  },
  {
    sizeClass:
      "text-[clamp(2.3rem,8.5vw,6rem)] font-semibold uppercase tracking-[0.08em]",
    words: "YOU ARE HERE."
      .split(" ")
      .map((w) => ({ text: w, emphasis: true })),
    gap: "mt-10 md:mt-16",
  },
  {
    sizeClass: "text-[clamp(1.8rem,5vw,3.6rem)] font-medium italic",
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
      "text-[clamp(1.6rem,4vw,3rem)] font-light italic text-[var(--bone)]/80",
    words: "Here’s What I Believe…"
      .split(" ")
      .map((w) => ({ text: w, italic: true })),
    gap: "mt-10 md:mt-16",
  },
  {
    sizeClass:
      "text-[clamp(2rem,5.8vw,4.2rem)] font-medium uppercase tracking-[0.1em]",
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
      "text-[clamp(2.4rem,10vw,7.2rem)] font-bold uppercase tracking-[0.06em]",
    words: "TO FULLY. EXPRESS."
      .split(" ")
      .map((w) => ({ text: w, emphasis: true })),
    gap: "mt-6 md:mt-10",
  },
  {
    sizeClass:
      "text-[clamp(2.8rem,13vw,10rem)] font-black uppercase tracking-[0.03em] leading-[1.02]",
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
    sizeClass: "text-[clamp(2rem,6vw,4.5rem)] font-normal italic",
    words: "You Are Here To"
      .split(" ")
      .map((w) => ({ text: w, italic: true })),
    gap: "mt-20 md:mt-32",
  },
  {
    sizeClass: "text-[clamp(2.2rem,7.2vw,5.2rem)] font-normal italic",
    words: [{ text: "Beautifully", italic: true }],
    gap: "mt-4 md:mt-8",
  },
  {
    sizeClass: "text-[clamp(2.3rem,8vw,5.8rem)] font-normal italic leading-[1.05]",
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

// Scroll choreography.
//
// Words reveal ONE AT A TIME, in order — that sequential unspooling is the
// whole point of the section, so pacing is driven by a "frontier": the index
// of the word currently lighting up, advancing steadily with scroll.
//
// The column's position is then derived from the frontier rather than moving
// independently. It sits still at START_VH while the letter fills downward
// from the top, and only begins travelling once the frontier reaches the
// reading line — from then on it scrolls exactly enough to keep the newest
// word at SETTLE_VH while older lines rise away.
//
//   contentY = min(START_VH, SETTLE_VH - offsetOf(frontier))
//
// Deriving both from one value is what stops them drifting apart. Earlier
// versions paced reveals by index while moving the column on its own clock
// (words lit at the very top edge, some after they had scrolled off), then
// paced purely by position (readable, but every line above the reading line
// was already lit on arrival — the letter arrived in one block).
const START_VH = 16; // where the column sits while the letter fills from the top
const SETTLE_VH = 74; // the reading line: where each word lands as it lights up
// Words of overlap in the fade. ~1 keeps it strictly one-at-a-time; a little
// more lets each word begin before the one before it has finished.
const REVEAL_WINDOW = 1.35;
// Reveals finish here; the closing stanza is then HELD for the remaining
// scroll so the section never ends on an empty frame.
const HOLD_END_P = 0.86;

/** Used until the real layout is measured; avoids a flash of mistimed words. */
const FALLBACK_CONTENT_VH = 170;

type Metrics = { offsetsVh: number[] };

/**
 * The column's offset at a fractional word index, so the frontier can sit
 * between two words instead of jumping a whole line at a time.
 */
function offsetAt(offsets: number[], index: number, total: number): number {
  if (!offsets.length) {
    // Pre-measurement fallback: spread the words evenly down the column.
    return (index / Math.max(total - 1, 1)) * FALLBACK_CONTENT_VH;
  }
  const clamped = Math.max(0, Math.min(index, offsets.length - 1));
  const lo = Math.floor(clamped);
  const hi = Math.min(lo + 1, offsets.length - 1);
  const frac = clamped - lo;
  return (offsets[lo] ?? 0) * (1 - frac) + (offsets[hi] ?? 0) * frac;
}

function Word({
  children,
  frontier,
  index,
  emphasis,
  className,
}: {
  children: ReactNode;
  /** Index of the word currently lighting up; shared by every word. */
  frontier: MotionValue<number>;
  index: number;
  emphasis?: boolean;
  className?: string;
}) {
  // A function transformer rather than a [start, end] input range: the range
  // would depend on measured layout, and framer-motion captures an input range
  // on first render, silently ignoring later updates.
  const reveal = useTransform(frontier, (f) => {
    const v = (f - index) / REVEAL_WINDOW;
    return v < 0 ? 0 : v > 1 ? 1 : v;
  });

  const opacity = reveal;
  const y = useTransform(reveal, [0, 1], [emphasis ? 28 : 18, 0]);
  const scale = useTransform(reveal, [0, 1], [emphasis ? 0.72 : 0.92, 1]);
  const blurPx = useTransform(reveal, [0, 1], [emphasis ? 4 : 3, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  return (
    <motion.span
      data-word={index}
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
  const innerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [metrics, setMetrics] = useState<Metrics>(() => ({ offsetsVh: [] }));

  // Measure layout offsets, not bounding rects: the words carry their own
  // y/scale transforms mid-animation, which would corrupt getBoundingClientRect.
  // offsetTop is layout-based and therefore transform-immune.
  useLayoutEffect(() => {
    const measure = () => {
      const inner = innerRef.current;
      const vh = window.innerHeight;
      if (!inner || !vh) return;
      const base = inner.offsetTop;
      const nodes = inner.querySelectorAll<HTMLElement>("[data-word]");
      const offsetsVh: number[] = [];
      nodes.forEach((el) => {
        const i = Number(el.dataset.word);
        if (Number.isInteger(i)) offsetsVh[i] = ((el.offsetTop - base) / vh) * 100;
      });
      setMetrics({ offsetsVh });
    };

    measure();
    window.addEventListener("resize", measure);
    // Web fonts land after first paint and change line heights.
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Assign each word a stable global index plus its position within its line,
  // so the cascade reads left-to-right while staying anchored to the column.
  let cursor = 0;
  const linesWithIdx = LINES.map((line, li) => ({
    li,
    line,
    entries: line.words.map((word, wi) => {
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
        stagger: wi,
        emphasis: Boolean(word.emphasis),
      };
    }),
  }));

  const totalWords = cursor;

  // Read through a ref: the transformers below are created once, but the
  // measured offsets arrive a commit later.
  const offsetsRef = useRef(metrics.offsetsVh);
  useEffect(() => {
    offsetsRef.current = metrics.offsetsVh;
  }, [metrics.offsetsVh]);
  const totalRef = useRef(totalWords);
  useEffect(() => {
    totalRef.current = totalWords;
  }, [totalWords]);

  // The frontier runs past the last index by REVEAL_WINDOW so the final word
  // has room to finish fading before the hold begins.
  const frontier = useTransform(scrollYProgress, (p) => {
    const t = Math.min(p, HOLD_END_P) / HOLD_END_P;
    return t * (totalRef.current - 1 + REVEAL_WINDOW);
  });

  // Column position follows the frontier: still at START_VH while the letter
  // fills downward, then travelling just enough to hold the newest word at the
  // reading line.
  const contentY = useTransform(frontier, (f) => {
    const offset = offsetAt(
      offsetsRef.current,
      Math.min(f, totalRef.current - 1),
      totalRef.current,
    );
    return `${Math.min(START_VH, SETTLE_VH - offset)}vh`;
  });

  return (
    <div ref={ref} className="relative h-[600vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          src="/assets/video/dima-stage.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
        />
        {/* Still darkest top and bottom, where lines enter and exit, but lighter
            through the middle so the stage footage actually reads behind the
            text. The video's own opacity and this overlay multiply, so both
            have to give for the footage to come up. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/80 via-[var(--dark-bg)]/55 to-[var(--dark-bg)]/85" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(203,142,68,0.08)_0%,transparent_60%)]" />

        <motion.div
          style={{ y: contentY, willChange: "transform" }}
          className="absolute inset-x-0 top-0 z-10 flex flex-col items-center px-6 text-center"
        >
          <div
            ref={innerRef}
            className="mx-auto flex max-w-6xl flex-col items-center gap-4 md:gap-6"
          >
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
                    frontier={frontier}
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
