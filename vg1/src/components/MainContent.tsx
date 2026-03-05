import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { PromptSegment } from "./PromptSegment";

export const MainContent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Container reveal animation (5s - 7s)
  // Since MainContent starts at 5s, frame 0 is 5s.
  const containerReveal = spring({
    frame,
    fps,
    config: { damping: 100 },
  });

  const containerOpacity = interpolate(frame, [0, 20], [0, 1]);
  const containerScale = interpolate(containerReveal, [0, 1], [0.9, 1]);

  // Transitions for each segment
  // System: 7s - 22s (frame 60 - 510)
  // Developer: 22s - 35s (frame 510 - 900)
  // User: 35s - 45s (frame 900 - 1200)

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "1200px",
          height: "800px",
          backgroundColor: "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(148, 163, 184, 0.1)",
          borderRadius: "32px",
          opacity: containerOpacity,
          transform: `scale(${containerScale})`,
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          gap: "20px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
        }}
      >
        <PromptSegment
          type="system"
          startFrame={60} // relative to 5s
          active={frame >= 60}
          title="SYSTEM PROMPT"
          description={[
            "The system prompt defines the core behavior of the AI.",
            "It sets the rules, personality, and boundaries.",
            "This instruction always has the highest priority.",
          ]}
          color="#2563EB"
          badge="Highest Priority"
        />

        <PromptSegment
          type="developer"
          startFrame={510}
          active={frame >= 510}
          title="DEVELOPER PROMPT"
          description={[
            "Developers add instructions that control",
            "how the AI behaves inside an application.",
            "These prompts define rules, tools, and system features.",
          ]}
          color="#7C3AED"
          badge="Application Logic"
        />

        <PromptSegment
          type="user"
          startFrame={900}
          active={frame >= 900}
          title="USER COMMANDS"
          description={[
            "Users send prompts to request tasks,",
            "ask questions, or generate content.",
            "These instructions come last in the hierarchy.",
          ]}
          color="#10B981"
          badge="User Interaction"
        />
      </div>
    </AbsoluteFill>
  );
};
