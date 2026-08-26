"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/social-links";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(13,13,13,0.85)] py-3"
          : "bg-[rgba(13,13,13,0.6)] py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/logo-icon.png"
            alt="ForWord"
            width={40}
            height={40}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center md:hidden"
        >
          <span className="relative block h-[2px] w-6 bg-[var(--bone)] before:absolute before:left-0 before:top-[-8px] before:h-[2px] before:w-6 before:bg-[var(--bone)] after:absolute after:left-0 after:top-[8px] after:h-[2px] after:w-6 after:bg-[var(--bone)]" />
        </button>

        <ul
          className={`${
            open
              ? "flex fixed inset-0 top-16 flex-col items-center justify-center gap-8 bg-[rgba(13,13,13,0.98)] backdrop-blur-lg"
              : "hidden"
          } md:static md:flex md:flex-row md:items-center md:gap-8 md:bg-transparent`}
        >
          {navLinks.map((link) => (
            <li key={`${link.href}-${link.label}`}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="relative text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--bone)] transition-colors hover:text-[var(--gold-mid)] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-[var(--gold-gradient-h,var(--gold-mid))] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
