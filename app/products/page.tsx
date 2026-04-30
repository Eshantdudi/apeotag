"use client";

import Link from "next/link";
import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  badgeType?: "purple" | "amber";
  image: string;
  category: "vehicle" | "pet";
  features: string[];
  popular?: boolean;
};

const products: Product[] = [
  {
    id: 1,
    name: "Black Elite Vehicle Tag",
    price: 295,
    originalPrice: 399,
    badge: "Best Seller",
    badgeType: "purple",
    image: "/products/tag1.png",
    category: "vehicle",
    features: ["Call & Message", "Emergency Alert", "Live Location"],
    popular: true,
  },
  {
    id: 2,
    name: "Iron Tech Vehicle Tag",
    price: 275,
    originalPrice: 349,
    emoji: "🏍️",
    category: "vehicle",
    features: ["Call & Message", "Emergency Alert", "Scratch Proof"],
  },
  {
    id: 3,
    name: "Captain Shield Tag",
    price: 265,
    emoji: "🛡️",
    category: "vehicle",
    features: ["Call & Message", "Emergency Alert", "Waterproof"],
  },
  {
    id: 4,
    name: "India Smart Tag",
    price: 249,
    emoji: "🇮🇳",
    category: "vehicle",
    features: ["Call & Message", "Emergency Alert", "UV Resistant"],
  },
  {
    id: 5,
    name: "Pet QR Tag – Standard",
    price: 495,
    originalPrice: 599,
    badge: "New",
    badgeType: "amber",
    emoji: "🐶",
    category: "pet",
    features: ["Find Owner", "Call & Message", "Pet Profile"],
  },
  {
    id: 6,
    name: "Pet QR Tag – Premium",
    price: 695,
    emoji: "🐱",
    category: "pet",
    features: ["Find Owner", "Call & Message", "Medical Info", "GPS Trace"],
  },
];

const FILTERS = [
  { key: "all", label: "All Tags" },
  { key: "vehicle", label: "🚗 Vehicle" },
  { key: "pet", label: "🐾 Pet" },
];

export default function ProductsPage() {
  const [filter, setFilter] = useState("all");
  const [addedId, setAddedId] = useState<number | null>(null);

  const visible =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  const handleBuy = (id: number) => {
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%,100% { opacity:1; } 50% { opacity:.4; }
        }
.prod-card:hover img {
  transform: scale(1.18) translateY(-6px);
}      .prod-card {
       width: 400px;
        border-radius: 22px;
          background: #fff;
          border-radius: 20px;
          border: 1.5px solid #EEEDFE;
          padding: 1rem;
          position: relative;
          transition: transform 0.22s, box-shadow 0.22s, border-color 0.22s;
          animation: fadeUp 0.4s ease both;
        }
        .prod-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(60,52,137,0.13);
          border-color: #7F77DD;
        }
        .prod-card.popular {
          border-color: #534AB7;
          box-shadow: 0 8px 32px rgba(60,52,137,0.12);
        }
        .buy-btn {
          width: 100%;
          padding: 0.72rem;
          border-radius: 12px;
          border: none;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.28s, transform 0.15s, opacity 0.15s;
          font-family: inherit;
          letter-spacing: 0.01em;
        }
        .buy-btn:hover { opacity: 0.88; transform: scale(0.98); }
        .filter-pill {
          padding: 0.38rem 1.1rem;
          border-radius: 999px;
          border: 1.5px solid #CECBF6;
          font-size: 0.83rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.18s;
          background: transparent;
          color: #534AB7;
          font-family: inherit;
        }
        .filter-pill.active {
          background: #3C3489;
          border-color: #3C3489;
          color: #fff;
        }
        .filter-pill:hover:not(.active) { background: #EEEDFE; }
        .nav-link {
          font-size: 0.875rem;
          font-weight: 500;
          color: #4b5563;
          text-decoration: none;
          padding-bottom: 2px;
          border-bottom: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s;
        }
        .nav-link:hover { color: #3C3489; }
        .nav-link.active { color: #3C3489; border-bottom-color: #3C3489; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f7f6ff" }}>

        {/* ── NAVBAR — matches your Apeo navbar exactly ── */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid #e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}>
          <div style={{
            maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem",
            height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>

            {/* Logo — same as your Navbar.tsx */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, background: "#3C3489", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="6.5" stroke="#EEEDFE" strokeWidth="1.4"/>
                  <path d="M6.5 12L9 6.5L11.5 12" stroke="#EEEDFE" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="7.2" y1="10.2" x2="10.8" y2="10.2" stroke="#EEEDFE" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
              <span style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 800, letterSpacing: "-0.5px", lineHeight: 1 }}>
                <span style={{ color: "#3C3489" }}>Ap</span>
                <span style={{ color: "#0F6E56" }}>eo</span>
              </span>
              <div style={{ width: 5, height: 5, background: "#7F77DD", borderRadius: "50%", marginBottom: 12, flexShrink: 0 }} />
            </Link>

            {/* Desktop nav links */}
            <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              {[
                { label: "Home",         href: "/" },
                { label: "How It Works", href: "/#HowItWorks" },
                { label: "Products",     href: "/products", active: true },
                { label: "Pricing",      href: "/#pricing" },
                { label: "Contact Us",   href: "/#Footer" },
              ].map((l) => (
                <Link key={l.label} href={l.href} className={`nav-link${l.active ? " active" : ""}`}>
                  {l.label}
                </Link>
              ))}
            </div>

            <Link href="/login" style={{
              fontSize: "0.875rem", fontWeight: 700,
              color: "#3C3489", textDecoration: "none",
            }}>
              Register For TAG
            </Link>
          </div>
        </nav>

        {/* ── PAGE HEADER ── */}
        <div style={{
          background: "#ffffff", borderBottom: "1px solid #EEEDFE",
          padding: "3.5rem 1.5rem 2.5rem", position: "relative", overflow: "hidden",
        }}>
          {/* decorative blobs — same as your Hero.tsx */}
          <div style={{
            position: "absolute", top: -70, right: -70, width: 320, height: 320,
            borderRadius: "50%", background: "#EEEDFE", opacity: 0.65, pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", bottom: -50, left: -50, width: 200, height: 200,
            borderRadius: "50%", background: "#E1F5EE", opacity: 0.5, pointerEvents: "none",
          }} />

          <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "1.2rem" }}>
              <Link href="/" style={{ fontSize: "0.8rem", color: "#9CA3AF", textDecoration: "none" }}>Home</Link>
              <span style={{ fontSize: "0.8rem", color: "#9CA3AF" }}>/</span>
              <span style={{ fontSize: "0.8rem", color: "#3C3489", fontWeight: 600 }}>Products</span>
            </div>

            {/* Animated pill — same style as Hero.tsx badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#EEEDFE", border: "1px solid #CECBF6",
              borderRadius: 999, padding: "0.35rem 1rem", marginBottom: "1rem",
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%", background: "#7F77DD",
                display: "inline-block", animation: "pulse 2s infinite",
              }} />
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#3C3489", letterSpacing: "0.04em" }}>
                SMART QR PROTECTION
              </span>
            </div>

            <h1 style={{
              fontFamily: "Georgia, serif", fontWeight: 800,
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#1a1a2e",
              lineHeight: 1.15, marginBottom: "0.7rem",
            }}>
              Our Smart Tags
            </h1>
            <p style={{ color: "#6b7280", fontSize: "1rem", maxWidth: 460, lineHeight: 1.65 }}>
              Stick. Scan. Connect. No app needed — your number always stays private.
            </p>
          </div>
        </div>

        {/* ── FILTER BAR ── */}
        <div style={{
          background: "#fff", borderBottom: "1px solid #EEEDFE", padding: "0.9rem 1.5rem",
        }}>
          <div style={{
            maxWidth: 1100, margin: "0 auto",
            display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap",
          }}>
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={`filter-pill${filter === f.key ? " active" : ""}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
            <span style={{ marginLeft: "auto", fontSize: "0.8rem", color: "#9ca3af" }}>
              {visible.length} item{visible.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* ── PRODUCT GRID ── */}
        <div style={{ maxWidth: 1500, margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
            gap: "1.4rem",
          }}>
      {visible.map((product, i) => (
  <div
    key={product.id}
    className="prod-card"
    style={{
      animationDelay: `${i * 0.06}s`,
      overflow: "hidden",
      padding: "0",
      borderRadius: "20px",
    }}
  >
    {/* IMAGE AREA (BIGGER + PREMIUM) */}
    <div style={{
      height: 220,
      background: product.category === "pet"
        ? "linear-gradient(135deg,#e6fff4,#f8fffb)"
        : "linear-gradient(135deg,#f1efff,#fafaff)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    }}>
      
      {/* soft glow */}
      <div style={{
        position: "absolute",
        width: 200,
        height: 200,
        background: product.category === "pet" ? "#22c55e" : "#7c3aed",
        opacity: 0.15,
        borderRadius: "50%",
        filter: "blur(60px)",
      }} />

      <img
        src={product.image}
        alt={product.name}
        style={{
          height: "200px",
          objectFit: "contain",
          zIndex: 2,
          transition: "transform 0.35s ease",
        }}
      />
    </div>

    {/* CONTENT */}
    <div style={{ padding: "1.2rem" }}>
      
      {/* category */}
      <span style={{
        fontSize: "0.7rem",
        fontWeight: 700,
        color: product.category === "pet" ? "#0F6E56" : "#3C3489",
        background: product.category === "pet" ? "#E1F5EE" : "#EEEDFE",
        padding: "3px 8px",
        borderRadius: "999px",
      }}>
        {product.category}
      </span>

      {/* title */}
      <h2 style={{
        fontSize: "1.05rem",
        fontWeight: 700,
        marginTop: "8px",
        marginBottom: "6px",
        color: "#1a1a2e",
      }}>
        {product.name}
      </h2>

      {/* features */}
      <div style={{ marginBottom: "10px" }}>
        {product.features.map((f) => (
          <div key={f} style={{
            fontSize: "0.78rem",
            color: "#6b7280",
          }}>
            • {f}
          </div>
        ))}
      </div>

      {/* price */}
      <div style={{ marginBottom: "10px" }}>
        <span style={{
          fontSize: "1.4rem",
          fontWeight: 800,
          color: "#3C3489",
        }}>
          ₹{product.price}
        </span>

        {product.originalPrice && (
          <span style={{
            marginLeft: 8,
            textDecoration: "line-through",
            color: "#9ca3af",
            fontSize: "0.85rem",
          }}>
            ₹{product.originalPrice}
          </span>
        )}
      </div>

      {/* button */}
      <button
        onClick={() => handleBuy(product.id)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "10px",
          border: "none",
          background: "#3C3489",
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
          transition: "0.25s",
        }}
      >
        {addedId === product.id ? "Added ✓" : "Buy Now"}
      </button>
    </div>
  </div>
))}
          </div>
        </div>

        {/* ── FOOTER STRIP ── */}
        <div style={{
          background: "#3C3489", color: "#CECBF6",
          padding: "1.1rem 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "1rem", fontSize: "0.82rem",
        }}>
          <Link href="/" style={{ color: "#fff", fontWeight: 700, textDecoration: "none" }}>
            ← Back to Home
          </Link>
          <span style={{ opacity: 0.3 }}>|</span>
          <span>© 2025 Apeo · Smart QR Tags</span>
        </div>

      </div>
    </>
  );
}