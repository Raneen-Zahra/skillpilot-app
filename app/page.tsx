"use client";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { ScoreCard } from "./components/ScoreCard";

export default function Page() {
  const { messages, sendMessage, status, error } = useChat();
  const busy = status === "submitted" || status === "streaming";
  const [input, setInput] = useState("");

  return (
    <main style={{ padding: 24 }}>
      {messages.map((m) => (
        <div key={m.id}>
          <b>{m.role}</b>
          {m.parts.map((part, i) => {
            if (part.type === "text") return <p key={i}>{part.text}</p>;
            if (part.type === "tool-scoreCareerFit") {
              return <ScoreCard key={i} part={part} />;
            }
            return null;
          })}
        </div>
      ))}
          {error && <p style={{ color: "tomato" }}>Error: {error.message}</p>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim() || busy) return;
          sendMessage({ text: input });
          setInput("");
        }}
      >
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit" disabled={!input.trim() || status !== "ready"}>
          Send
        </button>
      </form>
    </main>
  );
}