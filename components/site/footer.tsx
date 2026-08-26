import Image from "next/image";
import { SocialIcon } from "./social-icon";
import { socialLinks } from "@/lib/social-links";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--dark-bg)] py-16">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-[0.15]"
        style={{ backgroundImage: "url(/assets/hero-bg.jpg)" }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[var(--dark-bg)] via-[var(--dark-bg)]/95 to-transparent" />

      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-8 px-6 text-center">
        <Image
          src="/assets/logo-full.png"
          alt="ForWord"
          width={140}
          height={35}
          className="h-[35px] w-auto opacity-70"
          style={{ width: "auto", height: "auto" }}
        />

        <ul className="flex flex-wrap items-center justify-center gap-4">
          {socialLinks.map((s) => (
            <li key={s.name}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="group grid h-10 w-10 place-items-center rounded-full border border-[var(--gold-mid)]/40 text-[var(--gold-mid)] transition-all duration-300 hover:border-[var(--gold-mid)] hover:bg-[var(--gold-mid)] hover:text-[var(--dark-bg)]"
              >
                <SocialIcon name={s.name} className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>

        <p className="text-[0.75rem] tracking-[0.2em] text-[var(--bone)]/50 uppercase">
          © {new Date().getFullYear()} ForWord · Dmitriy Kozlov · All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
