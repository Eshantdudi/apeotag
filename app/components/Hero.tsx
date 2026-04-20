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

            {/* ✅ FIXED LINK */}
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

        {/* RIGHT */}
        <div className="flex justify-center md:justify-end gap-4">

          {/* VEHICLE CARD */}
          <div className="w-[160px] bg-white rounded-2xl shadow-xl border p-4 text-center relative">

            <div className="text-white text-sm font-bold py-2 rounded-lg mb-3" style={{ background: '#3C3489' }}>
              VEHICLE TAG
            </div>

            <div className="w-24 h-24 mx-auto mb-3 rounded-lg flex items-center justify-center" style={{ background: '#EEEDFE' }}>
              QR
            </div>

            <p className="text-xs mb-2">Scan to Contact</p>

            <div className="space-y-1 text-[10px]">
              <div className="bg-green-500 text-white py-1 rounded">Call</div>
              <div className="bg-green-400 text-white py-1 rounded">Message</div>
              <div className="bg-red-500 text-white py-1 rounded">Emergency</div>
            </div>

            <div className="absolute -top-3 -right-3 text-white text-xs px-2 py-1 rounded-full" style={{ background: '#3C3489' }}>
              ₹295
            </div>

          </div>

          {/* PET CARD */}
          <div className="w-[160px] bg-white rounded-2xl shadow-xl border p-4 text-center relative mt-8">

            <div className="bg-amber-500 text-white text-sm font-bold py-2 rounded-lg mb-3">
              PET TAG
            </div>

            <div className="w-24 h-24 bg-amber-100 mx-auto mb-3 rounded-lg flex items-center justify-center">
              🐶
            </div>

            <p className="text-xs mb-2">Find Owner</p>

            <div className="space-y-1 text-[10px]">
              <div className="bg-green-500 text-white py-1 rounded">Call</div>
              <div className="bg-green-400 text-white py-1 rounded">Message</div>
              <div className="bg-amber-500 text-white py-1 rounded">Profile</div>
            </div>

            <div className="absolute -top-3 -right-3 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
              ₹495
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}