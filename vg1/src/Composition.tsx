import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { Background } from "./components/Background";
import { Intro } from "./components/Intro";
import { MainContent } from "./components/MainContent";
import { Summary } from "./components/Summary";

const { fontFamily: interFamily } = loadInter("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

export const MyComposition: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#020617", color: "white", fontFamily: interFamily }}>
      <Background />
      
      <Sequence durationInFrames={5 * fps}>
        <Intro />
      </Sequence>

      <Sequence from={5 * fps} durationInFrames={40 * fps}>
        <MainContent />
      </Sequence>

      <Sequence from={45 * fps}>
        <Summary />
      </Sequence>
    </AbsoluteFill>
  );
};
