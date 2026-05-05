import Link from "next/link";

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-6 bg-white text-center">

      {/* Badge */}
      <span
        className="inline-block text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
        style={{ background: '#3C3489' }}
      >
        Pricing
      </span>

      <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
        Simple, One-Time Pricing
      </h2>
      <p className="text-gray-500 text-base mb-14">
        No subscription. No hidden charges. Pay once, use forever.
      </p>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* VEHICLE */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ border: '2px solid #3C3489' }}>
          <div className="py-3 px-6" style={{ background: '#3C3489' }}>
            <p className="text-white text-sm font-bold uppercase">Most Popular TAG</p>
          </div>
          <div className="p-8">
            <h3 className="text-xl font-extrabold text-gray-900 mb-1">Vehicle QR Tag</h3>
            <div className="text-5xl font-black mb-2" style={{ color: '#3C3489' }}>₹295</div>
            <ul className="text-left space-y-3 mb-8 text-sm text-gray-600">
              <li>✔ Instant owner contact</li>
              <li>✔ No app needed</li>
              <li>✔ Privacy protected</li>
              <li>✔ Lifetime validity</li>
              <li>✔ Tax-Inclusive Pricing</li>
            </ul>
            <Link
              href="/login"
              className="block w-full text-white font-bold py-3.5 rounded-xl transition hover:opacity-90"
              style={{ background: '#3C3489' }}
            >
              Order Now — ₹295
            </Link>
          </div>
        </div>

        {/* PRIME — Black & Gold */}
        <div
          className="rounded-2xl shadow-2xl overflow-hidden relative"
          style={{ background: 'linear-gradient(160deg, #1a1a1a 0%, #0d0d0d 70%, #1a1208 100%)', border: '2px solid #C8941A' }}
        >
          {/* Gold shimmer top line */}
          <div style={{ height: 3, background: 'linear-gradient(90deg, #8B6914, #FFE999, #D4A82A, #8B6914)' }} />

          {/* Header */}
          <div
            className="py-3 px-6"
            style={{ background: 'linear-gradient(90deg, #6B4F0F, #C8941A, #6B4F0F)' }}
          >
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#0d0d0d' }}>
              👑 Prime — Premium Tag
            </p>
          </div>

          <div className="p-8">
            <h3 className="text-xl font-extrabold mb-1" style={{ color: '#FFE580' }}>
              Prime Vehicle Tag
            </h3>
            <p className="text-xs mb-3 font-medium" style={{ color: '#C8941A' }}>
              Black &amp; Gold Hexagonal Sticker
            </p>

            <div className="text-5xl font-black mb-2" style={{ color: '#FFE580' }}>₹799</div>

            <ul className="text-left space-y-3 mb-8 text-sm" style={{ color: '#D4A82A' }}>
              <li>✦ Hexagonal premium design</li>
              <li>✦ Instant owner contact</li>
              <li>✦ No app needed</li>
              <li>✦ Lifetime validity</li>
              <li>✦ Tax-Inclusive Pricing</li>
            </ul>

            <Link
              href="/login"
              className="block w-full font-bold py-3.5 rounded-xl transition hover:opacity-90"
              style={{ background: 'linear-gradient(90deg, #8B6914, #D4A82A, #8B6914)', color: '#0d0d0d' }}
            >
              Order Now — ₹799
            </Link>
          </div>
        </div>

        {/* PET */}
        <div className="bg-white rounded-2xl border-2 border-amber-400 shadow-xl overflow-hidden">
          <div className="bg-amber-400 py-3 px-6">
            <p className="text-white text-sm font-bold uppercase">Smart Acrelic Tag</p>
          </div>
          <div className="p-8">
            <h3 className="text-xl font-extrabold text-gray-900 mb-1">Pet QR Tag</h3>
            <div className="text-5xl font-black text-amber-500 mb-2">₹495</div>
            <ul className="text-left space-y-3 mb-8 text-sm text-gray-600">
              <li>✔ Find lost pet instantly</li>
              <li>✔ No app needed</li>
              <li>✔ Lightweight, Acrelic Tag</li>
              <li>✔ Lifetime validity</li>
              <li>✔ Tax-Inclusive Pricing</li>
            </ul>
            <Link
              href="/login"
              className="block w-full bg-amber-400 hover:bg-amber-500 text-white font-bold py-3.5 rounded-xl transition"
            >
              Order Now — ₹495
            </Link>
          </div>
        </div>

      </div>

      {/* Trust pills */}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {[
          "Secure Payment",
          "Pan India Delivery",
          "Made in India",
          "Order Now. Feel Free",
        ].map((t) => (
          <span
            key={t}
            className="rounded-full px-4 py-1.5 text-xs font-medium"
            style={{ background: '#EEEDFE', border: '1px solid #CECBF6', color: '#3C3489' }}
          >
            {t}
          </span>
        ))}
      </div>

    </section>
  );
}
