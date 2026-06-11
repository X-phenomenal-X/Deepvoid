import "./globals.css";
import { Space_Grotesk, IBM_Plex_Mono, Inter, Unbounded } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Starfield from "@/components/Starfield";
import CometCursor from "@/components/CometCursor";
import AlienObserver from "@/components/AlienObserver";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const hero = Unbounded({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-hero" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });
const body = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://deepvoid-woad.vercel.app"),
  title: {
    default: "DeepVoid — live trackers for humanity's deepest space missions",
    template: "%s · DeepVoid"
  },
  description:
    "Live Voyager distance trackers, NASA imagery, launch countdowns, an interactive solar system, and a searchable exoplanet database.",
  openGraph: {
    title: "DeepVoid",
    description: "Live data from humanity's deepest space missions.",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${hero.variable}`}>
      <body className={`${body.className} bg-void text-starlight antialiased`}>
        <Starfield />
        <div className="nebula nebula-a" aria-hidden="true" />
        <div className="nebula nebula-b" aria-hidden="true" />
        <div className="nebula nebula-c" aria-hidden="true" />
        <CometCursor />
        <AlienObserver />
        <Navbar />
        <main className="mx-auto max-w-7xl px-5 sm:px-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
