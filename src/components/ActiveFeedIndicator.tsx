import feeds from "../constants/feeds";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { View } from "react-native";
import { useStyles, createStyleSheet } from "react-native-unistyles";
import useActiveFeedInfoStore from "../store/useActiveFeedInfoStore";
import Typography from "./Typography";
import HomeFeedDropdown from "./HomeFeedDropdown";

type ActiveFeedIndicatorProps = {};

export default function ActiveFeedIndicator(props: ActiveFeedIndicatorProps) {
  const activeFeedInfoStore = useActiveFeedInfoStore();
  const { styles, theme } = useStyles(stylesheet);

  const selectedFeed = React.useMemo(
    () => feeds.find((feed) => feed.id === activeFeedInfoStore.selectedFeedId),
    [activeFeedInfoStore.selectedFeedId]
  );

  return (
    <HomeFeedDropdown>
      <View style={styles.container}>
        <Typography size="lg" fontWeight="600">
          {selectedFeed?.name || "For You"}
        </Typography>
        <Entypo
          name="chevron-small-down"
          size={34}
          color={theme.colors.secondaryTypography}
        />
      </View>
    </HomeFeedDropdown>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    paddingLeft: 16,
    paddingRight: 6,
    height: 36,
    borderRadius: 14,
    backgroundColor: theme.colors.cardBackground,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
  },
}));
