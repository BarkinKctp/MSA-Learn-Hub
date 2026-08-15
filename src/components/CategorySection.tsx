import React from "react";
import { Category } from "../types";
import { CourseCard } from "./CourseCard";

interface CategorySectionProps {
  category: Category;
}

const sortMicrosoftFirst = (courses: Category["courses"]) =>
  [...courses].sort((a, b) => {
    const aMS = !!(a.isMicrosoft || a.link.includes("microsoft.com"));
    const bMS = !!(b.isMicrosoft || b.link.includes("microsoft.com"));
    if (aMS && !bMS) return -1;
    if (!aMS && bMS) return 1;
    return 0;
  });

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
}) => {
  const sortedCourses = sortMicrosoftFirst(category.courses);

  return (
    <section id={category.id} className="mb-10 scroll-mt-20">
      <div className="mb-5 px-1 py-1">
        <h2
          className="text-xl sm:text-2xl font-bold mb-1 leading-snug text-slate-900"
          style={{
            textShadow:
              "-1px -1px 0 #eeeeee, 1px -1px 0 #eeeeee, -1px 1px 0 #eeeeee, 1px 1px 0 #eeeeee, 0 1px 0 rgba(150,150,150,0.01)",
          }}
        >
          {category.title}
        </h2>
        <p className="text-slate-600 text-sm">{category.description}</p>
      </div>
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {sortedCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
};
