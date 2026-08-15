import React from "react";
import { LEARNING_PATHS } from "../data/learningPaths";
import { LearningPathCard } from "./LearningPathCard";
import { ViewTabs, ViewType } from "./ViewTabs";
import { BookOpen } from "lucide-react";

interface LearningPathsViewProps {
  searchQuery: string;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  selectedSidebarId: string;
}

const matchesSidebarFilter = (
  path: (typeof LEARNING_PATHS)[number],
  selectedSidebarId: string,
) => {
  if (
    !selectedSidebarId ||
    selectedSidebarId.endsWith("all-learning-paths") ||
    selectedSidebarId === "all"
  ) {
    return true;
  }

  const haystack =
    `${path.title} ${path.description} ${path.topics.join(" ")} ${
      path.certificates?.join(" ") ?? ""
    }`.toLowerCase();

  const isAZ900 = /az-900/i.test(haystack);
  const isAZ400 = /az-400/i.test(haystack);

  switch (selectedSidebarId) {
    case "foundations-learning-paths":
      return (
        isAZ900 ||
        /ai-901|sc-900|pl-900|dp-900|github foundations/i.test(haystack)
      );

    case "cybersecurity-learning-paths":
      return isAZ900 || /sc-900|sc-300|sc-100/i.test(haystack);

    case "azure-path":
      return isAZ900 || isAZ400 || /az-104|az-305/i.test(haystack);

    case "ai-path":
      return isAZ900 || /ai-901|ai-103|ai-200/i.test(haystack);

    case "power-platform-path":
      return isAZ900 || /pl-900|pl-300/i.test(haystack);

    case "data-path":
      return isAZ900 || /dp-900|dp-600|dp-300/i.test(haystack);

    case "devops-path":
      return (
        isAZ900 ||
        isAZ400 ||
        /devops|ci\/cd|automation|pipeline/i.test(haystack)
      );

    case "github-path":
      return /github foundations|github actions|github copilot|github administration/i.test(
        haystack,
      );

    default:
      return true;
  }
};

export const LearningPathsView: React.FC<LearningPathsViewProps> = ({
  searchQuery,
  activeView,
  onViewChange,
  selectedSidebarId,
}) => {
  const filteredPaths = LEARNING_PATHS.filter(
    (path) =>
      matchesSidebarFilter(path, selectedSidebarId) &&
      (path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        path.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        path.topics.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        )),
  );

  return (
    <div>
      {!searchQuery && (
        <div className="mb-10 rounded-2xl bg-gradient-to-br from-orange-900 via-orange-800 to-orange-900 overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(255,255,255,1) 28px,rgba(255,255,255,1) 29px),repeating-linear-gradient(90deg,transparent,transparent 28px,rgba(255,255,255,1) 28px,rgba(255,255,255,1) 29px)",
            }}
          />
          <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="w-8 h-8 text-orange-300" />
              <span className="text-sm font-semibold text-orange-300 uppercase tracking-wider">
                Structured Learning Paths
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
              Learn Through Guided Paths
            </h2>
            <p className="text-orange-100 text-base leading-relaxed max-w-2xl">
              Follow structured learning journeys designed by Microsoft experts.
              Each path guides you from foundational concepts to advanced skills
              across Azure, AI, Data Engineering, and more.
            </p>
          </div>
        </div>
      )}

      {/* Tabs below banner */}
      <div className="mb-8">
        <ViewTabs activeView={activeView} onViewChange={onViewChange} />
      </div>

      {filteredPaths.length > 0 ? (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPaths.map((path) => (
            <LearningPathCard key={path.id} path={path} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900">
            No learning paths found
          </h3>
          <p className="mt-1 text-slate-500">
            Try adjusting your search terms.
          </p>
        </div>
      )}
    </div>
  );
};
