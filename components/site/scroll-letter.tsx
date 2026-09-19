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

// Scroll choreography, all in viewport-height units.
//
// The content column is absolutely positioned and translated upward as the
// user scrolls. A word's reveal is derived from where it actually SITS in that
// column, not from its position in the word order — line heights here range
// from 2rem to 13vw, so index and vertical offset drift far apart. Pacing by
// index made words fade in at the very top of the viewport (some finished
// revealing after they had already scrolled off), which is unreadable.
// The letter OPENS AT THE TOP: when the section pins, the column's first line
// already sits near the top of the viewport. Because a word is lit once it has
// risen past SETTLE_VH, every line with an offset under (SETTLE_VH - START_VH)
// is already legible on arrival — i.e. the opening stanzas fill the upper two
// thirds, and the rest fade in low as they rise. Starting the column below the
// fold instead left a stretch of pinned, empty screen that read as "the site
// has ended".
const START_VH = 15; // content top at scroll progress 0
const ENTER_VH = 95; // a word starts fading in as it rises past this height
const SETTLE_VH = 75; // ...and is fully legible here, well below centre, then
//                       stays readable for the whole rise through the middle.
// The final line can rest no lower than (contentVh - lastWordOffset + SETTLE_VH),
// otherwise the closing words never finish revealing before the hold begins.
// SETTLE_VH is deliberately low so this ceiling is high enough to centre the
// closing stanza instead of stranding it against the top edge.
const END_REST_VH = 72; // where the final line comes to rest once travel ends
const STAGGER_VH = 3; // per-word cascade within a single line
// Translation finishes here, then the closing stanza is HELD on screen for the
// remaining scroll so the section never ends on an empty frame. The sticky
// wrapper unpins naturally afterwards and the next section scrolls over it.
const HOLD_END_P = 0.88;

/** Travel distance so the last line settles at END_REST_VH when scrolling ends. */
const travelFor = (contentVh: number) => START_VH + contentVh - END_REST_VH;

/** Used until the real layout is measured; avoids a flash of mistimed words. */
const FALLBACK_CONTENT_VH = 170;

type Metrics = { offsetsVh: number[]; travelVh: number };

/**
 * Maps a word's vertical offset within the column to the scroll range over
 * which it fades in. Because every word uses the same ENTER/SETTLE heights,
 * they all become readable at the same point on screen.
 */
function revealRange(offsetVh: number, travelVh: number, stagger: number) {
  const delay = stagger * STAGGER_VH;
  // Scaled by HOLD_END_P because all travel is compressed into [0, HOLD_END_P].
  return {
    start: ((START_VH + offsetVh + delay - ENTER_VH) / travelVh) * HOLD_END_P,
    end: ((START_VH + offsetVh + delay - SETTLE_VH) / travelVh) * HOLD_END_P,
  };
}

function Word({
  children,
  progress,
  start,
  end,
  emphasis,
  className,
  index,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  start: number;
  end: number;
  emphasis?: boolean;
  className?: string;
  index: number;
}) {
  // The reveal range is only known after layout is measured, and framer-motion
  // captures a useTransform input range on first render — passing an updated
  // [start, end] array has no effect. So the range is read through a ref inside
  // a function transformer, and every downstream transform uses a fixed [0, 1].
  const rangeRef = useRef({ start, end });
  useEffect(() => {
    rangeRef.current = { start, end };
  }, [start, end]);

  const reveal = useTransform(progress, (p) => {
    const { start: a, end: b } = rangeRef.current;
    if (b <= a) return p >= b ? 1 : 0;
    const v = (p - a) / (b - a);
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

  const [metrics, setMetrics] = useState<Metrics>(() => ({
    offsetsVh: [],
    travelVh: travelFor(FALLBACK_CONTENT_VH),
  }));

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
      setMetrics({
        offsetsVh,
        travelVh: travelFor((inner.offsetHeight / vh) * 100),
      });
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
  const travelRef = useRef(metrics.travelVh);
  useEffect(() => {
    travelRef.current = metrics.travelVh;
  }, [metrics.travelVh]);
  const contentY = useTransform(scrollYProgress, (p) => {
    const t = Math.min(p, HOLD_END_P) / HOLD_END_P; // hold after HOLD_END_P
    return `${START_VH - travelRef.current * t}vh`;
  });

  // Before measurement lands, approximate offsets by spreading words evenly.
  const offsetFor = (index: number) =>
    metrics.offsetsVh[index] ??
    (index / Math.max(totalWords, 1)) * FALLBACK_CONTENT_VH;

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
                {entries.map((entry, wi) => {
                  const { start, end } = revealRange(
                    offsetFor(entry.index),
                    metrics.travelVh,
                    entry.stagger,
                  );
                  return (
                    <Word
                      key={wi}
                      progress={scrollYProgress}
                      start={start}
                      end={end}
                      emphasis={entry.emphasis}
                      className={entry.className}
                      index={entry.index}
                    >
                      {entry.word.text}
                    </Word>
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
