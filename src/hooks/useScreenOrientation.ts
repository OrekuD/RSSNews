import { useWindowDimensions } from "react-native";

export default function useScreenOrientation() {
  const { width, height } = useWindowDimensions();

  return width > height ? "landscape" : "portrait";
}
