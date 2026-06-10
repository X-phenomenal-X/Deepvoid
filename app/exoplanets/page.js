import { getExoplanets } from "@/lib/exoplanets";
import ExoplanetTable from "@/components/ExoplanetTable";

export const metadata = {
  title: "Exoplanet Database",
  description: "Search and filter recently confirmed exoplanets from the NASA Exoplanet Archive."
};

export default async function ExoplanetsPage() {
  const planets = await getExoplanets();

  return (
    <div className="py-12">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-telemetry">Exoplanet database</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight">Confirmed worlds</h1>
      <p className="mt-3 max-w-2xl text-dim">
        The 300 most recently confirmed planets, pulled daily from the NASA Exoplanet Archive.
        R⊕ = Earth radii; pc = parsecs (1 pc ≈ 3.26 light-years).
      </p>
      <div className="mt-8">
        {planets.length ? (
          <ExoplanetTable planets={planets} />
        ) : (
          <p className="rounded-lg border border-hairline bg-panel p-6 text-sm text-dim">
            The archive is unreachable right now — data refreshes automatically once it&apos;s back.
          </p>
        )}
      </div>
    </div>
  );
}
