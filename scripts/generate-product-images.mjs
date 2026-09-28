import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outDir = path.join(process.cwd(), "public/images/products");

const palette = {
  ink: "#1C1915",
  moss: "#3F4F3A",
  mossDeep: "#2C3828",
  clay: "#A56B4A",
  blush: "#C96B5A",
  cream: "#F7F1E7",
  sand: "#E4D8C6",
  stone: "#CDBFAE",
  brass: "#B08958",
  white: "#FBFAF6",
};

function svg(inner, viewBox = "0 0 800 1000") {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="${viewBox}" fill="none">
  ${inner}
</svg>`;
}

function ground(color) {
  return `<rect width="800" height="1000" fill="${color}"/><ellipse cx="400" cy="760" rx="220" ry="28" fill="${palette.ink}" opacity="0.08"/>`;
}

const arts = {
  linen: (bg) =>
    ground(bg) +
    `<g>
      <rect x="168" y="330" width="470" height="250" rx="6" fill="${palette.cream}" transform="rotate(-7 400 450)"/>
      <rect x="190" y="390" width="450" height="230" rx="4" fill="${palette.sand}"/>
      <path d="M230 500c90-40 150 30 250-8" stroke="${palette.clay}" stroke-width="7" stroke-linecap="round"/>
      <path d="M250 548c70-24 130 18 210-4" stroke="${palette.stone}" stroke-width="5" stroke-linecap="round"/>
    </g>`,
  vase: (bg) =>
    ground(bg) +
    `<g>
      <path d="M330 430h150l-18 70c46 28 72 86 62 168-12 92-58 150-119 158h-16c-62-8-108-66-120-158-10-82 16-140 62-168l-18-70h117z" fill="${palette.stone}"/>
      <ellipse cx="405" cy="430" rx="78" ry="16" fill="#B7AB9B"/>
      <path d="M390 430c-8-90-36-150-52-196" stroke="${palette.moss}" stroke-width="3"/>
      <path d="M418 428c14-96 48-150 70-210" stroke="${palette.mossDeep}" stroke-width="3"/>
      <path d="M404 426c2-80-8-140-6-190" stroke="${palette.moss}" stroke-width="2"/>
      <circle cx="338" cy="228" r="22" fill="${palette.blush}"/>
      <circle cx="338" cy="228" r="8" fill="${palette.cream}"/>
      <circle cx="492" cy="210" r="26" fill="${palette.clay}"/>
      <circle cx="492" cy="210" r="9" fill="${palette.sand}"/>
      <circle cx="398" cy="214" r="16" fill="${palette.moss}"/>
    </g>`,
  candle: (bg) =>
    ground(bg) +
    `<g>
      <rect x="300" y="360" width="200" height="280" rx="100" fill="${palette.cream}"/>
      <rect x="318" y="390" width="164" height="220" rx="82" fill="${palette.sand}"/>
      <rect x="386" y="300" width="28" height="70" rx="8" fill="${palette.brass}"/>
      <path d="M400 250c18 16 28 28 28 48 0 22-14 36-28 36s-28-14-28-36c0-20 10-32 28-48z" fill="${palette.blush}"/>
      <path d="M400 268c8 10 12 16 12 28 0 10-6 16-12 16s-12-6-12-16c0-12 4-18 12-28z" fill="${palette.cream}"/>
    </g>`,
  storage: (bg) =>
    ground(bg) +
    `<g>
      <rect x="150" y="470" width="250" height="170" rx="18" fill="${palette.stone}"/>
      <rect x="176" y="496" width="198" height="18" rx="9" fill="${palette.cream}" opacity="0.8"/>
      <rect x="300" y="390" width="280" height="190" rx="18" fill="${palette.sand}"/>
      <rect x="328" y="418" width="224" height="18" rx="9" fill="${palette.white}"/>
      <rect x="230" y="300" width="230" height="150" rx="18" fill="${palette.moss}"/>
      <rect x="256" y="326" width="178" height="16" rx="8" fill="${palette.cream}" opacity="0.7"/>
    </g>`,
  cloth: (bg) =>
    ground(bg) +
    `<g>
      <rect x="210" y="470" width="380" height="70" rx="12" fill="${palette.moss}"/>
      <rect x="190" y="400" width="400" height="70" rx="12" fill="${palette.sand}"/>
      <rect x="220" y="330" width="360" height="70" rx="12" fill="${palette.cream}"/>
      <path d="M250 365h300" stroke="${palette.stone}" stroke-width="4"/>
    </g>`,
  paper: (bg) =>
    ground(bg) +
    `<g>
      <rect x="230" y="300" width="340" height="430" rx="8" fill="${palette.stone}"/>
      <rect x="210" y="280" width="340" height="430" rx="8" fill="${palette.cream}"/>
      <rect x="250" y="250" width="300" height="430" rx="6" fill="${palette.white}"/>
      <rect x="300" y="430" width="200" height="28" rx="14" fill="${palette.clay}" opacity="0.85"/>
    </g>`,
  bottle: (bg) =>
    ground(bg) +
    `<g>
      <path d="M250 390h70v-70h-18v-40h-34v40h-18v70z" fill="${palette.stone}"/>
      <path d="M230 390h110c8 0 20 18 24 70 18 20 28 70 20 150-10 90-40 130-99 130s-89-40-99-130c-8-80 2-130 20-150 4-52 16-70 24-70z" fill="${palette.sand}"/>
      <path d="M470 430h54v-90h-14v-36h-26v36h-14v90z" fill="${palette.moss}"/>
      <rect x="448" y="430" width="98" height="210" rx="28" fill="${palette.mossDeep}"/>
      <rect x="468" y="470" width="58" height="70" rx="8" fill="${palette.cream}" opacity="0.25"/>
    </g>`,
  tray: (bg) =>
    ground(bg) +
    `<g>
      <ellipse cx="400" cy="560" rx="230" ry="78" fill="${palette.stone}"/>
      <ellipse cx="400" cy="540" rx="210" ry="64" fill="${palette.sand}"/>
      <rect x="300" y="430" width="150" height="90" rx="16" fill="${palette.cream}"/>
      <rect x="470" y="450" width="70" height="70" rx="35" fill="${palette.moss}"/>
    </g>`,
  soap: (bg) =>
    ground(bg) +
    `<g>
      <rect x="300" y="340" width="200" height="360" rx="90" fill="${palette.cream}"/>
      <rect x="324" y="390" width="152" height="250" rx="70" fill="#E7F0E4"/>
      <rect x="372" y="250" width="56" height="100" rx="10" fill="${palette.moss}"/>
      <path d="M400 210c20 8 34 28 34 48h-68c0-20 14-40 34-48z" fill="${palette.stone}"/>
      <rect x="360" y="470" width="80" height="36" rx="18" fill="${palette.white}" opacity="0.7"/>
    </g>`,
  cotton: (bg) =>
    ground(bg) +
    `<g>
      <rect x="220" y="320" width="360" height="390" rx="28" fill="${palette.cream}"/>
      <path d="M250 430h300" stroke="${palette.sand}" stroke-width="16" stroke-linecap="round"/>
      <path d="M280 500c40-30 80-30 120 0s80 30 120 0" stroke="${palette.stone}" stroke-width="8" stroke-linecap="round"/>
      <rect x="330" y="560" width="140" height="16" rx="8" fill="${palette.clay}" opacity="0.7"/>
    </g>`,
  table: (bg) =>
    ground(bg) +
    `<g>
      <rect x="160" y="390" width="480" height="28" rx="4" fill="${palette.brass}" opacity="0.35"/>
      <rect x="150" y="360" width="500" height="36" rx="4" fill="#C6A27A"/>
      <path d="M210 396l-40 250" stroke="${palette.ink}" stroke-width="14" stroke-linecap="round"/>
      <path d="M590 396l40 250" stroke="${palette.ink}" stroke-width="14" stroke-linecap="round"/>
      <path d="M230 396l30 250" stroke="${palette.ink}" stroke-width="14" stroke-linecap="round"/>
      <path d="M570 396l-30 250" stroke="${palette.ink}" stroke-width="14" stroke-linecap="round"/>
      <rect x="300" y="300" width="90" height="60" rx="8" fill="${palette.cream}"/>
    </g>`,
  incense: (bg) =>
    ground(bg) +
    `<g>
      <ellipse cx="400" cy="620" rx="150" ry="28" fill="${palette.brass}"/>
      <ellipse cx="400" cy="606" rx="130" ry="20" fill="#D2B07A"/>
      <rect x="392" y="300" width="16" height="310" rx="8" fill="${palette.stone}"/>
      <path d="M400 300c40-40 10-90 48-130" stroke="${palette.muted ?? "#8A8175"}" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
      <circle cx="452" cy="164" r="8" fill="${palette.sand}"/>
    </g>`,
  refill: (bg) =>
    ground(bg) +
    `<g>
      <rect x="180" y="430" width="200" height="230" rx="16" fill="${palette.sand}"/>
      <rect x="210" y="470" width="140" height="18" rx="9" fill="${palette.cream}"/>
      <rect x="360" y="360" width="90" height="300" rx="40" fill="${palette.cream}"/>
      <rect x="378" y="300" width="54" height="70" rx="8" fill="${palette.moss}"/>
      <rect x="470" y="420" width="120" height="240" rx="16" fill="${palette.stone}"/>
      <rect x="494" y="460" width="72" height="72" rx="8" fill="${palette.white}" opacity="0.55"/>
    </g>`,
  mask: (bg) =>
    ground(bg) +
    `<g>
      <path d="M180 470c40-80 120-120 220-120s180 40 220 120c-40 70-120 120-220 120s-180-50-220-120z" fill="${palette.moss}"/>
      <path d="M230 470c28-46 74-70 140-70" stroke="${palette.cream}" stroke-width="10" stroke-linecap="round" opacity="0.8"/>
      <path d="M250 430c70 30 160 30 250-10" stroke="${palette.sand}" stroke-width="8" stroke-linecap="round" opacity="0.5"/>
      <circle cx="250" cy="500" r="10" fill="${palette.brass}"/>
      <circle cx="550" cy="500" r="10" fill="${palette.brass}"/>
    </g>`,
};

const backgrounds = ["#E9E1D4", "#E7EEE4", "#F0E6DA", "#E5E0D8", "#EFE8DC"];

await mkdir(outDir, { recursive: true });

let index = 0;
for (const [key, draw] of Object.entries(arts)) {
  const bg = backgrounds[index % backgrounds.length];
  index += 1;
  const main = svg(draw(bg));
  const detail = svg(draw(bg), "120 140 560 700");
  await sharp(Buffer.from(main)).png({ compressionLevel: 9 }).toFile(path.join(outDir, `${key}.png`));
  await sharp(Buffer.from(detail)).png({ compressionLevel: 9 }).toFile(path.join(outDir, `${key}-detail.png`));
  console.log(key);
}
