"use client";

import { useMemo, useState } from "react";
import { PROBES, distanceKm } from "@/lib/voyager";

const LIGHT_KM_S = 299792.458;
const KM_AU = 149597870.7;

const STOPS = [
  { name: "The Moon", km: 3.844e5, note: "Apollo crews made this trip in about three days." },
  { name: "The Sun", km: 1.496e8, note: "One astronomical unit — the ruler we measure the solar system with." },
  { name: "Mars", km: 2.25e8, note: "Average distance. Rovers wait 4–24 minutes for each command." },
  { name: "Jupiter", km: 7.785e8, note: "Europa Clipper is on its way here right now." },
  { name: "Neptune", km: 4.5e9, note: "Visited exactly once — Voyager 2, August 1989." },
  { name: "Heliopause", km: 1.8e10, note: "Where the Sun's wind gives way to interstellar space." },
  { name: "Voyager 1", km: null, live: true, note: "The farthest human-made object. The number is live." },
  { name: "One light-day", km: 2.59e10, note: "Light itself needs a full day to get here." },
  { name: "Proxima Centauri", km: 4.014e13, note: "The nearest star. Voyager-speed travel time: ~75,000 years." }
];

const LOG_MIN = Math.log10(3.844e5);
const LOG_MAX = Math.log10(4.014e13);

function fmtKm(km) {
  if (km >= 1e12) return (km / 1e12).toFixed(2) + " trillion km";
  if (km >= 1e9) return (km / 1e9).toFixed(2) + " billion km";
  if (km >= 1e6) return (km / 1e6).toFixed(1) + " million km";
  return Math.round(km).toLocaleString() + " km";
}

function fmtLight(km) {
  const s = km / LIGHT_KM_S;
  if (s < 60) return s.toFixed(1) + " seconds";
  if (s < 3600) return (s / 60).toFixed(1) + " minutes";
  if (s < 86400) return (s / 3600).toFixed(1) + " hours";
  if (s < 31557600) return (s / 86400).toFixed(1) + " days";
  return (s / 31557600).toFixed(2) + " years";
}

export default function ScaleSlider() {
  const [t, setT] = useState(0.62); // start out past Neptune

  const km = useMemo(() => Math.pow(10, LOG_MIN + t * (LOG_MAX - LOG_MIN)), [t]);

  const stops = useMemo(
    () =>
      STOPS.map((s) => {
        const skm = s.live ? distanceKm(PROBES.voyager1) : s.km;
        return { ...s, km: skm, pos: (Math.log10(skm) - LOG_MIN) / (LOG_MAX - LOG_MIN) };
      }),
    []
  );

  // nearest landmark to the cursor for context
  const nearest = useMemo(
    () => stops.reduce((a, b) => (Math.abs(b.pos - t) < Math.abs(a.pos - t) ? b : a)),
    [stops, t]
  );

  return (
    <div className="rounded-lg border border-hairline bg-panel/80 p-6 backdrop-blur sm:p-8">
      {/* readout */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-dim">Distance from Earth</p>
          <p className="mt-1 font-mono text-xl text-telemetry sm:text-2xl">{fmtKm(km)}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-dim">In AU</p>
          <p className="mt-1 font-mono text-xl text-starlight sm:text-2xl">{(km / KM_AU).toFixed(2)}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-dim">Light travel time</p>
          <p className="mt-1 font-mono text-xl text-signal sm:text-2xl">{fmtLight(km)}</p>
        </div>
      </div>

      {/* the rail */}
      <div className="relative mt-10 pb-16">
        <input
          type="range"
          min="0"
          max="1"
          step="0.001"
          value={t}
          onChange={(e) => setT(Number(e.target.value))}
          aria-label="Distance from Earth, logarithmic scale from the Moon to Proxima Centauri"
          className="scale-rail w-full"
        />
        {/* landmark ticks */}
        {stops.map((s) => (
          <button
            key={s.name}
            onClick={() => setT(s.pos)}
            style={{ left: `${s.pos * 100}%` }}
            className={`group absolute top-7 -translate-x-1/2 ${s.live ? "text-telemetry" : "text-dim"}`}
          >
            <span className={`mx-auto block h-2 w-px ${s.live ? "bg-telemetry" : "bg-hairline"}`} />
            <span
              className={`mt-1 hidden whitespace-nowrap font-mono text-[9px] uppercase tracking-wider transition group-hover:text-starlight sm:block ${
                Math.abs(s.pos - t) < 0.04 ? "text-starlight" : ""
              } ${s.live ? "voyager-pulse" : ""}`}
              style={{ writingMode: "vertical-rl" }}
            >
              {s.name}
            </span>
          </button>
        ))}
      </div>

      <p className="mt-2 min-h-10 text-sm text-dim">
        <span className="font-mono text-xs uppercase tracking-widest text-starlight">{nearest.name} · </span>
        {nearest.note}
      </p>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-dim/60">
        Logarithmic scale — every step rightward multiplies the distance
      </p>
    </div>
  );
}
