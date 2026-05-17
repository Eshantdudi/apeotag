"use client";

type Props = {
  tagId: string;
  color?: "purple" | "green";
};

export default function CallButton({ tagId, color = "purple" }: Props) {
  function handleCall() {
    window.location.href = `/api/call/${tagId}`;
  }

  const styles =
    color === "green"
      ? {
          background: "linear-gradient(135deg, #1D9E75 0%, #0F6E56 100%)",
          color: "#9FE1CB",
          border: "0.5px solid rgba(93,202,165,0.3)",
        }
      : {
          background: "linear-gradient(135deg, #534AB7 0%, #3C3489 100%)",
          color: "#CECBF6",
          border: "0.5px solid rgba(127,119,221,0.3)",
        };

  return (
    <>
      <style>{`
        .pinaka-call-btn-client {
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
          cursor: pointer;
          transition: filter 0.2s, transform 0.15s;
          position: relative;
          overflow: hidden;
          border: none;
          outline: none;
          -webkit-tap-highlight-color: transparent;
        }
        .pinaka-call-btn-client::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%);
          background-size: 200% auto;
          animation: shimmer 2.5s linear infinite;
        }
        .pinaka-call-btn-client:hover {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }
        .pinaka-call-btn-client:active {
          transform: scale(0.98);
        }
      `}</style>
      <button
        onClick={handleCall}
        className="pinaka-call-btn-client"
        style={styles}
        aria-label="Call owner"
      >
        <svg
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H3.75A2.25 2.25 0 001.5 4.5v2.25z"
          />
        </svg>
        Call Owner
      </button>
    </>
  );
}