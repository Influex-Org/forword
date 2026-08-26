import type { SVGProps } from "react";

export function YinYang(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <defs>
        <linearGradient id="yy-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#DEAD74" />
          <stop offset="0.5" stopColor="#CB8E44" />
          <stop offset="1" stopColor="#DEAD74" />
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="47"
        fill="none"
        stroke="url(#yy-gold)"
        strokeWidth="3"
      />
      <path
        d="M 50,3 A 47,47 0 0 1 50,97 A 23.5,23.5 0 0 1 50,50 A 23.5,23.5 0 0 0 50,3 z"
        fill="url(#yy-gold)"
      />
      <circle cx="50" cy="26.5" r="6.5" fill="#0D0D0D" />
      <circle cx="50" cy="73.5" r="6.5" fill="url(#yy-gold)" />
    </svg>
  );
}
