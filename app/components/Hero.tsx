"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden flex items-center min-h-[580px] py-14 px-6"
      style={{ background: "#F7F6FF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >

      {/* ── BACKGROUND GRAPHICS ── */}

      {/* Large circle top-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: -180, right: -180,
          width: 520, height: 520,
          borderRadius: "50%",
          background: "linear-gradient(145deg,#EEEDFE 0%,#d9d6fc 100%)",
          opacity: 0.6,
        }}
      />

      {/* Small circle bottom-left */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: -100, left: -80,
          width: 300, height: 300,
          borderRadius: "50%",
          background: "linear-gradient(145deg,#d6f5ea 0%,#b8edda 100%)",
          opacity: 0.55,
        }}
      />

      {/* Decorative arc top-left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: -60, left: -60,
          width: 240, height: 240,
          borderRadius: "50%",
          border: "28px solid rgba(83,74,183,0.08)",
        }}
      />

      {/* Dot grid top-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0, right: 0,
          width: 260, height: 260,
          opacity: 0.5,
          backgroundImage:
            "radial-gradient(circle, rgba(60,52,137,0.18) 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Horizontal line accent */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: 80, left: 0,
          width: "100%", height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(83,74,183,0.12) 30%, rgba(83,74,183,0.12) 70%, transparent)",
        }}
      />

      {/* ── MAIN GRID ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-0">

        {/* ── LEFT ── */}
        <div className="pr-0 md:pr-10">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7"
            style={{
              background: "#fff",
              border: "1.5px solid #CECBF6",
              boxShadow: "0 2px 12px rgba(83,74,183,0.10)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{
                background: "#534AB7",
                boxShadow: "0 0 0 3px rgba(83,74,183,0.18)",
              }}
            />
            <span
              className="text-[10px] font-bold tracking-widest uppercase"
              style={{ color: "#3C3489" }}
            >
              Smart QR Protection
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-extrabold leading-[1.06] tracking-tight text-[#0f0e1a] mb-3"
            style={{ fontSize: "clamp(36px, 5vw, 52px)" }}
          >
             <span style={{ color: "#0F6E56" }}>Smart Tags</span> <br />
             <span style={{ color: "#0F6E56" }}>That</span> {" "}
            <span className="relative inline-block" style={{ color: "#3C3489" }}>
              Solve
              <span
                className="absolute left-0 w-full rounded-full"
                style={{
                  bottom: -4,
                  height: 4,
                  background: "linear-gradient(90deg,#534AB7,#a89fef)",
                }}
              />
            </span>
            <br />
             <span style={{ color: "#0F6E56" }}>Real Problems</span> 
          </h1>

          {/* Tagline */}
          <p
            className="text-[13px] font-semibold tracking-widest uppercase mb-5"
            style={{ color: "#7B74E0" }}
          >
            For Vehicles &amp; Pets — Scan. Contact. Done.
          </p>
           

          {/* Description */}
          <p
            className="text-[15px] leading-relaxed mb-9 max-w-[350px]"
            style={{ color: "#6b6880" }}
          >
            <strong style={{ color: "#0F6E56", fontWeight: 600 }}>
              Vehicle wrongly parked?
            </strong>{" "}
            Scan the tag and reach the owner instantly.{" "}
            <strong style={{ color: "#0F6E56", fontWeight: 600 }}>
              Pet got lost?
            </strong>{" "}
            Anyone can scan and help reunite them with you.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4 mb-10 flex-wrap">
            <Link
              href="/login"
              className="text-white text-[13px] font-bold tracking-wide rounded-2xl transition-all hover:-translate-y-1"
              style={{
                padding: "14px 28px",
                background: "linear-gradient(135deg,#3C3489 0%,#534AB7 100%)",
                boxShadow:
                  "0 8px 24px rgba(60,52,137,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              Order Now →
            </Link>
            <a
              href="#HowItWorks"
              className="text-[13px] font-semibold transition-all"
              style={{ color: "#534AB7" }}
            >
              See how it works →
            </a>
          </div>

          {/* Trust row */}
          <div className="flex gap-5 flex-wrap">
            {[
              { label: "No App Needed",  color: "#534AB7", bg: "#EEEDFE" },
              { label: "Instant Contact", color: "#0F6E56", bg: "#E1F5EE" },
              { label: "Free Delivery",   color: "#C8941A", bg: "#FEF9EC" },
            ].map(({ label, color, bg }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-[12px] font-medium"
                style={{ color: "#888" }}
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                  style={{ background: bg, color }}
                >
                  ✓
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — Tag Cards ── */}
        <div className="flex items-end justify-center gap-3 mt-14 md:mt-0">

          {/* Vehicle Tag */}
          <div
            className="rounded-3xl overflow-hidden cursor-pointer bg-white transition-transform duration-300 hover:-translate-y-3 hover:scale-[1.04]"
            style={{
              width: 160,
              boxShadow:
                "0 12px 40px rgba(60,52,137,0.14), 0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <div
              className="py-2.5 text-center text-[9px] font-black tracking-widest uppercase text-white"
              style={{ background: "linear-gradient(135deg,#3C3489,#534AB7)" }}
            >
              Vehicle Tag
            </div>
            <div
              className="flex items-center justify-center overflow-hidden bg-[#fafafa]"
              style={{ height: 155 }}
            >
              <img
                src="/products/tag3.png"
                alt="Vehicle Tag"
                className="w-full h-full object-contain block"
              />
            </div>
            <div
              className="flex items-center justify-between px-3 py-2.5"
              style={{ borderTop: "1px solid #f0f0f0" }}
            >
              <span className="text-[15px] font-black" style={{ color: "#3C3489" }}>
                ₹295
              </span>
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold"
                style={{ background: "#EEEDFE", color: "#3C3489" }}
              >
                →
              </span>
            </div>
          </div>

          {/* Prime Tag — center, tallest */}
          <div className="relative flex flex-col items-center" style={{ marginBottom: 28 }}>

            {/* Floating pill */}
         

            <div
              className="rounded-3xl overflow-hidden cursor-pointer bg-white transition-transform duration-300 hover:-translate-y-4 hover:scale-[1.04]"
              style={{
                width: 175,
                border: "2px solid #C8941A",
                boxShadow:
                  "0 16px 48px rgba(200,148,26,0.28), 0 2px 12px rgba(200,148,26,0.12)",
              }}
            >
              {/* Gold shimmer line */}
              <div
                style={{
                  height: 2,
                  background:
                    "linear-gradient(90deg,transparent,#FFE999 30%,#C8941A 50%,#FFE999 70%,transparent)",
                }}
              />
              <div
                className="py-2.5 text-center text-[9px] font-black tracking-widest"
                style={{
                  background:
                    "linear-gradient(90deg,#6B4F0F,#C8941A,#D4A82A,#C8941A,#6B4F0F)",
                  color: "#1a0e00",
                }}
              >
                👑 Prime Tag
              </div>
              <div
                className="flex items-center justify-center overflow-hidden bg-[#fafafa]"
                style={{ height: 185, 
                  
                }}
              >
                <img
                  src="/products/tag4.png"
                  alt="Prime Tag"
                  className="w-full h-full object-contain block"
                />
              </div>
              <div
                className="flex items-center justify-between px-3 py-2.5"
                style={{
                  borderTop: "1px solid rgba(200,148,26,0.2)",
                  background: "#fffbf0",
                }}
              >
                <span
                  className="text-[16px] font-black"
                  style={{
                    background: "linear-gradient(135deg,#C8941A,#8B6914)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  ₹799
                </span>
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold"
                  style={{ background: "#FEF3D0", color: "#C8941A" }}
                >
                  →
                </span>
              </div>
            </div>
          </div>

          {/* Pet Tag */}
          <div
            className="rounded-3xl overflow-hidden cursor-pointer bg-white transition-transform duration-300 hover:-translate-y-3 hover:scale-[1.04]"
            style={{
              width: 160,
              marginTop: 36,
              boxShadow:
                "0 12px 40px rgba(15,110,86,0.14), 0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <div
              className="py-2.5 text-center text-[9px] font-black tracking-widest uppercase text-white"
              style={{ background: "linear-gradient(135deg,#0F6E56,#1D9E75)" }}
            >
              Pet Tag
            </div>
            <div
              className="flex items-center justify-center overflow-hidden bg-[#fafafa]"
              style={{ height: 148 }}
            >
              <img
                src="/products/tag2.png"
                alt="Pet Tag"
                className="w-full h-full object-contain block"
              />
            </div>
            <div
              className="flex items-center justify-between px-3 py-2.5"
              style={{ borderTop: "1px solid #f0f0f0" }}
            >
              <span className="text-[15px] font-black" style={{ color: "#0F6E56" }}>
                ₹495
              </span>
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold"
                style={{ background: "#E1F5EE", color: "#0F6E56" }}
              >
                →
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Google Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      `}</style>

    </section>
  );
}
