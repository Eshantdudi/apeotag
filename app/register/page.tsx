"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import jsPDF from "jspdf";
import { Loader2, CheckCircle2, ArrowRight, Download, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const [active, setActive] = useState<"vehicle" | "pet" | null>(null);
  const [tagId, setTagId] = useState("");

  useEffect(() => {
    const tag = new URLSearchParams(window.location.search).get("tag");
    if (tag) setTagId(tag);
  }, []);

  if (!active) {
    return (
      <div className="min-h-screen bg-[#f8f8f6] flex flex-col items-center justify-center p-6">
        <div className="mb-10 text-center">
          <p className="text-xs text-gray-400 tracking-[0.3em] uppercase mb-2">Pinaka Infra</p>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">What are you registering?</h1>
          <p className="text-sm text-gray-400 mt-2">Tap one to get started</p>
          {tagId && (
            <span className="inline-block mt-3 text-xs font-mono bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
              Tag: {tagId}
            </span>
          )}
        </div>

        <div className="w-full max-w-sm flex flex-col gap-4">
          <button
            onClick={() => setActive("vehicle")}
            className="group w-full bg-gray-900 hover:bg-gray-800 active:scale-[0.98] transition-all duration-150 rounded-2xl p-6 text-left shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">🚗</span>
              <span className="text-xs font-semibold bg-white/10 text-white px-3 py-1 rounded-full">₹295</span>
            </div>
            <p className="text-white font-semibold text-lg">Vehicle Tag</p>
            <p className="text-gray-400 text-sm mt-1">For bikes, cars, scooters & more</p>
            <div className="mt-4 flex items-center gap-1 text-gray-400 text-xs group-hover:text-white transition-colors">
              <span>Register now</span>
              <ArrowRight size={13} />
            </div>
          </button>

          <button
            onClick={() => setActive("pet")}
            className="group w-full bg-amber-500 hover:bg-amber-400 active:scale-[0.98] transition-all duration-150 rounded-2xl p-6 text-left shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">🐾</span>
              <span className="text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full">₹495</span>
            </div>
            <p className="text-white font-semibold text-lg">Pet Tag</p>
            <p className="text-amber-100 text-sm mt-1">For dogs, cats, birds & more</p>
            <div className="mt-4 flex items-center gap-1 text-amber-200 text-xs group-hover:text-white transition-colors">
              <span>Register now</span>
              <ArrowRight size={13} />
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f8f6] flex flex-col items-center justify-center p-6">
      <div className="mb-8 text-center">
        <p className="text-xs text-gray-400 tracking-[0.3em] uppercase mb-2">Pinaka Infra</p>
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Register your tag</h1>
        {tagId && (
          <span className="inline-block mt-2 text-xs font-mono bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
            {tagId}
          </span>
        )}
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setActive(null)}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={13} /> Change
          </button>
          <span className={`text-xs font-medium px-3 py-1 rounded-full ${
            active === "vehicle" ? "bg-gray-900 text-white" : "bg-amber-500 text-white"
          }`}>
            {active === "vehicle" ? "🚗 Vehicle Tag" : "🐾 Pet Tag"}
          </span>
        </div>
      </div>

      <div className="w-full max-w-md">
        {active === "vehicle" ? <VehicleForm tagId={tagId} /> : <PetForm tagId={tagId} />}
      </div>
    </div>
  );
}

/* ================= CASHFREE HELPER ================= */
const openCashfree = (paymentSessionId: string) => {
  const cashfree = (window as any).Cashfree({
    mode: process.env.NEXT_PUBLIC_CASHFREE_MODE || "production",
  });

  cashfree.checkout({
    paymentSessionId,
    redirectTarget: "_self",
  });
};

/* ================= VEHICLE ================= */
function VehicleForm({ tagId }: { tagId: string }) {
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone]         = useState("");
  const [vehicle, setVehicle]     = useState("");
  const [address, setAddress]     = useState("");
  const [city, setCity]           = useState("");
  const [state, setState]         = useState("");
  const [pincode, setPincode]     = useState("");
  const [step, setStep]           = useState<"form" | "bill" | "done">("form");
  const [loading, setLoading]     = useState(false);

  const isValid =
    ownerName && /^\d{10}$/.test(phone) && vehicle && address && city && state && /^\d{6}$/.test(pincode);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Supabase mein pending save karo
      const { error: dbError } = await supabase.from("vehicles").insert([{
        owner_name: ownerName,
        phone,
        vehicle_number: vehicle,
        address,
        city,
        state,
        pincode,
        tag_id: tagId,
        payment_status: "pending",
      }]);

      if (dbError) {
        alert("Data save nahi hua ❌");
        setLoading(false);
        return;
      }

      // 2. Cashfree payment session lo
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: ownerName,
          phone,
          email: "customer@pinakainfra.com",
          amount: 295,
          purpose: "Vehicle QR Tag - " + tagId,
          tag_id: tagId,
        }),
      });

      const data = await res.json();

      if (data.payment_session_id) {
        // 3. Cashfree checkout kholo
        openCashfree(data.payment_session_id);
      } else {
        console.error("Cashfree error:", data);
        alert("Payment link nahi mila ❌");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Kuch gadbad ho gayi ❌");
      setLoading(false);
    }
  };

  const generateInvoice = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold"); doc.setFontSize(20); doc.text("Pinaka Infra", 20, 25);
    doc.setFont("helvetica", "normal"); doc.setFontSize(12); doc.text("Vehicle QR Tag Invoice", 20, 35);
    doc.line(20, 40, 190, 40);
    doc.text(`Owner: ${ownerName}`, 20, 55); doc.text(`Phone: ${phone}`, 20, 65);
    doc.text(`Vehicle Number: ${vehicle}`, 20, 75); doc.text(`Address: ${address}`, 20, 85);
    doc.text(`City: ${city}, ${state} - ${pincode}`, 20, 95); doc.text(`Tag ID: ${tagId}`, 20, 105);
    doc.line(20, 115, 190, 115); doc.setFont("helvetica", "bold"); doc.text("Total Paid: Rs.295", 20, 128);
    doc.save("vehicle-invoice.pdf");
  };

  return (
    <Card>
      <CardHeader color="gray" label="Vehicle QR Tag" price="₹295" />
      {step === "form" && (
        <div className="p-6">
          <SectionLabel>Owner Details</SectionLabel>
          <Field label="Owner Name" value={ownerName} onChange={setOwnerName} placeholder="Rahul Sharma" />
          <Field label="Phone Number" value={phone} onChange={setPhone} placeholder="9876543210" />
          <SectionLabel className="mt-4">Vehicle Details</SectionLabel>
          <Field label="Vehicle Number" value={vehicle} onChange={setVehicle} placeholder="MH 01 AB 1234" />
          <Field label="Address" value={address} onChange={setAddress} placeholder="123, Street Name" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="City" value={city} onChange={setCity} placeholder="Mumbai" />
            <Field label="State" value={state} onChange={setState} placeholder="Maharashtra" />
          </div>
          <Field label="Pincode" value={pincode} onChange={setPincode} placeholder="400001" />
          <PrimaryButton onClick={() => setStep("bill")} disabled={!isValid} color="gray">
            Continue <ArrowRight size={15} />
          </PrimaryButton>
        </div>
      )}
      {step === "bill" && (
        <div className="p-6">
          <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-100">
            <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Order Summary</p>
            <BillRow label="Owner" value={ownerName} />
            <BillRow label="Phone" value={phone} />
            <BillRow label="Vehicle" value={vehicle} />
            <BillRow label="Location" value={`${city}, ${state}`} />
            <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between">
              <span className="text-sm font-medium text-gray-900">Total</span>
              <span className="text-sm font-semibold text-gray-900">₹295</span>
            </div>
          </div>
          <button onClick={() => setStep("form")} className="text-xs text-gray-400 hover:text-gray-600 mb-4 transition-colors">
            ← Edit details
          </button>
          <PrimaryButton onClick={handlePayment} disabled={loading} color="gray">
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> Processing...</>
            ) : (
              "Pay ₹295 →"
            )}
          </PrimaryButton>
          <p className="text-center text-xs text-gray-400 mt-3">
            🔒 Secure payment via Cashfree
          </p>
        </div>
      )}
      {step === "done" && (
        <div className="p-6 text-center">
          <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={28} className="text-green-500" />
          </div>
          <p className="font-medium text-gray-900 mb-1">Registration complete</p>
          <p className="text-xs text-gray-400 mb-6">Your vehicle tag is now active</p>
          <button
            onClick={generateInvoice}
            className="flex items-center gap-2 mx-auto text-xs text-gray-500 hover:text-gray-800 transition-colors"
          >
            <Download size={14} /> Download Invoice
          </button>
        </div>
      )}
    </Card>
  );
}

/* ================= PET ================= */
function PetForm({ tagId }: { tagId: string }) {
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone]         = useState("");
  const [petName, setPetName]     = useState("");
  const [petType, setPetType]     = useState("");
  const [address, setAddress]     = useState("");
  const [city, setCity]           = useState("");
  const [state, setState]         = useState("");
  const [pincode, setPincode]     = useState("");
  const [step, setStep]           = useState<"form" | "bill" | "done">("form");
  const [loading, setLoading]     = useState(false);

  const isValid =
    ownerName && /^\d{10}$/.test(phone) && petName && petType && address && city && state && /^\d{6}$/.test(pincode);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Supabase mein pending save karo
      const { error: dbError } = await supabase.from("pets").insert([{
        owner_name: ownerName,
        phone,
        pet_name: petName,
        pet_type: petType,
        address,
        city,
        state,
        pincode,
        tag_id: tagId,
        payment_status: "pending",
      }]);

      if (dbError) {
        alert("Data save nahi hua ❌");
        setLoading(false);
        return;
      }

      // 2. Cashfree payment session lo
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: ownerName,
          phone,
          email: "customer@pinakainfra.com",
          amount: 495,
          purpose: "Pet QR Tag - " + tagId,
          tag_id: tagId,
        }),
      });

      const data = await res.json();

      if (data.payment_session_id) {
        // 3. Cashfree checkout kholo
        openCashfree(data.payment_session_id);
      } else {
        console.error("Cashfree error:", data);
        alert("Payment link nahi mila ❌");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Kuch gadbad ho gayi ❌");
      setLoading(false);
    }
  };

  const generateInvoice = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold"); doc.setFontSize(20); doc.text("Pinaka Infra", 20, 25);
    doc.setFont("helvetica", "normal"); doc.setFontSize(12); doc.text("Pet QR Tag Invoice", 20, 35);
    doc.line(20, 40, 190, 40);
    doc.text(`Owner: ${ownerName}`, 20, 55); doc.text(`Phone: ${phone}`, 20, 65);
    doc.text(`Pet Name: ${petName}`, 20, 75); doc.text(`Pet Type: ${petType}`, 20, 85);
    doc.text(`Address: ${address}`, 20, 95); doc.text(`City: ${city}, ${state} - ${pincode}`, 20, 105);
    doc.text(`Tag ID: ${tagId}`, 20, 115);
    doc.line(20, 125, 190, 125); doc.setFont("helvetica", "bold"); doc.text("Total Paid: Rs.495", 20, 138);
    doc.save("pet-invoice.pdf");
  };

  return (
    <Card>
      <CardHeader color="amber" label="Pet QR Tag" price="₹495" />
      {step === "form" && (
        <div className="p-6">
          <SectionLabel>Owner Details</SectionLabel>
          <Field label="Owner Name" value={ownerName} onChange={setOwnerName} placeholder="Rahul" />
          <Field label="Phone Number" value={phone} onChange={setPhone} placeholder="9876543210" />
          <SectionLabel className="mt-4">Pet Details</SectionLabel>
          <Field label="Pet Name" value={petName} onChange={setPetName} placeholder="Bruno" />
          <Field label="Pet Type" value={petType} onChange={setPetType} placeholder="Dog / Cat / Bird..." />
          <Field label="Address" value={address} onChange={setAddress} placeholder="123, Street Name" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="City" value={city} onChange={setCity} placeholder="Mumbai" />
            <Field label="State" value={state} onChange={setState} placeholder="Maharashtra" />
          </div>
          <Field label="Pincode" value={pincode} onChange={setPincode} placeholder="400001" />
          <PrimaryButton onClick={() => setStep("bill")} disabled={!isValid} color="amber">
            Continue <ArrowRight size={15} />
          </PrimaryButton>
        </div>
      )}
      {step === "bill" && (
        <div className="p-6">
          <div className="bg-amber-50 rounded-xl p-4 mb-5 border border-amber-100">
            <p className="text-xs text-amber-600 mb-3 uppercase tracking-wider">Order Summary</p>
            <BillRow label="Owner" value={ownerName} />
            <BillRow label="Phone" value={phone} />
            <BillRow label="Pet Name" value={petName} />
            <BillRow label="Pet Type" value={petType} />
            <BillRow label="Location" value={`${city}, ${state}`} />
            <div className="border-t border-amber-200 mt-3 pt-3 flex justify-between">
              <span className="text-sm font-medium text-gray-900">Total</span>
              <span className="text-sm font-semibold text-gray-900">₹495</span>
            </div>
          </div>
          <button onClick={() => setStep("form")} className="text-xs text-gray-400 hover:text-gray-600 mb-4 transition-colors">
            ← Edit details
          </button>
          <PrimaryButton onClick={handlePayment} disabled={loading} color="amber">
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> Processing...</>
            ) : (
              "Pay ₹495 →"
            )}
          </PrimaryButton>
          <p className="text-center text-xs text-gray-400 mt-3">
            🔒 Secure payment via Cashfree
          </p>
        </div>
      )}
      {step === "done" && (
        <div className="p-6 text-center">
          <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={28} className="text-green-500" />
          </div>
          <p className="font-medium text-gray-900 mb-1">Registration complete</p>
          <p className="text-xs text-gray-400 mb-6">Your pet tag is now active</p>
          <button
            onClick={generateInvoice}
            className="flex items-center gap-2 mx-auto text-xs text-gray-500 hover:text-gray-800 transition-colors"
          >
            <Download size={14} /> Download Invoice
          </button>
        </div>
      )}
    </Card>
  );
}

/* ================= SHARED COMPONENTS ================= */
function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">{children}</div>;
}

function CardHeader({ color, label, price }: { color: "gray" | "amber"; label: string; price: string }) {
  return (
    <div className={`px-6 py-5 flex items-center justify-between ${color === "gray" ? "bg-gray-900" : "bg-amber-500"}`}>
      <p className="text-white font-medium text-sm">{label}</p>
      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${color === "gray" ? "bg-white/10 text-white" : "bg-white/20 text-white"}`}>{price}</span>
    </div>
  );
}

function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 ${className}`}>{children}</p>;
}

function BillRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm mb-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="mb-3">
      <label className="block text-xs text-gray-400 mb-1 font-medium">{label}</label>
      <input
        type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full border border-gray-100 bg-gray-50 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-gray-300 focus:bg-white transition-colors"
      />
    </div>
  );
}

function PrimaryButton({ children, onClick, disabled, color }: {
  children: React.ReactNode; onClick: () => void; disabled?: boolean; color: "gray" | "amber";
}) {
  return (
    <button
      onClick={onClick} disabled={disabled}
      className={`w-full mt-2 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
        color === "gray" ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-amber-500 text-white hover:bg-amber-600"
      }`}
    >
      {children}
    </button>
  );
}
