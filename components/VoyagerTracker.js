"use client";

import { useEffect, useState } from "react";
import { PROBES, distanceKm, toAU, lightTime } from "@/lib/voyager";

function Odometer({ probe }) {
  const [km, setKm] = useState(null); // null until mounted = no hydration mismatch

  useEffect(() => {
    setKm(distanceKm(probe));
    const id = setInterval(() => setKm(distanceKm(probe)), 100); // 10×/sec: last digits visibly roll
    return () => clearInterval(id);
  }, [probe]);

  const lt = km ? lightTime(km) : null;

  return (
    <div className="card-lift group rounded-lg border border-hairline bg-panel/80 p-6 backdrop-blur">
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-lg text-starlight">{probe.name}</h3>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-telemetry">
          <span className="live-dot" /> live estimate
        </span>
      </div>
      <p className="odometer mt-4 font-mono text-3xl tabular-nums text-telemetry sm:text-4xl" aria-live="off">
        {km === null ? (
          <span className="text-dim">acquiring signal…</span>
        ) : (
          <>
            {Math.floor(km).toLocaleString("en-US")}
            <span className="ml-2 text-sm text-dim">km from the Sun</span>
          </>
        )}
      </p>
      <dl className="mt-5 grid grid-cols-2 gap-4 font-mono text-xs text-dim">
        <div>
          <dt className="uppercase tracking-widest">Distance</dt>
          <dd className="mt-1 text-starlight">{km ? toAU(km).toFixed(3) + " AU" : "—"}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-widest">Signal delay</dt>
          <dd className="mt-1 text-starlight">{lt ? `${lt.hours}h ${lt.minutes}m one way` : "—"}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-widest">Velocity</dt>
          <dd className="mt-1 text-starlight">{probe.kmPerSec} km/s</dd>
        </div>
        <div>
          <dt className="uppercase tracking-widest">Launched</dt>
          <dd className="mt-1 text-starlight">{probe.launched}</dd>
        </div>
      </dl>
      <p className="mt-4 text-xs leading-relaxed text-dim">{probe.note}</p>
    </div>
  );
}

export default function VoyagerTracker() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Odometer probe={PROBES.voyager1} />
      <Odometer probe={PROBES.voyager2} />
    </div>
  );
}
