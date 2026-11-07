export type Career = {
  title: string;
  coreSkills: string[];
  bonusSkills: string[];
};

export const careers: Career[] = [
  {
    title: "Frontend Developer",
    coreSkills: ["html", "css", "javascript", "react"],
    bonusSkills: ["typescript", "figma"],
  },
  {
    title: "Data Analyst",
    coreSkills: ["sql", "excel", "python", "statistics"],
    bonusSkills: ["power bi", "tableau"],
  },
  {
    title: "AI Engineer",
    coreSkills: ["python", "machine learning", "apis", "prompt engineering"],
    bonusSkills: ["rag", "docker"],
  },
];