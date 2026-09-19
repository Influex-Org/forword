"use client";

import { useCallback, useEffect, useRef } from "react";

type Client = { slug: string; name: string };

// Portraits + client logos from the Influex homepage export
// (images/client-faces-carousel). Order is the source deck's, which
// deliberately alternates so no stretch of the rail reads as one type.
const CLIENTS: Client[] = [
  { slug: "matthew-hussey", name: "Matthew Hussey" },
  { slug: "lisa-shield", name: "Lisa Shield" },
  { slug: "lewis-howes", name: "Lewis Howes" },
  { slug: "alreen-haeggquist", name: "Alreen Haeggquist" },
  { slug: "dave-asprey", name: "Dave Asprey" },
  { slug: "elizabeth-dawson", name: "Elizabeth Dawson" },
  { slug: "daymond-john", name: "Daymond John" },
  { slug: "vyve", name: "Vyve Wellness" },
  { slug: "vinh-giang", name: "Vinh Giang" },
  { slug: "jenna-phillips-ballard", name: "Jenna Phillips Ballard" },
  { slug: "genius-network", name: "Joe Polish" },
  { slug: "dr-mahsa", name: "Dr. Mahsa" },
  { slug: "aleric-heck", name: "Aleric Heck" },
  { slug: "cameron-herold", name: "Cameron Herold" },
  { slug: "cr-legal", name: "CR Legal" },
  { slug: "michael-mogill", name: "Michael Mogill" },
  { slug: "kristen-butler", name: "Kristen Butler" },
  { slug: "mike-dillard", name: "Mike Dillard" },
  { slug: "alive-water", name: "Alive Water" },
  { slug: "shaun-t", name: "Shaun T" },
  { slug: "yanik-silver", name: "Yanik Silver" },
  { slug: "mass-tort-ad-agency", name: "Mass Tort Ad Agency" },
];

const CYCLE_SECONDS = 66;
const RESUME_DELAY_MS = 4500;

export function ClientFaces() {
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLElement | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setActive = useCallback((card: HTMLElement | null) => {
    if (card === activeRef.current) return;
    activeRef.current?.classList.remove("is-active");
    card?.classList.add("is-active");
    activeRef.current = card;
  }, []);

  // Spotlight: on every frame, whichever card sits nearest the rail's
  // horizontal centre becomes active. Driving this from geometry rather than
  // from animation timing keeps it correct while the track is paused, mid
  // click-to-centre, or resuming at an arbitrary offset.
  useEffect(() => {
    const rail = railRef.current;
    const track = trackRef.current;
    if (!rail || !track) return;

    const cards = () =>
      Array.from(track.querySelectorAll<HTMLElement>(".faces-card"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const all = cards();
      setActive(all[Math.floor(all.length / 2)] ?? all[0] ?? null);
      return;
    }

    let running = true;
    let frame = 0;

    const tick = () => {
      if (!running) return;
      const railBox = rail.getBoundingClientRect();
      const centerX = railBox.left + railBox.width / 2;

      let nearest: HTMLElement | null = null;
      let nearestDist = Infinity;
      for (const card of cards()) {
        const box = card.getBoundingClientRect();
        // Ignore cards the edge mask has already hidden.
        if (box.right < railBox.left || box.left > railBox.right) continue;
        const dist = Math.abs(centerX - (box.left + box.width / 2));
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = card;
        }
      }
      setActive(nearest);
      frame = requestAnimationFrame(tick);
    };

    // Stop the loop whenever the rail is off screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!running) {
            running = true;
            frame = requestAnimationFrame(tick);
          }
        } else {
          running = false;
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0 },
    );
    io.observe(rail);
    frame = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, [setActive]);

  useEffect(
    () => () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    },
    [],
  );

  // Click a card to slide it to centre, then hand back to the auto-scroll.
  const centerCard = useCallback(
    (card: HTMLElement) => {
      const rail = railRef.current;
      const track = trackRef.current;
      if (!rail || !track) return;

      const railBox = rail.getBoundingClientRect();
      const cardBox = card.getBoundingClientRect();
      const delta =
        railBox.left + railBox.width / 2 - (cardBox.left + cardBox.width / 2);

      // The track holds two identical copies and the animation runs
      // 0 -> -50%. Outside that range there are no cards to show, so both
      // positions get wrapped back into it. Card N and card N+len look
      // identical, which is what makes the wrap invisible.
      const halfWidth = track.scrollWidth / 2;
      let currentX = new DOMMatrixReadOnly(getComputedStyle(track).transform)
        .m41;
      let targetX = currentX + delta;
      while (targetX < -halfWidth) {
        targetX += halfWidth;
        currentX += halfWidth;
      }
      while (targetX > 0) {
        targetX -= halfWidth;
        currentX -= halfWidth;
      }

      // Freeze the CSS animation at the wrapped position, then ease across.
      track.style.animation = "none";
      track.style.transition = "";
      track.style.transform = `translate3d(${currentX}px, 0, 0)`;
      requestAnimationFrame(() => {
        track.style.transition = "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)";
        track.style.transform = `translate3d(${targetX}px, 0, 0)`;
      });
      setActive(card);

      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      resumeTimer.current = setTimeout(() => {
        // Resume from where the user left off rather than snapping to 0, by
        // re-attaching the animation with a negative delay. Clearing the
        // inline animation and forcing a reflow first is required: reusing the
        // same animation name without it resumes the paused instance and the
        // delay is ignored.
        const progress = -targetX / halfWidth;
        track.style.transition = "";
        track.style.transform = "";
        track.style.animation = "none";
        void track.offsetWidth; // reflow
        track.style.animation = `faces-scroll ${CYCLE_SECONDS}s linear -${(
          progress * CYCLE_SECONDS
        ).toFixed(2)}s infinite`;
      }, RESUME_DELAY_MS);
    },
    [setActive],
  );

  // Duplicated once so the -50% travel lands on an identical copy.
  const sequence = [...CLIENTS, ...CLIENTS];

  return (
    <div className="faces" ref={railRef}>
      <div className="faces-track" ref={trackRef}>
        {sequence.map((client, i) => (
          <button
            type="button"
            key={`${client.slug}-${i}`}
            className="faces-card"
            onClick={(e) => centerCard(e.currentTarget)}
            aria-label={`Centre ${client.name}`}
          >
            <span className="faces-stage">
              {/* Portraits are pre-cut PNGs at a fixed aspect; next/image
                  would add nothing and wants explicit dimensions. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="faces-photo"
                src={`/assets/client-faces/${client.slug}/portrait.png`}
                alt=""
                loading="lazy"
                decoding="async"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="faces-logo"
                src={`/assets/client-faces/${client.slug}/logo.png`}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="faces-name">{client.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
