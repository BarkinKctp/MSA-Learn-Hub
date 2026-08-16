import React, { useState, useEffect } from "react";
import { COURSE_DATA } from "./data/courses";
import { Search, Menu, X, Github, Linkedin } from "lucide-react";
import { ViewType } from "./components/ViewTabs";
import { CertificatesView } from "./components/CertificatesView";
import { LearningPathsView } from "./components/LearningPathsView";
import { ModulesView } from "./components/ModulesView";
import { RecommendationsBox } from "./components/RecommendationsBox";
import { RecommendationsPage } from "./components/RecommendationsPage";
import { CertificateShowcase } from "./components/CertificateShowcase";

const MS_LEARN_PLAN_URL =
  "https://learn.microsoft.com/plans/gx84i3tk8e5znj?sharingId=455E2BC2C46A8E46&wt.mc_id=studentamb_609039";

const SIDEBAR_ITEMS: Record<
  ViewType,
  { id: string; label: string; badge: string; accent: string }[]
> = {
  certificates: [
    {
      id: "all-certificates",
      label: "All",
      badge: "All",
      accent: "bg-slate-900 text-white",
    },
    {
      id: "foundations-certificates",
      label: "Foundations",
      badge: "Core",
      accent: "bg-emerald-100 text-emerald-700",
    },
    {
      id: "cybersecurity-certificates",
      label: "CyberSecurity",
      badge: "Sec",
      accent: "bg-red-100 text-red-700",
    },
    {
      id: "azure-cert",
      label: "Azure",
      badge: "Cloud",
      accent: "bg-blue-100 text-blue-700",
    },
    {
      id: "ai-cert",
      label: "AI",
      badge: "AI",
      accent: "bg-violet-100 text-violet-700",
    },
    {
      id: "power-platform-cert",
      label: "Power Platform",
      badge: "PL",
      accent: "bg-cyan-100 text-cyan-700",
    },
    {
      id: "data-cert",
      label: "Data",
      badge: "DP",
      accent: "bg-amber-100 text-amber-700",
    },
    {
      id: "devops-cert",
      label: "DevOps",
      badge: "Ops",
      accent: "bg-indigo-100 text-indigo-700",
    },
    {
      id: "github-certifications",
      label: "GitHub Certifications",
      badge: "GitHub",
      accent: "bg-slate-200 text-slate-700",
    },
  ],
  learningPaths: [
    {
      id: "all-learning-paths",
      label: "All",
      badge: "All",
      accent: "bg-slate-900 text-white",
    },
    {
      id: "foundations-learning-paths",
      label: "Foundations",
      badge: "Core",
      accent: "bg-emerald-100 text-emerald-700",
    },
    {
      id: "cybersecurity-learning-paths",
      label: "CyberSecurity",
      badge: "Sec",
      accent: "bg-red-100 text-red-700",
    },
    {
      id: "azure-path",
      label: "Azure",
      badge: "Cloud",
      accent: "bg-blue-100 text-blue-700",
    },
    {
      id: "ai-path",
      label: "AI",
      badge: "AI",
      accent: "bg-violet-100 text-violet-700",
    },
    {
      id: "power-platform-path",
      label: "Power Platform",
      badge: "PL",
      accent: "bg-cyan-100 text-cyan-700",
    },
    {
      id: "data-path",
      label: "Data",
      badge: "DP",
      accent: "bg-amber-100 text-amber-700",
    },
    {
      id: "devops-path",
      label: "DevOps",
      badge: "Ops",
      accent: "bg-indigo-100 text-indigo-700",
    },
    {
      id: "github-path",
      label: "GitHub Certifications",
      badge: "GitHub",
      accent: "bg-slate-200 text-slate-700",
    },
  ],
  modules: [
    {
      id: "all-modules",
      label: "All",
      badge: "All",
      accent: "bg-slate-900 text-white",
    },
    {
      id: "foundations-modules",
      label: "Foundations",
      badge: "Core",
      accent: "bg-emerald-100 text-emerald-700",
    },
    {
      id: "cybersecurity-modules",
      label: "CyberSecurity",
      badge: "Sec",
      accent: "bg-red-100 text-red-700",
    },
    {
      id: "azure-modules",
      label: "Azure",
      badge: "Cloud",
      accent: "bg-blue-100 text-blue-700",
    },
    {
      id: "ai-modules",
      label: "AI",
      badge: "AI",
      accent: "bg-violet-100 text-violet-700",
    },
    {
      id: "power-platform-modules",
      label: "Power Platform",
      badge: "PL",
      accent: "bg-cyan-100 text-cyan-700",
    },
    {
      id: "data-modules",
      label: "Data",
      badge: "DP",
      accent: "bg-amber-100 text-amber-700",
    },
    {
      id: "devops-modules",
      label: "DevOps",
      badge: "Ops",
      accent: "bg-indigo-100 text-indigo-700",
    },
    {
      id: "github-modules",
      label: "GitHub Certifications",
      badge: "GitHub",
      accent: "bg-slate-200 text-slate-700",
    },
  ],
};

const getDefaultSidebarId = (view: ViewType): string => {
  switch (view) {
    case "certificates":
      return "all-certificates";
    case "learningPaths":
      return "all-learning-paths";
    case "modules":
    default:
      return "all-modules";
  }
};

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("simple-intros");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState<ViewType>("modules");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedSidebarId, setSelectedSidebarId] =
    useState<string>("all-modules");
  const [viewMode, setViewMode] = useState<"main" | "recommendations">("main");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    setSelectedSidebarId(getDefaultSidebarId(activeView));
  }, [activeView]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [viewMode]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = COURSE_DATA.map((c) => document.getElementById(c.id));
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        if (
          section &&
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveSection(section.id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <div
            className="flex items-center cursor-pointer shrink-0"
            onClick={() => {
              setViewMode("main");
              setSidebarOpen(true);
              setIsMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {/* MSA Logo */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 mr-2.5 shrink-0">
              <img
                src="/msa-logo.svg"
                alt="MSA Learn Hub"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Brand Name */}
            <h1 className="text-base sm:text-xl font-black tracking-tight text-slate-900 whitespace-nowrap">
              MSA
              <span className="text-slate-500 font-semibold"> Learn Hub</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search topics, courses..."
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={MS_LEARN_PLAN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100"
            >
              MS Learn Plan
            </a>
            <a
              href="https://github.com/BarkinKctp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-900 hidden md:block"
              aria-label="GitHub profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <button
              className="md:hidden p-2 text-slate-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 p-3 animate-in slide-in-from-top-5">
            <nav className="space-y-1">
              {SIDEBAR_ITEMS[activeView].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedSidebarId(item.id);
                    setSearchQuery("");
                    setActiveSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-between gap-2 ${
                    selectedSidebarId === item.id
                      ? "bg-[#0078d4]/10 text-[#005a9e] ring-1 ring-[#0078d4]/30"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="truncate">{item.label}</span>

                  <span
                    className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded-full ${item.accent}`}
                  >
                    {item.badge}
                  </span>
                </button>
              ))}
            </nav>

            <div className="mt-3 pt-3 border-t border-slate-200">
              <RecommendationsBox
                onNavigateToRecommendations={() => {
                  setViewMode("recommendations");
                  setIsMobileMenuOpen(false);
                }}
              />
            </div>
          </div>
        )}
      </header>

      <main
        className={`flex-grow pt-20 pb-12 sm:pb-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full transition-all duration-300 ${
          viewMode === "recommendations"
            ? "lg:pl-0"
            : sidebarOpen
              ? "lg:pl-72"
              : "lg:pl-16"
        }`}
      >
        {viewMode === "main" && !sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="hidden lg:flex fixed left-4 top-24 z-30 items-center justify-center w-10 h-10 rounded-xl border border-slate-200 bg-white/90 backdrop-blur-sm text-slate-700 shadow-lg shadow-slate-200/60 hover:shadow-xl hover:-translate-x-0.5 hover:border-slate-300 transition-all duration-200"
            title="Show sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {viewMode === "main" && sidebarOpen && (
          <aside className="hidden lg:flex fixed left-0 top-16 bottom-0 z-20 w-72 flex-col border-r border-slate-200 bg-slate-50/80 backdrop-blur-sm px-3 py-4 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200/80 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 shadow-sm transition-all duration-200 hover:-translate-x-0.5"
                title="Hide sidebar"
              >
                <Menu className="w-4 h-4" />
              </button>
              <span>
                {activeView === "certificates"
                  ? "Certifications"
                  : activeView === "learningPaths"
                    ? "Learning Paths"
                    : "Modules"}
              </span>
            </div>

            <div className="flex h-full flex-col">
              <nav className="space-y-1.5">
                {SIDEBAR_ITEMS[activeView].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedSidebarId(item.id);
                      setSearchQuery("");
                      setActiveSection(item.id);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-between gap-2 group hover:-translate-x-0.5 ${
                      selectedSidebarId === item.id
                        ? "bg-[#0078d4]/10 text-[#005a9e] shadow-sm ring-1 ring-[#0078d4]/30"
                        : "text-slate-700 hover:bg-[#0078d4]/8 hover:text-[#003a70] hover:shadow-sm"
                    }`}
                  >
                    <span className="truncate flex-1">{item.label}</span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded-full ${item.accent}`}
                    >
                      {item.badge}
                    </span>
                  </button>
                ))}
              </nav>

              {viewMode === "main" && (
                <div className="mt-auto pt-3">
                  <RecommendationsBox
                    onNavigateToRecommendations={() =>
                      setViewMode("recommendations")
                    }
                  />
                </div>
              )}
            </div>
          </aside>
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {viewMode === "main" ? (
            <>
              {/* Content based on active view */}
              {activeView === "certificates" && (
                <CertificatesView
                  searchQuery={searchQuery}
                  activeView={activeView}
                  onViewChange={(nextView) => {
                    setActiveView(nextView);
                    setSelectedSidebarId(getDefaultSidebarId(nextView));
                  }}
                  selectedSidebarId={selectedSidebarId}
                />
              )}
              {activeView === "learningPaths" && (
                <LearningPathsView
                  searchQuery={searchQuery}
                  activeView={activeView}
                  onViewChange={(nextView) => {
                    setActiveView(nextView);
                    setSelectedSidebarId(getDefaultSidebarId(nextView));
                  }}
                  selectedSidebarId={selectedSidebarId}
                />
              )}
              {activeView === "modules" && (
                <ModulesView
                  searchQuery={searchQuery}
                  scrollToSection={scrollToSection}
                  activeView={activeView}
                  onViewChange={(nextView) => {
                    setActiveView(nextView);
                    setSelectedSidebarId(getDefaultSidebarId(nextView));
                  }}
                  selectedSidebarId={selectedSidebarId}
                />
              )}

              {/* Footer */}
              <footer className="mt-12 pt-8 border-t border-slate-200 text-center text-slate-500 text-sm">
                <div className="mt-8 mb-8 p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-100 block w-full sm:inline-block sm:max-w-2xl">
                  <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-8">
                    <a
                      href="https://www.linkedin.com/in/barkin-kocatepe-6a43922a2/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-slate-600 hover:text-blue-600 transition-all duration-200 group"
                    >
                      <div className="p-1.5 bg-white rounded-full border border-slate-200 group-hover:border-blue-200 shadow-sm mr-2 group-hover:bg-blue-50">
                        <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                      </div>
                      <span className="font-medium">LinkedIn</span>
                    </a>
                    <a
                      href="https://github.com/BarkinKctp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-slate-600 hover:text-blue-600 transition-all duration-200 group"
                    >
                      <div className="p-1.5 bg-white rounded-full border border-slate-200 group-hover:border-blue-200 shadow-sm mr-2 group-hover:bg-blue-50">
                        <Github className="w-4 h-4 text-slate-700" />
                      </div>
                      <span className="font-medium">GitHub</span>
                    </a>
                  </div>
                </div>

                <p className="mt-2 text-slate-400">
                  © {new Date().getFullYear()} MSA Learn Hub. Licensed under
                  MIT.
                </p>
              </footer>
            </>
          ) : (
            <RecommendationsPage onBack={() => setViewMode("main")} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
