"use client";

import { useEffect, useRef, useState } from "react";

const MESSAGES = [
  "Observer logged. They've been monitoring us since 1977 — apparently the Golden Record got their attention.",
  "Sighting confirmed. They seem mostly interested in why we stopped going to the Moon for 50 years.",
  "Contact event recorded. They find our rocket landings 'adorable.'",
  "You spotted them. Protocol says they'll deny everything.",
  "Observer detected. Current assessment of Earth: 'mostly harmless.'"
];

export default function AlienObserver() {
  const [ufo, setUfo] = useState(null);     // { top, dur, flip }
  const [toast, setToast] = useState(null);
  const sightings = useRef(0);
  const timer = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    function schedule(delay) {
      timer.current = setTimeout(() => {
        if (!document.hidden) {
          setUfo({
            top: 8 + Math.random() * 55,            // % from top
            dur: 11 + Math.random() * 7,            // seconds to cross
            flip: Math.random() > 0.5
          });
          // ufo despawns after crossing
          setTimeout(() => setUfo(null), 19000);
        }
        schedule(45000 + Math.random() * 60000);    // next flyby in 45–105 s
      }, delay);
    }
    schedule(15000 + Math.random() * 20000);        // first one after 15–35 s
    return () => clearTimeout(timer.current);
  }, []);

  function spotted() {
    sightings.current += 1;
    setUfo(null);
    setToast(
      `${MESSAGES[Math.floor(Math.random() * MESSAGES.length)]} (Sightings: ${sightings.current})`
    );
    setTimeout(() => setToast(null), 6000);
  }

  return (
    <>
      {ufo && (
        <button
          onClick={spotted}
          aria-label="Unidentified object — click it"
          className="ufo fixed z-40 cursor-pointer"
          style={{
            top: `${ufo.top}%`,
            animationDuration: `${ufo.dur}s`,
            transform: ufo.flip ? "scaleX(-1)" : undefined
          }}
        >
          <svg width="34" height="18" viewBox="0 0 34 18" fill="none">
            <ellipse cx="17" cy="11" rx="15" ry="5" fill="#1C2436" stroke="#5CC8FF" strokeWidth="1" opacity="0.9" />
            <ellipse cx="17" cy="7" rx="7" ry="5" fill="#0B0F1A" stroke="#FFB35C" strokeWidth="1" />
            <circle cx="17" cy="7" r="1.6" fill="#FFB35C" className="voyager-pulse" />
            <circle cx="9" cy="12" r="1" fill="#5CC8FF" opacity="0.8" />
            <circle cx="25" cy="12" r="1" fill="#5CC8FF" opacity="0.8" />
          </svg>
        </button>
      )}
      {toast && (
        <div className="toast-in fixed bottom-6 left-1/2 z-50 w-[min(92vw,28rem)] -translate-x-1/2 rounded-lg border border-signal/40 bg-panel/95 px-5 py-4 font-mono text-xs leading-relaxed text-starlight shadow-2xl backdrop-blur">
          <span className="mr-2 text-signal">▲ ANOMALY</span>{toast}
        </div>
      )}
    </>
  );
}
