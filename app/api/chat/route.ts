import { streamText, convertToModelMessages, stepCountIs, UIMessage } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { scoreCareerFit } from "@/lib/tools/scoreCareerFit";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openrouter("xingchen-agi/xing4.0-29b-a4b:free"),
    system:
  "You are SkillPilot, a career advisor. " +
  "Only call scoreCareerFit when the user explicitly lists skills they have. " +
  "Never invent or assume skills. If they haven't listed any, ask them to list their skills. " +
  "Pass each skill as a short lowercase name like 'python' or 'react', not a job title. " +
  "After the tool returns, reply in one or two sentences about the top match. " +
  "Never show your reasoning.",
    messages: await convertToModelMessages(messages),
    tools: { scoreCareerFit },
    stopWhen: stepCountIs(3),
  });

  return result.toUIMessageStreamResponse({
  onError: (error) => {
    console.error(error);
    return error instanceof Error ? error.message : "Unknown error";
  },
});
}