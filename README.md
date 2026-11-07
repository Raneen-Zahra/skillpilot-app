# SkillPilot

An AI career advisor that scores a user's skills against career paths and shows the result as a score card, built with the Vercel AI SDK, Next.js and OpenRouter.

## Tool contract

**Name:** `scoreCareerFit`
**File:** `lib/tools/scoreCareerFit.ts`

**Input schema (Zod):**
```ts
z.object({
  skills: z.array(z.string()).min(1)
})
```

**Return shape:**
```ts
{
  results: [
    { career: string, score: number, matched: string[], missing: string[] }
  ]
}
```

**How scoring works:** Each career has core and bonus skills. The score is 80% core-skill coverage plus 20% bonus-skill coverage. If the user has fewer than half of the core skills, the score is halved, so the result stays conservative. The top 3 careers are returned, sorted by score.

## Tool states

Rendered by `app/components/ScoreCard.tsx`:

| State | What the user sees |
|---|---|
| input-streaming | "Reading your skills..." |
| input-available | The parsed skills list with "Scoring..." |
| output-available | A card per career with a score bar, matched skills and missing skills |
| output-error | "Something went wrong" with the error text |

## Run locally

1. `npm install`
2. Create `.env.local` with `OPENROUTER_API_KEY=...`
3. `npm run dev`

## Notes

The demo uses a free OpenRouter model, which can be temporarily rate-limited. If a chat message fails, wait a minute and retry.