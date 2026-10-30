import type { SessionDoc } from "../types/index";

export const SESSIONS: SessionDoc[] = [
  {
    tutorId: 101,
    courseCode: "ITELECT4",
    topic: "TypeScript Generics & Tailwind CSS",
    description:
      "Master generic interfaces, utility types, and strongly typed state styled with Tailwind CSS.",
    schedule: "Mon & Wed 14:00 - 16:00",
    maxTutees: 5,
  },
  {
    tutorId: 102,
    courseCode: "CSSWENG",
    topic: "Data Structures & Algorithms in TS",
    description:
      "In-depth study of stacks, queues, binary search trees, and time complexity analysis.",
    schedule: "Tue & Thu 10:00 - 12:00",
    maxTutees: 8,
  },
  {
    tutorId: 101,
    courseCode: "ITELECT4",
    topic: "CSS Grid, Flexbox & Responsive Layouts",
    description:
      "Learn modern layout techniques, CSS custom properties, and responsive Tailwind design.",
    schedule: "Fri 13:00 - 15:00",
    maxTutees: 6,
  },
  {
    tutorId: 102,
    courseCode: "ITELECT4",
    topic: "Custom React Hooks & Dark Mode Integration",
    description:
      "Building custom reusable hooks with class-based dark mode and state synchronization.",
    schedule: "Sat 09:00 - 11:00",
    maxTutees: 4,
  },
];
