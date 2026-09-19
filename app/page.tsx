import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/site/navigation";
import { Footer } from "@/components/site/footer";
import { Reveal } from "@/components/site/reveal";
import { WordRotator } from "@/components/site/word-rotator";
import { HandUnderline } from "@/components/site/hand-underline";
import { ParallaxBg } from "@/components/site/parallax-bg";
import { PressLogos } from "@/components/site/press-logos";
import { ClientFaces } from "@/components/site/client-faces";
import { ClientSitesMarquee } from "@/components/site/client-sites-marquee";
import { ClientsMarquee } from "@/components/site/clients-marquee";
import { CountUp } from "@/components/site/count-up";
import { BrandStand } from "@/components/site/brand-stand";
import { Testimonials } from "@/components/site/testimonials";
import { ScrollLetter } from "@/components/site/scroll-letter";
import { LinesFlow } from "@/components/site/lines-flow";
import { getRecentPosts, normalizeImagePath } from "@/lib/posts";

// Left-to-right dissolve applied to the hero photo.
const HERO_FADE =
  // Soft only across the sliver the headline overlaps, then ramps quickly so
  // the "W" is not swallowed by the dissolve.
  "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.45) 9%, rgba(0,0,0,0.85) 22%, #000 38%)";

export default function HomePage() {
  const recent = getRecentPosts(3);

  return (
    <>
      <Navigation />
      <main className="flex-1">
        {/* 1. HERO */}
        <section className="relative flex w-full items-center overflow-hidden bg-[var(--dark-bg)] px-6 pt-24 pb-14 lg:min-h-[86vh] lg:px-10 lg:pt-20 lg:pb-16">
          {/* The photo occupies the right column and dissolves left-to-right
              into the page, so the headline can sit against a clean edge
              instead of a hard seam. Below lg it becomes a full-bleed backdrop. */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[56%]">
            <Image
              src="/assets/hero-bg.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 56vw"
              className="object-cover object-center opacity-35 lg:object-contain lg:opacity-95"
              style={{
                maskImage: HERO_FADE,
                WebkitMaskImage: HERO_FADE,
              }}
            />
            {/* Softens the top and bottom edges into the section background. */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)] via-transparent to-[var(--dark-bg)]" />
          </div>

          {/* Guarantees left-column contrast no matter what the photo does. */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--dark-bg)] via-[var(--dark-bg)]/85 to-transparent lg:via-[var(--dark-bg)]/55" />

          <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="flex flex-col items-center gap-7 text-center lg:items-start lg:text-left">
              <Reveal delay={0.05} y={20}>
                <Image
                  src="/assets/logo-icon.png"
                  alt="ForWord"
                  width={72}
                  height={72}
                  priority
                  className="h-14 w-auto opacity-90"
                  style={{ width: "auto", height: "auto" }}
                />
              </Reveal>

              <Reveal delay={0.15}>
                <p className="text-[0.8rem] font-medium uppercase tracking-[0.35em] text-[var(--gold-mid)]">
                  Explorer &middot; Entrepreneur &middot; Expressionist
                </p>
              </Reveal>

              <Reveal delay={0.25}>
                <h1 className="max-w-[18ch] text-[clamp(2.4rem,4.4vw,4rem)] font-light leading-[1.1] tracking-[-0.01em] text-[var(--bone)]">
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
                <div className="relative inline-flex flex-col items-center lg:items-start">
                  <p className="text-[1.15rem] font-light text-[var(--bone)]/70">
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
                <div className="mt-4 flex flex-col items-center gap-4 lg:items-start">
                  <span className="eyebrow text-[0.65rem]">As Featured In</span>
                  <PressLogos className="justify-center lg:justify-start" />
                </div>
              </Reveal>
            </div>

            {/* Reserves the right column; the photo itself is positioned above. */}
            <div aria-hidden className="hidden lg:block" />
          </div>

        </section>

        {/* 1b. CHOSEN BY — CLIENT FACES CAROUSEL */}
        <section className="relative overflow-hidden bg-[var(--dark-bg)] pt-6 pb-20">
          <div className="mx-auto mb-4 flex max-w-3xl flex-col items-center gap-5 px-6 text-center">
            <Reveal>
              <span className="eyebrow text-[0.7rem]">
                Chosen By Leaders Who Get Chosen
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[clamp(1.05rem,2vw,1.35rem)] font-light leading-[1.6] text-[var(--bone)]/70">
                Thought leaders, wellness pioneers and industry-defining firms —
                each one trusted us to build their Iconic Identity and
                World-Class Website.
              </p>
            </Reveal>
          </div>
          <ClientFaces />
        </section>

        {/* 2. CINEMATIC — DEAR SOUL */}
        <section className="relative bg-[var(--dark-bg)]">
          <ScrollLetter />

          <div className="mx-auto flex max-w-6xl flex-col items-center gap-20 px-6 pb-32 pt-24 text-center">
            <LinesFlow
              className="max-w-5xl text-[clamp(1.5rem,2.6vw,2.1rem)] font-light leading-[1.55] text-[var(--bone)]/85"
              wordDelay={0.09}
              lines={[
                {
                  words: [
                    { text: "And" },
                    { text: "I’m" },
                    { text: "here" },
                    { text: "to" },
                    { text: "inspire" },
                    { text: "and" },
                    { text: "empower" },
                    { text: "you" },
                    { text: "to" },
                    { text: "live", bold: true },
                    { text: "your", bold: true },
                    { text: "fullest", bold: true },
                    { text: "expression,", bold: true },
                    { text: "to" },
                    { text: "give", bold: true },
                    { text: "your", bold: true },
                    { text: "greatest", bold: true },
                    { text: "gifts,", bold: true },
                    { text: "and" },
                    { text: "to" },
                    { text: "love", bold: true },
                    { text: "out", bold: true },
                    { text: "loud", bold: true },
                    { text: "on" },
                    { text: "the" },
                    { text: "stage" },
                    { text: "of" },
                    { text: "your" },
                    { text: "life…" },
                    { text: "as" },
                    { text: "I" },
                    { text: "have" },
                    { text: "for" },
                    { text: "hundreds", bold: true },
                    { text: "of", bold: true },
                    { text: "industry", bold: true },
                    { text: "influencers", bold: true },
                    { text: "through" },
                    { text: "crafting" },
                    { text: "their" },
                    { text: "iconic", bold: true },
                    { text: "brands", bold: true },
                    { text: "and" },
                    { text: "countless" },
                    { text: "hearts" },
                    { text: "through" },
                    { text: "my" },
                    { text: "poetic" },
                    { text: "art." },
                  ],
                },
              ]}
            />

            <LinesFlow
              wordDelay={0.16}
              className="flex flex-col items-center gap-3 italic text-[var(--bone)]"
              lines={[
                {
                  className:
                    "text-[clamp(2.2rem,4.5vw,3.4rem)] font-light italic",
                  words: "So we can build a"
                    .split(" ")
                    .map((w) => ({ text: w, italic: true })),
                },
                {
                  className:
                    "text-[clamp(3rem,6vw,4.6rem)] font-normal italic leading-[1.05]",
                  words: "Be-YOU-to-Fully Expressed World,"
                    .split(" ")
                    .map((w) => ({ text: w, italic: true })),
                },
                {
                  className:
                    "text-[clamp(3.4rem,7vw,5.4rem)] font-normal italic",
                  words: [{ text: "Together.", italic: true, gold: true }],
                },
              ]}
            />
          </div>
        </section>

        <hr className="rule-ceremonial" aria-hidden />

        {/* 3. PROFILE SPLIT */}
        <section
          id="service"
          className="relative bg-[var(--dark-section)] px-6 py-28"
        >
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
            <Reveal className="relative aspect-[4/5] overflow-hidden rounded-md">
              <Image
                src="/assets/profile.jpg"
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
                  Chief{" "}
                  <WordRotator
                    words={["Expression", "Exponential", "Executive"]}
                    className="inline-block min-w-[12ch] text-left align-baseline"
                  />{" "}
                  Officer at Influex and Exponential Venture EcoVerse.
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

        {/* 3a. YOUR BRAND IS YOUR STAND */}
        <BrandStand />

        {/* 3b. BUILT AT INFLUEX — stage video + proof numbers, then the work */}
        <section className="relative overflow-hidden bg-[var(--dark-section)]">
          {/* Dima on stage, running behind the statement and the numbers. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px]">
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_031045_0e1165dd-ab48-46e3-ad3d-5fe77f217647.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
              className="h-full w-full object-cover object-center opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-section)]/80 via-[var(--dark-section)]/75 to-[var(--dark-section)]" />
          </div>

          <div className="relative z-10 px-6 pt-28">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
              <Reveal>
                {/* Deliberately not "The Work" — section 4 already owns that
                    eyebrow, and two adjacent sections under the same words read
                    as one confused block. */}
                <span className="eyebrow text-[0.7rem]">Built At Influex</span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1.15] text-[var(--bone)]">
                  He doesn&rsquo;t just speak about expression.
                  <br />
                  <span className="authority-text">He builds it for a living.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="max-w-2xl text-[clamp(1rem,1.9vw,1.15rem)] font-light leading-[1.65] text-[var(--bone)]/65">
                  Through Influex, Dmitriy and his team have built personal
                  brand sites for thought leaders including Jim Kwik, Dave
                  Asprey and Lewis Howes.
                </p>
              </Reveal>
            </div>

            {/* Proof numbers, lifted from the Influex homepage. */}
            <Reveal delay={0.3}>
              <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center gap-4">
                <div className="flex items-center gap-10 sm:gap-16">
                  <div className="flex flex-col items-center gap-2">
                    <CountUp
                      to={15}
                      className="gold-text text-[clamp(2.8rem,6vw,4.4rem)] font-light leading-none"
                    />
                    <span className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-[var(--bone)]/55">
                      Years Serving
                    </span>
                  </div>
                  <span
                    aria-hidden
                    className="h-14 w-px bg-[var(--gold-mid)]/30"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <CountUp
                      to={240}
                      suffix="+"
                      className="gold-text text-[clamp(2.8rem,6vw,4.4rem)] font-light leading-none"
                    />
                    <span className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-[var(--bone)]/55">
                      Iconic Brands
                    </span>
                  </div>
                </div>
                <p className="text-center text-[0.85rem] font-light italic text-[var(--bone)]/50">
                  of the world&rsquo;s most renowned industry leaders — and
                  counting.
                </p>
              </div>
            </Reveal>
          </div>

          {/* The work itself. Each rail gets a label so it is obvious what you
              are looking at rather than two anonymous scrolling bands. */}
          <div className="relative z-10 mt-20">
            <Reveal>
              <p className="mb-7 px-6 text-center text-[0.65rem] font-medium uppercase tracking-[0.35em] text-[var(--bone)]/40">
                World-Class Websites
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ClientSitesMarquee />
            </Reveal>
          </div>

          <div className="relative z-10 mt-16">
            <Reveal>
              <p className="mb-7 px-6 text-center text-[0.65rem] font-medium uppercase tracking-[0.35em] text-[var(--bone)]/40">
                Iconic Brands
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ClientsMarquee />
            </Reveal>
          </div>

          <div className="relative z-10 mt-16 px-6 pb-28 text-center">
            <Reveal>
              <a
                href="https://influex.com"
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-md border border-[var(--gold-mid)] px-8 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.15em] text-[var(--gold-mid)] transition-colors duration-300 hover:bg-[var(--gold-mid)] hover:text-[var(--dark-bg)]"
              >
                See The Portfolio
              </a>
            </Reveal>
          </div>
        </section>

        {/* 3d. WHAT CLIENTS SAY */}
        <section className="relative bg-[var(--dark-bg)] px-6 pb-28">
          <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center gap-4 text-center">
            <Reveal>
              <span className="eyebrow text-[0.7rem]">What Clients Say</span>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Testimonials />
          </Reveal>
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
                style={{ width: "auto", height: "auto" }}
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
          </div>
        </section>

        <hr className="rule-ceremonial" aria-hidden />

        {/* 7. FORWORD BRAND */}
        <section className="relative overflow-hidden bg-[var(--dark-section)] px-6 py-32">
          {/* An empty stage under a gold spotlight — the room just before he
              speaks. Replaces the placeholder radial glow that stood in for the
              oversized video this section used to carry. */}
          <Image
            src="/assets/stage-empty.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-section)]/85 via-[var(--dark-section)]/55 to-[var(--dark-section)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(203,142,68,0.1)_0%,transparent_65%)]" />

          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
            <Reveal>
              <Image
                src="/assets/logo-full.png"
                alt="ForWord"
                width={280}
                height={80}
                className="h-16 w-auto"
                style={{ width: "auto", height: "auto" }}
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
        <section className="relative overflow-hidden bg-[var(--dark-bg)] px-6 py-28">
          <div
            aria-hidden
            className="bloom left-1/2 top-1/3 h-[min(520px,85vw)] w-[min(520px,85vw)] -translate-x-1/2 -translate-y-1/2"
          />
          <div className="relative z-10 mx-auto max-w-4xl">
            <Reveal className="mb-10 flex flex-col items-center gap-5 text-center">
              <span className="eyebrow">Listen</span>
              <p className="max-w-xl text-[clamp(1.05rem,2vw,1.35rem)] font-light italic leading-[1.6] text-[var(--bone)]/65">
                Spoken word, poems and flows — the words as they were meant to
                be heard.
              </p>
              <hr className="rule-ceremonial max-w-xs" aria-hidden />
            </Reveal>
            <Reveal delay={0.1}>
              <iframe
                title="SoundCloud — ForWord Flows"
                width="100%"
                height="450"
                allow="autoplay"
                className="rounded-xl border border-[var(--gold-mid)]/20 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]"
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
          <div
            aria-hidden
            className="bloom left-1/2 top-1/2 h-[min(600px,92vw)] w-[min(600px,92vw)] -translate-x-1/2 -translate-y-1/2"
          />
          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
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
