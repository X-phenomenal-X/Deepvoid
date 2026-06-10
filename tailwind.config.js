/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#05070D",        // page background — deep blue-black, not pure black
        panel: "#0B0F1A",       // card surfaces
        hairline: "#1C2436",    // borders
        starlight: "#E8EDF5",   // primary text
        dim: "#8B96AB",         // secondary text
        telemetry: "#FFB35C",   // amber accent — mission-control console amber
        signal: "#5CC8FF"       // cool blue for links/data highlights
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      }
    }
  },
  plugins: []
};
