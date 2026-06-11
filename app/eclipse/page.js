import EclipseCountdown from "@/components/EclipseCountdown";
import Reveal from "@/components/Reveal";
import Link from "next/link";

export const metadata = {
  title: "Total Solar Eclipse — August 12, 2026 — Countdown & Guide",
  description:
    "Live countdown to the August 12, 2026 total solar eclipse over Greenland, Iceland and Spain — the first total eclipse over mainland Europe since 1999. Path, times, and how to watch safely."
};

const FACTS = [
  ["Totality begins", "17:02 UTC", "Umbra first touches Earth in the Arctic Ocean"],
  ["Greatest eclipse", "17:45 UTC", "Maximum totality: 2m 18s, near the Faroe Islands"],
  ["Totality ends", "18:30 UTC", "The shadow leaves Earth near Spain at sunset"],
  ["Last in Europe", "1999", "The first total eclipse over mainland Europe in 27 years"]
];

const PLACES = [
  {
    name: "Iceland",
    detail:
      "The first total solar eclipse over Iceland since 1954 — and the only one this entire century. Reykjavík gets about 1 minute 30 seconds of totality. The next one over Iceland isn't until 2196.",
    chip: "~1m 30s totality"
  },
  {
    name: "Spain",
    detail:
      "Totality crosses northern Spain in the early evening, the country's first since 1905. Depending on where you stand in the path, totality runs from ~30 seconds near the edge to 1 minute 44 seconds on the center line. The Sun will be low — pick a spot with a clear western horizon.",
    chip: "30s – 1m 44s totality"
  },
  {
    name: "Greenland",
    detail:
      "The umbra sweeps across western Greenland mid-path. Remote, spectacular, and the least cloudy bet for hardcore eclipse chasers.",
    chip: "mid-path"
  },
  {
    name: "Everywhere else",
    detail:
      "A partial eclipse will be visible across most of North America, western Europe, and west Africa. Even at 50% coverage, the light goes strange — worth stepping outside.",
    chip: "partial"
  }
];

export default function EclipsePage() {
  return (
    <div className="py-12">
      {/* hero */}
      <section>
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-telemetry">
          <span className="live-dot" /> August 12, 2026
        </p>
        <h1 className="mt-4 max-w-3xl font-hero text-4xl font-semibold leading-[1.08] sm:text-6xl">
          The sky goes <span className="text-gradient">dark.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-dim sm:text-base">
          A total solar eclipse sweeps from the Arctic across Greenland and Iceland into Spain —
          the first totality over mainland Europe since 1999. For two minutes, day becomes night,
          stars come out, and the Sun&apos;s corona hangs in the sky.
        </p>
        <div className="mt-8"><EclipseCountdown /></div>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-dim/70">
          Counting down to first totality · 17:02 UTC
        </p>
      </section>

      {/* key numbers */}
      <Reveal>
        <section className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map(([label, big, sub]) => (
            <div key={label} className="sheen rounded-xl border border-hairline bg-panel/80 p-5 backdrop-blur">
              <p className="font-mono text-[10px] uppercase tracking-widest text-dim">{label}</p>
              <p className="mt-2 font-mono text-2xl text-telemetry">{big}</p>
              <p className="mt-2 text-xs leading-relaxed text-dim">{sub}</p>
            </div>
          ))}
        </section>
      </Reveal>

      {/* where to see it */}
      <Reveal>
        <section className="mt-16">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-telemetry">The path</p>
          <h2 className="mt-3 font-hero text-2xl font-medium leading-snug sm:text-3xl">Where to stand</h2>
          <div className="mt-8 space-y-4">
            {PLACES.map((p) => (
              <div key={p.name} className="sheen flex flex-wrap items-start justify-between gap-3 rounded-xl border border-hairline bg-panel/80 p-6 backdrop-blur">
                <div className="max-w-2xl">
                  <h3 className="font-display text-xl text-starlight">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dim">{p.detail}</p>
                </div>
                <span className="rounded border border-telemetry/40 bg-telemetry/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-telemetry">
                  {p.chip}
                </span>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* bonus + safety */}
      <Reveal>
        <section className="mt-16 grid gap-4 lg:grid-cols-2">
          <div className="sheen rounded-xl border border-signal/25 bg-panel/80 p-6 backdrop-blur">
            <p className="font-mono text-[10px] uppercase tracking-widest text-signal">Double feature</p>
            <h3 className="mt-2 font-display text-xl text-starlight">The Perseids peak the same night</h3>
            <p className="mt-3 text-sm leading-relaxed text-dim">
              The year&apos;s most beloved meteor shower — up to 60 meteors an hour — peaks on the
              night of August 12–13. Watch the eclipse at sunset, stay out after dark, and catch
              shooting stars under a moonless sky. Arguably the best single night for skywatching this decade.
            </p>
          </div>
          <div className="sheen rounded-xl border border-telemetry/25 bg-panel/80 p-6 backdrop-blur">
            <p className="font-mono text-[10px] uppercase tracking-widest text-telemetry">Eyes first</p>
            <h3 className="mt-2 font-display text-xl text-starlight">Look safely</h3>
            <p className="mt-3 text-sm leading-relaxed text-dim">
              Never look at the partial phases without certified eclipse glasses (ISO 12312-2) —
              sunglasses are not enough, and neither is a phone camera pointed at the Sun. Only
              during the brief minutes of totality is it safe to look with the naked eye. Buy
              glasses early; they sell out everywhere in the final weeks.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <p className="mt-12 text-sm text-dim">
          Want the rest of the year&apos;s schedule?{" "}
          <Link href="/#events" className="text-signal hover:underline">See the full 2026 cosmic calendar →</Link>
        </p>
      </Reveal>
    </div>
  );
}
