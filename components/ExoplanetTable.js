"use client";

import { useMemo, useState } from "react";

const PC_TO_LY = 3.26156;
const PC_TO_KM = 3.0857e13;
const VOYAGER_KMS = 17;

function tempStory(k) {
  if (k == null) return "Temperature unknown — it hasn't been measured yet.";
  const c = Math.round(k - 273.15);
  if (k < 200) return `Around ${c}°C — a deep-freeze world, colder than anywhere on Earth has ever been.`;
  if (k < 273) return `Around ${c}°C — below freezing everywhere, like a permanent polar winter.`;
  if (k < 320) return `Around ${c}°C — shockingly temperate. This is the range where liquid water could exist.`;
  if (k < 700) return `Around ${c}°C — oven-hot. Lead would stay solid, but not much else would be comfortable.`;
  return `Around ${c}°C — hot enough to melt metals. Possibly a lava world.`;
}

function sizeStory(r) {
  if (r == null) return "Size not yet measured.";
  if (r < 1.6) return `${r} Earth radii — a rocky, Earth-class world. You could stand on it.`;
  if (r < 4) return `${r} Earth radii — a super-Earth or mini-Neptune, a type our solar system mysteriously lacks.`;
  if (r < 10) return `${r} Earth radii — a Neptune-class ice giant with no surface to stand on.`;
  return `${r} Earth radii — a Jupiter-class gas giant.`;
}

function travelStory(pc) {
  if (!pc) return null;
  const ly = (pc * PC_TO_LY).toFixed(1);
  const years = Math.round((pc * PC_TO_KM) / VOYAGER_KMS / 3.156e7);
  return `${ly} light-years away. At Voyager 1 speed, the trip would take about ${years.toLocaleString()} years.`;
}

export default function ExoplanetTable({ planets }) {
  const [q, setQ] = useState("");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [open, setOpen] = useState(null);

  const rows = useMemo(() => {
    return planets.filter((p) => {
      const matchQ =
        !q ||
        p.pl_name?.toLowerCase().includes(q.toLowerCase()) ||
        p.hostname?.toLowerCase().includes(q.toLowerCase());
      const r = p.pl_rade;
      const matchSize =
        sizeFilter === "all" ||
        (sizeFilter === "earthlike" && r && r < 1.6) ||
        (sizeFilter === "superearth" && r && r >= 1.6 && r < 4) ||
        (sizeFilter === "giant" && r && r >= 4);
      return matchQ && matchSize;
    });
  }, [planets, q, sizeFilter]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search planet or star name…"
          className="w-64 rounded border border-hairline bg-panel px-3 py-2 text-sm text-starlight placeholder:text-dim focus:border-signal focus:outline-none"
        />
        <select
          value={sizeFilter}
          onChange={(e) => setSizeFilter(e.target.value)}
          className="rounded border border-hairline bg-panel px-3 py-2 text-sm text-starlight focus:border-signal focus:outline-none"
        >
          <option value="all">All sizes</option>
          <option value="earthlike">Earth-like (&lt;1.6 R⊕)</option>
          <option value="superearth">Super-Earth (1.6–4 R⊕)</option>
          <option value="giant">Giant (&ge;4 R⊕)</option>
        </select>
        <span className="font-mono text-xs text-dim">{rows.length} planets · click a row for its profile</span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-hairline">
        <table className="w-full text-left text-sm">
          <thead className="bg-panel font-mono text-[10px] uppercase tracking-widest text-dim">
            <tr>
              <th className="px-4 py-3">Planet</th>
              <th className="px-4 py-3">Host star</th>
              <th className="px-4 py-3">Found</th>
              <th className="px-4 py-3">Radius (R⊕)</th>
              <th className="px-4 py-3">Orbit (days)</th>
              <th className="px-4 py-3">Distance (ly)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {rows.slice(0, 100).map((p) => (
              <FragmentRow
                key={p.pl_name}
                p={p}
                open={open === p.pl_name}
                onToggle={() => setOpen(open === p.pl_name ? null : p.pl_name)}
              />
            ))}
          </tbody>
        </table>
      </div>
      {rows.length > 100 && (
        <p className="mt-3 font-mono text-xs text-dim">Showing first 100 — refine your search to narrow down.</p>
      )}
    </div>
  );
}

function FragmentRow({ p, open, onToggle }) {
  return (
    <>
      <tr
        onClick={onToggle}
        className={`cursor-pointer transition hover:bg-panel ${open ? "bg-panel" : ""}`}
      >
        <td className="px-4 py-2.5 text-starlight">
          <span className={`mr-2 inline-block font-mono text-signal transition-transform ${open ? "rotate-90" : ""}`}>›</span>
          {p.pl_name}
        </td>
        <td className="px-4 py-2.5 text-dim">{p.hostname}</td>
        <td className="px-4 py-2.5 font-mono text-dim">{p.disc_year}</td>
        <td className="px-4 py-2.5 font-mono text-dim">{p.pl_rade ?? "—"}</td>
        <td className="px-4 py-2.5 font-mono text-dim">{p.pl_orbper ? Number(p.pl_orbper).toFixed(1) : "—"}</td>
        <td className="px-4 py-2.5 font-mono text-dim">{p.sy_dist ? (p.sy_dist * PC_TO_LY).toFixed(0) : "—"}</td>
      </tr>
      {open && (
        <tr className="bg-void/60">
          <td colSpan={6} className="px-4 py-5">
            <div className="planet-detail grid gap-4 sm:grid-cols-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-telemetry">Climate</p>
                <p className="mt-1.5 text-sm leading-relaxed text-starlight">{tempStory(p.pl_eqt)}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-telemetry">What kind of world</p>
                <p className="mt-1.5 text-sm leading-relaxed text-starlight">{sizeStory(p.pl_rade)}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-telemetry">Getting there</p>
                <p className="mt-1.5 text-sm leading-relaxed text-starlight">
                  {travelStory(p.sy_dist) || "Distance not yet measured."}
                </p>
              </div>
            </div>
            <p className="mt-4 font-mono text-xs text-dim">
              Discovered {p.disc_year} via {p.discoverymethod?.toLowerCase() || "unknown method"}
              {p.pl_orbper ? ` · one year there lasts ${Number(p.pl_orbper).toFixed(1)} Earth days` : ""}
              {p.pl_bmasse ? ` · ${Number(p.pl_bmasse).toFixed(1)}× Earth's mass` : ""}
            </p>
          </td>
        </tr>
      )}
    </>
  );
}
