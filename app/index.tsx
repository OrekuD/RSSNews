import Typography from "@/components/Typography";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as DropdownMenu from "zeego/dropdown-menu";

import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useRouter } from "expo-router";
import React from "react";
import { Feed } from "@/types/types";
import feeds from "@/constants/feeds";
import { Entypo } from "@expo/vector-icons";

const DATA: Array<string> = [];

export default function Screen() {
  const { styles, theme } = useStyles(stylesheet);
  const { top } = useSafeAreaInsets();
  const [selectedFeedId, setSelectedFeedId] = React.useState<Feed>(Feed.ForYou);
  const router = useRouter();

  const selectedFeed = React.useMemo(
    () => feeds.find((feed) => feed.id === selectedFeedId),
    [selectedFeedId]
  );

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: top,
        },
      ]}
    >
      <View style={styles.content}>
        <FlashList
          data={DATA}
          renderItem={({ item }) => (
            <View
              style={{
                width: "100%",
                height: 200,
              }}
            ></View>
          )}
          estimatedItemSize={200}
          ListHeaderComponent={
            <View>
              <Typography
                size="2xl"
                fontWeight="900"
                style={{
                  width: "80%",
                }}
              >
                Good Morning
              </Typography>
              <View
                style={[
                  styles.row,
                  {
                    justifyContent: "space-between",
                    marginTop: 16,
                  },
                ]}
              >
                <Typography size="xl" fontWeight="700" color="secondary">
                  Mon 26 Feb
                </Typography>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger action="press">
                    <View style={styles.dropdownTrigger}>
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
                        value={selectedFeedId === Feed.ForYou}
                        onValueChange={(next) => {
                          if (selectedFeedId !== Feed.ForYou && next === "on") {
                            setSelectedFeedId(Feed.ForYou);
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
                        value={selectedFeedId === Feed.ReadLater}
                        onValueChange={(next) => {
                          if (
                            selectedFeedId !== Feed.ReadLater &&
                            next === "on"
                          ) {
                            setSelectedFeedId(Feed.ReadLater);
                          }
                        }}
                        key="read-later"
                      >
                        <DropdownMenu.ItemTitle>
                          Read Later
                        </DropdownMenu.ItemTitle>
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
                            value={feed.id === selectedFeedId}
                            onValueChange={(next) => {
                              if (selectedFeedId !== feed.id && next === "on") {
                                setSelectedFeedId(feed.id);
                              }
                            }}
                            key={feed.name}
                          >
                            <DropdownMenu.ItemTitle>
                              {feed.name}
                            </DropdownMenu.ItemTitle>
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
                        <DropdownMenu.ItemTitle>
                          All Feeds
                        </DropdownMenu.ItemTitle>
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
                        <DropdownMenu.ItemTitle>
                          Settings
                        </DropdownMenu.ItemTitle>
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
              </View>
            </View>
          }
        />
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.margins["2xl"],
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownTrigger: {
    paddingLeft: 16,
    paddingRight: 6,
    height: 42,
    borderRadius: 14,
    backgroundColor: theme.colors.cardBackground,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    // gap: 6,
  },
}));
