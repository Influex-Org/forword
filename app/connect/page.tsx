import { Navigation } from "@/components/site/navigation";
import { Footer } from "@/components/site/footer";
import { Reveal } from "@/components/site/reveal";
import { ContactForm } from "@/components/site/contact-form";
import { SocialIcon } from "@/components/site/social-icon";
import { socialLinks } from "@/lib/social-links";

export default function ConnectPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-[var(--dark-bg)] px-6 pt-40 pb-24">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15"
            style={{ backgroundImage: "url(/assets/hero-bg.jpg)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/80 via-[var(--dark-bg)]/60 to-[var(--dark-bg)]" />

          <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            {/* LEFT */}
            <div className="flex flex-col gap-8">
              <Reveal>
                <span className="eyebrow">Let&apos;s Connect</span>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="text-[clamp(2rem,4vw,3rem)] font-light leading-[1.2] text-[var(--bone)]">
                  The Next Chapter
                  <br />
                  Starts With A{" "}
                  <span className="gold-text">Word.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <span className="gold-line" />
              </Reveal>
              <Reveal delay={0.25}>
                <p className="max-w-lg text-[1rem] font-light leading-[1.85] text-[var(--bone)]/75">
                  Whether you&apos;re looking for a keynote that moves rooms, a
                  brand that moves markets, or a conversation that moves you
                  forward — reach out.
                </p>
              </Reveal>

              <Reveal delay={0.35}>
                <div className="mt-4 flex flex-col gap-4">
                  <span className="eyebrow">Find Me On</span>
                  <ul className="flex flex-wrap items-center gap-3">
                    {socialLinks.map((s) => (
                      <li key={s.name}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={s.label}
                          className="grid h-11 w-11 place-items-center rounded-full border border-[var(--gold-mid)]/50 text-[var(--gold-mid)] transition-all duration-300 hover:border-[var(--gold-mid)] hover:bg-[var(--gold-mid)] hover:text-[var(--dark-bg)]"
                        >
                          <SocialIcon name={s.name} className="h-4 w-4" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* RIGHT — form */}
            <Reveal delay={0.15} className="w-full">
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
