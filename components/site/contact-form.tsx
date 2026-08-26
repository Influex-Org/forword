"use client";

import { useEffect, useRef, useState } from "react";

export function ContactForm() {
  const nextRef = useRef<HTMLInputElement | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (url.searchParams.get("sent") === "true") setSent(true);
    if (nextRef.current) {
      const dest = new URL(window.location.href);
      dest.searchParams.set("sent", "true");
      nextRef.current.value = dest.toString();
    }
  }, []);

  if (sent) {
    return (
      <div className="rounded-2xl border border-[var(--gold-mid)]/20 bg-[rgba(17,17,17,0.8)] p-10 backdrop-blur-md">
        <p className="eyebrow mb-4">Message Sent</p>
        <h3 className="text-[1.6rem] font-light text-[var(--bone)]">
          Thank you for reaching out.
        </h3>
        <p className="mt-3 text-[var(--bone)]/70">
          I&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form
      action="https://formsubmit.co/dima@influex.com"
      method="POST"
      className="flex flex-col gap-5 rounded-2xl border border-[var(--gold-mid)]/10 bg-[rgba(17,17,17,0.8)] p-8 backdrop-blur-md md:p-12"
    >
      <input type="hidden" name="_subject" value="New ForWord Website Inquiry" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input ref={nextRef} type="hidden" name="_next" defaultValue="" />
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <Field label="Name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Phone" name="phone" type="tel" />
      <Field label="Subject" name="subject" />
      <Field label="Message" name="message" required textarea />

      <button
        type="submit"
        className="gold-bg mt-2 rounded-md px-6 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-[var(--dark-bg)] transition-transform duration-300 hover:-translate-y-0.5"
      >
        Let&apos;s Connect
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  textarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const base =
    "w-full rounded-md border border-[var(--bone)]/15 bg-[rgba(13,13,13,0.6)] px-4 py-3 text-[0.95rem] font-light text-[var(--bone)] placeholder-[var(--bone)]/30 outline-none transition-colors duration-300 focus:border-[var(--gold-mid)]";
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[var(--bone)]/60">
        {label}
        {required ? " *" : ""}
      </span>
      {textarea ? (
        <textarea name={name} required={required} rows={5} className={base} />
      ) : (
        <input type={type} name={name} required={required} className={base} />
      )}
    </label>
  );
}
