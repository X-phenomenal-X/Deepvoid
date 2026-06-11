import Link from "next/link";

const links = [
  { href: "/planets", label: "Planets" },
  { href: "/missions", label: "Missions" },
  { href: "/exoplanets", label: "Exoplanets" },
  { href: "/#events", label: "Sky events" },
  { href: "/blog", label: "Dispatches" }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-void/80 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-display text-lg tracking-tight text-starlight">
          deep<span className="text-telemetry">void</span>
        </Link>
        <div className="flex items-center gap-4 text-sm text-dim sm:gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link transition hover:text-starlight">
              {l.label}
            </Link>
          ))}
          <Link
            href="/#newsletter"
            className="hidden rounded border border-telemetry/40 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-telemetry transition hover:bg-telemetry hover:text-void sm:block"
          >
            Subscribe
          </Link>
        </div>
      </nav>
    </header>
  );
}
