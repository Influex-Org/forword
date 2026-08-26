"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  className?: string;
  charDelay?: number;
  startDelay?: number;
};

/**
 * Reveals a string one character at a time when it scrolls into view.
 */
export function Typewriter({
  text,
  className,
  charDelay = 70,
  startDelay = 200,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = (i: number) => {
      if (cancelled) return;
      if (i > text.length) return;
      setDisplay(text.slice(0, i));
      timeout = setTimeout(() => tick(i + 1), charDelay);
    };

    const start = setTimeout(() => tick(1), startDelay);
    return () => {
      cancelled = true;
      clearTimeout(start);
      clearTimeout(timeout);
    };
  }, [visible, text, charDelay, startDelay]);

  return (
    <span ref={ref} className={className}>
      {display}
      <span
        aria-hidden
        className={`ml-0.5 inline-block w-[2px] bg-[var(--gold-mid)] align-baseline ${
          visible && display.length < text.length ? "animate-pulse" : "opacity-0"
        }`}
        style={{ height: "0.9em" }}
      />
    </span>
  );
}
