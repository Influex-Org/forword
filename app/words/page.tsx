import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Navigation } from "@/components/site/navigation";
import { Footer } from "@/components/site/footer";
import { Reveal } from "@/components/site/reveal";
import { FilterBar } from "@/components/site/filter-bar";
import { getAllPosts, normalizeImagePath, type PostType } from "@/lib/posts";

const validTypes: readonly PostType[] = ["article", "video", "audio"];

function ctaLabel(type: PostType): string {
  if (type === "video") return "Watch";
  if (type === "audio") return "Listen";
  return "Read More";
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

export default async function WordsPage(props: PageProps<"/words">) {
  const searchParams = await props.searchParams;
  const raw = searchParams?.type;
  const rawStr = Array.isArray(raw) ? raw[0] : raw;
  const activeType =
    rawStr && (validTypes as readonly string[]).includes(rawStr)
      ? (rawStr as PostType)
      : null;

  const posts = getAllPosts().filter((p) =>
    activeType ? p.type === activeType : true,
  );

  return (
    <>
      <Navigation />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[var(--dark-bg)] px-6 pt-40 pb-20">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url(/assets/hero-bg.jpg)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/80 via-[var(--dark-bg)]/60 to-[var(--dark-bg)]" />
          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <Reveal>
              <span className="eyebrow">Words For The World</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-[1.2] text-[var(--bone)]">
                Every Word Is A Seed. Plant <em className="gold-text not-italic italic">Yours</em>.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <span className="gold-line" />
            </Reveal>
          </div>
        </section>

        {/* FILTER */}
        <section className="bg-[var(--dark-bg)] px-6 pb-8">
          <div className="mx-auto max-w-4xl">
            <Suspense
              fallback={<div className="h-10" aria-hidden />}
            >
              <FilterBar />
            </Suspense>
          </div>
        </section>

        {/* POSTS LIST */}
        <section className="bg-[var(--dark-bg)]">
          {posts.length === 0 ? (
            <div className="mx-auto max-w-3xl px-6 py-24 text-center text-[var(--bone)]/60">
              No posts of that type — yet.
            </div>
          ) : (
            posts.map((p, i) => (
              <article
                key={p.slug}
                className={`relative overflow-hidden px-6 py-24 ${
                  i % 2 === 0 ? "bg-[var(--dark-bg)]" : "bg-[var(--dark-section)]"
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-[0.15]"
                  style={{
                    backgroundImage: `url(${normalizeImagePath(p.featuredImage)})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/70 via-transparent to-[var(--dark-bg)]/80" />
                <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
                  <Reveal>
                    <span className="gold-bg inline-block rounded px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-[var(--dark-bg)]">
                      {p.type}
                    </span>
                  </Reveal>
                  <Reveal delay={0.05}>
                    <span className="text-[0.7rem] uppercase tracking-[0.25em] text-[var(--bone)]/45">
                      {formatDate(p.date)}
                    </span>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-normal leading-[1.25] text-[var(--bone)]">
                      {p.title}
                    </h2>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <p className="max-w-xl text-[0.95rem] font-light leading-relaxed text-[var(--bone)]/70">
                      {p.excerpt}
                    </p>
                  </Reveal>
                  <Reveal delay={0.3}>
                    <Link
                      href={`/words/${p.slug}`}
                      className="gold-bg inline-block rounded-md px-7 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[var(--dark-bg)] transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      {ctaLabel(p.type)}
                    </Link>
                  </Reveal>
                </div>
              </article>
            ))
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
