"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/lib/social-links";

const linkClass =
  "relative text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--bone)] transition-colors hover:text-[var(--gold-mid)] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-[var(--gold-gradient-h,var(--gold-mid))] after:transition-all after:duration-300 hover:after:w-full";

export function Navigation() {
  const barRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [barHeight, setBarHeight] = useState(72);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The bar is taller before you scroll (py-5) than after (py-3). The drawer
  // hangs off its bottom edge, so the offset has to be measured — a hardcoded
  // value leaves a gap that changes size as you scroll.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const measure = () => setBarHeight(bar.getBoundingClientRect().height);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(bar);
    return () => ro.disconnect();
  }, []);

  // Hold the page still while the drawer is open, or the background scrolls
  // under your finger. Escape closes it.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Rotating to landscape shouldn't leave the drawer stuck open behind the
  // inline desktop nav.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-0 z-[1000]">
      <div
        ref={barRef}
        // Padding keys off scroll ONLY. Shrinking the bar when the drawer
        // opens would move the very edge the drawer is anchored to, leaving a
        // gap that resolves a frame later. Only the backdrop reacts to `open`.
        className={`backdrop-blur-md transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        } ${open ? "bg-[rgba(13,13,13,0.92)]" : scrolled ? "bg-[rgba(13,13,13,0.85)]" : "bg-[rgba(13,13,13,0.6)]"}`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/assets/logo-icon.png"
              alt="ForWord"
              width={40}
              height={40}
              priority
              className="h-10 w-auto"
              style={{ width: "auto", height: "auto" }}
            />
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="relative grid h-10 w-10 place-items-center md:hidden"
          >
            {/* Three bars that fold into an X rather than swapping icons. */}
            <span className="relative block h-[2px] w-6">
              <span
                className={`absolute left-0 block h-[2px] w-6 bg-[var(--bone)] transition-transform duration-300 ${
                  open ? "rotate-45" : "-translate-y-2"
                }`}
              />
              <span
                className={`absolute left-0 block h-[2px] w-6 bg-[var(--bone)] transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[2px] w-6 bg-[var(--bone)] transition-transform duration-300 ${
                  open ? "-rotate-45" : "translate-y-2"
                }`}
              />
            </span>
          </button>

          {/* Desktop nav is its own element so the mobile drawer below doesn't
              have to fight it for layout classes. */}
          <ul className="hidden md:flex md:flex-row md:items-center md:gap-5 lg:gap-8">
            {navLinks.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile drawer: kept mounted and faded, rather than toggled between
          hidden/flex, which popped in with no transition at all. */}
      <div
        id="mobile-menu"
        style={{ top: barHeight }}
        aria-hidden={!open}
        className={`fixed inset-x-0 bottom-0 bg-[rgba(13,13,13,0.98)] backdrop-blur-lg transition-[opacity,transform] duration-300 ease-out md:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <ul className="flex h-full flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <li key={`${link.href}-${link.label}`}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className={`${linkClass} text-[0.85rem]`}
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
