"use client";

export default function LocationButton({ color = "purple" }: { color?: "gray" | "amber" | "purple" }) {
  function handleLocation() {
    if (!navigator.geolocation) {
      alert("Location not supported on this device.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
      },
      () => {
        alert("Could not get location. Please enable location access.");
      }
    );
  }

  const styles = {
    gray: "bg-gray-800 hover:bg-gray-700 text-white",
    amber: "bg-amber-500 hover:bg-amber-600 text-white",
    purple: "bg-purple-600 hover:bg-purple-700 text-white",
  };

  return (
    <button
      onClick={handleLocation}
      className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium transition-colors ${styles[color]}`}
    >
      📍 Share My Location
    </button>
  );
}