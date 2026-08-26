import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/site/navigation";
import { Footer } from "@/components/site/footer";
import { Reveal } from "@/components/site/reveal";
import { getAllPosts, getPostBySlug, normalizeImagePath } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
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

export default async function PostPage(props: PageProps<"/words/[slug]">) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post || !post.published) notFound();

  const paragraphs = post.body.split(/\n\n+/).filter(Boolean);

  return (
    <>
      <Navigation />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[var(--dark-bg)] px-6 pt-40 pb-16">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{
              backgroundImage: `url(${normalizeImagePath(post.featuredImage)})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/70 via-[var(--dark-bg)]/50 to-[var(--dark-bg)]" />

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <Reveal>
              <Link
                href="/words"
                className="text-[0.7rem] uppercase tracking-[0.25em] text-[var(--bone)]/60 transition-colors hover:text-[var(--gold-mid)]"
              >
                ← All Words
              </Link>
            </Reveal>
            <Reveal delay={0.05}>
              <span className="gold-bg inline-block rounded px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-[var(--dark-bg)]">
                {post.type}
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-light leading-[1.2] text-[var(--bone)]">
                {post.title}
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <span className="text-[0.7rem] uppercase tracking-[0.25em] text-[var(--bone)]/45">
                {formatDate(post.date)}
              </span>
            </Reveal>
            <Reveal delay={0.2}>
              <span className="gold-line" />
            </Reveal>
          </div>
        </section>

        {/* MEDIA */}
        {post.videoUrl ? (
          <section className="bg-[var(--dark-bg)] px-6 pb-12">
            <div className="mx-auto max-w-4xl">
              <div className="relative aspect-video overflow-hidden rounded-md border border-[var(--bone)]/10">
                <iframe
                  src={post.videoUrl}
                  title={post.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          </section>
        ) : post.audioUrl ? (
          <section className="bg-[var(--dark-bg)] px-6 pb-12">
            <div className="mx-auto max-w-4xl">
              <iframe
                width="100%"
                height="180"
                allow="autoplay"
                className="rounded-md border border-[var(--bone)]/10"
                title={post.title}
                src={post.audioUrl}
              />
            </div>
          </section>
        ) : post.featuredImage ? (
          <section className="bg-[var(--dark-bg)] px-6 pb-12">
            <div className="mx-auto max-w-4xl">
              <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-[var(--bone)]/10">
                <Image
                  src={normalizeImagePath(post.featuredImage)}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 900px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </section>
        ) : null}

        {/* BODY */}
        <section className="bg-[var(--dark-bg)] px-6 pb-32">
          <div className="mx-auto max-w-2xl">
            {paragraphs.map((para, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <p className="mb-6 text-[1.05rem] font-light leading-[1.85] text-[var(--bone)]/85">
                  {para}
                </p>
              </Reveal>
            ))}

            <div className="mt-16 flex justify-center">
              <Link
                href="/words"
                className="inline-block rounded-md border border-[var(--gold-mid)]/50 px-7 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[var(--gold-mid)] transition-colors duration-300 hover:bg-[var(--gold-mid)] hover:text-[var(--dark-bg)]"
              >
                ← Back To All Words
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
