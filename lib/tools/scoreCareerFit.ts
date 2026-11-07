import { tool } from "ai";
import { z } from "zod";
import { careers, type Career } from "@/lib/data/careers";
await new Promise((r) => setTimeout(r, 3000)); // remove after testing

const norm = (s: string) => s.trim().toLowerCase();

const scoreCareer = (career: Career, userSkills: string[]) => {
  const have = new Set(userSkills.map(norm));
  const matchedCore = career.coreSkills.filter((s) => have.has(norm(s)));
  const matchedBonus = career.bonusSkills.filter((s) => have.has(norm(s)));

  const coreRatio = matchedCore.length / career.coreSkills.length;
  const bonusRatio = matchedBonus.length / career.bonusSkills.length;

  let score = (coreRatio * 0.8 + bonusRatio * 0.2) * 100;
  if (coreRatio < 0.5) score = score * 0.5; // conservative: punish low core coverage

  return {
    career: career.title,
    score: Math.round(score),
    matched: [...matchedCore, ...matchedBonus],
    missing: career.coreSkills.filter((s) => !have.has(norm(s))),
  };
};

export const scoreCareerFit = tool({
  description:
    "Scores how well the user's skills fit each career. Call this whenever the user lists their skills.",
  inputSchema: z.object({
skills: z
  .array(z.string())
  .min(1)
  .describe("Individual skills the user said they have, like 'python' or 'react'. Never job titles."),  }),
  execute: async ({ skills }) => {
    const results = careers
      .map((c) => scoreCareer(c, skills))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    return { results };
  },
});