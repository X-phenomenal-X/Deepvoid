import { MISSIONS } from "@/lib/missions";
import AdSlot from "@/components/AdSlot";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Mission Explorer",
  description: "Every active and upcoming deep space mission: status, instruments, and discoveries."
};

const chip = {
  Active: "border-telemetry/40 text-telemetry",
  "In transit": "border-signal/40 text-signal"
};

export default function MissionsPage() {
  return (
    <div className="py-12">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-telemetry">Mission explorer</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight">Past the asteroid belt</h1>
      <p className="mt-3 max-w-2xl text-dim">
        The spacecraft operating at — or headed to — the deepest reaches we&apos;ve ever sent hardware. Ordered by launch.
      </p>

      <div className="mt-10 space-y-4">
        {MISSIONS.map((m, i) => (
          <Reveal key={m.name} delay={Math.min(i * 60, 240)}>
            <article className="card-lift rounded-lg border border-hairline bg-panel/80 p-6 backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-display text-xl text-starlight">{m.name}</h2>
                <span className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest ${chip[m.status] || "border-hairline text-dim"}`}>
                  {m.status}
                </span>
              </div>
              <p className="mt-1 font-mono text-xs text-dim">
                {m.agency} · {m.launched ? `launched ${m.launched}` : "awaiting launch"} · {m.region}
              </p>
              <p className="mt-3 text-sm text-starlight">{m.highlight}</p>
              <p className="mt-2 text-xs text-dim">Key instruments: {m.instruments}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="mt-10"><AdSlot size="banner" /></div>
    </div>
  );
}
