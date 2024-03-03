import { useWindowDimensions } from "react-native";

export default function useScreenType() {
  const { width } = useWindowDimensions();

  return {
    isMobile: width < 480,
    isSmallTablet: width >= 480 && width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
  };
}
