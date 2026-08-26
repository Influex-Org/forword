"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

type Props = {
  src: string;
  className?: string;
  opacity?: number;
};

/**
 * Parallax background image — translates vertically as user scrolls
 * over the parent element.
 */
export function ParallaxBg({ src, className, opacity = 0.3 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <motion.div
        style={{
          y,
          backgroundImage: `url(${src})`,
          opacity,
        }}
        className="absolute inset-0 -top-[15%] -bottom-[15%] bg-cover bg-center"
      />
    </div>
  );
}
