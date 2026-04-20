"use client";

export default function Footer() {
  return (
    <footer id="Footer" className="bg-gray-950 text-white pt-16 pb-8 px-6">

      <div className="max-w-6xl mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-800">

          {/* Brand col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="12" height="12" rx="2" stroke="white" strokeWidth="1.5"/>
                  <path d="M5 8h6M8 5v6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="text-xl font-black tracking-widest text-white">
                Apeo
              </span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Smart QR vehicle tag for instant, 
              secure communication — no app, no hassle,
               just scan & connect.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {["Made in India", "Privacy Safe", "No App Needed"].map((b) => (
                <span
                  key={b}
                  className="text-xs bg-gray-800 text-gray-400 border border-gray-700 rounded-full px-3 py-1"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase text-white mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "How It Works", href: "#HowItWorks" },
                { label: "Pricing", href: "#pricing" },
                { label: "Login", href: "/login" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-gray-400 hover:text-blue-400 text-sm transition flex items-center gap-2"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase text-white mb-5">
              Contact Us
            </h4>

            <ul className="space-y-4">

              {/* Address */}
              <li className="flex gap-3">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1C4.8 1 3 2.8 3 5c0 3 4 8 4 8s4-5 4-8c0-2.2-1.8-4-4-4z" stroke="#60a5fa" strokeWidth="1.3"/>
                    <circle cx="7" cy="5" r="1.5" stroke="#60a5fa" strokeWidth="1.3"/>
                  </svg>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Office 3, Plot No.9<br/>
                  Sector 22, Panchkula<br/>
                  Haryana — 134109
                </p>
              </li>

              {/* Phone */}
              <li className="flex gap-3 items-center">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 2.5C2 2.5 3 1 4.5 1c.5 0 1 .5 1.5 1.5L7 4.5c.3.6.1 1.3-.4 1.7l-.6.5c.4.8 1.3 1.7 2.1 2.1l.5-.6c.4-.5 1.1-.7 1.7-.4l2 1c1 .5 1.5 1 1.5 1.5C13.8 11 12.5 13 11 13 6 13 1 8 1 3 1 1.5 2 2.5 2 2.5z" stroke="#60a5fa" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </div>
                <a
                  href="tel:+918146444549"
                  className="text-gray-400 hover:text-blue-400 text-sm transition"
                >
                  +91 81464 44549
                </a>
              </li>

              {/* Email */}
              <li className="flex gap-3 items-center">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="#60a5fa" strokeWidth="1.3"/>
                    <path d="M1 4l6 4 6-4" stroke="#60a5fa" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </div>
                <a
                  href="mailto:support@pinakainfra.in"
                  className="text-gray-400 hover:text-blue-400 text-sm transition"
                >
                  info@pinakainfra.in
                </a>
              </li>

            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Apeo. All Rights Reserved.
            Powered by Pinaka Infra
          </p>

          <div className="flex items-center gap-6">

  <a
    href="/privacy-policy"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-500 hover:text-blue-400 text-xs transition"
  >
    Privacy Policy
  </a>
  <a
    href="/terms-and-conditions"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-500 hover:text-blue-400 text-xs transition"
  >
     Terms of Service
  </a>

</div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-500">All systems operational</span>
          </div>

        </div>

      </div>

    </footer>
  );
}