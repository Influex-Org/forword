"use client";

import { useEffect, useState } from "react";

type Props = {
  words: string[];
  typeMs?: number;
  holdMs?: number;
  eraseMs?: number;
  className?: string;
};

/**
 * Typewriter word rotator.
 * State machine: type → hold → erase → next word.
 */
export function WordRotator({
  words,
  typeMs = 45,
  holdMs = 1200,
  eraseMs = 25,
  className,
}: Props) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState<"type" | "hold" | "erase">("type");

  useEffect(() => {
    const current = words[index] ?? "";
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "type") {
      if (display.length < current.length) {
        timeout = setTimeout(
          () => setDisplay(current.slice(0, display.length + 1)),
          typeMs,
        );
      } else {
        timeout = setTimeout(() => setPhase("hold"), holdMs);
      }
    } else if (phase === "hold") {
      timeout = setTimeout(() => setPhase("erase"), 0);
    } else if (phase === "erase") {
      if (display.length > 0) {
        timeout = setTimeout(
          () => setDisplay(current.slice(0, display.length - 1)),
          eraseMs,
        );
      } else {
        setPhase("type");
        setIndex((i) => (i + 1) % words.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [display, phase, index, words, typeMs, holdMs, eraseMs]);

  return (
    <span className={className}>
      <span className="gold-text">{display}</span>
      <span
        aria-hidden
        className="ml-0.5 inline-block w-[2px] animate-pulse bg-[var(--gold-mid)] align-baseline"
        style={{ height: "0.9em" }}
      />
    </span>
  );
}
