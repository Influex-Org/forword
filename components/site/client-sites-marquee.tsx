type ClientSite = { file: string; name: string };

// Client website screenshots from the Influex homepage export
// (images/desktop-display). Two rows scrolling in opposite directions.
const ROW_LEFT: ClientSite[] = [
  { file: "cameron-herold.jpg", name: "Cameron Herold" },
  { file: "health-centers.jpg", name: "Health Centers" },
  { file: "shaun-t.jpg", name: "Shaun T" },
  { file: "sylvia-ferrero.jpg", name: "Sylvia Ferrero" },
  { file: "demas-law.jpg", name: "Demas Law" },
  { file: "kristen-butler.jpg", name: "Kristen Butler" },
  { file: "dr-will-haas.jpg", name: "Dr. Will Haas" },
  { file: "jenna-phillips-ballard.jpg", name: "Jenna Phillips Ballard" },
  { file: "lewis-howes.jpg", name: "Lewis Howes" },
];

const ROW_RIGHT: ClientSite[] = [
  { file: "rise-nation.jpg", name: "Rise Nation" },
  { file: "haeggquist-eck.jpg", name: "Haeggquist & Eck" },
  { file: "jim-kwik.jpg", name: "Jim Kwik" },
  { file: "elisabeth-dawson.jpg", name: "Elisabeth Dawson" },
  { file: "adoutreach.jpg", name: "AdOutreach" },
  { file: "kjc-law.jpg", name: "KJC Law" },
  { file: "roger-hamilton.jpg", name: "Roger Hamilton" },
  { file: "dr-mahsa.jpg", name: "Dr. Mahsa" },
  { file: "bwk.jpg", name: "BWK" },
];

function Row({
  items,
  direction,
}: {
  items: ClientSite[];
  direction: "left" | "right";
}) {
  // Duplicated once: the track travels exactly -50%, so the second copy lands
  // where the first began and the loop never shows a seam.
  const sequence = [...items, ...items];
  return (
    <div className={`marquee-row marquee-row--${direction}`}>
      <div className="marquee-track">
        {sequence.map((item, i) => (
          // Decorative screenshots sized by CSS at a fixed height with auto
          // width; next/image would need per-image dimensions for no gain.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${item.file}-${i}`}
            src={`/assets/client-sites/${item.file}`}
            alt=""
            loading="lazy"
            decoding="async"
            className="marquee-card"
          />
        ))}
      </div>
    </div>
  );
}

export function ClientSitesMarquee() {
  return (
    // Decorative: announcing every duplicated item would be noise, and the
    // surrounding copy already says what the rail is.
    <div className="marquee marquee--cards" aria-hidden="true">
      <Row items={ROW_LEFT} direction="left" />
      <Row items={ROW_RIGHT} direction="right" />
    </div>
  );
}
