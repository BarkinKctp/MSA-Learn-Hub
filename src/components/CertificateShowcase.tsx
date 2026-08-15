import React, { useState, useEffect } from "react";

interface CertMeta {
  id: string;
  src: string;
  alt: string;
  rotate: string;
  translateX: string;
  translateY: string;
  zIndex: number;
}

const certs: CertMeta[] = [
  {
    id: "ms",
    src: "/MicrosoftCertification.pngL.png",
    alt: "Microsoft Certified Expert Certificate",
    rotate: "0deg",
    translateX: "0px",
    translateY: "0px",
    zIndex: 1,
  },
];

export const CertificateShowcase: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<CertMeta | null>(null);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  useEffect(() => {
    document.body.style.overflow = expanded ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [expanded]);

  return (
    <>
      <div
        className="relative flex items-center justify-center"
        style={{ height: "220px" }}
      >
        {certs.map((cert) => {
          const isHovered = hovered === cert.id;
          return (
            <div
              key={cert.id}
              onMouseEnter={() => setHovered(cert.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setExpanded(cert)}
              className="absolute cursor-pointer select-none"
              style={{
                width: "240px",
                zIndex: isHovered ? 20 : cert.zIndex,
                transform: isHovered
                  ? "rotate(0deg) translateX(0px) translateY(-20px) scale(1.1)"
                  : `rotate(${cert.rotate}) translateX(${cert.translateX}) translateY(${cert.translateY}) scale(1)`,
                transition:
                  "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s, opacity 0.3s",
                filter:
                  hovered && !isHovered
                    ? "brightness(0.55) saturate(0.6)"
                    : "brightness(1) saturate(1)",
                opacity: hovered && !isHovered ? 0.7 : 1,
                borderRadius: "6px",
                boxShadow: isHovered
                  ? "0 22px 44px rgba(0,0,0,0.4), 0 8px 16px rgba(0,0,0,0.25)"
                  : "0 6px 18px rgba(0,0,0,0.3)",
              }}
            >
              <img
                src={cert.src}
                alt={cert.alt}
                draggable={false}
                style={{ width: "100%", borderRadius: "6px", display: "block" }}
              />
            </div>
          );
        })}
      </div>

      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12 animate-in fade-in duration-200"
          style={{
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
          }}
          onClick={() => setExpanded(null)}
        >
          <img
            src={expanded.src}
            alt={expanded.alt}
            draggable={false}
            onClick={(e) => e.stopPropagation()}
            className="animate-in zoom-in-75 duration-300"
            style={{
              maxWidth: "88vw",
              maxHeight: "88vh",
              width: "auto",
              height: "auto",
              borderRadius: "10px",
              boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
            }}
          />
          <button
            onClick={() => setExpanded(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-9 h-9 flex items-center justify-center text-xl transition-colors"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
};
