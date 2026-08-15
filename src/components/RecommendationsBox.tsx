import React from "react";
import { Star, ArrowRight } from "lucide-react";

interface RecommendationsBoxProps {
  onNavigateToRecommendations: () => void;
}

export const RecommendationsBox: React.FC<RecommendationsBoxProps> = ({
  onNavigateToRecommendations,
}) => {
  return (
    <div className="w-full max-w-full rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-3">
      <div className="flex items-center gap-2 mb-2">
        <Star className="w-4 h-4 text-amber-500" />
        <h4 className="font-bold text-xs text-amber-900">
          Recommended for You
        </h4>
      </div>
      <p className="text-[11px] leading-relaxed text-amber-800 mb-3">
        General Recommendations about certifications and Microsoft Services.
      </p>
      <button
        onClick={onNavigateToRecommendations}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-3 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-amber-600"
      >
        View Recommendations
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
};
