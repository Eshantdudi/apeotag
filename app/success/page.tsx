"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { CheckCircle2, ArrowRight, Tag, Calendar } from "lucide-react";

function SuccessContent() {
  const params = useSearchParams();

  const tagId = params.get("tag_id") || params.get("tag") || "N/A";
  const orderId = params.get("order_id") || "N/A";

  const [show, setShow] = useState(false);

  const date = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f8f6] flex items-center justify-center p-4">

      <div
        className="w-full max-w-md transition-all duration-700"
        style={{
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(20px)",
        }}
      >

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-400 px-6 pt-10 pb-8 text-center">

            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>

            <h1 className="text-white font-bold text-2xl">
              Payment Successful 🎉
            </h1>

            <p className="text-green-100 text-sm mt-1">
             Your tag is now active.To track your order, please check your login account.
            
              </p>
          </div>

          {/* DETAILS */}
          <div className="px-6 py-6 space-y-4">

            <Row icon={<Tag size={14} />} label="Tag ID" value={tagId} />
            <Row icon={<Calendar size={14} />} label="Date" value={date} />
            <Row icon={null} label="Order ID" value={orderId} />

          </div>

          {/* BUTTON */}
          <div className="px-6 pb-6">
            <a
              href="/"
              className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-2xl py-3 text-sm font-medium"
            >
              Back to Home
              <ArrowRight size={14} />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode | null;
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between text-sm">
      <span className="flex items-center gap-2 text-gray-400">
        {icon} {label}
      </span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}