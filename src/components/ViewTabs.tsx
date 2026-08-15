import React from "react";
import { Award, BookOpen, Grid3X3 } from "lucide-react";

export type ViewType = "certificates" | "learningPaths" | "modules";

interface ViewTabsProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const ViewTabs: React.FC<ViewTabsProps> = ({
  activeView,
  onViewChange,
}) => {
  const tabs = [
    {
      id: "certificates" as ViewType,
      label: "Certificates",
      icon: Award,
    },
    {
      id: "learningPaths" as ViewType,
      label: "Learning Paths",
      icon: BookOpen,
    },
    {
      id: "modules" as ViewType,
      label: "Modules",
      icon: Grid3X3,
    },
  ];

  return (
    <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeView === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onViewChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Icon className="w-4 h-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
