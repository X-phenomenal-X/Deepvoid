"use client";

import { useEffect, useState } from "react";

export default function IssTracker() {
  const [pos, setPos] = useState(null);

  useEffect(() => {
    let active = true;
    async function poll() {
      try {
        const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
        if (res.ok && active) setPos(await res.json());
      } catch {}
    }
    poll();
    const id = setInterval(poll, 5000);
    return () => { active = false; clearInterval(id); };
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-hairline bg-panel px-6 py-4 font-mono text-xs">
      <span className="uppercase tracking-widest text-signal">ISS right now</span>
      {pos ? (
        <>
          <span className="text-dim">lat <span className="text-starlight">{pos.latitude.toFixed(2)}°</span></span>
          <span className="text-dim">lon <span className="text-starlight">{pos.longitude.toFixed(2)}°</span></span>
          <span className="text-dim">alt <span className="text-starlight">{Math.round(pos.altitude)} km</span></span>
          <span className="text-dim">speed <span className="text-starlight">{Math.round(pos.velocity).toLocaleString()} km/h</span></span>
        </>
      ) : (
        <span className="text-dim">acquiring signal…</span>
      )}
    </div>
  );
}
