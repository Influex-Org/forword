"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
} & Omit<HTMLMotionProps<"div">, "children">;

export function Reveal({
  children,
  delay = 0,
  y = 30,
  className,
  once = true,
  ...rest
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once, amount: 0.15 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
