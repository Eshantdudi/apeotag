"use client";

import { useState } from "react";

type ColorTheme = "purple" | "green";

const themes = {
  purple: {
    bg: "rgba(83,74,183,0.15)",
    bgHover: "rgba(83,74,183,0.28)",
    border: "rgba(127,119,221,0.35)",
    borderHover: "rgba(175,169,236,0.6)",
    text: "#AFA9EC",
    textHover: "#CECBF6",
    glow: "rgba(127,119,221,0.4)",
    pulse: "#7F77DD",
    loadingBg: "rgba(83,74,183,0.25)",
  },
  green: {
    bg: "rgba(15,110,86,0.15)",
    bgHover: "rgba(15,110,86,0.28)",
    border: "rgba(29,158,117,0.35)",
    borderHover: "rgba(93,202,165,0.6)",
    text: "#5DCAA5",
    textHover: "#9FE1CB",
    glow: "rgba(29,158,117,0.4)",
    pulse: "#1D9E75",
    loadingBg: "rgba(15,110,86,0.25)",
  },
};

export default function LocationButton({ color = "purple" }: { color?: ColorTheme }) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const t = themes[color];

  function handleLocation() {
    if (!navigator.geolocation) {
      alert("Location not supported on this device.");
      return;
    }
    setState("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setState("done");
        setTimeout(() => setState("idle"), 2000);
        window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
      },
      () => {
        setState("idle");
        alert("Could not get location. Please enable location access.");
      }
    );
  }

  return (
    <>
      <style>{`
        @keyframes pinaka-ping {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes pinaka-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pinaka-pop {
          0% { transform: scale(0.92); }
          60% { transform: scale(1.04); }
          100% { transform: scale(1); }
        }
        .pinaka-loc-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 14px 0;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.02em;
          cursor: pointer;
          border: 1px solid ${t.border};
          background: ${t.bg};
          color: ${t.text};
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s;
          overflow: hidden;
          font-family: inherit;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .pinaka-loc-btn:hover:not(:disabled) {
          background: ${t.bgHover};
          border-color: ${t.borderHover};
          color: ${t.textHover};
          transform: translateY(-1px);
        }
        .pinaka-loc-btn:active:not(:disabled) {
          transform: scale(0.98) translateY(0);
        }
        .pinaka-loc-btn:disabled {
          cursor: default;
        }
        .pinaka-loc-btn.done {
          animation: pinaka-pop 0.3s ease;
        }
        .pinaka-ping-ring {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: ${t.pulse};
          animation: pinaka-ping 1s ease-out infinite;
          pointer-events: none;
        }
        .pinaka-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid ${t.border};
          border-top-color: ${t.text};
          border-radius: 50%;
          animation: pinaka-spin 0.7s linear infinite;
          flex-shrink: 0;
        }
      `}</style>

      <button
        onClick={handleLocation}
        disabled={state === "loading"}
        className={`pinaka-loc-btn${state === "done" ? " done" : ""}`}
      >
        {state === "loading" && <span className="pinaka-ping-ring" />}

        {state === "idle" && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="2.5"/>
          </svg>
        )}

        {state === "loading" && <span className="pinaka-spinner" />}

        {state === "done" && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        )}

        <span>
          {state === "idle" && "Share My Location"}
          {state === "loading" && "Getting location…"}
          {state === "done" && "Location shared!"}
        </span>
      </button>
    </>
  );
}
