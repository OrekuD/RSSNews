import useSettingsStore from "@/src/store/useSettingsStore";
import { Switch, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Typography from "../Typography";
import * as DropdownMenu from "zeego/dropdown-menu";
import { UnistylesRuntime } from "react-native-unistyles";

const cardSizes = [
  {
    type: "list" as const,
    name: "List",
    description: "contains subtitles",
    iosIconName: "l.circle",
  },
  {
    type: "compressed" as const,
    name: "Compressed",
    description: "contains subtitles and thumbnails",
    iosIconName: "c.circle",
  },
  {
    type: "small" as const,
    name: "Small",
    description: "contains thumbnails",
    iosIconName: "s.circle",
  },
  {
    type: "medium" as const,
    name: "Medium",
    description: "contains cards, subtitles, and thumbnails",
    iosIconName: "m.circle",
  },
  {
    type: "large" as const,
    name: "Large",
    description: "contains cards, subtitles, and thumbnails",
    iosIconName: "l.circle",
  },
  {
    type: "wide" as const,
    name: "Wide",
    description: "contains subtitles and thumbnails",
    iosIconName: "w.circle",
  },
];

const fonts = [
  {
    type: "san-francisco" as const,
    name: "San Francisco",
  },
  {
    type: "new-york" as const,
    name: "New York",
  },
];

const themes = [
  {
    type: "system" as const,
    name: "System",
    iosIconName: "lightbulb",
  },
  {
    type: "light" as const,
    name: "Light",
    iosIconName: "sun.max",
  },
  {
    type: "dark" as const,
    name: "Dark",
    iosIconName: "moon",
  },
];

export default function BaseSettings() {
  const { styles } = useStyles(stylesheet);
  const settingsStore = useSettingsStore();

  return (
    <View style={styles.container}>
      <Typography size="3xl" fontWeight="900">
        Settings
      </Typography>
      <View style={styles.item}>
        <Typography size="xl" fontWeight="500">
          Font
        </Typography>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger action="press">
            <View style={styles.container}>
              <Typography size="xl" fontWeight="500" color="secondary">
                {settingsStore.settings.fontType === "san-francisco"
                  ? "San Francisco"
                  : "New York"}
              </Typography>
            </View>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            {fonts.map((font) => {
              return (
                <DropdownMenu.CheckboxItem
                  value={settingsStore.settings.fontType === font.type}
                  onValueChange={(next) => {
                    if (next === "on") {
                      settingsStore.updateSetting({
                        setting: "font",
                        type: font.type,
                      });
                    }
                  }}
                  key={font.type}
                >
                  <DropdownMenu.ItemTitle>{font.name}</DropdownMenu.ItemTitle>
                  <DropdownMenu.ItemIcon
                    ios={{
                      name: "textformat",
                    }}
                  />
                </DropdownMenu.CheckboxItem>
              );
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </View>
      <View style={styles.item}>
        <Typography size="xl" fontWeight="500">
          Card Size
        </Typography>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger action="press">
            <View style={styles.container}>
              <Typography
                size="xl"
                fontWeight="500"
                color="secondary"
                style={{
                  textTransform: "capitalize",
                }}
              >
                {settingsStore.settings.cardSize}
              </Typography>
            </View>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            {cardSizes.map((cardSize) => {
              return (
                <DropdownMenu.CheckboxItem
                  value={settingsStore.settings.cardSize === cardSize.type}
                  onValueChange={(next) => {
                    if (next === "on") {
                      settingsStore.updateSetting({
                        setting: "card-size",
                        type: cardSize.type,
                      });
                    }
                  }}
                  key={cardSize.type}
                >
                  <DropdownMenu.ItemTitle>
                    {cardSize.name}
                  </DropdownMenu.ItemTitle>
                  <DropdownMenu.ItemSubtitle>
                    {cardSize.description}
                  </DropdownMenu.ItemSubtitle>
                  <DropdownMenu.ItemIcon
                    ios={{
                      name: cardSize.iosIconName,
                    }}
                  />
                </DropdownMenu.CheckboxItem>
              );
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </View>
      <View style={styles.item}>
        <Typography size="xl" fontWeight="500">
          Override Theme
        </Typography>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger action="press">
            <View style={styles.container}>
              <Typography
                size="xl"
                fontWeight="500"
                color="secondary"
                style={{
                  textTransform: "capitalize",
                }}
              >
                {settingsStore.settings.themeMode}
              </Typography>
            </View>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            {themes.map((theme) => {
              return (
                <DropdownMenu.CheckboxItem
                  value={settingsStore.settings.themeMode === theme.type}
                  onValueChange={(next) => {
                    if (next === "on") {
                      settingsStore.updateSetting({
                        setting: "theme",
                        mode: theme.type,
                      });
                    }
                  }}
                  key={theme.type}
                >
                  <DropdownMenu.ItemTitle>{theme.name}</DropdownMenu.ItemTitle>
                  <DropdownMenu.ItemIcon
                    ios={{
                      name: theme.iosIconName,
                    }}
                  />
                </DropdownMenu.CheckboxItem>
              );
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </View>
      <View style={styles.item}>
        <Typography size="xl" fontWeight="500">
          Progressive Blurs
        </Typography>
        <Switch
          value={settingsStore.settings.progressiveBlursEnabled}
          onValueChange={(value) => {
            settingsStore.updateSetting({
              setting: "progressive-blurs",
            });
          }}
          trackColor={{
            true: "#0C83FE",
          }}
        />
      </View>
      <View style={styles.item}>
        <Typography size="xl" fontWeight="500">
          Haptics
        </Typography>
        <Switch
          value={settingsStore.settings.hapticsEnabled}
          onValueChange={(value) => {
            settingsStore.updateSetting({
              setting: "haptics",
            });
          }}
          trackColor={{
            true: "#0C83FE",
          }}
        />
      </View>
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
