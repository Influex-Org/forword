"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 to `to` the first time it scrolls into view, then stops.
 * Mirrors the `data-count-to` behaviour on the Influex homepage.
 */
export function CountUp({
  to,
  suffix = "",
  durationMs = 1600,
  className,
}: {
  to: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    // Respect reduced motion by jumping straight to the final number — the
    // figure is the point, the animation is decoration. Deferred by a frame
    // rather than set synchronously, which would cascade renders (and seeding
    // the initial state instead would mismatch the server-rendered 0).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frame = requestAnimationFrame(() => setValue(to));
      return () => cancelAnimationFrame(frame);
    }

    const run = () => {
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min((now - start) / durationMs, 1);
        // Ease-out cubic: fast off the mark, settling into the final figure.
        setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect(); // fire once
          run();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, durationMs]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
