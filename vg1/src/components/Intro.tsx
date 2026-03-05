import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 100 },
  });

  const subtitleSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 100 },
  });

  const captionSpring = spring({
    frame: frame - 40,
    fps,
    config: { damping: 100 },
  });

  const fadeOut = interpolate(frame, [120, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          transform: `scale(${titleSpring})`,
          opacity: titleSpring,
        }}
      >
        <h1
          style={{
            fontSize: "96px",
            fontWeight: "bold",
            margin: "0",
            background: "linear-gradient(to right, #2563EB, #7C3AED, #10B981)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 30px rgba(37, 99, 235, 0.3)",
          }}
        >
          How AI Understands Instructions
        </h1>
      </div>

      <div
        style={{
          transform: `translateY(${interpolate(subtitleSpring, [0, 1], [50, 0])}px)`,
          opacity: subtitleSpring,
          marginTop: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "48px",
            color: "#94A3B8",
            fontWeight: "normal",
            margin: "0",
          }}
        >
          The Hierarchy of Prompts
        </h2>
      </div>

      <div
        style={{
          opacity: captionSpring,
          marginTop: "60px",
          color: "#475569",
          fontSize: "24px",
          letterSpacing: "4px",
          textTransform: "uppercase",
        }}
      >
        System <span style={{ color: "#2563EB" }}>→</span> Developer <span style={{ color: "#7C3AED" }}>→</span> User
      </div>
    </AbsoluteFill>
  );
};
