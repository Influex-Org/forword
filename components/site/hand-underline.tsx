"use client";

import { motion } from "framer-motion";

type Props = {
  className?: string;
  delay?: number;
  duration?: number;
};

/**
 * A hand-drawn style SVG underline.
 * Animates stroke pathLength from 0 → 1 on mount.
 */
export function HandUnderline({
  className,
  delay = 0.6,
  duration = 1.2,
}: Props) {
  return (
    <svg
      viewBox="0 0 400 20"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
    >
      <motion.path
        d="M4 12 C 80 4, 160 18, 240 8 S 380 14, 396 6"
        stroke="url(#underlineGold)"
        strokeWidth={3}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.6 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
      />
      <defs>
        <linearGradient id="underlineGold" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#99662D" />
          <stop offset="50%" stopColor="#DEAD74" />
          <stop offset="100%" stopColor="#99662D" />
        </linearGradient>
      </defs>
    </svg>
  );
}
