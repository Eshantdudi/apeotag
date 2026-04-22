"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import jsPDF from "jspdf";
import {
  Loader2,
  CheckCircle2,
  ArrowRight,
  Download,
  ArrowLeft,
} from "lucide-react";

export default function RegisterPage() {
  const [active, setActive] = useState<"vehicle" | "pet" | null>(null);

  // ✅ FIXED TAG ID
  const [tagId, setTagId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // support ?tag=123 or ?tag_id=123
    const tag =
      params.get("tag") ||
      params.get("tag_id") ||
      params.get("id") ||
      "";

    console.log("TAG FOUND:", tag);

    if (tag) {
      setTagId(tag.trim());
    }
  }, []);

  if (!active) {
    return (
      <div className="min-h-screen bg-[#f8f8f6] flex flex-col items-center justify-center p-6">
        <div className="mb-10 text-center">
          <p className="text-xs text-gray-400 tracking-[0.3em] uppercase mb-2">
            Pinaka Infra
          </p>

          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
            What are you registering?
          </h1>

          <p className="text-sm text-gray-400 mt-2">
            Tap one to get started
          </p>

          {tagId ? (
            <span className="inline-block mt-3 text-xs font-mono bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
              Tag: {tagId}
            </span>
          ) : (
            <span className="inline-block mt-3 text-xs font-mono bg-red-50 text-red-500 px-3 py-1 rounded-full">
              Tag Missing
            </span>
          )}
        </div>

        <div className="w-full max-w-sm flex flex-col gap-4">
          <button
            onClick={() => setActive("vehicle")}
            className="group w-full bg-gray-900 hover:bg-gray-800 rounded-2xl p-6 text-left"
          >
            <p className="text-white font-semibold text-lg">
              🚗 Vehicle Tag
            </p>
            <p className="text-gray-400 text-sm mt-1">
              ₹295
            </p>
          </button>

          <button
            onClick={() => setActive("pet")}
            className="group w-full bg-amber-500 hover:bg-amber-400 rounded-2xl p-6 text-left"
          >
            <p className="text-white font-semibold text-lg">
              🐾 Pet Tag
            </p>
            <p className="text-white/80 text-sm mt-1">
              ₹495
            </p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f8f6] flex flex-col items-center justify-center p-6">
      <div className="mb-8 text-center">
        <p className="text-xs text-gray-400 tracking-[0.3em] uppercase mb-2">
          Pinaka Infra
        </p>

        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          Register your tag
        </h1>

        {tagId ? (
          <span className="inline-block mt-2 text-xs font-mono bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
            {tagId}
          </span>
        ) : (
          <span className="inline-block mt-2 text-xs font-mono bg-red-50 text-red-500 px-3 py-1 rounded-full">
            Tag Missing
          </span>
        )}

        <div className="mt-4">
          <button
            onClick={() => setActive(null)}
            className="text-xs text-gray-500"
          >
            <ArrowLeft size={13} className="inline mr-1" />
            Change
          </button>
        </div>
      </div>

      <div className="w-full max-w-md">
        {active === "vehicle" ? (
          <VehicleForm tagId={tagId} />
        ) : (
          <PetForm tagId={tagId} />
        )}
      </div>
    </div>
  );
}

/* ================= CASHFREE ================= */

const openCashfree = (paymentSessionId: string) => {
  const cashfree = (window as any).Cashfree({
    mode: "sandbox",
  });

  cashfree.checkout({
    paymentSessionId,
    redirectTarget: "_self",
  });
};

/* ================= VEHICLE ================= */

function VehicleForm({ tagId }: { tagId: string }) {
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    // ✅ IMPORTANT FIX
    if (!tagId) {
      alert("Invalid Tag Link ❌");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("vehicles").insert([
        {
          owner_name: ownerName,
          phone,
          vehicle_number: vehicle,
          tag_id: tagId,
          payment_status: "pending",
        },
      ]);

      if (error) {
        alert("DB Save Failed");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: ownerName,
          phone,
          email: "customer@pinakainfra.com",
          amount: 295,
          purpose: "Vehicle QR Tag",
          tag_id: tagId,
        }),
      });

      const data = await res.json();

      console.log("PAYMENT RESPONSE:", data);

      if (data.payment_session_id) {
        openCashfree(data.payment_session_id);
      } else {
        alert("Payment Failed ❌");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <input
        placeholder="Owner Name"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
        className="w-full border p-3 mb-3 rounded"
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border p-3 mb-3 rounded"
      />

      <input
        placeholder="Vehicle Number"
        value={vehicle}
        onChange={(e) => setVehicle(e.target.value)}
        className="w-full border p-3 mb-3 rounded"
      />

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-gray-900 text-white py-3 rounded-xl"
      >
        {loading ? "Loading..." : "Pay ₹295"}
      </button>
    </div>
  );
}

/* ================= PET ================= */

function PetForm({ tagId }: { tagId: string }) {
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [petName, setPetName] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    // ✅ IMPORTANT FIX
    if (!tagId) {
      alert("Invalid Tag Link ❌");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("pets").insert([
        {
          owner_name: ownerName,
          phone,
          pet_name: petName,
          tag_id: tagId,
          payment_status: "pending",
        },
      ]);

      if (error) {
        alert("DB Save Failed");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: ownerName,
          phone,
          email: "customer@pinakainfra.com",
          amount: 495,
          purpose: "Pet QR Tag",
          tag_id: tagId,
        }),
      });

      const data = await res.json();

      if (data.payment_session_id) {
        openCashfree(data.payment_session_id);
      } else {
        alert("Payment Failed ❌");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <input
        placeholder="Owner Name"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
        className="w-full border p-3 mb-3 rounded"
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border p-3 mb-3 rounded"
      />

      <input
        placeholder="Pet Name"
        value={petName}
        onChange={(e) => setPetName(e.target.value)}
        className="w-full border p-3 mb-3 rounded"
      />

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-amber-500 text-white py-3 rounded-xl"
      >
        {loading ? "Loading..." : "Pay ₹495"}
      </button>
    </div>
  );
}