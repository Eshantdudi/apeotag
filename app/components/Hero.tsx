"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden py-24 px-6">

      {/* Background decorative circles */}
      <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full opacity-60 pointer-events-none" style={{ background: '#EEEDFE' }} />
      <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full opacity-40 pointer-events-none" style={{ background: '#CECBF6' }} />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div>

          <div className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 mb-6" style={{ background: '#EEEDFE', borderColor: '#CECBF6' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#7F77DD' }} />
            <span className="text-xs font-semibold" style={{ color: '#3C3489' }}>
              Smart QR Protection
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
            Smart QR Tag <br />
            <span style={{ color: '#3C3489' }}>For Vehicles & Pets</span><br />
            <span className="text-gray-400 text-4xl font-bold">You Love</span>
          </h1>

          <p className="text-gray-500 text-lg mb-8 max-w-md">
            Anyone can scan the QR tag on your vehicle or pet and instantly
            contact you — no app needed, phone number always private.
          </p>

          <div className="flex gap-4 mb-10">
            <Link
              href="/login"
              className="text-white px-8 py-4 rounded-xl font-bold transition hover:opacity-90"
              style={{ background: '#3C3489' }}
            >
              Order Now
            </Link>
            <a
              href="#HowItWorks"
              className="font-semibold flex items-center gap-2 transition text-[#534AB7] hover:text-[#3C3489]"
            >
              See how it works ↓
            </a>
          </div>

          <div className="flex gap-6 text-sm text-gray-500">
            <span>🔒 Protect Your Vehicle & Pet</span>
            <span>✅ No App Needed</span>
            <span>⚡ Lightning Fast Results</span>
          </div>

        </div>

        {/* RIGHT - 3 Tag Cards */}
        <div className="flex justify-center md:justify-end items-start gap-4 pt-5">

          {/* VEHICLE TAG */}
          <div
            className="w-70 rounded-2xl overflow-hidden cursor-pointer"
            style={{
              boxShadow: '0 8px 32px rgba(60,52,137,0.13)',
              border: '2px solid transparent',
              animation: 'slideIn 0.6s cubic-bezier(.34,1.56,.64,1) forwards, glowBlue 3s 0.8s infinite',
              opacity: 0,
              transition: 'transform 0.35s cubic-bezier(.34,1.56,.64,1)',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px) scale(1.04) rotate(-1.5deg)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
          >
            <div className="text-center text-xs font-bold py-1.5 tracking-wide text-white" style={{ background: '#3C3489' }}>
              VEHICLE TAG
            </div>
            <img src="/products/tag3.png" alt="Vehicle QR Tag" className="w-full block" />
          </div>

          {/* PRIME TAG — Black & Gold, center, slightly taller */}
          <div
            className="w-70 rounded-2xl overflow-hidden cursor-pointer mt-[-12px]"
            style={{
              background: 'linear-gradient(160deg, #1a1a1a 0%, #0d0d0d 70%, #1a1208 100%)',
              border: '2px solid #C8941A',
              boxShadow: '0 8px 40px rgba(200,148,26,0.25), 0 2px 8px rgba(0,0,0,0.4)',
              animation: 'slideIn 0.6s cubic-bezier(.34,1.56,.64,1) 0.09s forwards, glowGold 3s 0.9s infinite',
              opacity: 0,
              transition: 'transform 0.35s cubic-bezier(.34,1.56,.64,1)',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px) scale(1.06)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
          >
            {/* Gold shimmer top line */}
            <div style={{ height: 2, background: 'linear-gradient(90deg,#8B6914,#FFE999,#D4A82A,#8B6914)' }} />
            <div
              className="text-center text-xs font-bold py-1.5 tracking-widest"
              style={{ background: 'linear-gradient(90deg,#6B4F0F,#C8941A,#6B4F0F)', color: '#0d0d0d' }}
            >
              👑 PRIME TAG
            </div>
            <img src="/products/tag4.png" alt="Prime QR Tag" className="w-full block" />
            {/* Gold bottom badge */}
            <div
              className="text-center text-[10px] font-bold py-1 tracking-wider"
              style={{ background: '#0d0d0d', color: '#C8941A', borderTop: '1px solid #8B6914' }}
            >
              BLACK &amp; GOLD
            </div>
          </div>

          {/* PET TAG */}
          <div
            className="w-70 rounded-2xl overflow-hidden cursor-pointer mt-8"
            style={{
              boxShadow: '0 8px 32px rgba(15,110,86,0.12)',
              border: '2px solid transparent',
              animation: 'slideIn 0.6s cubic-bezier(.34,1.56,.64,1) 0.18s forwards, glowGreen 3s 1s infinite',
              opacity: 0,
              transition: 'transform 0.35s cubic-bezier(.34,1.56,.64,1)',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px) scale(1.04) rotate(1.5deg)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
          >
            <div className="text-center text-xs font-bold py-1.5 tracking-wide text-white" style={{ background: '#0F6E56' }}>
              PET TAG
            </div>
            <img src="/products/tag2.png" alt="Pet QR Tag" className="w-full block" />
          </div>

        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(32px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes glowBlue {
          0%, 100% { box-shadow: 0 8px 32px rgba(60,52,137,0.13); }
          50%       { box-shadow: 0 8px 40px rgba(60,52,137,0.28); }
        }
        @keyframes glowGreen {
          0%, 100% { box-shadow: 0 8px 32px rgba(15,110,86,0.12); }
          50%       { box-shadow: 0 8px 40px rgba(15,110,86,0.26); }
        }
        @keyframes glowGold {
          0%, 100% { box-shadow: 0 8px 40px rgba(200,148,26,0.25), 0 2px 8px rgba(0,0,0,0.4); }
          50%       { box-shadow: 0 8px 56px rgba(200,148,26,0.50), 0 2px 8px rgba(0,0,0,0.4); }
        }
      `}</style>

    </section>
  );
}
