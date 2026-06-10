"use client";

import { useState } from "react";
import { PLANETS } from "@/lib/planets";

const KM_AU = 149597870.7;

export default function PlanetExplorer() {
  const [sel, setSel] = useState(PLANETS[3]); // start on Mars

  return (
    <div className="rounded-lg border border-hairline bg-panel/80 p-6 backdrop-blur sm:p-8">
      {/* the lineup — sizes are relative (log-ish clamp so Jupiter doesn't eat the row) */}
      <div className="flex items-end justify-between gap-1 sm:gap-2">
        {PLANETS.map((p) => {
          const d = Math.max(14, Math.min(64, 14 + p.size * 4.6));
          const active = sel.name === p.name;
          return (
            <button
              key={p.name}
              onClick={() => setSel(p)}
              aria-label={`View ${p.name}`}
              className="group flex flex-col items-center gap-2"
            >
              <span
                className="planet-dot block rounded-full transition-transform duration-300 group-hover:scale-110"
                style={{
                  width: d, height: d,
                  background: `radial-gradient(circle at 32% 30%, ${p.color}, #0B0F1A 130%)`,
                  boxShadow: active ? `0 0 18px ${p.color}66, 0 0 0 2px ${p.color}88` : `0 0 10px ${p.color}22`
                }}
              />
              <span className={`font-mono text-[9px] uppercase tracking-wider transition ${active ? "text-starlight" : "text-dim group-hover:text-starlight"}`}>
                {p.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* profile */}
      <div key={sel.name} className="planet-detail mt-8 border-t border-hairline pt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-display text-2xl text-starlight">{sel.name}</h3>
          <span className="font-mono text-xs text-dim">
            {sel.au} AU · {(sel.au * KM_AU / 1e6).toFixed(0)} million km from the Sun
          </span>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-starlight">{sel.vibe}</p>
        <dl className="mt-5 grid grid-cols-2 gap-4 font-mono text-xs sm:grid-cols-4">
          <div>
            <dt className="uppercase tracking-widest text-dim">Avg temp</dt>
            <dd className="mt-1 text-telemetry">{sel.tempC}°C</dd>
          </div>
          <div>
            <dt className="uppercase tracking-widest text-dim">Day length</dt>
            <dd className="mt-1 text-starlight">{sel.day}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-widest text-dim">Year length</dt>
            <dd className="mt-1 text-starlight">{sel.year}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-widest text-dim">Moons</dt>
            <dd className="mt-1 text-starlight">{sel.moons}</dd>
          </div>
        </dl>
        <p className="mt-5 rounded border border-signal/20 bg-void/50 p-4 text-sm text-dim">
          <span className="font-mono text-[10px] uppercase tracking-widest text-signal">Cool fact · </span>
          {sel.fact}
        </p>
      </div>
    </div>
  );
}
