// app/api/generate-sticker/route.ts
//
// Types:
//   "vehicle"     → purana circular blue sticker
//   "vehicle-hex" → naya black & gold hexagonal sticker
//   "pet"         → purana circular green pet sticker

export async function POST(req: Request) {
  const { qrUrl, type = "vehicle" } = await req.json();

  if (!qrUrl) {
    return new Response("qrUrl required", { status: 400 });
  }

  // QR fetch & base64 embed
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(qrUrl)}&color=1a1a1a&bgcolor=FFFFFF&margin=1`;
  const qrRes = await fetch(qrApiUrl);
  const qrBlob = await qrRes.arrayBuffer();
  const qrB64 = Buffer.from(qrBlob).toString("base64");
  const qrDataUrl = `data:image/png;base64,${qrB64}`;

  let svg: string;
  if (type === "pet") {
    svg = generatePetSVG(qrDataUrl);
  } else if (type === "vehicle-hex") {
    svg = generateVehicleHexSVG(qrDataUrl);
  } else {
    svg = generateVehicleSVG(qrDataUrl);
  }

  const svgBuffer = Buffer.from(svg, "utf-8");

  return new Response(svgBuffer, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Content-Disposition": `attachment; filename="apeotag-${type}-sticker.svg"`,
    },
  });
}

// ─────────────────────────────────────────────────────────
//  1. VEHICLE TAG — Circular Blue (purana)
//     2×2 inch @ 300 DPI = 600×600px
// ─────────────────────────────────────────────────────────
function generateVehicleSVG(qrDataUrl: string): string {
  return `
<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f3f4f6"/>
    </radialGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#2563eb"/>
      <stop offset="50%"  stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <linearGradient id="darkgold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#1e40af"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
    <path id="tArc" d="M 45,300 A 255,255 0 0,1 555,300"/>
    <path id="bArc" d="M 45,300 A 255,255 0 0,0 555,300"/>
  </defs>

  <circle cx="300" cy="300" r="292" fill="url(#bg)"/>
  <circle cx="300" cy="300" r="291" fill="none" stroke="#111827" stroke-width="8"/>
  <circle cx="300" cy="300" r="280" fill="none" stroke="url(#gold)" stroke-width="2"/>
  <circle cx="300" cy="300" r="228" fill="none" stroke="#111827" stroke-width="4"/>
  <circle cx="300" cy="300" r="220" fill="none" stroke="url(#gold)" stroke-width="1"/>

  <circle cx="44" cy="300" r="6" fill="#111827"/>
  <circle cx="556" cy="300" r="6" fill="#111827"/>

  <text font-family="Montserrat, Arial, sans-serif" font-weight="800" font-size="23" fill="#111827" letter-spacing="4">
    <textPath href="#tArc" startOffset="50%" text-anchor="middle">SCAN TO FIND OWNER</textPath>
  </text>
  <text font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="20" fill="#111827" letter-spacing="4" dominant-baseline="hanging">
    <textPath href="#bArc" startOffset="50%" text-anchor="middle">www.apeo.com</textPath>
  </text>

  <rect x="140" y="100" width="320" height="50" rx="12" fill="#111827"/>
  <text x="300" y="133" font-family="Montserrat, Arial, sans-serif" font-weight="900" font-size="34" fill="url(#gold)" text-anchor="middle" letter-spacing="6">SCAN TAG</text>
  <text x="300" y="162" font-family="Montserrat, Arial, sans-serif" font-weight="600" font-size="13" fill="#1e40af" text-anchor="middle" letter-spacing="4">SMART QR VEHICLE TAG</text>
  <line x1="185" y1="174" x2="415" y2="174" stroke="url(#gold)" stroke-width="2.5"/>

  <rect x="160" y="184" width="280" height="24" rx="12" fill="#e0f2fe" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="300" y="200" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="12.5" fill="#1e3a8a" text-anchor="middle" letter-spacing="2">WRONG PARKING / EMERGENCY</text>

  <rect x="210" y="216" width="180" height="180" rx="16" fill="#ffffff"/>
  <rect x="210" y="216" width="180" height="7" rx="3" fill="url(#gold)"/>
  <rect x="210" y="216" width="180" height="180" rx="16" fill="none" stroke="url(#darkgold)" stroke-width="2"/>
  <image href="${qrDataUrl}" x="224" y="226" width="152" height="152" preserveAspectRatio="xMidYMid meet"/>

  <text x="300" y="412" font-family="Montserrat, Arial, sans-serif" font-weight="800" font-size="15" fill="#111827" text-anchor="middle" letter-spacing="2.5">SCAN WITH PHONE CAMERA</text>
  <text x="300" y="430" font-family="Montserrat, Arial, sans-serif" font-weight="500" font-size="11" fill="#1e40af" text-anchor="middle">No app required</text>

  <rect x="169" y="444" width="90" height="19" rx="9" fill="#e0f2fe" stroke="#3b82f6" stroke-width="1.2"/>
  <text x="214" y="457" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="10" fill="#1e3a8a" text-anchor="middle">PRIVACY SAFE</text>
  <rect x="267" y="444" width="62" height="19" rx="9" fill="#111827"/>
  <text x="298" y="457" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="10" fill="#3b82f6" text-anchor="middle">NO APP</text>
  <rect x="337" y="444" width="94" height="19" rx="9" fill="#e0f2fe" stroke="#3b82f6" stroke-width="1.2"/>
  <text x="384" y="457" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="10" fill="#1e3a8a" text-anchor="middle">MADE IN INDIA</text>

  <text x="300" y="478" font-family="Montserrat, Arial, sans-serif" font-weight="500" font-size="9" fill="#3b82f6" text-anchor="middle" letter-spacing="1.5">© ${new Date().getFullYear()} Apeo. All Rights Reserved.</text>
</svg>`;
}

// ─────────────────────────────────────────────────────────
//  2. VEHICLE HEX TAG — Black & Gold Hexagonal (naya)
//     4×4 inch @ 300 DPI = 1200×1080px
// ─────────────────────────────────────────────────────────
function generateVehicleHexSVG(qrDataUrl: string): string {
  const year = new Date().getFullYear();
  const hex = "400,30 726,210 726,510 400,690 74,510 74,210";

  return `<svg width="1200" height="1080" viewBox="0 0 800 720" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="goldH" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#8B6914"/>
      <stop offset="25%"  stop-color="#F5D17A"/>
      <stop offset="50%"  stop-color="#FFE999"/>
      <stop offset="75%"  stop-color="#D4A82A"/>
      <stop offset="100%" stop-color="#8B6914"/>
    </linearGradient>
    <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#C8941A"/>
      <stop offset="40%"  stop-color="#FFE580"/>
      <stop offset="60%"  stop-color="#FFE580"/>
      <stop offset="100%" stop-color="#C8941A"/>
    </linearGradient>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#1a1a1a"/>
      <stop offset="100%" stop-color="#0d0d0d"/>
    </linearGradient>
    <linearGradient id="badgeGold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#8B6914"/>
      <stop offset="50%"  stop-color="#D4A82A"/>
      <stop offset="100%" stop-color="#8B6914"/>
    </linearGradient>
    <linearGradient id="urlBadge" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#6B4F0F"/>
      <stop offset="50%"  stop-color="#C8941A"/>
      <stop offset="100%" stop-color="#6B4F0F"/>
    </linearGradient>
    <pattern id="hexPat" x="0" y="0" width="40" height="46" patternUnits="userSpaceOnUse">
      <polygon points="20,2 38,12 38,34 20,44 2,34 2,12" fill="none" stroke="#C8941A" stroke-width="0.4" opacity="0.18"/>
    </pattern>
  </defs>

  <polygon points="${hex}" fill="url(#goldH)"/>
  <polygon points="400,42 714,218 714,502 400,678 86,502 86,218" fill="url(#bgGrad)"/>
  <polygon points="400,42 714,218 714,502 400,678 86,502 86,218" fill="url(#hexPat)"/>

  <polyline points="120,290 86,360 120,430"  fill="none" stroke="url(#goldH)" stroke-width="3.5" stroke-linejoin="round"/>
  <polyline points="148,310 120,360 148,410"  fill="none" stroke="url(#goldH)" stroke-width="2.5" stroke-linejoin="round"/>
  <polyline points="680,290 714,360 680,430"  fill="none" stroke="url(#goldH)" stroke-width="3.5" stroke-linejoin="round"/>
  <polyline points="652,310 680,360 652,410"  fill="none" stroke="url(#goldH)" stroke-width="2.5" stroke-linejoin="round"/>

  <g transform="translate(366,52)" fill="url(#goldText)">
    <polygon points="34,28 34,8 20,18 10,2 0,18 -14,8 -14,28"/>
    <rect x="-14" y="28" width="48" height="6" rx="2"/>
    <circle cx="-14" cy="8" r="3.5"/>
    <circle cx="10"  cy="2" r="3.5"/>
    <circle cx="34"  cy="8" r="3.5"/>
  </g>

  <circle cx="310" cy="70" r="3" fill="url(#goldText)" opacity="0.8"/>
  <circle cx="298" cy="70" r="2" fill="url(#goldText)" opacity="0.5"/>
  <circle cx="490" cy="70" r="3" fill="url(#goldText)" opacity="0.8"/>
  <circle cx="502" cy="70" r="2" fill="url(#goldText)" opacity="0.5"/>

  <text x="400" y="98"  font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="22" fill="url(#goldText)" text-anchor="middle" letter-spacing="5">SCAN TO FIND OWNER</text>
  <text x="400" y="168" font-family="Montserrat, Arial, sans-serif" font-weight="900" font-size="82" fill="url(#goldText)" text-anchor="middle" letter-spacing="4">SCAN TAG</text>

  <line x1="130" y1="188" x2="290" y2="188" stroke="url(#goldH)" stroke-width="1.5"/>
  <line x1="510" y1="188" x2="670" y2="188" stroke="url(#goldH)" stroke-width="1.5"/>
  <text x="400" y="194" font-family="Montserrat, Arial, sans-serif" font-weight="600" font-size="18" fill="url(#goldText)" text-anchor="middle" letter-spacing="6">SMART QR VEHICLE TAG</text>

  <rect x="218" y="206" width="364" height="34" rx="17" fill="none" stroke="url(#badgeGold)" stroke-width="1.8"/>
  <text x="400" y="229" font-family="Montserrat, Arial, sans-serif" font-weight="800" font-size="17" fill="url(#goldText)" text-anchor="middle" letter-spacing="3">WRONG PARKING / EMERGENCY</text>

  <rect x="248" y="252" width="204" height="204" rx="18" fill="#ffffff"/>
  <rect x="248" y="252" width="204" height="8"   rx="4"  fill="url(#goldH)"/>
  <rect x="248" y="252" width="204" height="204" rx="18" fill="none" stroke="url(#goldH)" stroke-width="2.5"/>
  <image href="${qrDataUrl}" x="262" y="264" width="176" height="176" preserveAspectRatio="xMidYMid meet"/>

  <text x="400" y="478" font-family="Montserrat, Arial, sans-serif" font-weight="800" font-size="17" fill="#ffffff"         text-anchor="middle" letter-spacing="3">SCAN WITH PHONE CAMERA</text>
  <text x="400" y="498" font-family="Montserrat, Arial, sans-serif" font-weight="400" font-size="14" fill="url(#goldText)" text-anchor="middle">No app required</text>

  <rect x="130" y="516" width="148" height="26" rx="13" fill="none" stroke="url(#badgeGold)" stroke-width="1.4"/>
  <text x="204" y="534" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="12" fill="url(#goldText)" text-anchor="middle" letter-spacing="1">PRIVACY SAFE</text>
  <line x1="282" y1="518" x2="282" y2="540" stroke="url(#goldH)" stroke-width="1"/>
  <rect x="286" y="516" width="96"  height="26" rx="13" fill="none" stroke="url(#badgeGold)" stroke-width="1.4"/>
  <text x="334" y="534" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="12" fill="url(#goldText)" text-anchor="middle" letter-spacing="1">NO APP</text>
  <line x1="386" y1="518" x2="386" y2="540" stroke="url(#goldH)" stroke-width="1"/>
  <rect x="390" y="516" width="156" height="26" rx="13" fill="none" stroke="url(#badgeGold)" stroke-width="1.4"/>
  <text x="468" y="534" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="12" fill="url(#goldText)" text-anchor="middle" letter-spacing="1">MADE IN INDIA</text>

  <line x1="244" y1="569" x2="256" y2="569" stroke="url(#goldH)" stroke-width="1.5"/>
  <circle cx="241" cy="569" r="2" fill="url(#goldText)"/>
  <line x1="544" y1="569" x2="556" y2="569" stroke="url(#goldH)" stroke-width="1.5"/>
  <circle cx="559" cy="569" r="2" fill="url(#goldText)"/>
  <rect x="258" y="554" width="184" height="30" rx="15" fill="url(#urlBadge)" stroke="url(#goldH)" stroke-width="1.5"/>
  <circle cx="284" cy="569" r="8"  fill="none" stroke="url(#goldText)" stroke-width="1.3"/>
  <ellipse cx="284" cy="569" rx="4" ry="8" fill="none" stroke="url(#goldText)" stroke-width="1"/>
  <line x1="276" y1="569" x2="292" y2="569" stroke="url(#goldText)" stroke-width="1"/>
  <line x1="276" y1="565" x2="292" y2="565" stroke="url(#goldText)" stroke-width="0.8"/>
  <line x1="276" y1="573" x2="292" y2="573" stroke="url(#goldText)" stroke-width="0.8"/>
  <text x="400" y="574" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="16" fill="url(#goldText)" text-anchor="middle" letter-spacing="1">www.apeo.in</text>

  <text x="400" y="608" font-family="Montserrat, Arial, sans-serif" font-weight="400" font-size="10" fill="#888" text-anchor="middle" letter-spacing="1">© ${year} Apeo. All Rights Reserved.</text>
</svg>`;
}

// ─────────────────────────────────────────────────────────
//  3. PET TAG — Circular Green (purana)
//     2×2 inch @ 300 DPI = 600×600px
// ─────────────────────────────────────────────────────────
function generatePetSVG(qrDataUrl: string): string {
  return `
<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f0fdf4"/>
    </radialGradient>
    <linearGradient id="green" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#16a34a"/>
      <stop offset="50%"  stop-color="#22c55e"/>
      <stop offset="100%" stop-color="#15803d"/>
    </linearGradient>
    <linearGradient id="darkgreen" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#14532d"/>
      <stop offset="100%" stop-color="#22c55e"/>
    </linearGradient>
    <path id="tArc" d="M 45,300 A 255,255 0 0,1 555,300"/>
    <path id="bArc" d="M 45,300 A 255,255 0 0,0 555,300"/>
  </defs>

  <circle cx="300" cy="300" r="292" fill="url(#bg)"/>
  <circle cx="300" cy="300" r="291" fill="none" stroke="#14532d" stroke-width="8"/>
  <circle cx="300" cy="300" r="280" fill="none" stroke="url(#green)" stroke-width="2"/>
  <circle cx="300" cy="300" r="228" fill="none" stroke="#14532d" stroke-width="4"/>
  <circle cx="300" cy="300" r="220" fill="none" stroke="url(#green)" stroke-width="1"/>

  <circle cx="44"  cy="300" r="6" fill="#14532d"/>
  <circle cx="556" cy="300" r="6" fill="#14532d"/>

  <text font-family="Montserrat, Arial, sans-serif" font-weight="800" font-size="23" fill="#14532d" letter-spacing="4">
    <textPath href="#tArc" startOffset="50%" text-anchor="middle">SCAN TO FIND OWNER</textPath>
  </text>
  <text font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="20" fill="#14532d" letter-spacing="4" dominant-baseline="hanging">
    <textPath href="#bArc" startOffset="50%" text-anchor="middle">www.apeo.com</textPath>
  </text>

  <rect x="140" y="100" width="320" height="50" rx="12" fill="#14532d"/>
  <text x="300" y="133" font-family="Montserrat, Arial, sans-serif" font-weight="900" font-size="34" fill="url(#green)" text-anchor="middle" letter-spacing="6">PET TAG</text>

  <g transform="translate(270, 152) scale(0.55)" fill="#16a34a">
    <ellipse cx="55" cy="70" rx="22" ry="18"/>
    <ellipse cx="22" cy="42" rx="10" ry="13" transform="rotate(-15 22 42)"/>
    <ellipse cx="42" cy="28" rx="10" ry="13" transform="rotate(-5 42 28)"/>
    <ellipse cx="64" cy="26" rx="10" ry="13" transform="rotate(5 64 26)"/>
    <ellipse cx="84" cy="40" rx="10" ry="13" transform="rotate(15 84 40)"/>
  </g>

  <text x="300" y="182" font-family="Montserrat, Arial, sans-serif" font-weight="600" font-size="13" fill="#16a34a" text-anchor="middle" letter-spacing="3">SMART QR PET TAG</text>
  <line x1="185" y1="192" x2="415" y2="192" stroke="url(#green)" stroke-width="2.5"/>

  <rect x="150" y="200" width="300" height="24" rx="12" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5"/>
  <text x="300" y="216" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="12.5" fill="#14532d" text-anchor="middle" letter-spacing="2">LOST PET / EMERGENCY</text>

  <rect x="210" y="232" width="180" height="180" rx="16" fill="#ffffff"/>
  <rect x="210" y="232" width="180" height="7"   rx="3"  fill="url(#green)"/>
  <rect x="210" y="232" width="180" height="180" rx="16" fill="none" stroke="url(#darkgreen)" stroke-width="2"/>
  <image href="${qrDataUrl}" x="224" y="242" width="152" height="152" preserveAspectRatio="xMidYMid meet"/>

  <text x="300" y="428" font-family="Montserrat, Arial, sans-serif" font-weight="800" font-size="15" fill="#14532d" text-anchor="middle" letter-spacing="2.5">SCAN WITH PHONE CAMERA</text>
  <text x="300" y="446" font-family="Montserrat, Arial, sans-serif" font-weight="500" font-size="11" fill="#16a34a" text-anchor="middle">No app required</text>

  <rect x="155" y="458" width="90"  height="19" rx="9" fill="#dcfce7" stroke="#22c55e" stroke-width="1.2"/>
  <text x="200" y="471" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="10" fill="#14532d" text-anchor="middle">PRIVACY SAFE</text>
  <rect x="253" y="458" width="62"  height="19" rx="9" fill="#14532d"/>
  <text x="284" y="471" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="10" fill="#22c55e" text-anchor="middle">NO APP</text>
  <rect x="323" y="458" width="110" height="19" rx="9" fill="#dcfce7" stroke="#22c55e" stroke-width="1.2"/>
  <text x="378" y="471" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="10" fill="#14532d" text-anchor="middle">MADE IN INDIA</text>

  <text x="300" y="492" font-family="Montserrat, Arial, sans-serif" font-weight="500" font-size="9" fill="#16a34a" text-anchor="middle" letter-spacing="1.5">© ${new Date().getFullYear()} Apeo. All Rights Reserved.</text>
</svg>`;
}