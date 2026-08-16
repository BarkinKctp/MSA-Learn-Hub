import { useEffect, useState } from "react";
import { Check } from "lucide-react";

interface ResourceCompletionProps {
  resourceId: string;
  resourceType: "module" | "learning-path" | "certification";
}

export default function ResourceCompletion({
  resourceId,
  resourceType,
}: ResourceCompletionProps) {
  const storageKey = `completed-${resourceType}-${resourceId}`;

  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setCompleted(saved === "true");
  }, [storageKey]);

  const toggleCompleted = () => {
    const newValue = !completed;

    setCompleted(newValue);

    if (newValue) {
      localStorage.setItem(storageKey, "true");
    } else {
      localStorage.removeItem(storageKey);
    }
  };

  return (
    <button
      onClick={toggleCompleted}
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold border cursor-pointer transition-all duration-150 ${
        completed
          ? "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100"
          : "bg-white text-slate-500 border-slate-300 hover:text-[#0078d4] hover:border-[#0078d4] hover:bg-[#0078d4]/5"
      }`}
      title={completed ? "Click to mark as incomplete" : "Mark as completed"}
    >
      <Check size={12} strokeWidth={2.5} />
      {completed ? "Completed" : "Incomplete"}
    </button>
  );
}
