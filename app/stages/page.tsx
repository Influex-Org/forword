import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/site/navigation";
import { Footer } from "@/components/site/footer";
import { Reveal } from "@/components/site/reveal";

const topics = [
  {
    title: "Building an Iconic Personal Brand",
    body: "The blueprint behind the world's most influential personal brands and how to build one that outlasts trends.",
  },
  {
    title: "Creativity, Leadership & the Courage to Lead Differently",
    body: "How the most impactful leaders use creativity as a strategic weapon to change industries.",
  },
  {
    title: "From Words to Wealth",
    body: "Your personal brand is the most valuable asset you own — and here's how to design it as one.",
  },
  {
    title: "Spoken Word Performance",
    body: "Captivating audiences through the power of spoken word — poetry, story, and rhythm designed to move rooms.",
  },
];

const featuredStages = [
  "TEDx",
  "Genius Network",
  "Necker Island",
  "Forbes",
  "Entrepreneur",
  "Inc 5000",
  "Maverick",
  "War Room",
  "EWAS",
  "Rankings",
  "Brand Builders Live",
  "Creative Leadership Forum",
];

const podcasts = [
  {
    image: "/assets/podcasts/joe-polish.jpg",
    show: "Joe Polish / Genius Network",
    title: "How To Create A Personal Brand Website",
    host: "Joe Polish",
    href: "#",
  },
  {
    image: "/assets/podcasts/mike-dillard.jpeg",
    show: "Mike Dillard Show",
    title: "Building Your Personal Brand Website",
    host: "Mike Dillard",
    href: "#",
  },
  {
    image: "/assets/podcasts/dan-lok.jpg",
    show: "Dan Lok",
    title: "The Importance Of Building Your Personal Brand",
    host: "Dan Lok",
    href: "#",
  },
  {
    image: "/assets/podcasts/chris-dreyer.jpg",
    show: "Chris Dreyer / Rankings",
    title: "Never Fit In: Branding with Impact",
    host: "Chris Dreyer",
    href: "#",
  },
  {
    image: "/assets/podcasts/daryl-urbanski.png",
    show: "Daryl Urbanski / Best Business Coach",
    title: "Building A World Class Brand",
    host: "Daryl Urbanski",
    href: "#",
  },
  {
    image: "/assets/podcasts/arman-assadi.jpg",
    show: "Arman Assadi",
    title: "The Master of Expression: Integrity, Influence & Art",
    host: "Arman Assadi",
    href: "#",
  },
  {
    image: "/assets/podcasts/jules-schroeder.jpg",
    show: "Jules Schroeder",
    title: "The 6-Figure Earner's Guide to Branding",
    host: "Jules Schroeder",
    href: "#",
  },
  {
    image: "/assets/podcasts/raj-jana.jpg",
    show: "Raj Jana",
    title: "Dancing with Fear in the Face of Change",
    host: "Raj Jana",
    href: "#",
  },
  {
    image: "/assets/podcasts/entrepreneurs-awakening.jpg",
    show: "Entrepreneurs Awakening",
    title: "Aligning with True Purpose as a Leader",
    host: "Entrepreneurs Awakening",
    href: "#",
  },
];

const press = [
  {
    outlet: "Entrepreneur",
    title: "5 Brand Mistakes Entrepreneurs Make (And How to Fix Them)",
  },
  {
    outlet: "Inc Magazine",
    title:
      "How Influex Is Redefining Personal Branding for Industry Leaders",
  },
];

export default function StagesPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[var(--dark-bg)] px-6 pt-40 pb-24">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url(/assets/hero-bg.jpg)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/80 via-[var(--dark-bg)]/50 to-[var(--dark-bg)]" />

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <Reveal>
              <span className="eyebrow">Press, Pages &amp; Stages</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] font-light leading-[1.15] text-[var(--bone)]">
                The World Is A Stage.
                <br />
                <span className="gold-text">
                  Every Word Moves It Forward.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-xl text-[1rem] font-light leading-[1.85] text-[var(--bone)]/75">
                From intimate masterminds to global stages, ForWord brings the
                intersection of poetry and strategy to audiences ready to be
                moved.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <span className="gold-line" />
            </Reveal>
          </div>
        </section>

        {/* SPEAKING TOPICS */}
        <section className="bg-[var(--dark-section)] px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal className="mb-14 flex flex-col items-center gap-4 text-center">
              <span className="eyebrow">Signature Talks</span>
              <span className="gold-line" />
            </Reveal>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {topics.map((t, i) => (
                <Reveal key={t.title} delay={i * 0.08}>
                  <div className="flex h-full flex-col gap-4 rounded-md border border-[var(--bone)]/8 bg-[var(--dark-card)] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--bone)]/20">
                    <h3 className="gold-text text-[1.2rem] font-medium leading-snug">
                      {t.title}
                    </h3>
                    <p className="text-[0.9rem] font-light leading-relaxed text-[var(--bone)]/70">
                      {t.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED STAGES */}
        <section className="bg-[var(--dark-bg)] px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal className="mb-14 flex flex-col items-center gap-4 text-center">
              <span className="eyebrow">Featured &amp; Performed On</span>
              <span className="gold-line" />
            </Reveal>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-14">
              {featuredStages.map((s, i) => (
                <Reveal key={s} delay={i * 0.03}>
                  <span className="inline-block rounded-md border border-[var(--gold-mid)]/15 px-6 py-4 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[var(--bone)]/80 transition-colors duration-300 hover:text-[var(--gold-mid)]">
                    {s}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PODCASTS */}
        <section className="bg-[var(--dark-section)] px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-14 flex flex-col items-center gap-4 text-center">
              <span className="eyebrow">Podcast Appearances</span>
              <span className="gold-line" />
            </Reveal>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {podcasts.map((p, i) => (
                <Reveal key={p.show + p.title} delay={i * 0.05}>
                  <a
                    href={p.href}
                    target={p.href.startsWith("http") ? "_blank" : undefined}
                    rel={p.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group flex h-full flex-col overflow-hidden rounded-md border border-[var(--bone)]/10 bg-[var(--dark-card)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--bone)]/25"
                  >
                    <div className="relative h-[200px] w-full overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.show}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col gap-2 p-6">
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[var(--gold-mid)]">
                        {p.show}
                      </span>
                      <h3 className="text-[1rem] font-medium leading-snug text-[var(--bone)]">
                        {p.title}
                      </h3>
                      <span className="text-[0.8rem] font-light text-[var(--bone)]/45">
                        {p.host}
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PRESS */}
        <section className="bg-[var(--dark-bg)] px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <Reveal className="mb-14 flex flex-col items-center gap-4 text-center">
              <span className="eyebrow">In The Press</span>
              <span className="gold-line" />
            </Reveal>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {press.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.1}>
                  <div className="flex h-full flex-col gap-3 rounded-md border border-[var(--bone)]/10 bg-[var(--dark-card)] p-8 transition-all duration-300 hover:border-[var(--bone)]/25">
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[var(--gold-mid)]">
                      {p.outlet}
                    </span>
                    <h3 className="text-[1.05rem] font-medium leading-snug text-[var(--bone)]">
                      {p.title}
                    </h3>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--dark-section)] px-6 py-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <Reveal className="flex flex-col items-center gap-3">
              <span className="eyebrow">Book ForWord</span>
              <span className="gold-line" />
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-[clamp(1.3rem,3vw,1.8rem)] font-light italic leading-relaxed text-[var(--bone)]">
                Ready to bring the intersection of poetry and strategy to your
                stage?
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                href="/connect"
                className="gold-bg inline-block rounded-md px-8 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.15em] text-[var(--dark-bg)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Let&apos;s Connect
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
