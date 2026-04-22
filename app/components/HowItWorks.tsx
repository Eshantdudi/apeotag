"use client";

import { useState } from "react";

export default function HowItWorks() {
  const [active, setActive] = useState<"vehicle" | "pet">("vehicle");
  const [ripple, setRipple] = useState<"vehicle" | "pet" | null>(null);

  const isVehicle = active === "vehicle";

  const handleTabClick = (tab: "vehicle" | "pet") => {
    if (tab === active) return;
    setActive(tab);
    setRipple(tab);
    setTimeout(() => setRipple(null), 400);
  };

  const steps = {
    vehicle: [
      {
        num: 1,
        title: "Order your QR tag",
        desc: "Place an order online. We generate a unique QR tag linked to your vehicle and deliver it.",
      },
      {
        num: 2,
        title: "Stick it on your vehicle",
        desc: "Peel and place the weatherproof QR sticker on your vehicle in seconds.",
      },
      {
        num: 3,
        title: "Scan & connect instantly",
        desc: "Anyone can scan the QR and contact you — no app required.",
      },
    ],
    pet: [
      {
        num: 1,
        title: "Order your Pet QR tag",
        desc: "We generate a unique QR tag with your pet's profile.",
      },
      {
        num: 2,
        title: "Attach to collar",
        desc: "Clip it onto your pet's collar — lightweight and safe.",
      },
      {
        num: 3,
        title: "Finder contacts you",
        desc: "If lost, anyone scans and reaches you instantly.",
      },
    ],
  };

  const pills = isVehicle
    ? ["No app required", "Privacy protected", "Works on any phone", "Emergency ready"]
    : ["No app required", "Lost pet alert", "Pet profile shown", "Works on any phone"];

  return (
    <section id="HowItWorks" className="py-20 px-6 text-center bg-white">

      {/* Badge */}
      <span
        className="inline-block text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
        style={{ background: '#3C3489' }}
      >
        Simple 3-step process
      </span>

      {/* Heading */}
      <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
        How Apeo Tag Works
      </h2>
      <p className="text-gray-500 text-base mb-10">
        Get connected in minutes — no app needed
      </p>

      {/* Toggle */}
      <div className="inline-flex bg-gray-100 rounded-xl p-1 mb-12 gap-1">
        {["vehicle", "pet"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab as "vehicle" | "pet")}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
            style={
              active === tab
                ? {
                    background: tab === "vehicle" ? "#3C3489" : "#D97706",
                    color: "white",
                  }
                : { color: "#6B7280" }
            }
          >
            {tab === "vehicle" ? "🚗 Vehicle Tag" : "🐾 Pet Tag"}
          </button>
        ))}
      </div>

      {/* Steps */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        {steps[active].map((step) => (
          <div
            key={step.num}
            className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition"
          >
            <div
              className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full text-white font-bold"
              style={{ background: isVehicle ? "#3C3489" : "#D97706" }}
            >
              {step.num}
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">
              {step.title}
            </h3>

            <p className="text-sm text-gray-500">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Pills */}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {pills.map((p) => (
          <span
            key={p}
            className="px-4 py-1.5 rounded-full text-xs font-medium"
            style={
              isVehicle
                ? { background: "#EEEDFE", color: "#3C3489" }
                : { background: "#FEF3C7", color: "#92400E" }
            }
          >
            {p}
          </span>
        ))}
      </div>

    </section>
  );
}