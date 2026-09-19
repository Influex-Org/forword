type PressLogo = {
  name: string;
  src: string;
  /** Intrinsic width / height — sizes the box so nothing reflows on load. */
  ratio: number;
  /** Optical height, tuned per mark so the row reads as one set. */
  height: string;
};

// Forbes, Entrepreneur and Inc. are public-domain text logos (Wikimedia
// "PD-textlogo"); the Genius Network mark comes from their own site.
const LOGOS: PressLogo[] = [
  {
    name: "Forbes",
    src: "/assets/press/forbes.svg",
    ratio: 200 / 54,
    height: "1.3rem",
  },
  {
    name: "Entrepreneur",
    src: "/assets/press/entrepreneur.svg",
    ratio: 545.8 / 107.1,
    height: "1.05rem",
  },
  {
    name: "Genius Network",
    src: "/assets/press/genius-network.png",
    ratio: 140 / 67,
    height: "2.1rem",
  },
  {
    name: "Inc. 5000",
    src: "/assets/press/inc.svg",
    ratio: 220 / 76,
    height: "1.7rem",
  },
];

export function PressLogos({ className }: { className?: string }) {
  return (
    <ul
      className={`flex flex-wrap items-center gap-x-9 gap-y-5 ${className ?? ""}`}
    >
      {LOGOS.map((logo) => (
        <li key={logo.name}>
          {/* Masked rather than drawn as images: the sources are a mix of
              black-on-transparent and white-on-transparent, and masking paints
              every mark in one bone tone so the row reads as a set instead of
              four mismatched logos. Works for both SVG and PNG because
              mask-mode resolves to alpha for a url() source. */}
          <span
            role="img"
            aria-label={logo.name}
            className="block bg-[var(--bone)]/55 transition-colors duration-300 hover:bg-[var(--bone)]/90"
            style={{
              height: logo.height,
              aspectRatio: String(logo.ratio),
              maskImage: `url(${logo.src})`,
              WebkitMaskImage: `url(${logo.src})`,
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
              maskSize: "contain",
              WebkitMaskSize: "contain",
            }}
          />
        </li>
      ))}
    </ul>
  );
}
