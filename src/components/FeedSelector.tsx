import { Octicons } from "@expo/vector-icons";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import HomeFeedDropdown from "./HomeFeedDropdown";

type FeedSelectorProps = {
  translateX: Animated.SharedValue<number>;
};

export default function FeedSelector(props: FeedSelectorProps) {
  const { styles, theme } = useStyles(stylesheet);

  const feedSelectorAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: props.translateX.value }],
    };
  }, []);

  return (
    <HomeFeedDropdown>
      <Animated.View style={[styles.feedSelector, feedSelectorAnimatedStyle]}>
        <Octicons name="stack" size={24} color={theme.colors.typography} />
      </Animated.View>
    </HomeFeedDropdown>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  feedSelector: {
    width: 52,
    height: 52,
    borderRadius: 52 / 2,
    backgroundColor: theme.colors.secondaryButtonBackgroundColor,
    zIndex: 4,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    alignItems: "center",
    justifyContent: "center",
  },
}));
