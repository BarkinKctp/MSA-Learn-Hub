import React, { useState } from "react";
import { Certificate } from "../data/certificates";
import { ExternalLink, Award, ChevronDown, ChevronUp } from "lucide-react";

interface CertificateCardProps {
  certificate: Certificate;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const levelColors = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-blue-100 text-blue-800",
    Advanced: "bg-purple-100 text-purple-800",
  };

  return (
    <div className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 hover:shadow-lg hover:border-slate-300 transition-all">
      <div className="flex items-start justify-between mb-3">
        <Award className="w-6 h-6 text-blue-600 flex-shrink-0" />
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded ${levelColors[certificate.level]}`}
        >
          {certificate.level}
        </span>
      </div>

      <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">
        {certificate.title}
      </h3>

      {certificate.examCode && (
        <p className="text-xs text-slate-500 font-mono mb-2">
          Exam: {certificate.examCode}
        </p>
      )}

      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
        {certificate.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {certificate.topics
          .slice(0, isExpanded ? certificate.topics.length : 3)
          .map((topic) => (
            <span
              key={topic}
              className="inline-flex items-center text-xs font-medium bg-slate-100 text-slate-700 px-2 py-1 rounded"
            >
              {topic}
            </span>
          ))}
        {!isExpanded && certificate.topics.length > 3 && (
          <span className="text-xs text-slate-500 px-2 py-1">
            +{certificate.topics.length - 3} more
          </span>
        )}
      </div>

      {certificate.description && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 mb-4 w-fit"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" /> Less details
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" /> Extend
            </>
          )}
        </button>
      )}

      {isExpanded && (
        <div className="mb-4 rounded-md bg-slate-50 p-3 text-sm text-slate-600">
          {certificate.description}
          {certificate.prerequisites &&
            certificate.prerequisites.length > 0 && (
              <ul className="mt-2 list-disc pl-5 space-y-1 text-xs text-slate-500">
                {certificate.prerequisites.map((prereq) => (
                  <li key={prereq}>{prereq}</li>
                ))}
              </ul>
            )}
        </div>
      )}

      <div className="mt-auto pt-3">
        {certificate.duration && (
          <p className="text-xs text-slate-500 mb-3">
            ⏱️ Duration: {certificate.duration}
          </p>
        )}

        <a
          href={certificate.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Start Certification
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
