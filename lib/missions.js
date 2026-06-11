// Curated mission data. Edit this file to add missions — no code changes needed.
// Photos: NASA/ESA imagery via Wikimedia's stable filename redirect (all URLs verified).
const FP = "https://commons.wikimedia.org/wiki/Special:FilePath/";

export const MISSIONS = [
  { name: "Voyager 1", agency: "NASA", launched: 1977, status: "Active", region: "Interstellar space", highlight: "Farthest human-made object; crossed the heliopause in 2012.", instruments: "Plasma wave, magnetometer, cosmic ray subsystem",
    photo: `${FP}Voyager_spacecraft.jpg?width=500` },
  { name: "Voyager 2", agency: "NASA", launched: 1977, status: "Active", region: "Interstellar space", highlight: "Only probe to fly past all four giant planets.", instruments: "Plasma science, magnetometer, low-energy charged particles",
    photo: `${FP}Voyager_spacecraft_model.png?width=500` },
  { name: "New Horizons", agency: "NASA", launched: 2006, status: "Active", region: "Kuiper Belt", highlight: "First close-up of Pluto (2015) and Arrokoth (2019).", instruments: "LORRI imager, Ralph, Alice UV spectrometer",
    photo: `${FP}New_Horizons_Transparent.png?width=500` },
  { name: "Parker Solar Probe", agency: "NASA", launched: 2018, status: "Active", region: "Solar corona", highlight: "Fastest spacecraft ever; flew through the Sun's atmosphere.", instruments: "FIELDS, WISPR imager, SWEAP",
    photo: `${FP}Parker_Solar_Probe.jpg?width=500` },
  { name: "James Webb Space Telescope", agency: "NASA / ESA / CSA", launched: 2021, status: "Active", region: "Sun–Earth L2", highlight: "Sees the first galaxies and analyzes exoplanet atmospheres.", instruments: "NIRCam, MIRI, NIRSpec, FGS/NIRISS",
    photo: `${FP}James_Webb_Space_Telescope.jpg?width=500` },
  { name: "Europa Clipper", agency: "NASA", launched: 2024, status: "In transit", region: "En route to Jupiter", highlight: "Will survey Europa's subsurface ocean for habitability.", instruments: "Ice-penetrating radar, mass spectrometer, cameras",
    photo: `${FP}Europa_Clipper_transparent.png?width=500` },
  { name: "JUICE", agency: "ESA", launched: 2023, status: "In transit", region: "En route to Jupiter", highlight: "Will orbit Ganymede — the first orbit of another planet's moon.", instruments: "JANUS camera, RIME radar, laser altimeter",
    photo: `${FP}JUICE_spacecraft_model.png?width=500` },
  { name: "Dragonfly", agency: "NASA", launched: null, status: "Planned (2028)", region: "Titan (Saturn)", highlight: "A nuclear-powered drone that will fly across Titan's dunes.", instruments: "Mass spectrometer, gamma-ray spectrometer, cameras",
    photo: null }
];
