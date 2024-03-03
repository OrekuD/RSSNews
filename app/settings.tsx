import { ScrollView, Switch, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import BaseSettings from "@/src/components/settings/BaseSettings";
import GesturesSettings from "@/src/components/settings/GesturesSettings";
import ArticlesSettings from "@/src/components/settings/ArticlesSettings";

export default function Screen() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <View style={styles.knob} />
      <ScrollView contentContainerStyle={styles.scrollview}>
        <BaseSettings />
        <ArticlesSettings />
        <GesturesSettings />
      </ScrollView>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondaryBackground,
    paddingHorizontal: theme.margins["2xl"],
  },
  scrollview: {
    gap: 28,
    paddingTop: 44,
    paddingBottom: 60,
  },
  knob: {
    width: 44,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.gray200,
    alignSelf: "center",
    position: "absolute",
    transform: [{ translateX: -22 }],
    left: "50%",
    top: 6,
    zIndex: 10,
  },
}));
