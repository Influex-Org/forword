import Image from "next/image";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Portrait slug under /assets/client-faces. */
  portrait: string;
};

/**
 * Client words, from the Influex homepage ("What Our Clients Say").
 *
 * Only genuine first-person quotes are here. The homepage also carries a
 * paragraph about Daymond John, but it is Influex describing him in the third
 * person rather than an endorsement from him, so it is deliberately left out.
 */
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "They genuinely took the time to understand exactly what my vision was for my brand, my frustrations from the past, and the things I wanted to do differently with my website for the future. It wasn’t just a website to them, they understood it was an extension of me and my ethos, and needed to reflect that. They didn’t just create a carbon copy of other websites like mine, but a carefully tailored expression of my vision.",
    name: "Matthew Hussey",
    role: "Author & Speaker",
    portrait: "matthew-hussey",
  },
  {
    quote:
      "A simple, beautiful website can make all the difference for your business. Your website is one of the first things people will see, and it sets the tone for how they engage with you, your content, and the products you offer. Influex reinvented my website to be simple, beautiful, and the best place to experience The School of Greatness.",
    name: "Lewis Howes",
    role: "The School of Greatness",
    portrait: "lewis-howes",
  },
  {
    quote:
      "The best website designer available to Genius Network Members.",
    name: "Joe Polish",
    role: "Genius Network",
    portrait: "genius-network",
  },
];

export function Testimonials() {
  return (
    <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
      {TESTIMONIALS.map((t) => (
        <li
          key={t.name}
          // Grid children stretch to equal height; flex-1 on the quote then
          // pushes every attribution down to a common baseline, so the three
          // cards line up despite very different quote lengths.
          className="flex flex-col gap-6 rounded-md border border-[var(--bone)]/10 bg-[var(--dark-card)] p-8"
        >
          <p className="flex-1 text-[0.95rem] font-light italic leading-[1.7] text-[var(--bone)]/80">
            &ldquo;{t.quote}&rdquo;
          </p>
          <div className="flex items-center gap-4">
            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[var(--dark-bg)]">
              <Image
                src={`/assets/client-faces/${t.portrait}/portrait.png`}
                alt={t.name}
                fill
                sizes="48px"
                // Portraits are full-body cuts; anchor the crop to the head.
                className="object-cover object-top"
              />
            </span>
            <span className="flex flex-col">
              <cite className="text-[0.8rem] font-semibold uppercase not-italic tracking-[0.18em] text-[var(--gold-mid)]">
                {t.name}
              </cite>
              <span className="text-[0.72rem] uppercase tracking-[0.16em] text-[var(--bone)]/45">
                {t.role}
              </span>
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
