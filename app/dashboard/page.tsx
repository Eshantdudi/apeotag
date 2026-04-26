"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Entry = {
  id: number;
  type: "vehicle" | "pet";
  name: string;
  owner: string;
  phone: string;
  city: string;
  state: string;
  pincode: string;
  tag_id: string;
};

type Order = {
  id: number;
  name: string;
  phone: string;
  tag_id: string;
  status: string;
  amount?: number;
  created_at: string;
  user_id?: string;
};

const STATUS_OPTIONS = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

const statusConfig: Record<string, { color: string; label: string; icon: string }> = {
  pending:   { color: "bg-amber-50 text-amber-700 border-amber-200",   label: "Pending",   icon: "⏳" },
  confirmed: { color: "bg-blue-50 text-blue-700 border-blue-200",     label: "Confirmed", icon: "✅" },
  shipped:   { color: "bg-purple-50 text-purple-700 border-purple-200",label: "Shipped",   icon: "🚚" },
  delivered: { color: "bg-green-50 text-green-700 border-green-200",   label: "Delivered", icon: "📦" },
  cancelled: { color: "bg-red-50 text-red-700 border-red-200",         label: "Cancelled", icon: "❌" },
};

export default function Dashboard() {
  const [data, setData] = useState<Entry[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "vehicle" | "pet">("all");
  const [activeTab, setActiveTab] = useState<"registrations" | "orders">("registrations");
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [orderSearch, setOrderSearch] = useState("");
  const [orderFilter, setOrderFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  async function checkAuthAndFetch() {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.replace("/admin/login");
      return;
    }
    await Promise.all([fetchAll(), fetchOrders()]);
  }

  async function fetchAll() {
    const [vehiclesRes, petsRes] = await Promise.all([
      supabase.from("vehicles").select("*").order("id", { ascending: false }),
      supabase.from("pets").select("*").order("id", { ascending: false }),
    ]);

    const vehicles: Entry[] = vehiclesRes.data?.map((v: any) => ({
      id: v.id, type: "vehicle", name: v.vehicle_number,
      owner: v.owner_name, phone: v.phone, city: v.city,
      state: v.state, pincode: v.pincode, tag_id: v.tag_id,
    })) || [];

    const pets: Entry[] = petsRes.data?.map((p: any) => ({
      id: p.id, type: "pet", name: p.pet_name, owner: "-",
      phone: "-", city: p.city, state: p.state,
      pincode: p.pincode, tag_id: p.tag_id,
    })) || [];

    setData([...vehicles, ...pets]);
    setLoading(false);
  }

  async function fetchOrders() {
    const { data: ordersData } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    setOrders(ordersData || []);
  }

  // ✅ Yeh function status update karta hai
  async function updateOrderStatus(orderId: number, newStatus: string) {
    setUpdatingId(orderId);
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      alert("Update failed: " + error.message);
    } else {
      // Local state bhi update karo taaki page reload na karna pade
      setOrders(prev =>
        prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
      );
    }
    setUpdatingId(null);
  }

  async function downloadSticker(tagId: string, type: "vehicle" | "pet") {
    setDownloading(tagId);
    try {
      const qrUrl = `${window.location.origin}/tag/${tagId}`;
      const res = await fetch("/api/generate-sticker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qrUrl, type }),
      });
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `pinakatag-${tagId}.svg`;
      link.click();
    } catch {
      alert("Download failed");
    } finally {
      setDownloading(null);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  const vehicleCount = data.filter((d) => d.type === "vehicle").length;
  const petCount = data.filter((d) => d.type === "pet").length;

  const filtered = data.filter((v) => {
    const matchesFilter = filter === "all" || v.type === filter;
    const q = search.toLowerCase();
    const matchesSearch =
      v.name?.toLowerCase().includes(q) ||
      v.city?.toLowerCase().includes(q) ||
      v.state?.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = orderFilter === "all" || o.status === orderFilter;
    const q = orderSearch.toLowerCase();
    const matchesSearch =
      o.name?.toLowerCase().includes(q) ||
      o.phone?.toLowerCase().includes(q) ||
      o.tag_id?.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  // Orders stats
  const pendingCount   = orders.filter(o => o.status === "pending").length;
  const shippedCount   = orders.filter(o => o.status === "shipped").length;
  const deliveredCount = orders.filter(o => o.status === "delivered").length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-sm text-gray-400 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}
      <div className="bg-white border-b border-gray-100 px-7 h-14 flex items-center justify-between">
        <div className="text-sm font-medium tracking-tight">
          Pinakatag <span className="text-gray-400 font-normal">/ dashboard</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs text-gray-500 border border-gray-200 rounded-lg px-3.5 py-1.5 hover:bg-gray-50 hover:text-gray-800 transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="p-7">
        {/* Stats */}
     {/* Stats */}
<div className="grid grid-cols-3 gap-3 mb-6">
  {activeTab === "registrations" ? (
    [
      { label: "Total registered", value: data.length,     sub: "vehicles + pets" },
      { label: "Vehicles",         value: vehicleCount,    sub: "with active tags" },
      { label: "Pets",             value: petCount,        sub: "with active tags" },
    ].map((s) => (
      <div key={s.label} className="bg-white border border-gray-100 rounded-xl px-5 py-4">
        <div className="text-xs text-gray-400 mb-1.5">{s.label}</div>
        <div className="text-3xl font-medium text-gray-900">{s.value}</div>
        <div className="text-xs text-gray-300 mt-1">{s.sub}</div>
      </div>
    ))
  ) : (
    [
      { label: "Total Orders",  value: orders.length,  sub: "all time" },
      { label: "Pending",       value: pendingCount,   sub: "awaiting action" },
      { label: "Delivered",     value: deliveredCount, sub: "completed" },
    ].map((s) => (
      <div key={s.label} className="bg-white border border-gray-100 rounded-xl px-5 py-4">
        <div className="text-xs text-gray-400 mb-1.5">{s.label}</div>
        <div className="text-3xl font-medium text-gray-900">{s.value}</div>
        <div className="text-xs text-gray-300 mt-1">{s.sub}</div>
      </div>
    ))
  )}
</div>

        {/* Tabs */}
        <div className="flex gap-1 mb-5 bg-gray-100 p-1 rounded-xl w-fit">
          {(["registrations", "orders"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab === "registrations" ? "📋 Registrations" : `📦 Orders (${orders.length})`}
            </button>
          ))}
        </div>

        {/* ─────────────── REGISTRATIONS TAB ─────────────── */}
        {activeTab === "registrations" && (
          <>
            <div className="flex gap-2.5 mb-4 items-center">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="6.5" cy="6.5" r="4.5" /><path d="M11 11l3 3" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name, city, state..."
                  className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-100 rounded-lg text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-gray-300 transition-colors"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              {(["all", "vehicle", "pet"] as const).map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`text-xs px-3.5 py-2 border rounded-lg transition-colors capitalize whitespace-nowrap ${
                    filter === f ? "bg-gray-100 text-gray-800 border-gray-200" : "bg-white text-gray-400 border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  {f === "all" ? "All" : f === "vehicle" ? "Vehicles" : "Pets"}
                </button>
              ))}
            </div>

            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div className="grid grid-cols-[90px_1fr_1fr_140px_110px] px-5 py-2.5 bg-gray-50 border-b border-gray-100">
                {["Type", "Name", "Location", "Tag ID", "Action"].map((h) => (
                  <div key={h} className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{h}</div>
                ))}
              </div>
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-sm text-gray-300">No results found</div>
              ) : (
                filtered.map((v) => (
                  <div key={`${v.type}-${v.id}`} className="grid grid-cols-[90px_1fr_1fr_140px_110px] px-5 py-3.5 border-b border-gray-50 last:border-0 items-center hover:bg-gray-50 transition-colors">
                    <div>
                      <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full ${v.type === "vehicle" ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700"}`}>
                        {v.type === "vehicle" ? "Vehicle" : "Pet"}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-gray-800 truncate pr-4">{v.name}</div>
                    <div className="text-xs text-gray-400 truncate pr-4">{[v.city, v.state].filter(Boolean).join(", ")}</div>
                    <div className="text-[11px] text-gray-300 font-mono truncate pr-4">{v.tag_id}</div>
                    <div>
                      <button
                        onClick={() => downloadSticker(v.tag_id, v.type)}
                        disabled={downloading === v.tag_id}
                        className="text-xs px-3.5 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors disabled:opacity-40"
                      >
                        {downloading === v.tag_id ? "..." : "Download"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* ─────────────── ORDERS TAB ─────────────── */}
        {activeTab === "orders" && (
          <>
            {/* Search + Filter */}
            <div className="flex gap-2.5 mb-4 items-center flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="6.5" cy="6.5" r="4.5" /><path d="M11 11l3 3" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name, phone, tag ID..."
                  className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-100 rounded-lg text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-gray-300"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                />
              </div>
              {["all", ...STATUS_OPTIONS].map((f) => (
                <button key={f} onClick={() => setOrderFilter(f)}
                  className={`text-xs px-3.5 py-2 border rounded-lg transition-colors capitalize whitespace-nowrap ${
                    orderFilter === f ? "bg-gray-100 text-gray-800 border-gray-200" : "bg-white text-gray-400 border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  {f === "all" ? "All" : statusConfig[f]?.icon + " " + statusConfig[f]?.label}
                </button>
              ))}
            </div>

            {/* Orders Table */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div className="grid grid-cols-[1fr_120px_150px_160px_180px] px-5 py-2.5 bg-gray-50 border-b border-gray-100">
                {["Customer", "Phone", "Tag ID", "Date", "Status"].map((h) => (
                  <div key={h} className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{h}</div>
                ))}
              </div>

              {filteredOrders.length === 0 ? (
                <div className="py-12 text-center text-sm text-gray-300">Koi order nahi mila</div>
              ) : (
                filteredOrders.map((order) => {
                  const cfg = statusConfig[order.status] || statusConfig.pending;
                  return (
                    <div key={order.id} className="grid grid-cols-[1fr_120px_150px_160px_180px] px-5 py-3.5 border-b border-gray-50 last:border-0 items-center hover:bg-gray-50 transition-colors">
                      {/* Customer */}
                      <div>
                        <p className="text-sm font-medium text-gray-800">{order.name}</p>
                        {order.amount && (
                          <p className="text-xs text-gray-400 mt-0.5">₹{order.amount}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="text-xs text-gray-500">{order.phone}</div>

                      {/* Tag ID */}
                      <div className="text-[11px] text-gray-300 font-mono">{order.tag_id}</div>

                      {/* Date */}
                      <div className="text-xs text-gray-400">
                        {new Date(order.created_at).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </div>

                      {/* ✅ Status Dropdown — yahan se update hoga */}
                      <div>
                        <select
                          value={order.status || "pending"}
                          disabled={updatingId === order.id}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`text-xs font-medium px-3 py-1.5 rounded-lg border cursor-pointer transition-all disabled:opacity-50 ${cfg.color}`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {statusConfig[s].icon} {statusConfig[s].label}
                            </option>
                          ))}
                        </select>
                        {updatingId === order.id && (
                          <span className="text-[10px] text-gray-400 ml-2">Saving...</span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}