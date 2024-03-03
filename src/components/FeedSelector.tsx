import { Octicons } from "@expo/vector-icons";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import * as DropdownMenu from "zeego/dropdown-menu";
import useFeedStore from "../store/useFeedStore";
import { Feed } from "../types/types";
import feeds from "../constants/feeds";
import { useRouter } from "expo-router";

type FeedSelectorProps = {
  translateX: Animated.SharedValue<number>;
};

export default function FeedSelector(props: FeedSelectorProps) {
  const { bottom } = useSafeAreaInsets();
  const { styles, theme } = useStyles(stylesheet);
  const feedStore = useFeedStore();
  const router = useRouter();

  const feedSelectorAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: props.translateX.value }],
    };
  }, []);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger action="press">
        <Animated.View style={[styles.feedSelector, feedSelectorAnimatedStyle]}>
          <Octicons name="stack" size={24} color={theme.colors.typography} />
        </Animated.View>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <DropdownMenu.CheckboxItem
            value={feedStore.selectedFeedId === Feed.ForYou}
            onValueChange={(next) => {
              if (next === "on") {
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
              if (next === "on") {
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
                  if (next === "on") {
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
