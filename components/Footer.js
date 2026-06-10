export default function Footer() {
  return (
    <footer className="mt-24 border-t border-hairline">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-dim">
        <p className="font-mono text-xs uppercase tracking-widest text-dim">
          deepvoid — tracking humanity&apos;s farthest reach
        </p>
        <p className="mt-3 max-w-xl">
          Data courtesy of NASA APIs, the NASA Exoplanet Archive, and The Space
          Devs Launch Library. Distances are live estimates based on published
          JPL mission data. Not affiliated with NASA.
        </p>
        <p className="mt-3">&copy; {new Date().getFullYear()} DeepVoid</p>
      </div>
    </footer>
  );
}
