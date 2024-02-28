import * as DropdownMenu from "zeego/dropdown-menu";
import feeds from "../constants/feeds";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { View } from "react-native";
import { useStyles, createStyleSheet } from "react-native-unistyles";
import useFeedStore from "../store/useFeedStore";
import { Feed } from "../types/types";
import Typography from "./Typography";

type ActiveFeedIndicatorProps = {};

export default function ActiveFeedIndicator(props: ActiveFeedIndicatorProps) {
  const feedStore = useFeedStore();
  const { styles, theme } = useStyles(stylesheet);

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
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <DropdownMenu.CheckboxItem
            value={feedStore.selectedFeedId === Feed.ForYou}
            onValueChange={(next) => {
              if (feedStore.selectedFeedId !== Feed.ForYou && next === "on") {
                feedStore.setSelectedFeedId(Feed.ForYou);
              }
            }}
            key="for-you"
          >
            <DropdownMenu.ItemTitle>For You</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemSubtitle>
              articles from across all categories
            </DropdownMenu.ItemSubtitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: "heart.text.square",
              }}
            />
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem
            value={feedStore.selectedFeedId === Feed.ReadLater}
            onValueChange={(next) => {
              if (
                feedStore.selectedFeedId !== Feed.ReadLater &&
                next === "on"
              ) {
                feedStore.setSelectedFeedId(Feed.ReadLater);
              }
            }}
            key="read-later"
          >
            <DropdownMenu.ItemTitle>Read Later</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemSubtitle>
              articles saved to read later
            </DropdownMenu.ItemSubtitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: "bookmark",
              }}
            />
          </DropdownMenu.CheckboxItem>
        </DropdownMenu.Group>
        <DropdownMenu.Group>
          {feeds.map((feed) => {
            return (
              <DropdownMenu.CheckboxItem
                value={feed.id === feedStore.selectedFeedId}
                onValueChange={(next) => {
                  if (feedStore.selectedFeedId !== feed.id && next === "on") {
                    feedStore.setSelectedFeedId(feed.id);
                  }
                }}
                key={feed.name}
              >
                <DropdownMenu.ItemTitle>{feed.name}</DropdownMenu.ItemTitle>
                <DropdownMenu.ItemIcon
                  ios={{
                    name: feed.iosIconName,
                  }}
                />
              </DropdownMenu.CheckboxItem>
            );
          })}
        </DropdownMenu.Group>
        <DropdownMenu.Sub>
          <DropdownMenu.ItemTitle>Iå</DropdownMenu.ItemTitle>
          <DropdownMenu.SubTrigger key="sub">
            <DropdownMenu.ItemTitle>All Feeds</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: "tag",
              }}
            />
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item key="4">
              <DropdownMenu.ItemTitle>Ok</DropdownMenu.ItemTitle>
            </DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Group>
          <DropdownMenu.Item key="manage">
            <DropdownMenu.ItemTitle>Manage</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemSubtitle>
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
          >
            <DropdownMenu.ItemTitle>Settings</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemSubtitle>
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
