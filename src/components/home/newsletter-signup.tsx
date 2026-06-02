"use client";

import { FormEvent, useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setMessage("Please enter an email address.");
      return;
    }

    setEmail("");
    setMessage("Thank you. Your briefing subscription is ready.");
  }

  return (
    <form id="newsletter" className="scroll-mt-24 bg-ink p-6" onSubmit={handleSubmit}>
      <h2 className="headline-white mb-2 text-lg">Newsletter</h2>
      <p className="body-sm mb-4 text-sm text-parchment/60">
        Receive the essential international stories in a concise editorial
        briefing.
      </p>
      <label className="sr-only" htmlFor="newsletter-email">
        Email
      </label>
      <input
        id="newsletter-email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        placeholder="Email address"
        autoComplete="email"
        required
        className="search-input mb-3 border-white/20 text-parchment placeholder:text-parchment/40 focus:border-parchment"
      />
      <button type="submit" className="btn-rouge w-full justify-center">
        Subscribe
      </button>
      {message ? (
        <p
          className="mt-4 font-sans text-xs leading-relaxed text-parchment/70"
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
