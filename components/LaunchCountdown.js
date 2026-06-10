import { getNextLaunch } from "@/lib/launches";
import Countdown from "./Countdown";

export default async function LaunchCountdown() {
  const launch = await getNextLaunch();
  if (!launch) {
    return (
      <div className="rounded-lg border border-hairline bg-panel p-6 text-sm text-dim">
        Launch schedule is updating. Check back shortly.
      </div>
    );
  }
  return (
    <div className="rounded-lg border border-hairline bg-panel p-6">
      <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
        Next launch · {launch.launch_service_provider?.name || "TBD"}
      </p>
      <h3 className="mt-2 font-display text-xl text-starlight">{launch.name}</h3>
      <p className="mt-1 text-xs text-dim">{launch.pad?.location?.name}</p>
      <Countdown target={launch.net} />
    </div>
  );
}
