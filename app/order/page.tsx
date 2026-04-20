"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck, ArrowRight } from "lucide-react";

export default function OrderPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/login?redirect=/order");
      }
    };
    checkUser();
  }, [router]);

  const isFormValid = 
    (name ?? "").trim().length >= 2 &&
    /^\d{10}$/.test((phone ?? "").trim()); // Indian 10-digit phone

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const tagId = `PKT${Date.now().toString().slice(-10)}`;

      const { error: insertError } = await supabase
        .from("orders")
        .insert([
          {
            name: (name ?? "").trim(),
            phone: (phone ?? "").trim(),
            tag_id: tagId,
            created_at: new Date().toISOString(),
          },
        ]);

      if (insertError) throw insertError;

      // Success → redirect to registration with tag
      window.location.href = `/register?tag=${tagId}`;
      // or use router.push if you want client-side navigation
      // router.push(`/register?tag=${tagId}`);

    } catch (err: any) {
      setError(err.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Trust badge / mini header */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-indigo-100 text-indigo-700 text-sm font-medium">
            <ShieldCheck size={18} /> Secure & Instant Order
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100/80 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-7 text-white">
            <h1 className="text-2xl font-bold tracking-tight">Order Your Tag</h1>
            <p className="mt-2 text-indigo-100/90 text-sm">
              Get your smart QR tag delivered in days
            </p>
          </div>

          <form onSubmit={handleOrder} className="p-8 space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <span className="font-medium">!</span> {error}
              </div>
            )}

            <div className="space-y-6">
              <InputField
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />

              <InputField
                label="Phone Number"
                value={phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, ""); // only digits
                  setPhone(val.slice(0, 10));
                }}
                placeholder="9876543210"
                maxLength={10}
                required
                type="tel"
                hint="10-digit Indian mobile number"
              />
            </div>

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-200/50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                <>
                  Order Tag Now <ArrowRight size={18} />
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500">
               • Instant tag generation • Secure Online Payments Only
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  maxLength?: number;
  required?: boolean;
  type?: string;
  hint?: string;
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  required = false,
  type = "text",
  hint,
}: InputFieldProps) {
  return (
    <div className="relative group">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        maxLength={maxLength}
        required={required}
        className="peer w-full px-4 pt-7 pb-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-400/30 transition-all bg-white/70 hover:bg-white shadow-sm hover:shadow"
      />
      <label className="absolute left-4 top-2.5 text-xs text-slate-500 font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-indigo-600 pointer-events-none">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {hint && (
        <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
      )}
    </div>
  );
}