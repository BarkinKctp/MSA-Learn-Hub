import React from "react";
import { COURSE_DATA } from "../data/courses";
import { CategorySection } from "./CategorySection";
import { ViewTabs, ViewType } from "./ViewTabs";
import { Layers3 } from "lucide-react";

interface ModulesViewProps {
  searchQuery: string;
  scrollToSection: (id: string) => void;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  selectedSidebarId: string;
}

const matchesSidebarFilter = (value: string, selectedSidebarId: string) => {
  if (
    !selectedSidebarId ||
    selectedSidebarId.endsWith("all-modules") ||
    selectedSidebarId === "all"
  ) {
    return true;
  }

  const haystack = value.toLowerCase();
  const isAZ900 = /az-900/i.test(haystack);

  switch (selectedSidebarId) {
    case "foundations-modules":
      return (
        isAZ900 ||
        /ai-901|sc-900|pl-900|dp-900|github foundations|fundamentals/i.test(
          haystack,
        )
      );

    case "cybersecurity-modules":
      return (
        isAZ900 ||
        /security|cybersecurity|identity|zero trust|compliance|entra/i.test(
          haystack,
        )
      );

    case "azure-modules":
      return (
        isAZ900 ||
        (/azure/i.test(haystack) &&
          !/power platform|pl-900|pl-300|fabric|dp-|ai-|security|identity|zero trust|github/i.test(
            haystack,
          ))
      );

    case "ai-modules":
      return (
        isAZ900 ||
        /ai|machine learning|generative ai|azure ai|foundry|copilot/i.test(
          haystack,
        )
      );

    case "power-platform-modules":
      return (
        isAZ900 ||
        /power platform|power bi|power automate|power apps|dataverse|pl-900|pl-300/i.test(
          haystack,
        )
      );

    case "data-modules":
      return (
        isAZ900 ||
        /dp-900|dp-600|dp-300|fabric|database|data engineering|data analyst|sql/i.test(
          haystack,
        )
      );

    case "devops-modules":
      return (
        isAZ900 ||
        /devops|github actions|ci\/cd|automation|pipeline/i.test(haystack)
      );

    case "github-modules":
      return /github/i.test(haystack) && !isAZ900;

    default:
      return true;
  }
};

export const ModulesView: React.FC<ModulesViewProps> = ({
  searchQuery,
  scrollToSection,
  activeView,
  onViewChange,
  selectedSidebarId,
}) => {
  const filteredData = COURSE_DATA.map((category) => ({
    ...category,
    courses: category.courses.filter(
      (course) =>
        // ModulesView should contain actual Microsoft Learn modules only
        course.link.includes("/training/modules/") &&
        matchesSidebarFilter(
          `${course.title} ${course.details ?? ""} ${course.topics.join(" ")}`,
          selectedSidebarId,
        ) &&
        (course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.topics.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase()),
          )),
    ),
  })).filter((category) => category.courses.length > 0);

  return (
    <div>
      {!searchQuery && (
        <div className="mb-10 rounded-2xl bg-gradient-to-br from-violet-900 via-violet-800 to-indigo-900 overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(255,255,255,1) 28px,rgba(255,255,255,1) 29px),repeating-linear-gradient(90deg,transparent,transparent 28px,rgba(255,255,255,1) 28px,rgba(255,255,255,1) 29px)",
            }}
          />
          <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12">
            <div className="flex items-center gap-3 mb-3">
              <Layers3 className="w-8 h-8 text-violet-300" />
              <span className="text-sm font-semibold text-violet-300 uppercase tracking-wider">
                Practical Modules
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
              Learn by Building Skills
            </h2>
            <p className="text-violet-100 text-base leading-relaxed max-w-2xl">
              Explore focused, hands-on modules across Azure, AI, security,
              Power Platform, and GitHub so you can turn learning into real,
              job-ready capability.
            </p>
          </div>
        </div>
      )}

      {/* Tabs below banner */}
      <div className="mb-8">
        <ViewTabs activeView={activeView} onViewChange={onViewChange} />
      </div>

      {filteredData.length > 0 ? (
        filteredData.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))
      ) : (
        <div className="text-center py-20">
          <h3 className="text-lg font-medium text-slate-900">
            No modules found
          </h3>
          <p className="mt-1 text-slate-500">
            Try adjusting your search terms.
          </p>
        </div>
      )}
    </div>
  );
};
