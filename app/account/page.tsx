"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import {
  User, Package, LogOut, Clock,
  IndianRupee, Home, ChevronRight,
  MapPin, CheckCircle2, Circle
} from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/login");
        return;
      }
      setUser(user);
     // Pehle orders fetch karo
const { data: ordersData } = await supabase
  .from("orders")
  .select("*")
  .eq("user_id", user.id)
  .order("created_at", { ascending: false });

setOrders(ordersData || []);
setLoading(false);

// ✅ Real-time — admin status change kare toh user ko turant dikhe
const channel = supabase
  .channel("orders-realtime")
  .on(
    "postgres_changes",
    {
      event: "UPDATE",
      schema: "public",
      table: "orders",
      filter: `user_id=eq.${user.id}`, // sirf is user ke orders
    },
    (payload) => {
      // Sirf woh order update karo jo change hua
      setOrders((prev) =>
        prev.map((o) =>
          o.id === payload.new.id ? { ...o, ...payload.new } : o
        )
      );
    }
  )
  .subscribe();

// Cleanup — jab user page se chala jaye
return () => {
  supabase.removeChannel(channel);
};
    };
    init();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600" />
        <p className="text-sm text-gray-400 animate-pulse">Loading your account...</p>
      </div>
    );
  }

  const initials = user?.email?.slice(0, 2).toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40">

      {/* Top Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3.5 flex items-center justify-between">
          {/* Back to Home Button */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors bg-gray-100 hover:bg-indigo-50 px-3 py-1.5 rounded-full"
          >
            <Home size={15} />
            Home
          </button>

          <span className="font-semibold text-gray-800 text-sm">My Account</span>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">

        {/* Profile Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl p-5 text-white shadow-lg shadow-indigo-200/50">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold text-white border border-white/30">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-lg leading-tight">
                {user?.user_metadata?.full_name || "Welcome!"}
              </p>
              <p className="text-indigo-100 text-sm truncate mt-0.5">{user?.email}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="bg-white/20 text-white text-xs px-2.5 py-0.5 rounded-full">
                  Member since {new Date(user?.created_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                </span>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-2 gap-3">
            <div className="bg-white/15 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold">{orders.length}</p>
              <p className="text-xs text-indigo-100 mt-0.5">Total Orders</p>
            </div>
            <div className="bg-white/15 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold">
                {orders.filter(o => o.status === "delivered").length}
              </p>
              <p className="text-xs text-indigo-100 mt-0.5">Delivered</p>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Package size={16} className="text-indigo-600" />
              </div>
              <h2 className="font-semibold text-gray-900">My Orders</h2>
            </div>
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full font-medium">
              {orders.length} total
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center shadow-sm">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Package size={28} className="text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium">There are no orders yet.</p>
              <p className="text-gray-400 text-sm mt-1">Order your first smart tag now!</p>
              <button
                onClick={() => router.push("/order")}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1.5"
              >
                Order Now <ChevronRight size={15} />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>

        {/* Place New Order Button */}
        {orders.length > 0 && (
          <button
            onClick={() => router.push("/order")}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3.5 rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200/50"
          >
            <Package size={18} />
            Buy Again.
          </button>
        )}

      </div>
    </div>
  );
}

function OrderCard({ order }: { order: any }) {
  const statusConfig: Record<string, { color: string; bg: string; label: string; icon: string }> = {
    pending:   { color: "text-amber-700",  bg: "bg-amber-50 border-amber-200",   label: "Pending",   icon: "⏳" },
    confirmed: { color: "text-blue-700",   bg: "bg-blue-50 border-blue-200",     label: "Confirmed", icon: "✅" },
    shipped:   { color: "text-purple-700", bg: "bg-purple-50 border-purple-200", label: "Shipped",   icon: "🚚" },
    delivered: { color: "text-green-700",  bg: "bg-green-50 border-green-200",   label: "Delivered", icon: "📦" },
    cancelled: { color: "text-red-700",    bg: "bg-red-50 border-red-200",       label: "Cancelled", icon: "❌" },
  };

  const steps = [
    { key: "pending",   label: "Placed" },
    { key: "confirmed", label: "Confirmed" },
    { key: "shipped",   label: "Shipped" },
    { key: "delivered", label: "Delivered" },
  ];

  const currentStep = steps.findIndex(s => s.key === order.status);
  const config = statusConfig[order.status] || statusConfig.pending;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">

      {/* Card Top Color Strip */}
      <div className={`h-1 w-full ${
        order.status === "delivered" ? "bg-green-400" :
        order.status === "shipped"   ? "bg-purple-400" :
        order.status === "confirmed" ? "bg-blue-400" :
        order.status === "cancelled" ? "bg-red-400" : "bg-amber-400"
      }`} />

      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-bold text-gray-900 text-sm tracking-wide">
              #{order.tag_id}
            </p>
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
              <Clock size={11} />
              {new Date(order.created_at).toLocaleDateString("en-IN", {
                day: "numeric", month: "short", year: "numeric",
              })}
            </p>
          </div>
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${config.bg} ${config.color}`}>
            {config.icon} {config.label}
          </span>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Name</p>
            <p className="font-semibold text-gray-800 text-sm mt-0.5 truncate">{order.name}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">Phone</p>
            <p className="font-semibold text-gray-800 text-sm mt-0.5">{order.phone}</p>
          </div>
          {order.amount && (
            <div className="bg-indigo-50 rounded-xl p-3 col-span-2">
              <p className="text-[10px] text-indigo-400 uppercase tracking-wide">Amount Paid</p>
              <p className="font-bold text-indigo-700 text-base mt-0.5 flex items-center gap-0.5">
                <IndianRupee size={15} />{order.amount}
              </p>
            </div>
          )}
        </div>

        {/* Tracking Steps */}
        {order.status !== "cancelled" && (
          <div className="pt-1">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-1">
              <MapPin size={11} /> Order Tracking
            </p>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-3.5 left-3.5 right-3.5 h-0.5 bg-gray-200 -z-0" />
              <div
                className="absolute top-3.5 left-3.5 h-0.5 bg-indigo-500 transition-all duration-500 -z-0"
                style={{ width: currentStep <= 0 ? "0%" : `${(currentStep / (steps.length - 1)) * 100}%` }}
              />

              {/* Steps */}
              <div className="flex justify-between relative z-10">
                {steps.map((step, i) => {
                  const isDone = i <= currentStep;
                  return (
                    <div key={step.key} className="flex flex-col items-center gap-1.5">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${
                        isDone
                          ? "bg-indigo-500 border-indigo-500"
                          : "bg-white border-gray-200"
                      }`}>
                        {isDone
                          ? <CheckCircle2 size={14} className="text-white" />
                          : <Circle size={14} className="text-gray-300" />
                        }
                      </div>
                      <span className={`text-[10px] font-medium text-center leading-tight ${
                        isDone ? "text-indigo-600" : "text-gray-300"
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {order.status === "cancelled" && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-center">
            <p className="text-red-500 text-sm font-medium">❌ Yeh order cancel ho gaya hai</p>
          </div>
        )}
      </div>
    </div>
  );
}