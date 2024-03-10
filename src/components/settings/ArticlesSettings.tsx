import { Switch, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Typography from "../Typography";
import * as DropdownMenu from "zeego/dropdown-menu";
import useArticlesSettingsStore from "@/src/store/useArticlesSettingsStore";
import React from "react";

const openInOptions = [
  {
    type: "reader-view" as const,
    name: "Reader View",
    iosIconName: "list.bullet.rectangle.portrait",
  },
  {
    type: "web-view" as const,
    name: "Web View",
    iosIconName: "safari",
  },
];

const sortOrderOptions = [
  {
    type: "newest-first" as const,
    name: "Newest first",
    iosIconName: "arrow.up",
  },
  {
    type: "oldest-first" as const,
    name: "Oldest first",
    iosIconName: "arrow.down",
  },
];

const timestampsOptions = [
  {
    type: "relative" as const,
    name: "Relative",
    iosIconName: "clock.arrow.circlepath",
  },
  {
    type: "absolute" as const,
    name: "Absolute",
    iosIconName: "clock",
  },
];

const extraOptions = [
  {
    type: "favicons" as const,
    title: "Favicons",
  },
  {
    type: "high-contrast-reader-background" as const,
    title: "High Contrast Reader Background",
  },
  {
    type: "one-sentence-smart-summaries" as const,
    title: "One Sentence Smart Summaries",
  },
  {
    type: "auto-remove-from-read-later" as const,
    title: "Auto-Remove From Read Later",
  },
  {
    type: "auto-hide-read-articles" as const,
    title: "Auto-Hide Read Articles",
  },
  {
    type: "scroll-to-mark-read" as const,
    title: "Scroll To Mark Read",
  },
];

export default function ArticlesSettings() {
  const { styles } = useStyles(stylesheet);
  const articlesSettingsStore = useArticlesSettingsStore();

  const getValue = React.useCallback(
    (
      setting:
        | "high-contrast-reader-background"
        | "one-sentence-smart-summaries"
        | "auto-remove-from-read-later"
        | "auto-hide-read-articles"
        | "scroll-to-mark-read"
        | "favicons"
    ) => {
      switch (setting) {
        case "auto-hide-read-articles":
          return articlesSettingsStore.settings.autoHideReadArticlesEnabled;

        case "auto-remove-from-read-later":
          return articlesSettingsStore.settings.autoRemoveFromReadLaterEnabled;

        case "high-contrast-reader-background":
          return articlesSettingsStore.settings
            .highContrastReaderBackgroundEnabled;

        case "one-sentence-smart-summaries":
          return articlesSettingsStore.settings
            .oneSentenceSmartSummariesEnabled;

        case "scroll-to-mark-read":
          return articlesSettingsStore.settings.scrollToMarkReadEnabled;

        case "favicons":
          return articlesSettingsStore.settings.faviconsEnabled;

        default:
          break;
      }
    },
    [
      articlesSettingsStore.settings.autoHideReadArticlesEnabled,
      articlesSettingsStore.settings.autoRemoveFromReadLaterEnabled,
      articlesSettingsStore.settings.highContrastReaderBackgroundEnabled,
      articlesSettingsStore.settings.oneSentenceSmartSummariesEnabled,
      articlesSettingsStore.settings.scrollToMarkReadEnabled,
      articlesSettingsStore.settings.faviconsEnabled,
    ]
  );

  return (
    <View style={styles.container}>
      <Typography size="3xl" fontWeight="900">
        Articles
      </Typography>
      <View style={styles.item}>
        <Typography size="xl" fontWeight="500">
          Open in...
        </Typography>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger action="press">
            <View style={styles.container}>
              <Typography size="xl" fontWeight="500" color="secondary">
                {articlesSettingsStore.settings.openIn === "reader-view"
                  ? "Reader View"
                  : "Web View"}
              </Typography>
            </View>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            {openInOptions.map((option) => {
              return (
                <DropdownMenu.CheckboxItem
                  value={articlesSettingsStore.settings.openIn === option.type}
                  onValueChange={(next) => {
                    if (next === "on") {
                      articlesSettingsStore.updateSetting({
                        setting: "open-in",
                        type: option.type,
                      });
                    }
                  }}
                  key={option.type}
                >
                  <DropdownMenu.ItemTitle>{option.name}</DropdownMenu.ItemTitle>
                  <DropdownMenu.ItemIcon
                    ios={{
                      name: option.iosIconName,
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
          Sort Order
        </Typography>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger action="press">
            <View style={styles.container}>
              <Typography size="xl" fontWeight="500" color="secondary">
                {articlesSettingsStore.settings.sortOrder === "newest-first"
                  ? "Newest First"
                  : "Oldest First"}
              </Typography>
            </View>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            {sortOrderOptions.map((option) => {
              return (
                <DropdownMenu.CheckboxItem
                  value={
                    articlesSettingsStore.settings.sortOrder === option.type
                  }
                  onValueChange={(next) => {
                    if (next === "on") {
                      articlesSettingsStore.updateSetting({
                        setting: "sort-order",
                        type: option.type,
                      });
                    }
                  }}
                  key={option.type}
                >
                  <DropdownMenu.ItemTitle>{option.name}</DropdownMenu.ItemTitle>
                  <DropdownMenu.ItemIcon
                    ios={{
                      name: option.iosIconName,
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
          Timestamps
        </Typography>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger action="press">
            <View style={styles.container}>
              <Typography size="xl" fontWeight="500" color="secondary">
                {articlesSettingsStore.settings.timestamps === "relative"
                  ? "Relative"
                  : "Absolute"}
              </Typography>
            </View>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            {timestampsOptions.map((option) => {
              return (
                <DropdownMenu.CheckboxItem
                  value={
                    articlesSettingsStore.settings.timestamps === option.type
                  }
                  onValueChange={(next) => {
                    if (next === "on") {
                      articlesSettingsStore.updateSetting({
                        setting: "timestamps",
                        mode: option.type,
                      });
                    }
                  }}
                  key={option.type}
                >
                  <DropdownMenu.ItemTitle>{option.name}</DropdownMenu.ItemTitle>
                  <DropdownMenu.ItemIcon
                    ios={{
                      name: option.iosIconName,
                    }}
                  />
                </DropdownMenu.CheckboxItem>
              );
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </View>

      {extraOptions.map((option) => {
        return (
          <View style={styles.item} key={option.type}>
            <Typography
              size="xl"
              fontWeight="500"
              style={{
                width: "70%",
              }}
            >
              {option.title}
            </Typography>
            <Switch
              value={getValue(option.type)}
              onValueChange={() => {
                articlesSettingsStore.updateSetting({ setting: option.type });
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
