"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export type FlowWord = {
  text: ReactNode;
  bold?: boolean;
  gold?: boolean;
  italic?: boolean;
};

export type FlowLine = {
  words: FlowWord[];
  className?: string;
};

type Props = {
  lines: FlowLine[];
  /** Seconds between word reveals. */
  wordDelay?: number;
  /** Class applied to bold-flagged words. */
  boldClass?: string;
  /** Class on the outer wrapper. */
  className?: string;
  /** Viewport threshold before reveal starts (framer-motion `amount`). */
  amount?: number;
  /**
   * Ceiling on the TOTAL stagger across the block, in seconds. `wordDelay`
   * accumulates linearly, so a long paragraph would otherwise take seconds to
   * finish (49 words x 0.09s = 4.4s before the last word even starts). When the
   * block is long enough to exceed this, the per-word delay is compressed to
   * fit. Short blocks keep their `wordDelay` rhythm untouched.
   */
  maxStagger?: number;
};

/**
 * Reveals a flowing paragraph or a stacked set of lines one word at a time
 * as the block scrolls into view. Each line renders as its own flex-wrap
 * row so text still wraps naturally when it gets long.
 */
export function LinesFlow({
  lines,
  wordDelay = 0.08,
  boldClass = "font-semibold text-[var(--bone)]",
  className,
  amount = 0.2,
  maxStagger = 1.3,
}: Props) {
  const total = lines.reduce((n, line) => n + line.words.length, 0);
  const steps = Math.max(total - 1, 1);
  // Compress only when the block would otherwise overrun the ceiling.
  const delayStep = Math.min(wordDelay, maxStagger / steps);
  let global = 0;
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      className={className}
    >
      {lines.map((line, li) => (
        <div
          key={li}
          className={`flex flex-wrap items-baseline justify-center gap-x-[0.35em] gap-y-1 ${line.className ?? ""}`}
        >
          {line.words.map((w, wi) => {
            const i = global++;
            const cls = [
              "inline-block",
              w.bold ? boldClass : "",
              w.italic ? "italic" : "",
              w.gold ? "gold-text" : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <motion.span
                key={wi}
                custom={i}
                variants={{
                  hidden: { opacity: 0, y: 12, filter: "blur(3px)" },
                  show: (idx: number) => ({
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                      delay: idx * delayStep,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }),
                }}
                className={cls}
              >
                {w.text}
              </motion.span>
            );
          })}
        </div>
      ))}
    </motion.div>
  );
}
