import * as DropdownMenu from "zeego/dropdown-menu";
import feeds from "../constants/feeds";
import React from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { View } from "react-native";
import { useStyles, createStyleSheet } from "react-native-unistyles";
import useFeedStore from "../store/useFeedStore";
import { Feed } from "../types/types";
import Typography from "./Typography";
import webDropdownStyleSheet from "../styles/webDropdownStyleSheet";

type ActiveFeedIndicatorProps = {};

export default function ActiveFeedIndicator(props: ActiveFeedIndicatorProps) {
  const feedStore = useFeedStore();
  const { styles, theme } = useStyles(stylesheet);
  const { styles: webStyles } = useStyles(webDropdownStyleSheet);

  const selectedFeed = React.useMemo(
    () => feeds.find((feed) => feed.id === feedStore.selectedFeedId),
    [feedStore.selectedFeedId]
  );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger action="press">
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
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        style={webStyles.dropdownContent}
        align="end"
        alignOffset={-8}
        sideOffset={6}
      >
        <DropdownMenu.Group>
          <DropdownMenu.CheckboxItem
            value={feedStore.selectedFeedId === Feed.ForYou}
            onValueChange={(next) => {
              if (next === "on") {
                feedStore.setSelectedFeedId(Feed.ForYou);
              }
            }}
            key="for-you"
            style={webStyles.dropdownItem}
          >
            <DropdownMenu.ItemTitle style={webStyles.dropdownTitle}>
              For You
            </DropdownMenu.ItemTitle>
            <DropdownMenu.ItemSubtitle style={webStyles.dropdownSubTitle}>
              articles from across all categories
            </DropdownMenu.ItemSubtitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: "heart.text.square",
              }}
            />
            {feedStore.selectedFeedId === Feed.ForYou ? (
              <AntDesign
                name="checkcircle"
                size={24}
                color={theme.colors.typography}
                style={webStyles.dropdownIcon}
              />
            ) : null}
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem
            value={feedStore.selectedFeedId === Feed.ReadLater}
            onValueChange={(next) => {
              if (next === "on") {
                feedStore.setSelectedFeedId(Feed.ReadLater);
              }
            }}
            key="read-later"
            style={webStyles.dropdownItem}
          >
            <DropdownMenu.ItemTitle style={webStyles.dropdownTitle}>
              Read Later
            </DropdownMenu.ItemTitle>
            <DropdownMenu.ItemSubtitle style={webStyles.dropdownSubTitle}>
              articles saved to read later
            </DropdownMenu.ItemSubtitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: "bookmark",
              }}
            />
            {feedStore.selectedFeedId === Feed.ReadLater ? (
              <AntDesign
                name="checkcircle"
                size={24}
                color={theme.colors.typography}
                style={webStyles.dropdownIcon}
              />
            ) : null}
          </DropdownMenu.CheckboxItem>
        </DropdownMenu.Group>
        <DropdownMenu.Group>
          {feeds.map((feed) => {
            return (
              <DropdownMenu.CheckboxItem
                value={feed.id === feedStore.selectedFeedId}
                onValueChange={(next) => {
                  if (next === "on") {
                    feedStore.setSelectedFeedId(feed.id);
                  }
                }}
                key={feed.name}
                style={webStyles.dropdownItem}
              >
                <DropdownMenu.ItemTitle style={webStyles.dropdownTitle}>
                  {feed.name}
                </DropdownMenu.ItemTitle>
                <DropdownMenu.ItemIcon
                  ios={{
                    name: feed.iosIconName,
                  }}
                />
                {feed.id === feedStore.selectedFeedId ? (
                  <AntDesign
                    name="checkcircle"
                    size={24}
                    color={theme.colors.typography}
                    style={webStyles.dropdownIcon}
                  />
                ) : null}
              </DropdownMenu.CheckboxItem>
            );
          })}
        </DropdownMenu.Group>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger
            key="sub"
            style={webStyles.dropdownSubTrigger}
          >
            <DropdownMenu.ItemTitle style={webStyles.dropdownTitle}>
              All Feeds
            </DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: "tag",
              }}
            />
            <Entypo
              name="chevron-right"
              size={24}
              color={theme.colors.typography}
              style={webStyles.dropdownSubTriggerIcon}
            />
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent style={webStyles.dropdownSubContent}>
            {Array(10)
              .fill(null)
              .map((_, index) => (
                <DropdownMenu.Item
                  key={index + 1 + ""}
                  style={[
                    webStyles.dropdownSubContentItem,
                    {
                      borderTopWidth: index === 0 ? 0 : 1,
                    },
                  ]}
                >
                  <DropdownMenu.ItemTitle style={webStyles.dropdownTitle}>
                    label
                  </DropdownMenu.ItemTitle>
                </DropdownMenu.Item>
              ))}
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Group>
          <DropdownMenu.Item key="manage" style={webStyles.dropdownItem}>
            <DropdownMenu.ItemTitle style={webStyles.dropdownTitle}>
              Manage
            </DropdownMenu.ItemTitle>
            <DropdownMenu.ItemSubtitle style={webStyles.dropdownSubTitle}>
              add and remove feeds
            </DropdownMenu.ItemSubtitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: "list.bullet",
              }}
            />
          </DropdownMenu.Item>
          <DropdownMenu.Item
            key="settings"
            onSelect={() => router.push("/settings")}
            style={[
              webStyles.dropdownItem,
              {
                borderBottomWidth: 0,
              },
            ]}
          >
            <DropdownMenu.ItemTitle style={webStyles.dropdownTitle}>
              Settings
            </DropdownMenu.ItemTitle>
            <DropdownMenu.ItemSubtitle style={webStyles.dropdownSubTitle}>
              make the app your own
            </DropdownMenu.ItemSubtitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: "gear",
              }}
            />
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
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
