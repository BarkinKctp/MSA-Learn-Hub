export enum CourseLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced'
}

export interface Course {
  id: string;
  title: string;
  topics: string[];
  level: CourseLevel;
  link: string;
  isRecommended?: boolean;
  isMicrosoft?: boolean;
  details?: string;
  prerequisites?: string[];
}

export interface Category {
  id: string;
  title: string;
  description: string;
  courses: Course[];
}
