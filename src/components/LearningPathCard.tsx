import React from "react";
import { LearningPath } from "../data/learningPaths";
import { ExternalLink, Zap, BookOpen } from "lucide-react";
import ResourceCompletion from "./ResourceCompletion";

interface LearningPathCardProps {
  path: LearningPath;
}

export const LearningPathCard: React.FC<LearningPathCardProps> = ({ path }) => {
  const levelColors = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-blue-100 text-blue-800",
    Advanced: "bg-purple-100 text-purple-800",
  };

  return (
    <div className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 hover:shadow-lg hover:border-slate-300 transition-all">
      <div className="flex items-start justify-between mb-3">
        <BookOpen className="w-6 h-6 text-blue-600 flex-shrink-0" />
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded ${levelColors[path.level]}`}
        >
          {path.level}
        </span>
        <ResourceCompletion resourceId={path.id} resourceType="learning-path" />
      </div>

      <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">
        {path.title}
      </h3>

      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
        {path.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {path.topics.slice(0, 3).map((topic) => (
          <span
            key={topic}
            className="inline-flex items-center text-xs font-medium bg-slate-100 text-slate-700 px-2 py-1 rounded"
          >
            {topic}
          </span>
        ))}
        {path.topics.length > 3 && (
          <span className="text-xs text-slate-500 px-2 py-1">
            +{path.topics.length - 3} more
          </span>
        )}
      </div>

      <div className="mt-auto pt-3">
        <div className="flex flex-col gap-2 mb-4 text-sm text-slate-600">
          {path.modules && (
            <p className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              {path.modules} modules
            </p>
          )}
          {path.duration && <p>⏱️ {path.duration}</p>}
        </div>

        <a
          href={path.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Start Learning Path
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
