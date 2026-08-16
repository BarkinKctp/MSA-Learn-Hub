import React, { useState } from "react";
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Star,
  BookOpen,
} from "lucide-react";
import { Course, CourseLevel } from "../types";
import ResourceCompletion from "./ResourceCompletion";

const levelColors: Record<CourseLevel, string> = {
  [CourseLevel.Beginner]: "bg-green-100 text-green-700",
  [CourseLevel.Intermediate]: "bg-yellow-100 text-yellow-700",
  [CourseLevel.Advanced]: "bg-red-100 text-red-700",
};

const isMicrosoftLink = (course: Course) =>
  course.isMicrosoft ||
  course.link.includes("microsoft.com") ||
  course.link.includes("learn.microsoft.com");

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMS = isMicrosoftLink(course);
  const hasExtraTopics = course.topics.length > 4;
  const showMoreButton = Boolean(course.details) || hasExtraTopics;

  return (
    <div
      className={`rounded-xl overflow-hidden min-w-0 max-w-full transition-all duration-200 group flex flex-col ${
        isMS
          ? "bg-white border border-[#00a4ef]/25 hover:border-[#00a4ef]/60 hover:shadow-[0_4px_20px_rgba(0,164,239,0.18)] hover:-translate-y-0.5"
          : "bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md"
      }`}
    >
      {isMS && (
        <div className="h-[3px] w-full flex flex-shrink-0">
          <div className="flex-1 bg-[#f25022]" />
          <div className="flex-1 bg-[#7fba00]" />
          <div className="flex-1 bg-[#00a4ef]" />
          <div className="flex-1 bg-[#ffb900]" />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        {isMS && (
          <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-[#00a4ef]/15">
            <div className="flex flex-wrap w-[14px] h-[14px] gap-[2px] flex-shrink-0">
              <div className="w-[5.5px] h-[5.5px] bg-[#f25022] rounded-[1px]" />
              <div className="w-[5.5px] h-[5.5px] bg-[#7fba00] rounded-[1px]" />
              <div className="w-[5.5px] h-[5.5px] bg-[#00a4ef] rounded-[1px]" />
              <div className="w-[5.5px] h-[5.5px] bg-[#ffb900] rounded-[1px]" />
            </div>
            <span className="text-[10px] font-bold text-[#0078d4] uppercase tracking-widest">
              Microsoft Learn
            </span>
            <span className="ml-auto text-[10px] bg-[#0078d4]/10 text-[#0078d4] font-semibold px-2 py-0.5 rounded-full">
              Official
            </span>
            <ResourceCompletion resourceId={course.id} resourceType="module" />
          </div>
        )}

        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {course.isRecommended && (
                <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 fill-yellow-500" />
              )}
              <h3
                className={`text-base font-semibold leading-tight line-clamp-2 ${isMS ? "text-[#003a70]" : "text-slate-900"}`}
              >
                {course.title}
              </h3>
            </div>
            <span
              className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${levelColors[course.level]}`}
            >
              {course.level}
            </span>
          </div>
          {!isMS && (
            <a
              href={course.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors hidden sm:flex"
              title="Open course in new tab"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {course.topics
            .slice(0, isExpanded ? course.topics.length : 4)
            .map((topic) => (
              <span
                key={topic}
                className={`text-xs px-2 py-0.5 rounded-md ${
                  isMS
                    ? "bg-[#0078d4]/8 text-[#005a9e] font-medium"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {topic}
              </span>
            ))}
          {!isExpanded && course.topics.length > 4 && (
            <span className="text-xs text-slate-400 px-1 py-0.5">
              +{course.topics.length - 4} more
            </span>
          )}
        </div>

        {showMoreButton && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center gap-1 text-xs font-medium transition-colors ${
              isMS
                ? "text-[#0078d4] hover:text-[#005a9e]"
                : "text-blue-600 hover:text-blue-800"
            }`}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-3 h-3" /> Less details
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3" /> More details
              </>
            )}
          </button>
        )}

        {isExpanded && (
          <div className="mt-3 min-w-0 max-w-full space-y-3 animate-in fade-in slide-in-from-top-2">
            <p className="text-sm text-slate-600 leading-relaxed break-words">
              {course.details}
            </p>
            {course.prerequisites && course.prerequisites.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Prerequisites
                </p>
                <ul className="text-sm text-slate-600 space-y-0.5">
                  {course.prerequisites.map((prereq) => (
                    <li
                      key={prereq}
                      className="flex items-start gap-1.5 min-w-0 break-words"
                    >
                      <BookOpen className="w-3 h-3 text-slate-400 flex-shrink-0" />
                      {prereq}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {!isMS && (
          <a
            href={course.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto pt-4 flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-lg transition-colors min-h-[44px]"
          >
            Start Course <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
          </a>
        )}

        {isMS && (
          <a
            href={course.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto pt-4 flex items-center justify-center gap-2 w-full px-3 py-2.5 bg-[#0078d4] hover:bg-[#005a9e] active:bg-[#004578] text-white text-sm font-semibold rounded-lg transition-colors shadow-sm hover:shadow-md min-h-[44px]"
          >
            <span className="text-center leading-tight">Start Course</span>
            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
          </a>
        )}
      </div>
    </div>
  );
};
