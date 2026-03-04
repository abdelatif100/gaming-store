import { loadFont } from "@remotion/google-fonts/Cairo";

export const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["arabic"],
});
