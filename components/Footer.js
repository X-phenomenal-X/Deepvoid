import Link from "next/link";

const explore = [
  { href: "/planets", label: "Planets" },
  { href: "/solar-system", label: "Solar System" },
  { href: "/missions", label: "Missions" },
  { href: "/exoplanets", label: "Exoplanets" },
  { href: "/eclipse", label: "Eclipse 2026" },
  { href: "/blog", label: "Dispatches" }
];

const meta = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/#newsletter", label: "Newsletter" },
  { href: "/#events", label: "Sky events" }
];

export default function Footer() {
  return (
    <footer className="relative mt-24">
      {/* gradient hairline */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-telemetry/40 to-transparent" />

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl tracking-tight text-starlight">
            deep<span className="text-telemetry">void</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-dim">
            Live data from humanity&apos;s deepest space missions — planet positions, probe
            telemetry, and the sky&apos;s schedule, computed in real time.
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-dim/60">
            Data: NASA/JPL · NASA Exoplanet Archive · The Space Devs · NeoWs
          </p>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-telemetry">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-dim transition hover:text-starlight">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-telemetry">DeepVoid</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {meta.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-dim transition hover:text-starlight">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline/50">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 font-mono text-[11px] text-dim/70 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} DeepVoid · not affiliated with NASA</p>
          <p>Voyager 1 gained ~1,460,000 km while you scrolled today 🛰️</p>
        </div>
      </div>
    </footer>
  );
}
