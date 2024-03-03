import useArticlesSettingsStore from "@/src/store/useArticlesSettingsStore";
import { ScrollView, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export default function Screen() {
  const articlesSettingsStore = useArticlesSettingsStore();
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: articlesSettingsStore.settings
            .highContrastReaderBackgroundEnabled
            ? theme.colors.highContrastReadingBackground
            : theme.colors.secondaryBackground,
        },
      ]}
    >
      <View style={styles.knob} />
      <ScrollView></ScrollView>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
  },
  knob: {
    width: 44,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.gray200,
    alignSelf: "center",
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -22 }],
    top: 6,
    zIndex: 10,
  },
}));
