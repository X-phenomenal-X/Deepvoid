// Live Voyager distance estimation.
// How it works: we take a known distance at a known moment in time (the "epoch",
// from NASA/JPL published data), then add (speed x seconds elapsed since then).
// Both probes travel at near-constant velocity, so this stays accurate for years.

export const PROBES = {
  voyager1: {
    name: "Voyager 1",
    launched: "1977-09-05",
    // ~165.9 AU from the Sun on 2025-01-01 (NASA/JPL mission status)
    epochMs: Date.UTC(2025, 0, 1),
    epochKm: 24.82e9,
    kmPerSec: 16.9,
    note: "The farthest human-made object. Now in interstellar space."
  },
  voyager2: {
    name: "Voyager 2",
    launched: "1977-08-20",
    // ~138.7 AU from the Sun on 2025-01-01 (NASA/JPL mission status)
    epochMs: Date.UTC(2025, 0, 1),
    epochKm: 20.75e9,
    kmPerSec: 15.4,
    note: "The only spacecraft to have visited Uranus and Neptune."
  }
};

const KM_PER_AU = 149597870.7;
const LIGHT_KM_PER_SEC = 299792.458;

export function distanceKm(probe, atMs = Date.now()) {
  const elapsedSec = (atMs - probe.epochMs) / 1000;
  return probe.epochKm + probe.kmPerSec * elapsedSec;
}

export function toAU(km) {
  return km / KM_PER_AU;
}

// How long a radio signal takes to reach the probe (one way)
export function lightTime(km) {
  const totalSec = km / LIGHT_KM_PER_SEC;
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  return { hours: h, minutes: m };
}
