import React from "react";
import { Star, ArrowLeft, Zap, Target, Lightbulb, Users } from "lucide-react";

interface RecommendationsPageProps {
  onBack: () => void;
}

export const RecommendationsPage: React.FC<RecommendationsPageProps> = ({
  onBack,
}) => {
  const recommendations = [
    {
      id: 1,
      title: "Start Your Azure Journey",
      description:
        "If you're new to cloud computing, begin with Azure Fundamentals (AZ-900). This is the foundation for all other Azure certifications.",
      icon: Zap,
      steps: [
        "Complete Azure Fundamentals module",
        "Pass the AZ-900 exam",
        "Move to role-based certifications",
      ],
    },
    {
      id: 2,
      title: "Build Web Applications",
      description:
        "Learn modern web development with Azure App Service. Perfect if you want to build and deploy full-stack applications.",
      icon: Target,
      steps: [
        "Master web development basics",
        "Learn Azure App Service",
        "Deploy your first application",
      ],
    },
    {
      id: 3,
      title: "Explore Generative AI",
      description:
        "Discover the power of Large Language Models and Azure OpenAI. Build intelligent applications with AI capabilities.",
      icon: Lightbulb,
      steps: [
        "Understand AI fundamentals",
        "Learn prompt engineering",
        "Build with Azure OpenAI",
      ],
    },
    {
      id: 4,
      title: "Master Data Engineering",
      description:
        "Design and implement modern data solutions. Perfect for handling big data and analytics at scale.",
      icon: Users,
      steps: [
        "Learn data engineering concepts",
        "Master ETL patterns",
        "Implement data lakes on Azure",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Learning
        </button>

        <div className="rounded-2xl bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(255,255,255,1) 28px,rgba(255,255,255,1) 29px),repeating-linear-gradient(90deg,transparent,transparent 28px,rgba(255,255,255,1) 28px,rgba(255,255,255,1) 29px)",
            }}
          />
          <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12">
            <div className="flex items-center gap-3 mb-3">
              <Star className="w-8 h-8 text-amber-300" />
              <span className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
                Personalized Recommendations
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
              Your Learning Journey Starts Here
            </h1>
            <p className="text-amber-100 text-base leading-relaxed max-w-2xl">
              Explore recommended learning paths tailored to help you achieve
              your goals in cloud computing, AI, and modern development.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2">
        {recommendations.map((rec) => {
          const Icon = rec.icon;
          return (
            <div
              key={rec.id}
              className="group rounded-xl border border-slate-200 bg-white p-6 hover:shadow-lg hover:border-slate-300 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {rec.title}
                </h3>
              </div>

              <p className="text-sm text-slate-600 mb-5">{rec.description}</p>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Recommended steps:
                </p>
                <ol className="space-y-2">
                  {rec.steps.map((step, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-slate-700">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-600 font-semibold text-xs flex-shrink-0">
                        {idx + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 rounded-xl bg-slate-50 border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-3">💡 Pro Tips</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li>✓ Start with fundamentals before jumping to advanced topics</li>
          <li>✓ Combine learning paths with hands-on labs for best results</li>
          <li>
            ✓ Practice regularly and aim to complete one certification per
            quarter
          </li>
          <li>✓ Join the Microsoft Learn community for support and updates</li>
          <li>✓ Build real projects to reinforce your learning</li>
        </ul>
      </div>
    </div>
  );
};
