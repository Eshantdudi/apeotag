"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, ArrowRight, Tag, Calendar, Hash } from "lucide-react";

export default function SuccessPage() {
  const params = useSearchParams();
  const tagId = params.get("tag_id") || params.get("tag") || "N/A";
  const orderId = params.get("order_id") || "N/A";

  const [show, setShow] = useState(false);
  const date = new Date().toLocaleDateString("en-IN", {
    day: "2-digit", month: "long", year: "numeric"
  });

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f8f6] flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-green-100 opacity-40 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-gray-200 opacity-50 blur-3xl" />
      </div>

      <div
        className="relative w-full max-w-md"
        style={{
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Success card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Top green strip */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-400 px-6 pt-10 pb-8 text-center relative">
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
            {/* Checkmark circle */}
            <div
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
              style={{
                animation: show ? "pop 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both" : "none",
              }}
            >
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <h1 className="text-white font-bold text-2xl tracking-tight">Payment Successful!</h1>
            <p className="text-green-100 text-sm mt-1">Your tag has been registered</p>
          </div>

          {/* Order details */}
          <div className="px-6 py-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Order Details</p>

            <div className="space-y-3">
              <DetailRow
                icon={<Tag size={14} />}
                label="Tag ID"
                value={tagId}
                mono
              />
             
              <DetailRow
                icon={<Calendar size={14} />}
                label="Date"
                value={date}
              />
            </div>

            {/* Divider */}
            <div className="border-t border-dashed border-gray-200 my-5" />

            {/* Amount */}
            <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3">
              <span className="text-sm text-gray-500">Amount Paid</span>
           
            </div>

            {/* Back home */}
            <a
              href="/"
              className="w-full mt-4 border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 rounded-2xl py-3 text-sm font-medium flex items-center justify-center gap-2 transition-all duration-150"
            >
              Back to Home
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Bottom brand */}
          <div className="px-6 pb-5 text-center">
            <p className="text-xs text-gray-300 tracking-widest uppercase">© 2026 Apeo. All Rights Reserved. Powered by Pinaka Infra</p>
          </div>
        </div>

        {/* Confetti-style dots */}
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-green-400 rounded-full opacity-70" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-amber-400 rounded-full opacity-70" />
        <div className="absolute top-1/2 -right-4 w-3 h-3 bg-gray-400 rounded-full opacity-40" />
      </div>

      <style>{`
        @keyframes pop {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function DetailRow({
  icon, label, value, mono = false
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-gray-400 text-xs">
        {icon}
        <span>{label}</span>
      </div>
      <span className={`text-sm font-medium text-gray-800 ${mono ? "font-mono" : ""}`}>
        {value}
      </span>
    </div>
  );
}
