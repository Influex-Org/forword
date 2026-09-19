import Image from "next/image";

/**
 * "Your Brand Is Your Stand" — ported from the Influex homepage (#x-factor).
 *
 * The original is a scroll-pinned two-stage sequence over video. Here it is a
 * single static beat: this site already carries two pinned scroll sections, and
 * a third would be exhausting. The words are the point, so the type leads and a
 * champagne bloom lights it from behind.
 */
export function BrandStand() {
  return (
    <section className="relative overflow-hidden bg-[var(--dark-bg)] px-6 py-32">
      <div
        aria-hidden
        className="bloom left-1/2 top-1/2 h-[min(560px,90vw)] w-[min(560px,90vw)] -translate-x-1/2 -translate-y-1/2"
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-10 text-center">
        <h2 className="text-[clamp(2.4rem,5.5vw,4.4rem)] font-light leading-[1.08] text-[var(--bone)]">
          Your Brand Is
          <br />
          <em className="gold-text not-italic">Your Stand.</em>
        </h2>

        <p className="text-[clamp(1.05rem,2.1vw,1.4rem)] font-light leading-[1.6] text-[var(--bone)]/70">
          When you&rsquo;re clear on what you{" "}
          <b className="font-semibold text-[var(--bone)]">STAND FOR</b>,
          <br className="hidden sm:block" /> your brand will{" "}
          <b className="font-semibold text-[var(--bone)]">STAND OUT</b>.
        </p>

        <hr className="rule-ceremonial max-w-md" aria-hidden />

        {/* The name itself is the thesis: INFLUence + EXpression. */}
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-4">
          <Image
            src="/assets/influex-logo.svg"
            alt="Influex"
            width={180}
            height={48}
            className="h-9 w-auto"
            style={{ width: "auto", height: "auto" }}
          />
          <p className="text-[clamp(1.1rem,2.2vw,1.5rem)] font-light text-[var(--bone)]/80">
            <span className="text-[var(--gold-mid)]">=</span>{" "}
            <span className="font-semibold text-[var(--bone)]">INFLU</span>ence{" "}
            <span className="text-[var(--gold-mid)]">+</span>{" "}
            <span className="font-semibold text-[var(--bone)]">EX</span>pression
          </p>
        </div>

        <p className="max-w-3xl text-[clamp(1.15rem,2.4vw,1.7rem)] font-light leading-[1.5] text-[var(--bone)]/85">
          Your greatest <b className="gold-text font-semibold">INFLUENCE</b>,{" "}
          <b className="gold-text font-semibold">IMPACT</b> &amp;{" "}
          <b className="gold-text font-semibold">INCOME</b> comes through your{" "}
          <b className="gold-text font-semibold">FULLEST EXPRESSION</b>.
        </p>
      </div>
    </section>
  );
}
