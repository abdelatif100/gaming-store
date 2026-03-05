import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadJetBrains } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily: monoFamily } = loadJetBrains("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

interface Props {
  type: "system" | "developer" | "user";
  startFrame: number;
  active: boolean;
  title: string;
  description: string[];
  color: string;
  badge: string;
}

const TypewriterText: React.FC<{ text: string; delay: number; duration: number }> = ({ text, delay, duration }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - delay, [0, duration], [0, text.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const typedText = text.slice(0, Math.floor(progress));
  return (
    <div style={{ minHeight: "24px" }}>
      {typedText}
      {frame - delay < duration && frame - delay > 0 && (
        <span style={{ borderRight: "2px solid white", marginLeft: "2px", opacity: (frame % 10) < 5 ? 1 : 0 }} />
      )}
    </div>
  );
};

const Icon: React.FC<{ type: string; color: string; startFrame: number }> = ({ type, color, startFrame }) => {
  const frame = useCurrentFrame();
  const springVal = spring({
    frame: frame - startFrame - 10,
    fps: 30,
    config: { damping: 10 },
  });

  const iconStyle = {
    width: "48px",
    height: "48px",
    stroke: color,
    strokeWidth: "2",
    fill: "none",
    transform: `scale(${springVal})`,
  };

  if (type === "system") {
    // AI Chip Icon
    return (
      <svg viewBox="0 0 24 24" style={iconStyle}>
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <path d="M9 9h6v6H9z" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M9 2v3M9 19v3M15 2v3M15 19v3" />
      </svg>
    );
  }
  if (type === "developer") {
    // Code Icon
    return (
      <svg viewBox="0 0 24 24" style={iconStyle}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  }
  // User: Chat Bubbles
  return (
    <svg viewBox="0 0 24 24" style={iconStyle}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
};

export const PromptSegment: React.FC<Props> = ({
  type,
  startFrame,
  active,
  title,
  description,
  color,
  badge,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = frame - startFrame;
  const slideSpring = spring({
    frame: relFrame,
    fps,
    config: { damping: 100 },
  });

  const opacity = interpolate(relFrame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  let transform = "none";
  if (type === "system") {
    transform = `translateY(${interpolate(slideSpring, [0, 1], [-50, 0])}px)`;
  } else if (type === "developer") {
    transform = `translateX(${interpolate(slideSpring, [0, 1], [-50, 0])}px)`;
  } else {
    transform = `translateX(${interpolate(slideSpring, [0, 1], [50, 0])}px)`;
  }

  // Sweep highlight animation
  const sweepPos = interpolate(relFrame % 100, [0, 100], [-100, 200]);

  return (
    <div
      style={{
        flex: 1,
        border: `2px solid ${active ? color : "rgba(148, 163, 184, 0.1)"}`,
        borderRadius: "20px",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        opacity: active ? opacity : 0.2,
        transform: active ? transform : "none",
        backgroundColor: "rgba(30, 41, 59, 0.4)",
        boxShadow: active ? `0 0 40px ${color}22` : "none",
        overflow: "hidden",
      }}
    >
      {/* Sweep highlight */}
      {active && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${sweepPos}%`,
            width: "50%",
            height: "100%",
            background: `linear-gradient(90deg, transparent, ${color}11, transparent)`,
            transform: "skewX(-30deg)",
          }}
        />
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
        <Icon type={type} color={color} startFrame={startFrame} />
        <div>
          <div
            style={{
              color,
              fontSize: "14px",
              fontWeight: "bold",
              letterSpacing: "2px",
              fontFamily: monoFamily,
            }}
          >
            {active ? <TypewriterText text={title} delay={10} duration={20} /> : title}
          </div>
        </div>
        
        {/* Badge */}
        <div
          style={{
            marginLeft: "auto",
            padding: "4px 12px",
            borderRadius: "100px",
            border: `1px solid ${color}44`,
            color,
            fontSize: "12px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontFamily: monoFamily,
            opacity: interpolate(relFrame, [40, 60], [0, 1], { extrapolateLeft: "clamp" }),
            transform: `scale(${spring({ frame: relFrame - 40, fps, config: { damping: 10 } })})`,
          }}
        >
          {badge}
        </div>
      </div>

      <div
        style={{
          fontSize: "24px",
          color: "#E2E8F0",
          lineHeight: "1.6",
        }}
      >
        {description.map((line, i) => (
          <TypewriterText
            key={i}
            text={line}
            delay={30 + i * 20}
            duration={20}
          />
        ))}
      </div>

      {/* Pulsing glow if active */}
      {active && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "20px",
            boxShadow: `inset 0 0 20px ${color}11`,
            opacity: interpolate(Math.sin(frame / 10), [-1, 1], [0.3, 0.7]),
          }}
        />
      )}
    </div>
  );
};
