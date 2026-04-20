"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function StickyOrder() {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >

      {/* Tooltip bubble */}
      <div className="relative bg-white border border-gray-100 shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3 max-w-[220px]">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: '#EEEDFE' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2C5.8 2 4 3.8 4 6c0 3 4 8 4 8s4-5 4-8c0-2.2-1.8-4-4-4z" stroke="#3C3489" strokeWidth="1.3"/>
            <circle cx="8" cy="6" r="1.5" stroke="#3C3489" strokeWidth="1.2"/>
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-gray-800 leading-tight">
            Protect vehicles & Pets
          </p>
          <p className="text-xs text-gray-400 leading-tight mt-0.5">
            Just a scan away
          </p>
        </div>
        <div className="absolute -bottom-1.5 right-8 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45" />
      </div>

      {/* Main CTA button */}
      <div className="relative">

        {/* Pulse ring */}
        {pulse && (
          <>
            <span className="absolute inset-0 rounded-full opacity-30 animate-ping" style={{ background: '#7F77DD' }} />
            <span className="absolute inset-0 rounded-full opacity-20 animate-ping delay-150" style={{ background: '#AFA9EC' }} />
          </>
        )}

        <Link
          href="/login"
          className="relative flex items-center gap-3 text-white pl-4 pr-6 py-3.5 rounded-full shadow-2xl font-bold text-sm transition hover:scale-105 active:scale-95 hover:opacity-90"
          style={{ background: '#3C3489', boxShadow: '0 8px 30px #AFA9EC' }}
        >
          {/* Icon */}
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="2" stroke="white" strokeWidth="1.5"/>
              <path d="M5 8h6M8 5v6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="text-left">
            <p className="text-xs leading-none mb-0.5" style={{ color: '#CECBF6' }}>
              Order Now
            </p>
            <p className="text-base font-black leading-none">
              Feel Free
            </p>
          </div>

          {/* Arrow */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

        </Link>
      </div>

      {/* Small trust text */}
      <p className="text-xs text-gray-400 text-right mr-1">
        vehicles & Pet protected
      </p>

    </div>
  );
}