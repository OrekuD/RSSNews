import { Switch, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Typography from "../Typography";

import React from "react";
import useGesturesSettingsStore, {
  UpdateGesturesSetting,
} from "@/src/store/useGesturesSettingsStore";

const gestures: Array<{
  type: UpdateGesturesSetting;
  title: string;
  description: string;
}> = [
  {
    type: "swipe-artiles-left",
    title: "Swipe Articles Left",
    description: "show article smart summary",
  },
  {
    type: "swipe-articles-right",
    title: "Swipe Articles Right",
    description: "add to read later",
  },
  {
    type: "long-press-next-button",
    title: "Long-Press Next Button",
    description: "scroll down to the end of feeds",
  },
  {
    type: "drag-up-next-button",
    title: "Drag Up Next Button",
    description: "scroll back up to the top of feeds",
  },
  {
    type: "shake-device",
    title: "Shake Device",
    description: "show smart summary",
  },
  {
    type: "tilt-device",
    title: "Tilt Device",
    description: "scroll through feed",
  },
];

export default function GesturesSettings() {
  const { styles } = useStyles(stylesheet);
  const gesturesSettingsStore = useGesturesSettingsStore();

  const getValue = React.useCallback(
    (setting: UpdateGesturesSetting) => {
      switch (setting) {
        case "swipe-artiles-left":
          return gesturesSettingsStore.settings.swipeArticlesLeft;

        case "swipe-articles-right":
          return gesturesSettingsStore.settings.swipeArticlesRight;

        case "long-press-next-button":
          return gesturesSettingsStore.settings.longPressNextButton;

        case "drag-up-next-button":
          return gesturesSettingsStore.settings.dragUpNextButton;

        case "shake-device":
          return gesturesSettingsStore.settings.shakeDevice;

        case "tilt-device":
          return gesturesSettingsStore.settings.tiltDevice;
      }
    },
    [
      gesturesSettingsStore.settings.swipeArticlesLeft,
      gesturesSettingsStore.settings.swipeArticlesRight,
      gesturesSettingsStore.settings.longPressNextButton,
      gesturesSettingsStore.settings.dragUpNextButton,
      gesturesSettingsStore.settings.shakeDevice,
      gesturesSettingsStore.settings.tiltDevice,
    ]
  );

  return (
    <View style={styles.container}>
      <Typography size="3xl" fontWeight="900">
        Gestures
      </Typography>
      {gestures.map((gesture) => {
        return (
          <View style={styles.item} key={gesture.type}>
            <View>
              <Typography size="xl" fontWeight="500">
                {gesture.title}
              </Typography>
              <Typography
                size="lg"
                fontWeight="500"
                color="secondary"
                style={{
                  marginTop: 4,
                }}
              >
                {gesture.description}
              </Typography>
            </View>
            <Switch
              value={getValue(gesture.type)}
              onValueChange={(value) => {
                gesturesSettingsStore.updateSetting(gesture.type);
              }}
              trackColor={{
                true: "#0C83FE",
              }}
            />
          </View>
        );
      })}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    gap: 18,
  },
  item: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
}));
