"use client";

import { useEffect, useState } from "react";

// Totality begins (first contact of umbra with Earth): 17:02 UTC, Aug 12 2026
const ECLIPSE_MS = Date.parse("2026-08-12T17:02:06Z");

export default function EclipseCountdown() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return <p className="font-mono text-5xl text-telemetry sm:text-7xl">—</p>;

  let s = Math.max(0, Math.floor((ECLIPSE_MS - now) / 1000));
  const d = Math.floor(s / 86400); s -= d * 86400;
  const h = Math.floor(s / 3600); s -= h * 3600;
  const m = Math.floor(s / 60); s -= m * 60;

  const cells = [
    [d, "days"],
    [h, "hours"],
    [m, "min"],
    [s, "sec"]
  ];

  return (
    <div className="flex gap-3 sm:gap-5">
      {cells.map(([v, label]) => (
        <div key={label} className="sheen min-w-[72px] rounded-xl border border-telemetry/30 bg-panel/80 px-4 py-3 text-center backdrop-blur sm:min-w-[96px]">
          <p className="odometer font-mono text-3xl tabular-nums text-telemetry sm:text-5xl">{String(v).padStart(2, "0")}</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-dim">{label}</p>
        </div>
      ))}
    </div>
  );
}
