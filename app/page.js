import VoyagerTracker from "@/components/VoyagerTracker";
import ApodCard from "@/components/ApodCard";
import LaunchCountdown from "@/components/LaunchCountdown";
import IssTracker from "@/components/IssTracker";
import NewsletterSignup from "@/components/NewsletterSignup";
import AdSlot from "@/components/AdSlot";
import ScaleSlider from "@/components/ScaleSlider";
import Reveal from "@/components/Reveal";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-16 py-12">
      {/* Hero — staggered load-in, live odometers */}
      <section>
        <p className="hero-in hero-in-1 font-mono text-xs uppercase tracking-[0.25em] text-telemetry">
          Live telemetry estimate
        </p>
        <h1 className="hero-in hero-in-2 mt-3 max-w-3xl font-display text-4xl leading-tight tracking-tight sm:text-5xl">
          Two spacecraft are leaving the solar system.
          <span className="text-dim"> Watch them go — by the second.</span>
        </h1>
        <div className="hero-in hero-in-3 mt-8">
          <VoyagerTracker />
        </div>
      </section>

      <Reveal><IssTracker /></Reveal>

      {/* Scale of the Void — the interactive */}
      <Reveal>
        <section>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-telemetry">Scale of the void</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight">How far is far?</h2>
          <p className="mt-2 max-w-2xl text-sm text-dim">
            Drag from the Moon to the nearest star. The scale is logarithmic — it has to be,
            or Voyager wouldn&apos;t even leave the first pixel.
          </p>
          <div className="mt-6"><ScaleSlider /></div>
        </section>
      </Reveal>

      <section className="grid gap-4 lg:grid-cols-2">
        <Reveal><ApodCard /></Reveal>
        <Reveal delay={120}>
          <div className="flex flex-col gap-4">
            <LaunchCountdown />
            <AdSlot size="box" />
          </div>
        </Reveal>
      </section>

      {/* Explore links */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal>
          <Link href="/planets" className="card-lift card-lift-blue group block rounded-lg border border-hairline bg-panel/80 p-6 backdrop-blur">
            <p className="font-mono text-[10px] uppercase tracking-widest text-signal">The neighborhood</p>
            <h2 className="mt-2 font-display text-xl transition group-hover:text-signal">Eight worlds, one star →</h2>
            <p className="mt-2 text-sm text-dim">Interactive profiles of every planet — temps, moons, and the fact worth repeating.</p>
          </Link>
        </Reveal>
        <Reveal delay={60}>
          <Link href="/missions" className="card-lift card-lift-blue group block rounded-lg border border-hairline bg-panel/80 p-6 backdrop-blur">
            <p className="font-mono text-[10px] uppercase tracking-widest text-signal">Mission explorer</p>
            <h2 className="mt-2 font-display text-xl transition group-hover:text-signal">Every probe past the asteroid belt →</h2>
            <p className="mt-2 text-sm text-dim">Status, instruments, and what each mission taught us.</p>
          </Link>
        </Reveal>
        <Reveal delay={120}>
          <Link href="/exoplanets" className="card-lift card-lift-blue group block rounded-lg border border-hairline bg-panel/80 p-6 backdrop-blur">
            <p className="font-mono text-[10px] uppercase tracking-widest text-signal">Exoplanet database</p>
            <h2 className="mt-2 font-display text-xl transition group-hover:text-signal">5,000+ confirmed worlds, searchable →</h2>
            <p className="mt-2 text-sm text-dim">Filter by size, orbit, and distance. Straight from NASA&apos;s archive.</p>
          </Link>
        </Reveal>
      </section>

      <Reveal><NewsletterSignup /></Reveal>
      <AdSlot size="banner" />
    </div>
  );
}
