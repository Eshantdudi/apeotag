export async function POST(req: Request) {
  const { qrUrl, type = "vehicle" } = await req.json();

  if (!qrUrl) {
    return new Response("qrUrl required", { status: 400 });
  }

  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(qrUrl)}&color=1a1a1a&bgcolor=FFFFFF&margin=1`;
  const qrRes = await fetch(qrApiUrl);
  const qrBlob = await qrRes.arrayBuffer();
  const qrB64 = Buffer.from(qrBlob).toString("base64");
  const qrDataUrl = `data:image/png;base64,${qrB64}`;

  const svg = type === "pet" ? generatePetSVG(qrDataUrl) : generateVehicleSVG(qrDataUrl);
  const svgBuffer = Buffer.from(svg, "utf-8");

  return new Response(svgBuffer, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Content-Disposition": `attachment; filename="apeotag-${type}-sticker.svg"`,
    },
  });
}

function generateVehicleSVG(qrDataUrl: string): string {
  // 2X2 inch at 300 DPI = 1200x1200px (print quality)
  // viewBox stays 0 0 600 600 so all internal positions remain unchanged
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

function generatePetSVG(qrDataUrl: string): string {
  // 2x2 inch at 300 DPI = 600x600px (print quality)
  // viewBox stays 0 0 600 600 so all internal positions remain unchanged
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

  <!-- Background -->
  <circle cx="300" cy="300" r="292" fill="url(#bg)"/>
  <circle cx="300" cy="300" r="291" fill="none" stroke="#14532d" stroke-width="8"/>
  <circle cx="300" cy="300" r="280" fill="none" stroke="url(#green)" stroke-width="2"/>
  <circle cx="300" cy="300" r="228" fill="none" stroke="#14532d" stroke-width="4"/>
  <circle cx="300" cy="300" r="220" fill="none" stroke="url(#green)" stroke-width="1"/>

  <!-- Side dots -->
  <circle cx="44" cy="300" r="6" fill="#14532d"/>
  <circle cx="556" cy="300" r="6" fill="#14532d"/>

  <!-- Top arc text -->
  <text font-family="Montserrat, Arial, sans-serif" font-weight="800" font-size="23" fill="#14532d" letter-spacing="4">
    <textPath href="#tArc" startOffset="50%" text-anchor="middle">SCAN TO FIND OWNER</textPath>
  </text>

  <!-- Bottom arc text -->
  <text font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="20" fill="#14532d" letter-spacing="4" dominant-baseline="hanging">
    <textPath href="#bArc" startOffset="50%" text-anchor="middle">www.apeo.com</textPath>
  </text>

  <!-- Title box -->
  <rect x="140" y="100" width="320" height="50" rx="12" fill="#14532d"/>
  <text x="300" y="133" font-family="Montserrat, Arial, sans-serif" font-weight="900" font-size="34" fill="url(#green)" text-anchor="middle" letter-spacing="6">PET TAG</text>

  <!-- Paw print icon -->
  <g transform="translate(270, 152) scale(0.55)" fill="#16a34a">
    <ellipse cx="55" cy="70" rx="22" ry="18"/>
    <ellipse cx="22" cy="42" rx="10" ry="13" transform="rotate(-15 22 42)"/>
    <ellipse cx="42" cy="28" rx="10" ry="13" transform="rotate(-5 42 28)"/>
    <ellipse cx="64" cy="26" rx="10" ry="13" transform="rotate(5 64 26)"/>
    <ellipse cx="84" cy="40" rx="10" ry="13" transform="rotate(15 84 40)"/>
  </g>

  <text x="300" y="182" font-family="Montserrat, Arial, sans-serif" font-weight="600" font-size="13" fill="#16a34a" text-anchor="middle" letter-spacing="3">SMART QR PET TAG</text>
  <line x1="185" y1="192" x2="415" y2="192" stroke="url(#green)" stroke-width="2.5"/>

  <!-- Alert box -->
  <rect x="150" y="200" width="300" height="24" rx="12" fill="#dcfce7" stroke="#22c55e" stroke-width="1.5"/>
  <text x="300" y="216" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="12.5" fill="#14532d" text-anchor="middle" letter-spacing="2">LOST PET / EMERGENCY</text>

  <!-- QR Box -->
  <rect x="210" y="232" width="180" height="180" rx="16" fill="#ffffff"/>
  <rect x="210" y="232" width="180" height="7" rx="3" fill="url(#green)"/>
  <rect x="210" y="232" width="180" height="180" rx="16" fill="none" stroke="url(#darkgreen)" stroke-width="2"/>
  <image href="${qrDataUrl}" x="224" y="242" width="152" height="152" preserveAspectRatio="xMidYMid meet"/>

  <!-- Scan instruction -->
  <text x="300" y="428" font-family="Montserrat, Arial, sans-serif" font-weight="800" font-size="15" fill="#14532d" text-anchor="middle" letter-spacing="2.5">SCAN WITH PHONE CAMERA</text>
  <text x="300" y="446" font-family="Montserrat, Arial, sans-serif" font-weight="500" font-size="11" fill="#16a34a" text-anchor="middle">No app required</text>

  <!-- Badges -->
  <rect x="155" y="458" width="90" height="19" rx="9" fill="#dcfce7" stroke="#22c55e" stroke-width="1.2"/>
  <text x="200" y="471" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="10" fill="#14532d" text-anchor="middle">PRIVACY SAFE</text>

  <rect x="253" y="458" width="62" height="19" rx="9" fill="#14532d"/>
  <text x="284" y="471" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="10" fill="#22c55e" text-anchor="middle">NO APP</text>

  <rect x="323" y="458" width="110" height="19" rx="9" fill="#dcfce7" stroke="#22c55e" stroke-width="1.2"/>
  <text x="378" y="471" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="10" fill="#14532d" text-anchor="middle">MADE IN INDIA</text>

  <!-- Footer -->
  <text x="300" y="492" font-family="Montserrat, Arial, sans-serif" font-weight="500" font-size="9" fill="#16a34a" text-anchor="middle" letter-spacing="1.5">© ${new Date().getFullYear()} Apeo. All Rights Reserved.</text>
</svg>`;
}