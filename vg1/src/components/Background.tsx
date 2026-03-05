import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();

  // Grid animation: slowly moving
  const gridOffset = (frame * 0.5) % 40;

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", overflow: "hidden" }}>
      {/* Tech Grid */}
      <div
        style={{
          position: "absolute",
          width: "200%",
          height: "200%",
          top: "-50%",
          left: "-50%",
          backgroundImage: `
            linear-gradient(to right, rgba(37, 99, 235, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(37, 99, 235, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          transform: `translateY(${gridOffset}px) rotateX(20deg)`,
          opacity: 0.5,
        }}
      />

      {/* Glowing horizontal lines */}
      {[...Array(5)].map((_, i) => {
        const linePos = interpolate(
          (frame + i * 200) % 600,
          [0, 600],
          [-100, height + 100]
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: linePos,
              left: 0,
              width: "100%",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.3), transparent)",
              boxShadow: "0 0 15px 1px rgba(37, 99, 235, 0.2)",
            }}
          />
        );
      })}

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => {
        const x = (i * 137.5) % 100; // Pseudo-random positions
        const y = (i * 123.4) % 100;
        const opacity = interpolate(
          Math.sin(frame / 30 + i),
          [-1, 1],
          [0.1, 0.4]
        );
        const floatY = Math.sin(frame / 60 + i) * 20;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              backgroundColor: "#2563EB",
              opacity,
              transform: `translateY(${floatY}px)`,
              boxShadow: "0 0 10px #2563EB",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
