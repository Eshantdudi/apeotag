import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import LocationButton from "./LocationButton";
import CallButton from "./CallButton";

export default async function TagPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("tag_id", id)
    .maybeSingle();

  const { data: pet } = await supabase
    .from("pets")
    .select("*")
    .eq("tag_id", id)
    .maybeSingle();

  if (!vehicle && !pet) return notFound();
  if (vehicle) return <VehicleCard data={vehicle} />;
  return <PetCard data={pet} />;
}

/* ── shared styles injected once ── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');

  @keyframes card-in {
    from { opacity: 0; transform: translateY(22px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)  scale(1); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes orb-pulse {
    0%, 100% { opacity: 0.55; transform: scale(1); }
    50%       { opacity: 0.75; transform: scale(1.08); }
  }
  @keyframes row-in {
    from { opacity: 0; transform: translateX(-8px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .pinaka-card-wrap {
    font-family: 'DM Sans', system-ui, sans-serif;
    min-height: 100svh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 16px;
  }

  .pinaka-card {
    width: 100%;
    max-width: 370px;
    border-radius: 24px;
    overflow: hidden;
    animation: card-in 0.55s cubic-bezier(0.22,1,0.36,1) both;
  }

  .pinaka-header {
    position: relative;
    padding: 28px 24px 22px;
    overflow: hidden;
  }

  .pinaka-orb {
    position: absolute;
    border-radius: 50%;
    animation: orb-pulse 4s ease-in-out infinite;
    pointer-events: none;
  }

  .pinaka-badge-label {
    font-size: 10px;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .pinaka-badge-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    display: inline-block;
  }

  .pinaka-icon-wrap {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .pinaka-plate {
    font-family: 'DM Mono', monospace;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.06em;
    margin: 0;
    line-height: 1.2;
  }

  .pinaka-name {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    line-height: 1.2;
  }

  .pinaka-type-chip {
    display: inline-block;
    font-size: 11px;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 20px;
    margin-top: 5px;
    letter-spacing: 0.02em;
  }

  .pinaka-rows {
    padding: 4px 24px 0;
  }

  .pinaka-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    animation: row-in 0.4s ease both;
  }

  .pinaka-row-label {
    font-size: 11px;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .pinaka-row-value {
    font-size: 14px;
    font-weight: 500;
    color: #fff;
  }

  .pinaka-actions {
    padding: 20px 24px 28px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .pinaka-call-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 14px 0;
    border-radius: 14px;
    font-size: 14px;
    font-weight: 500;
    font-family: 'DM Sans', system-ui, sans-serif;
    letter-spacing: 0.01em;
    text-decoration: none;
    transition: filter 0.2s, transform 0.15s;
    position: relative;
    overflow: hidden;
  }
  .pinaka-call-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%);
    background-size: 200% auto;
    animation: shimmer 2.5s linear infinite;
  }
  .pinaka-call-btn:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
  .pinaka-call-btn:active {
    transform: scale(0.98);
  }

  .pinaka-footer-note {
    text-align: center;
    font-size: 11.5px;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.04em;
    margin-top: 4px;
  }

  .pinaka-divider {
    height: 0.5px;
    margin: 0 24px;
  }
`;

/* ════════════════════════════════
   VEHICLE CARD — Purple
════════════════════════════════ */
function VehicleCard({ data }: { data: any }) {
  const rows = [
    { label: "Owner",   value: data.owner_name || "—" },
    { label: "City",    value: data.city        || "—" },
    { label: "State",   value: data.state       || "—" },
    { label: "Pincode", value: data.pincode     || "—" },
  ];

  return (
    <>
      <style>{globalStyles}</style>
      <div
        className="pinaka-card-wrap"
        style={{ background: "radial-gradient(ellipse at 30% 20%, #1c1560 0%, #0d0b2e 55%, #060418 100%)" }}
      >
        <div
          className="pinaka-card"
          style={{
            background: "linear-gradient(160deg, #1e1a55 0%, #16134a 60%, #110f3c 100%)",
            border: "0.5px solid rgba(127,119,221,0.25)",
            boxShadow: "0 0 0 0.5px rgba(127,119,221,0.1), 0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(83,74,183,0.12)",
          }}
        >
          {/* Header */}
          <div
            className="pinaka-header"
            style={{ background: "linear-gradient(160deg, #211c60 0%, #1a1650 100%)" }}
          >
            {/* Orbs */}
            <div className="pinaka-orb" style={{ top: -32, right: -32, width: 130, height: 130, background: "rgba(127,119,221,0.13)" }} />
            <div className="pinaka-orb" style={{ bottom: -40, right: 20, width: 80, height: 80, background: "rgba(83,74,183,0.09)", animationDelay: "2s" }} />
            <div className="pinaka-orb" style={{ top: 10, left: -20, width: 60, height: 60, background: "rgba(175,169,236,0.06)", animationDelay: "1s" }} />

            {/* Top label */}
            <div className="pinaka-badge-label" style={{ color: "#534AB7" }}>
              <span className="pinaka-badge-dot" style={{ background: "#534AB7" }} />
              Pinaka Infra
            </div>

            {/* Title row */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative" }}>
              <div
                className="pinaka-icon-wrap"
                style={{ background: "rgba(127,119,221,0.16)", border: "0.5px solid rgba(175,169,236,0.2)" }}
              >
                <svg width="22" height="22" style={{ color: "#AFA9EC" }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <div>
                <p className="pinaka-plate" style={{ color: "#fff" }}>{data.vehicle_number}</p>
                <span
                  className="pinaka-type-chip"
                  style={{ background: "rgba(127,119,221,0.18)", color: "#AFA9EC", border: "0.5px solid rgba(127,119,221,0.3)" }}
                >
                  Vehicle tag
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="pinaka-divider" style={{ background: "rgba(127,119,221,0.15)" }} />

          {/* Info rows */}
          <div className="pinaka-rows">
            {rows.map((r, i) => (
              <div
                key={r.label}
                className="pinaka-row"
                style={{
                  borderBottom: i < rows.length - 1 ? "0.5px solid rgba(127,119,221,0.12)" : "none",
                  animationDelay: `${0.08 * i + 0.1}s`,
                }}
              >
                <span className="pinaka-row-label" style={{ color: "#534AB7" }}>{r.label}</span>
                <span className="pinaka-row-value">{r.value}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="pinaka-actions">
            {data.phone && <CallButton phone={data.phone} color="purple" />}

            <LocationButton color="purple" />

            <p className="pinaka-footer-note" style={{ color: "#3C3489" }}>
              Found this vehicle? Contact the owner.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════
   PET CARD — Green
════════════════════════════════ */
function PetCard({ data }: { data: any }) {
  const rows = [
    { label: "Pet type", value: data.pet_type   || "—" },
    { label: "Owner",    value: data.owner_name || "—" },
    { label: "City",     value: data.city       || "—" },
    { label: "State",    value: data.state      || "—" },
    { label: "Pincode",  value: data.pincode    || "—" },
  ];

  return (
    <>
      <style>{globalStyles}</style>
      <div
        className="pinaka-card-wrap"
        style={{ background: "radial-gradient(ellipse at 30% 20%, #054a3a 0%, #021f18 55%, #010f0c 100%)" }}
      >
        <div
          className="pinaka-card"
          style={{
            background: "linear-gradient(160deg, #0a4034 0%, #072e27 60%, #041f1a 100%)",
            border: "0.5px solid rgba(29,158,117,0.22)",
            boxShadow: "0 0 0 0.5px rgba(29,158,117,0.08), 0 40px 80px rgba(0,0,0,0.65), 0 0 60px rgba(15,110,86,0.1)",
          }}
        >
          {/* Header */}
          <div
            className="pinaka-header"
            style={{ background: "linear-gradient(160deg, #0c4a3c 0%, #083829 100%)" }}
          >
            {/* Orbs */}
            <div className="pinaka-orb" style={{ top: -32, right: -32, width: 130, height: 130, background: "rgba(29,158,117,0.12)" }} />
            <div className="pinaka-orb" style={{ bottom: -40, right: 20, width: 80, height: 80, background: "rgba(15,110,86,0.09)", animationDelay: "2s" }} />
            <div className="pinaka-orb" style={{ top: 10, left: -20, width: 60, height: 60, background: "rgba(93,202,165,0.06)", animationDelay: "1s" }} />

            {/* Top label */}
            <div className="pinaka-badge-label" style={{ color: "#0F6E56" }}>
              <span className="pinaka-badge-dot" style={{ background: "#0F6E56" }} />
              Pinaka Infra
            </div>

            {/* Title row */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative" }}>
              <div
                className="pinaka-icon-wrap"
                style={{ background: "rgba(29,158,117,0.16)", border: "0.5px solid rgba(93,202,165,0.2)" }}
              >
                <svg width="22" height="22" style={{ color: "#5DCAA5" }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                </svg>
              </div>
              <div>
                <p className="pinaka-name" style={{ color: "#fff" }}>{data.pet_name}</p>
                <span
                  className="pinaka-type-chip"
                  style={{ background: "rgba(29,158,117,0.18)", color: "#5DCAA5", border: "0.5px solid rgba(29,158,117,0.3)" }}
                >
                  {data.pet_type || "Pet"} tag
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="pinaka-divider" style={{ background: "rgba(29,158,117,0.12)" }} />

          {/* Info rows */}
          <div className="pinaka-rows">
            {rows.map((r, i) => (
              <div
                key={r.label}
                className="pinaka-row"
                style={{
                  borderBottom: i < rows.length - 1 ? "0.5px solid rgba(29,158,117,0.1)" : "none",
                  animationDelay: `${0.08 * i + 0.1}s`,
                }}
              >
                <span className="pinaka-row-label" style={{ color: "#0F6E56" }}>{r.label}</span>
                <span className="pinaka-row-value">{r.value}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="pinaka-actions">
            {data.phone && <CallButton phone={data.phone} color="green" />}

            <LocationButton color="green" />

            <p className="pinaka-footer-note" style={{ color: "#085041" }}>
              Found this pet? Contact the owner.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
