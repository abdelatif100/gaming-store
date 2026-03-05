import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Summary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zoomSpring = spring({
    frame,
    fps,
    config: { damping: 100 },
  });

  const zoom = interpolate(zoomSpring, [0, 1], [1, 0.8]);

  const textOpacity = spring({
    frame: frame - 20,
    fps,
    config: { damping: 100 },
  });

  const hierarchyOpacity = spring({
    frame: frame - 40,
    fps,
    config: { damping: 100 },
  });

  const fadeOut = interpolate(frame, [120, 150], [0, 1], {
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
      }}
    >
      {/* Container Zoomed Out (Placeholder logic, since MainContent is in a different Sequence) */}
      {/* Actually, Summary should probably be integrated better or MainContent should stay visible. */}
      {/* Given the Sequence structure in Composition.tsx, I'll re-render a simplified hierarchy here. */}

      <div
        style={{
          transform: `scale(${zoom})`,
          opacity: 1 - fadeOut,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "800px",
        }}
      >
        {/* Simplified Glow Boxes */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{
            height: "60px",
            borderRadius: "12px",
            border: "2px solid #2563EB",
            backgroundColor: "rgba(37, 99, 235, 0.1)",
            boxShadow: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }) > 0.5 && interpolate(frame, [0, 40], [1, 0], { extrapolateRight: "clamp" }) > 0 ? "0 0 20px #2563EB" : "none",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            color: "#2563EB",
            fontWeight: "bold"
          }}>SYSTEM PROMPT</div>

          <div style={{
            height: "60px",
            borderRadius: "12px",
            border: "2px solid #7C3AED",
            backgroundColor: "rgba(124, 58, 237, 0.1)",
            boxShadow: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" }) > 0.5 && interpolate(frame, [20, 60], [1, 0], { extrapolateRight: "clamp" }) > 0 ? "0 0 20px #7C3AED" : "none",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            color: "#7C3AED",
            fontWeight: "bold"
          }}>DEVELOPER PROMPT</div>

          <div style={{
            height: "60px",
            borderRadius: "12px",
            border: "2px solid #10B981",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            boxShadow: interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp" }) > 0.5 && interpolate(frame, [40, 80], [1, 0], { extrapolateRight: "clamp" }) > 0 ? "0 0 20px #10B981" : "none",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            color: "#10B981",
            fontWeight: "bold"
          }}>USER COMMANDS</div>
        </div>

        <h2
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            marginTop: "60px",
            marginBottom: "40px",
            opacity: textOpacity,
          }}
        >
          AI follows a hierarchy of instructions
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            fontSize: "24px",
            fontWeight: "bold",
            opacity: hierarchyOpacity,
          }}
        >
          <div style={{ color: "#2563EB" }}>System</div>
          <div style={{ color: "#475569" }}>→</div>
          <div style={{ color: "#7C3AED" }}>Developer</div>
          <div style={{ color: "#475569" }}>→</div>
          <div style={{ color: "#10B981" }}>User</div>
        </div>
      </div>

      {/* Final Fade to Black */}
      <AbsoluteFill
        style={{
          backgroundColor: "black",
          opacity: fadeOut,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
