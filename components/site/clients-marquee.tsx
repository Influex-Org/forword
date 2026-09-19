type ClientLogo = { file: string; name: string };

// Client logos from the Influex homepage export (images/Logos/clients-logos).
// Two rows scrolling in opposite directions.
const ROW_LEFT: ClientLogo[] = [
  { file: "aaron-wagner.svg", name: "Aaron Wagner" },
  { file: "actualize-os.svg", name: "Actualize Os" },
  { file: "adam-roa.svg", name: "Adam Roa" },
  { file: "advance-your-reach.svg", name: "Advance Your Reach" },
  { file: "alex-bates.svg", name: "Alex Bates" },
  { file: "american-snippets.svg", name: "American Snippets" },
  { file: "ari-meisel-less-doing.svg", name: "Ari Meisel Less Doing" },
  { file: "ari-meisel.svg", name: "Ari Meisel" },
  { file: "bliss-champions.svg", name: "Bliss Champions" },
  { file: "chris-daigle.svg", name: "Chris Daigle" },
  { file: "cosmic-journal.svg", name: "Cosmic Journal" },
];

const ROW_RIGHT: ClientLogo[] = [
  { file: "dan-holguin.svg", name: "Dan Holguin" },
  { file: "david-schwind.svg", name: "David Schwind" },
  { file: "dr-matt-kreinheder.svg", name: "Dr Matt Kreinheder" },
  { file: "invst.svg", name: "Invst" },
  { file: "kirsten-butler.svg", name: "Kirsten Butler" },
  { file: "chronosagency.svg", name: "Chronosagency" },
  { file: "david.svg", name: "David" },
  { file: "salvatore.svg", name: "Salvatore" },
  { file: "wcs.svg", name: "Wcs" },
  { file: "zander.svg", name: "Zander" },
  { file: "header-2.svg", name: "Header 2" },
  { file: "1.svg", name: "Client" },
  { file: "2.svg", name: "Client" },
];

function Row({
  items,
  direction,
}: {
  items: ClientLogo[];
  direction: "left" | "right";
}) {
  // Duplicated once: the track travels exactly -50%, so the second copy lands
  // where the first began and the loop never shows a seam.
  const sequence = [...items, ...items];
  return (
    <div className={`marquee-row marquee-row--${direction}`}>
      <div className="marquee-track">
        {sequence.map((item, i) => (
          // Decorative SVGs with varying intrinsic aspect ratios, sized by CSS;
          // next/image wants explicit dimensions and refuses SVG without
          // dangerouslyAllowSVG.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${item.file}-${i}`}
            src={`/assets/clients/${item.file}`}
            alt=""
            loading="lazy"
            decoding="async"
            className="marquee-logo"
          />
        ))}
      </div>
    </div>
  );
}

export function ClientsMarquee() {
  return (
    // Decorative: announcing every duplicated item would be noise, and the
    // surrounding copy already says what the rail is.
    <div className="marquee" aria-hidden="true">
      <Row items={ROW_LEFT} direction="left" />
      <Row items={ROW_RIGHT} direction="right" />
    </div>
  );
}
