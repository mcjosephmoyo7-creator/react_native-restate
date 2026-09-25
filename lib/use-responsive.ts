import { useWindowDimensions } from "react-native";

/**
 * Shared responsive breakpoints for layouts that need to work on small phones,
 * landscape screens, tablets, and web browsers.
 */
export const useResponsiveLayout = () => {
  const { width, height } = useWindowDimensions();

  return {
    width,
    height,
    isNarrow: width < 350,
    isCompact: width < 390 || height < 700,
    isShort: height < 700,
  };
};
