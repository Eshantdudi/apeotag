"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2, Mail, ShieldCheck, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleLogin = async () => {
    if (!isValidEmail) {
      setError("Please enter a valid email address");
      return;
    }

    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `https://apeo.in/order`,
        },
      });

      if (error) throw error;

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to send login link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Trust badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-indigo-100 text-indigo-700 text-sm font-medium">
            <ShieldCheck size={18} /> Secure Magic Link Login
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100/80 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-8 text-white">
            <div className="flex items-center gap-3">
              <Mail size={28} className="opacity-90" />
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
                <p className="mt-2 text-indigo-100/90 text-sm">
                  Login with magic link — no password needed
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <span className="font-medium">!</span> {error}
              </div>
            )}

            {success ? (
              <div className="text-center space-y-6 py-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mx-auto">
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    Magic Link Sent!
                  </h3>
                  <p className="text-slate-600 mt-3">
                    Check your inbox ({email.trim()})<br />
                    Click the link to login securely.
                  </p>
                </div>
                <p className="text-sm text-slate-500">
                  Didn't receive it? Check spam folder or{" "}
                  <button
                    onClick={() => setSuccess(false)}
                    className="text-indigo-600 hover:text-indigo-800 font-medium underline"
                  >
                    try again
                  </button>
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <InputField
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  required
                  hint="We'll send a secure login link to this email"
                />

                <button
                  onClick={handleLogin}
                  disabled={loading || !isValidEmail}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-200/50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Sending Link...
                    </>
                  ) : (
                    <>
                      Send Magic Link <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-slate-500">
                  No account yet?{" "}
                  <a
                    href="/signup"
                    className="text-indigo-600 hover:text-indigo-800 font-medium underline"
                  >
                    Sign up here
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          © {new Date().getFullYear()} Apeo. All Rights Reserved.Powered by Pinaka Infra
        </p>
      </div>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  hint?: string;
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  hint,
}: InputFieldProps) {
  return (
    <div className="relative group">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
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