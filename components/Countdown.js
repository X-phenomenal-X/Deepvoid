"use client";

import { useEffect, useState } from "react";

function parts(targetMs) {
  const diff = Math.max(0, targetMs - Date.now());
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000)
  };
}

export default function Countdown({ target }) {
  const targetMs = new Date(target).getTime();
  const [t, setT] = useState(() => parts(targetMs));

  useEffect(() => {
    const id = setInterval(() => setT(parts(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  return (
    <div className="mt-4 flex gap-5 font-mono tabular-nums">
      {[["days", t.d], ["hrs", t.h], ["min", t.m], ["sec", t.s]].map(([label, v]) => (
        <div key={label}>
          <p className="text-2xl text-telemetry">{String(v).padStart(2, "0")}</p>
          <p className="text-[10px] uppercase tracking-widest text-dim">{label}</p>
        </div>
      ))}
    </div>
  );
}
