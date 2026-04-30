"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Initial user check
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoadingUser(false);
    });

    // Listen for login/logout changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const initials = user?.email?.slice(0, 2).toUpperCase() || "U";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 no-underline">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: '#3C3489' }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="6.5" stroke="#EEEDFE" strokeWidth="1.4"/>
              <path d="M6.5 12L9 6.5L11.5 12" stroke="#EEEDFE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="7.2" y1="10.2" x2="10.8" y2="10.2" stroke="#EEEDFE" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1 }}>
            <span style={{ color: '#3C3489' }}>Ap</span>
            <span style={{ color: '#0F6E56' }}>eo</span>
          </span>
          <div style={{ width: '5px', height: '5px', background: '#7F77DD', borderRadius: '50%', marginBottom: '12px', flexShrink: 0 }} />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Home",         href: "/" },
            { label: "How It Works", href: "#HowItWorks" },
            { label: "Pricing",      href: "#pricing" },
            { label: "Contact Us",   href: "#Footer" },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA — user profile ya register */}
        <div className="hidden md:flex items-center gap-3">
          {!loadingUser && (
            user ? (
              // ✅ Logged in — avatar + My Account button
              <button
                onClick={() => router.push("/account")}
                className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-semibold px-3 py-1.5 rounded-full transition-colors"
              >
                {/* Avatar circle with initials */}
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {initials}
                </div>
                My Account
              </button>
            ) : (
              // ❌ Not logged in — register link
             <Link
  href={user ? "/account" : "/login"}
  className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition"
>
  {user ? "My Account" : "Register For TAG"}
</Link>
            )
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 bg-gray-800 transition-all duration-300 ${open ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
          <span className={`block h-0.5 bg-gray-800 transition-all duration-300 ${open ? "opacity-0 w-0" : "w-4"}`} />
          <span className={`block h-0.5 bg-gray-800 transition-all duration-300 ${open ? "w-6 -rotate-45 -translate-y-2" : "w-6"}`} />
        </button>

      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96 border-t border-gray-100" : "max-h-0"}`}>
        <div className="px-6 py-4 flex flex-col gap-4 bg-white">
          {[
            { label: "Home",         href: "/"           },
            { label: "How It Works", href: "#HowItWorks" },
            { label: "Products",     href: "/products"   },
            { label: "Pricing",      href: "#pricing"    },
            { label: "Contact Us",   href: "#Footer"     },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition py-1"
            >
              {l.label}
            </Link>
          ))}

          {/* Mobile — user profile ya login */}
          {!loadingUser && (
            user ? (
              // ✅ Logged in — My Account button
              <button
                onClick={() => { setOpen(false); router.push("/account"); }}
                className="flex items-center gap-2.5 bg-indigo-50 text-indigo-700 text-sm font-semibold px-4 py-3 rounded-xl transition mt-1 w-full"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {initials}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-indigo-800 leading-tight">My Account</p>
                  <p className="text-xs text-indigo-400 truncate max-w-[180px]">{user.email}</p>
                </div>
              </button>
            ) : (
              // ❌ Not logged in — login + order button
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition py-1"
                >
                  Login
                </Link>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-3 rounded-xl transition mt-1"
                >
                  Order Tag
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </>
            )
          )}
        </div>
      </div>

    </nav>
  );
}
