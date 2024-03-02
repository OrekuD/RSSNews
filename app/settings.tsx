import { ScrollView, Switch, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import BaseSettings from "@/src/components/settings/BaseSettings";

export default function Screen() {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <View style={styles.knob} />
      <ScrollView contentContainerStyle={styles.scrollview}>
        <BaseSettings />
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
    gap: 18,
    paddingTop: 44,
  },
  knob: {
    width: 44,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.gray200,
    alignSelf: "center",
    position: "absolute",
    left: "50%",
    top: 6,
    zIndex: 10,
  },
}));
