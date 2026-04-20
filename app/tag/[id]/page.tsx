import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import LocationButton from "./LocationButton";

export default async function TagPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // ✅ runtime pe client create hoga
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  console.log("SERVER TAG 👉", id);

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

/* ===== VEHICLE CARD ===== */
function VehicleCard({ data }: { data: any }) {
  return (
    <div className="min-h-screen bg-[#f8f8f6] flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl border shadow-sm overflow-hidden">

        <div className="bg-gray-900 px-6 py-5">
          <p className="text-xs text-gray-400 uppercase mb-1">Pinaka Infra</p>
          <h1 className="text-white text-xl font-semibold">
            {data.vehicle_number}
          </h1>
          <span className="inline-block mt-2 text-xs bg-white/10 text-white px-2 py-1 rounded-full">
            🚗 Vehicle Tag
          </span>
        </div>

        <div className="p-6 space-y-4">
          <InfoRow label="Owner" value={data.owner_name || "—"} />
          <InfoRow label="Phone" value={data.phone || "—"} isPhone />
          <InfoRow label="City" value={data.city} />
          <InfoRow label="State" value={data.state} />
          <InfoRow label="Pincode" value={data.pincode} />
        </div>

        <div className="px-6 pb-6">
          {data.phone && (
            <>
              <a
                href={`tel:${data.phone}`}
                className="block w-full bg-gray-900 text-white text-sm text-center py-3 rounded-xl"
              >
                📞 Call Owner
              </a>

              <div className="mt-3">
                <LocationButton color="gray" />
              </div>
            </>
          )}

          <p className="text-center text-xs text-gray-300 mt-4">
            Found this vehicle? Please contact the owner.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ===== PET CARD ===== */
function PetCard({ data }: { data: any }) {
  return (
    <div className="min-h-screen bg-[#fffbf0] flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl border shadow-sm overflow-hidden">

        <div className="bg-amber-500 px-6 py-5">
          <p className="text-xs text-amber-100 uppercase mb-1">Pinaka Infra</p>
          <h1 className="text-white text-xl font-semibold">
            {data.pet_name}
          </h1>
          <span className="inline-block mt-2 text-xs bg-white/20 text-white px-2 py-1 rounded-full">
            🐾 {data.pet_type || "Pet"} Tag
          </span>
        </div>

        <div className="p-6 space-y-4">
          <InfoRow label="Pet Type" value={data.pet_type || "—"} />
          <InfoRow label="Owner" value={data.owner_name || "—"} />
          <InfoRow label="Phone" value={data.phone || "—"} isPhone />
          <InfoRow label="City" value={data.city} />
          <InfoRow label="State" value={data.state} />
          <InfoRow label="Pincode" value={data.pincode} />
        </div>

        <div className="px-6 pb-6">
          {data.phone && (
            <>
              <a
                href={`tel:${data.phone}`}
                className="block w-full bg-amber-500 text-white text-sm text-center py-3 rounded-xl"
              >
                📞 Call Owner
              </a>

              <div className="mt-3">
                <LocationButton color="amber" />
              </div>
            </>
          )}

          <p className="text-center text-xs text-gray-300 mt-4">
            Found this pet? Please contact the owner.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ===== REUSABLE ===== */
function InfoRow({
  label,
  value,
  isPhone,
}: {
  label: string;
  value: string;
  isPhone?: boolean;
}) {
  return (
    <div className="flex justify-between border-b pb-3">
      <span className="text-xs text-gray-400 uppercase">{label}</span>

      {isPhone && value !== "—" ? (
        <a href={`tel:${value}`} className="text-sm text-blue-600">
          {value}
        </a>
      ) : (
        <span className="text-sm text-gray-800">{value}</span>
      )}
    </div>
  );
}