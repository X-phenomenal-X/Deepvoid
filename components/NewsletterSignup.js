"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | done

  function handleSubscribe() {
    if (!email.includes("@")) return;
    // TODO: replace with your Beehiiv / ConvertKit form endpoint (see README).
    console.log("subscribe:", email);
    setState("done");
  }

  return (
    <section id="newsletter" className="rounded-lg border border-telemetry/30 bg-panel p-8">
      <p className="font-mono text-[10px] uppercase tracking-widest text-telemetry">
        The weekly dispatch
      </p>
      <h2 className="mt-2 font-display text-2xl text-starlight">
        One email a week from the edge of the solar system
      </h2>
      <p className="mt-2 max-w-lg text-sm text-dim">
        Mission updates, new exoplanets, and one image worth your time. No spam,
        unsubscribe anytime.
      </p>
      {state === "done" ? (
        <p className="mt-5 font-mono text-sm text-telemetry">
          You&apos;re on the list. First dispatch arrives this week.
        </p>
      ) : (
        <div className="mt-5 flex max-w-md gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded border border-hairline bg-void px-3 py-2 text-sm text-starlight placeholder:text-dim focus:border-telemetry focus:outline-none"
          />
          <button
            onClick={handleSubscribe}
            className="shrink-0 rounded bg-telemetry px-4 py-2 text-sm font-medium text-void transition hover:brightness-110"
          >
            Subscribe
          </button>
        </div>
      )}
    </section>
  );
}
