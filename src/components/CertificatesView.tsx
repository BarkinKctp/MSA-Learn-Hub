import React from "react";
import { CERTIFICATES } from "../data/certificates";
import { CertificateCard } from "./CertificateCard";
import { ViewTabs, ViewType } from "./ViewTabs";
import { Award } from "lucide-react";

interface CertificatesViewProps {
  searchQuery: string;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  selectedSidebarId: string;
}

const matchesSidebarFilter = (
  cert: (typeof CERTIFICATES)[number],
  selectedSidebarId: string,
) => {
  if (
    !selectedSidebarId ||
    selectedSidebarId.endsWith("all-certificates") ||
    selectedSidebarId === "all"
  ) {
    return true;
  }

  const haystack =
    `${cert.title} ${cert.description} ${cert.examCode ?? ""} ${cert.topics.join(" ")}`.toLowerCase();

  switch (selectedSidebarId) {
    case "foundations-certificates":
      return (
        cert.level === "Beginner" &&
        /(?:^|\b)(az-900|ai-901|sc-900|pl-900|dp-900|github foundations|github fundamentals)(?:$|\b)/i.test(
          haystack,
        )
      );
    case "cybersecurity-certificates":
      if (/az-900/i.test(haystack)) return true;
      return (
        /sc-300|sc-100|security|cybersecurity|identity|entra|zero trust|compliance/i.test(
          haystack,
        ) &&
        !/github|pl-|dp-|az-104|az-305|az-400|ai-103|ai-200|power platform|fabric/i.test(
          haystack,
        )
      );
    case "azure-cert":
      return (
        /az-900|az-104|az-305|az-400/i.test(haystack) &&
        !/power platform|fabric|dp-|pl-|ai-|sc-|github/i.test(haystack)
      );
    case "ai-cert":
      if (/az-900/i.test(haystack)) return true;
      return (
        /ai-901|ai-103|ai-200|azure ai|foundry|generative ai|machine learning/i.test(
          haystack,
        ) &&
        !/power platform|fabric|dp-|pl-|az-104|az-305|az-400/i.test(haystack)
      );
    case "power-platform-cert":
      if (/az-900/i.test(haystack)) return true;
      return (
        /pl-900|pl-300|power platform|power bi|power apps|power automate|dataverse/i.test(
          haystack,
        ) && !/dp-|fabric|az-104|az-305|az-400|ai-/i.test(haystack)
      );
    case "data-cert":
      if (/az-900/i.test(haystack)) return true;
      return (
        /dp-900|dp-600|dp-300|data fundamentals|fabric|database administrator|analytics engineer|sql|azure sql/i.test(
          haystack,
        ) && !/power platform|pl-|github/i.test(haystack)
      );
    case "devops-cert":
      if (/az-400/i.test(haystack)) return true;
      return (
        /devops|github actions|ci\/cd|automation|pipeline/i.test(haystack) &&
        !/power platform|pl-900|pl-300|fabric|dp-|ai-900|ai-103|ai-200|security|identity|zero trust/i.test(
          haystack,
        )
      );
    case "github-certifications":
      return (
        /github/i.test(haystack) &&
        !/az-900|az-104|az-305|az-400/i.test(haystack)
      );
    default:
      return true;
  }
};

export const CertificatesView: React.FC<CertificatesViewProps> = ({
  searchQuery,
  activeView,
  onViewChange,
  selectedSidebarId,
}) => {
  const filteredCerts = CERTIFICATES.filter(
    (cert) =>
      matchesSidebarFilter(cert, selectedSidebarId) &&
      (cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.topics.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ||
        cert.examCode?.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  return (
    <div>
      {!searchQuery && (
        <div className="mb-10 rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(255,255,255,1) 28px,rgba(255,255,255,1) 29px),repeating-linear-gradient(90deg,transparent,transparent 28px,rgba(255,255,255,1) 28px,rgba(255,255,255,1) 29px)",
            }}
          />
          <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12">
            <div className="flex items-center gap-3 mb-3">
              <Award className="w-8 h-8 text-blue-300" />
              <span className="text-sm font-semibold text-blue-300 uppercase tracking-wider">
                Microsoft Certifications
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
              Get Certified on Azure
            </h2>
            <p className="text-blue-100 text-base leading-relaxed max-w-2xl">
              Earn industry-recognized Microsoft certifications. Validate your
              skills and advance your career in cloud computing, AI, and data
              engineering.
            </p>
          </div>
        </div>
      )}

      {/* Tabs below banner */}
      <div className="mb-8">
        <ViewTabs activeView={activeView} onViewChange={onViewChange} />
      </div>

      {filteredCerts.length > 0 ? (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCerts.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Award className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900">
            No certifications found
          </h3>
          <p className="mt-1 text-slate-500">
            Try adjusting your search terms.
          </p>
        </div>
      )}
    </div>
  );
};
