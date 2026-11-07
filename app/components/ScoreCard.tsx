type Result = { career: string; score: number; matched: string[]; missing: string[] };

export function ScoreCard({ part }: { part: any }) {
    switch (part.state) {
        case "input-streaming":
            return <div>Reading your skills...</div>;

        case "input-available":
            return <div>Scoring: {part.input.skills.join(", ")} ...</div>;

        case "output-available":
            return (
                <div>
                    {part.output.results.map((r: Result) => (
                        <div key={r.career}>
                            <h3>{r.career}</h3>
                            <div>score: {r.score}%</div>
                            <div style={{ background: "#333", height: 8, width: 200 }}>
                                <div style={{ background: "#4ade80", height: 8, width: `${r.score}%` }} />
                            </div>
                            <p>matched: {r.matched.join(", ") || "none"}</p>
                            <p>missing: {r.missing.join(", ") || "none"}</p>
                        </div>
                    ))}
                </div>
            );

        case "output-error":
            return <div>Something went wrong: {part.errorText}</div>;
                default:
      return null;
    }
}