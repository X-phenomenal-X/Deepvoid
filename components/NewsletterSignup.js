export default function NewsletterSignup() {
  return (
    // gradient border shell
    <div id="newsletter" className="rounded-2xl bg-gradient-to-br from-telemetry/50 via-hairline to-signal/40 p-px">
      <div className="sheen rounded-2xl bg-panel/95 p-7 backdrop-blur sm:p-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-telemetry">Mission briefing</p>
        <h3 className="mt-3 font-hero text-xl font-medium leading-snug text-starlight sm:text-2xl">
          One email a week from the edge of the solar system
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-dim">
          Voyager milestones, upcoming launches worth staying up for, and one thing about the
          universe that will rearrange your sense of scale. No spam, unsubscribe anytime.
        </p>
        {/* Replace the form action with your Beehiiv/ConvertKit embed URL when ready */}
        <form className="mt-6 flex max-w-md flex-col gap-2.5 sm:flex-row" action="#" method="post">
          <input
            type="email"
            required
            placeholder="you@earth.com"
            className="w-full rounded-lg border border-hairline bg-void px-4 py-3 text-sm text-starlight placeholder:text-dim/60 focus:border-telemetry focus:outline-none"
            aria-label="Email address"
          />
          <button
            type="submit"
            className="rounded-lg bg-telemetry px-6 py-3 font-mono text-xs uppercase tracking-widest text-void transition hover:brightness-110 hover:shadow-[0_0_24px_-4px_rgba(255,179,92,0.6)]"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
