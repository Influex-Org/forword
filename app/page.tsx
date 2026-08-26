import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/site/navigation";
import { Footer } from "@/components/site/footer";
import { Reveal } from "@/components/site/reveal";
import { WordRotator } from "@/components/site/word-rotator";
import { HandUnderline } from "@/components/site/hand-underline";
import { Typewriter } from "@/components/site/typewriter";
import { ParallaxBg } from "@/components/site/parallax-bg";
import { ScrollIndicator } from "@/components/site/scroll-indicator";
import { getRecentPosts, normalizeImagePath } from "@/lib/posts";

export default function HomePage() {
  const recent = getRecentPosts(3);

  return (
    <>
      <Navigation />
      <main className="flex-1">
        {/* 1. HERO */}
        <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[var(--dark-bg)] px-6 pt-24 pb-16">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{ backgroundImage: "url(/assets/hero-bg.jpg)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/85 via-[var(--dark-bg)]/40 to-[var(--dark-bg)]" />

          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
            <Reveal delay={0.05} y={20}>
              <Image
                src="/assets/logo-icon.png"
                alt="ForWord"
                width={72}
                height={72}
                priority
                className="h-16 w-auto opacity-90"
              />
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-[0.8rem] font-medium uppercase tracking-[0.35em] text-[var(--gold-mid)]">
                Explorer &middot; Entrepreneur &middot; Expressionist
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.15] text-[var(--bone)]">
                Your Greatest{" "}
                <WordRotator
                  words={["Influence", "Impact", "Income"]}
                  className="inline-block min-w-[6ch] text-left"
                />
                <br />
                Come Through Your Fullest Expression.
              </h1>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="relative inline-flex flex-col items-center">
                <p className="text-[1.1rem] font-light text-[var(--bone)]/70">
                  Moving The World Forward With Words.
                </p>
                <HandUnderline className="mt-1 h-4 w-[280px]" delay={0.9} />
              </div>
            </Reveal>

            <Reveal delay={0.55}>
              <Link
                href="/connect"
                className="gold-bg inline-block rounded-md px-8 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-[var(--dark-bg)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Join The Journey
              </Link>
            </Reveal>

            <Reveal delay={0.75}>
              <div className="mt-6 flex flex-col items-center gap-4">
                <span className="eyebrow text-[0.65rem]">As Featured In</span>
                <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[0.75rem] font-medium uppercase tracking-[0.25em] text-[var(--bone)]/50">
                  <li>Forbes</li>
                  <li>Entrepreneur</li>
                  <li>Genius Network</li>
                  <li>INC 5000</li>
                </ul>
              </div>
            </Reveal>
          </div>

          <ScrollIndicator />
        </section>

        {/* 2. CINEMATIC — DEAR SOUL */}
        <section className="relative overflow-hidden bg-[var(--dark-bg)] px-6 py-32">
          {/* TODO: video background moved to _legacy for size; add CDN-hosted video later */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(203,142,68,0.08)_0%,transparent_60%)]" />

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-10 text-center">
            <Reveal>
              <span className="eyebrow">A Letter To You</span>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="text-[1.4rem] font-light italic text-[var(--bone)]">
                Dear Soul,
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-[1.2rem] font-light text-[var(--bone)]/80">
                Thank you for being here.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="text-[1.2rem] font-light text-[var(--bone)]/80">
                But WHY? Why are you here?
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <p className="text-[1.6rem] font-medium uppercase tracking-[0.15em] text-[var(--bone)]">
                YOU ARE HERE.
              </p>
            </Reveal>
            <Reveal delay={0.45}>
              <p className="text-[1.6rem] font-medium uppercase tracking-[0.15em] text-[var(--bone)]">
                YOU ARE HERE… TO BE <span className="gold-text">YOU</span>.
              </p>
            </Reveal>

            <div className="my-4 flex flex-col items-center gap-3">
              <Reveal delay={0.2}>
                <p className="text-[clamp(1.4rem,3.5vw,2.4rem)] font-semibold uppercase tracking-[0.1em] text-[var(--bone)]">
                  TO FULLY.
                </p>
              </Reveal>
              <Reveal delay={0.8}>
                <p className="text-[clamp(1.4rem,3.5vw,2.4rem)] font-semibold uppercase tracking-[0.1em] text-[var(--bone)]">
                  EXPRESS.
                </p>
              </Reveal>
              <Reveal delay={1.4}>
                <p className="gold-text text-[clamp(2rem,5vw,3.4rem)] font-bold uppercase tracking-[0.1em]">
                  YOUR SOUL.
                </p>
              </Reveal>
            </div>

            <div className="flex flex-col items-center gap-1">
              <Reveal delay={0.05}>
                <span className="text-[1rem] italic text-[var(--bone)]/80">
                  You Are Here To Beautifully
                </span>
              </Reveal>
              <Reveal delay={0.45}>
                <span className="text-[1.15rem] font-semibold italic text-[var(--bone)]">
                  Express Your Soul.
                </span>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <p className="max-w-2xl text-[1rem] font-light leading-[1.9] text-[var(--bone)]/75">
                And I&apos;m here to inspire and empower you to{" "}
                <strong className="text-[var(--bone)]">
                  live your fullest expression
                </strong>
                , to{" "}
                <strong className="text-[var(--bone)]">
                  give your greatest gifts
                </strong>
                , and to{" "}
                <strong className="text-[var(--bone)]">love out loud</strong> on
                the stage of your life… as I have for{" "}
                <strong className="text-[var(--bone)]">
                  hundreds of industry influencers
                </strong>{" "}
                through crafting their{" "}
                <strong className="text-[var(--bone)]">iconic brands</strong>{" "}
                and countless hearts through my poetic art.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <Typewriter
                text="So we can build a Be-YOU-to-Fully Expressed World, Together."
                className="text-[1.15rem] font-light italic text-[var(--bone)]"
              />
            </Reveal>
          </div>
        </section>

        {/* 3. PROFILE SPLIT */}
        <section
          id="service"
          className="relative bg-[var(--dark-section)] px-6 py-28"
        >
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
            <Reveal className="relative aspect-[4/5] overflow-hidden rounded-md">
              {/* TODO: add profile photo — using hero-bg.jpg as placeholder */}
              <Image
                src="/assets/hero-bg.jpg"
                alt="Dmitriy Kozlov"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--dark-bg)]/60 via-transparent to-transparent" />
            </Reveal>

            <div className="flex flex-col gap-5">
              <Reveal>
                <span className="eyebrow">Meet ForWord</span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-[clamp(2rem,4vw,3rem)] font-light leading-tight text-[var(--bone)]">
                  Dmitriy Kozlov
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="gold-text text-[0.95rem] font-medium uppercase tracking-[0.15em]">
                  Chief Expression Officer. Artist. Entrepreneur. Iconic
                  Wanderer.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <span className="gold-line" />
              </Reveal>
              <Reveal delay={0.25}>
                <div className="flex flex-col gap-4 text-[0.9rem] font-light leading-[1.9] text-[var(--bone)]/70">
                  <p>
                    Dmitriy Kozlov has spent over a decade building Iconic
                    Brands for the industry&apos;s most influential leaders —
                    from Ryan Deiss and Mike Dillard to Frank Kern, Joe Polish,
                    Dan Lok, and the Virgin Unite Constellation.
                  </p>
                  <p>
                    As Chief Expression Officer at Influex and co-creator of
                    Signature Soul Brand, he helps entrepreneurs and creators
                    express their essence and amplify their authority through
                    brand, story, and design.
                  </p>
                  <p>
                    Under the stage name ForWord, he moves audiences through
                    spoken word — bringing the intersection of poetry and
                    strategy to intimate masterminds and global stages.
                  </p>
                  <p>
                    He lives passionately in Austin, TX with his partner in
                    life, love, business, and music, Carla Samson.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.35}>
                <p className="gold-text text-[1rem] italic">
                  Be-YOU-to-Fully Expressed.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 4. THREE PILLARS */}
        <section id="words" className="relative bg-[var(--dark-bg)] px-6 py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-14 flex flex-col items-center gap-4 text-center">
              <span className="eyebrow">The Work</span>
              <span className="gold-line" />
            </Reveal>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  n: "01",
                  title: "Words For The World",
                  sub: "Posts & Poems",
                  href: "/words",
                },
                {
                  n: "02",
                  title: "Press, Pages & Stages",
                  sub: "Amplified To Audiences",
                  href: "/stages",
                },
                {
                  n: "03",
                  title: "Who I Serve",
                  sub: "Impacting Industry Influencers, Icons & Innovators",
                  href: "#impact",
                },
              ].map((c, i) => (
                <Reveal key={c.n} delay={i * 0.1}>
                  <Link
                    href={c.href}
                    className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-md border border-[var(--bone)]/10 bg-[var(--dark-card)] p-10 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--bone)]/25"
                  >
                    <span className="pointer-events-none absolute top-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[var(--gold-gradient-h)] transition-transform duration-500 group-hover:scale-x-100" />
                    <span className="gold-text text-[2rem] font-light">
                      {c.n}
                    </span>
                    <h3 className="text-[1.35rem] font-medium text-[var(--bone)]">
                      {c.title}
                    </h3>
                    <p className="text-[0.85rem] font-light leading-relaxed text-[var(--bone)]/60">
                      {c.sub}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. SIGNATURE SOUL BRAND */}
        <section
          className="relative px-6 py-28"
          style={{
            background:
              "radial-gradient(ellipse at center, #FDF6EE 0%, #F0E0CF 50%, #E8D5C0 100%)",
          }}
        >
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <Reveal>
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-[#8C6D4A]">
                Signature Soul Brand
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight"
                style={{ color: "#221F1C" }}
              >
                Discover Your
                <br />
                <span className="gold-text">SoulBrand Archetype</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p
                className="max-w-xl text-[1rem] font-light leading-relaxed"
                style={{ color: "#70665C" }}
              >
                Uncover the archetype that shapes the soul of your brand
                identity — and how to express it authentically across every
                touchpoint.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <a
                href="https://soulbrandquiz.com"
                target="_blank"
                rel="noreferrer"
                className="gold-bg inline-block rounded-[12px] px-8 py-3.5 text-[0.85rem] font-semibold uppercase tracking-[0.15em] text-[var(--dark-bg)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Take the Quiz →
              </a>
            </Reveal>
            <Reveal delay={0.4}>
              <p
                className="text-[0.8rem] uppercase tracking-[0.2em]"
                style={{ color: "#A09688" }}
              >
                ⋆ 20 questions · 3 minutes · Free
              </p>
            </Reveal>
          </div>
        </section>

        {/* 6. INFLUEX */}
        <section className="relative overflow-hidden bg-[var(--dark-bg)] px-6 py-32">
          <ParallaxBg src="/assets/influex-bg.jpg" opacity={0.3} />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/70 via-[var(--dark-bg)]/60 to-[var(--dark-bg)]/80" />

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
            <Reveal>
              <Image
                src="/assets/influex-logo.svg"
                alt="Influex"
                width={200}
                height={60}
                className="h-12 w-auto"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[clamp(1.3rem,3vw,1.8rem)] font-light italic leading-[1.5] text-[var(--gold-light)]">
                We design Iconic Brands &amp; World-Class Websites that Express
                Your Essence &amp; Amplify Your Authority.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <a
                href="https://influex.com"
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-md border border-[var(--gold-mid)] bg-transparent px-8 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.15em] text-[var(--gold-mid)] transition-colors duration-300 hover:bg-[var(--gold-mid)] hover:text-[var(--dark-bg)]"
              >
                Explore Portfolio
              </a>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 flex max-w-lg flex-col items-center gap-5 rounded-md border border-[var(--bone)]/10 bg-[var(--dark-card)] p-8 text-center">
                <Image
                  src="/assets/joe-polish.jpg"
                  alt="Joe Polish"
                  width={68}
                  height={68}
                  className="h-[68px] w-[68px] rounded-full object-cover"
                />
                <blockquote className="text-[1rem] font-light italic text-[var(--bone)]/85">
                  &ldquo;The best website designer available to Genius Network
                  Members.&rdquo;
                </blockquote>
                <cite className="text-[0.7rem] font-semibold uppercase not-italic tracking-[0.2em] text-[var(--gold-mid)]">
                  — Joe Polish, Genius Network
                </cite>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 7. FORWORD BRAND */}
        <section className="relative overflow-hidden bg-[var(--dark-section)] px-6 py-32">
          {/* TODO: video background moved to _legacy for size; add CDN-hosted video later */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(203,142,68,0.1)_0%,transparent_65%)]" />

          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
            <Reveal>
              <Image
                src="/assets/logo-full.png"
                alt="ForWord"
                width={280}
                height={80}
                className="h-16 w-auto"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="gold-text text-[1.5rem] font-light italic leading-relaxed">
                Moving The World ForWord With Words
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                href="/words"
                className="gold-bg inline-block rounded-md px-8 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.15em] text-[var(--dark-bg)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Watch My Words
              </Link>
            </Reveal>
          </div>
        </section>

        {/* 8. SOUNDCLOUD */}
        <section className="relative bg-[var(--dark-bg)] px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <Reveal className="mb-10 flex flex-col items-center gap-4 text-center">
              <span className="eyebrow">Listen</span>
              <span className="gold-line" />
            </Reveal>
            <Reveal delay={0.1}>
              <iframe
                title="SoundCloud — ForWord Flows"
                width="100%"
                height="450"
                allow="autoplay"
                className="rounded-xl border border-[var(--bone)]/10"
                src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/forwordflows&color=%23cb8e44&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false"
              />
            </Reveal>
          </div>
        </section>

        {/* 9. RECENT POSTS */}
        <section className="relative bg-[var(--dark-section)] px-6 py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-14 flex flex-col items-center gap-4 text-center">
              <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-light text-[var(--bone)]">
                Latest Words From ForWord
              </h2>
              <span className="gold-line" />
            </Reveal>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recent.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <Link
                    href={`/words/${p.slug}`}
                    className="group relative block h-[380px] overflow-hidden rounded-md"
                  >
                    <Image
                      src={normalizeImagePath(p.featuredImage)}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-6 text-center">
                      <span
                        className="gold-bg inline-block rounded px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-[var(--dark-bg)]"
                      >
                        {p.type}
                      </span>
                      <h3 className="text-[1.05rem] font-medium leading-snug text-[var(--bone)]">
                        {p.title}
                      </h3>
                      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[var(--bone)]/40">
                        {formatDate(p.date)}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 10. CONNECT CTA */}
        <section
          id="connect"
          className="relative overflow-hidden bg-[var(--dark-bg)] px-6 pt-28 pb-24"
        >
          <span
            aria-hidden
            className="absolute left-1/2 top-0 h-20 w-[1px] -translate-x-1/2 bg-[var(--gold-gradient-h)]"
          />
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
            <Reveal>
              <p className="text-[clamp(1.3rem,3vw,1.8rem)] font-light italic leading-relaxed text-[var(--bone)]/90">
                Want your own beautiful personal brand site to express your
                essence and amplify your influence online?
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/connect"
                className="gold-bg inline-block rounded-md px-8 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.15em] text-[var(--dark-bg)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Discover What Influex Can Create For You
              </Link>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex max-w-lg flex-col items-center gap-5 rounded-md border border-[var(--bone)]/10 bg-[var(--dark-card)] p-8 text-center">
                <Image
                  src="/assets/lewis-howes.jpg"
                  alt="Lewis Howes"
                  width={60}
                  height={60}
                  className="h-[60px] w-[60px] rounded-full object-cover"
                />
                <blockquote className="text-[0.95rem] font-light italic text-[var(--bone)]/85">
                  &ldquo;Influex reinvented my website to be simple, beautiful,
                  and the best place to experience The School of
                  Greatness.&rdquo;
                </blockquote>
                <cite className="text-[0.7rem] font-semibold uppercase not-italic tracking-[0.2em] text-[var(--gold-mid)]">
                  — Lewis Howes, The School of Greatness
                </cite>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}
